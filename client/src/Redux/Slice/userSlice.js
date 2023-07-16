import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../Api/authApi';
import Toast from '../../Components/Toastify/toastify';
const initialState = {
    isLoading: false,
    user: {},
    listComments: [],
    countView: {},
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        refreshToken(state, action) {
            console.log("User Refresh Token",action)
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },
        addComment(state, action) {
            state.listComments.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            if (action?.payload === 'Logout Success') {
                state.user = {};
            }
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload,
            };
        });
        builder.addCase(getComments.fulfilled, (state, action) => {
            // console.log(action);
            state.listComments = action.payload.data.listComments;
            state.countView = action.payload.data.count;
        });
    },
}); 

// LOGIN
const login = createAsyncThunk('user/login', async (data) => {
    const result = await authApi.login(data);
    // console.log(result)
    if (result.response?.data.message === 'Incorrect password') {
        Toast('error', result.response.data.message);
    } else if (result.response?.data.message === 'Incorrect account') {
        Toast('error', result.response.data.message);
    } else {
        Toast('success', 'Login Success');
        return result;
    }
});

// REGISTER
const register = createAsyncThunk('user/register', async (data) => {
    const kq = await authApi.register(data);
    if (kq.message === 'Success') {
        Toast('success', 'Register Success');
        return kq.message;
    } else {
        Toast('error', 'User Already Exist');
    }
});

// LOGOUT
const logout = createAsyncThunk('user/logout', async (data) => {
    const kq = await authApi.logout(data);
    // console.log(kq)
    if (kq.message === 'Logout Success') {
        Toast('success', kq.message);
        return kq.message;
    } else {
        Toast('error', 'Un Authorization');
    }
});

// CHANGEPASSWORD
const changePw = createAsyncThunk('user/changePw', async (data, { dispatch }) => {
    const kq = await authApi.changePw(data, dispatch);
    if (kq.message === 'Change Password Success') {
        Toast('success', kq.message);
    } else {
        Toast('error', 'Password incorrect');
    }
});

// UPDATE USER
const updateUser = createAsyncThunk('user/update', async (data, { dispatch }) => {
    const kq = await authApi.updateUser(data, dispatch);
    if (kq.message === 'Update Success') {
        Toast('success', kq.message);
        return kq.user;
    } else {
        Toast('error', 'Update Failed');
    }
});

// COMMENT USER
const commentUser = createAsyncThunk('user/comment', async (data, { dispatch }) => {
    const kq = await authApi.commentUser(data, dispatch);
    if (kq.message === 'Comment Success') {
        dispatch(getComments(data));
        Toast('success', kq.message);
    } else {
        Toast('error', ' Failed');
    }
});

// GET COMMENTS
const getComments = createAsyncThunk('user/getComments', async (data, { dispatch }) => {
    const kq = await authApi.getComments(data, dispatch);
    return kq;
});

// DELETE COMMENT
const deleteComment = createAsyncThunk('user/deleteComment', async (data, { dispatch }) => {
    const kq = await authApi.deleteComment(data, dispatch);
    if (kq.message === 'Delete Success') {
        dispatch(getComments(data));
        Toast('success', kq.message);
    } else {
        Toast('error', ' Failed');
    }
});
export { login, register, logout, changePw, updateUser, commentUser, getComments , deleteComment };
export default userSlice;
