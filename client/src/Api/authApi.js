import createAxiosAuth from './axiosAuth'
import axiosClient from "./axiosClient";
const auth = {
     async register(data){
       try {
          let result = await axiosClient.post('/user/register',data)
          console.log(result)
          return result
       } catch (error) {
            return error;
       }
    },
    async login(data){
      try {
         let result =await axiosClient.post('/user/login',data)
         return result
      } catch (error) {
           return error;
      }
   },
   async logout(data){
      try {
         let result =await axiosClient.delete(`/user/logout/${data.id}`)
         return result
      } catch (error) {
           return error;
      }
   },
   async changePw(data,dispatch){
      try {
         const axiosAuth = createAxiosAuth(data,dispatch)
         let result =await axiosAuth.post(`/user/changepassword`,JSON.stringify(data))
         return result
      } catch (error) {
           return error;
      }
   },
   async updateUser(data,dispatch){
      try {
         const axiosAuth = createAxiosAuth(data,dispatch)
         let result =await axiosAuth.post("/user/update",JSON.stringify(data))
         return result
      } catch (error) {
           return error;
      }
   },
   async commentUser(data,dispatch){
      try {
         const axiosAuth = createAxiosAuth(data,dispatch)
         let result =await axiosAuth.post("/user/comment",JSON.stringify(data))
         return result
      } catch (error) {
           return error;
      }
   },
   async getComments(data,dispatch){
      try {
         let result =await axiosClient.get(`/user/comment/${data.productId}`,JSON.stringify(data))
         return result
      } catch (error) {
           return error;
      }
   },
   async deleteComment(data,dispatch){
      console.log(data)
      try {
         const axiosAuth = createAxiosAuth(data,dispatch)
         let result =await axiosAuth.delete(`/user/comment/delete/${data.commentId}`,JSON.stringify(data))
         return result
      } catch (error) {
           return error;
      }
   }
}
export default auth;