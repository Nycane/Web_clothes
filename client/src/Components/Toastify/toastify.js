import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Toast(type = 'success', message) {
    toast[type](message, {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
} 
export default Toast;
