import Home from '../Pages/Home';
import Contact from '../Pages/Contact';
import About from '../Pages/About';
import WishList from '../Pages/WishList';
import Shop from '../Pages/Shop';
import Cart from '../Pages/Cart';
import ProductDetail from '../Pages/ProductDetail';
import Login from '../Pages/Login'
import Checkout from '../Pages/Checkout/checkout';
import Order from '../Pages/Order';
import Account from '../Pages/Account/account';
const publicRoutes = [
    {
        path: '/',
        component: <Home/>,
        layout: 'DefaultLayout',
    },
    {
        path: '/contact',
        component: <Contact/>,
        layout: 'HeaderBannerLayout',
    },
    {
        path: '/about',
        component: <About></About>,
        layout: 'HeaderBannerLayout',
    },
    {
        path: '/wishlist',
        component: <WishList/>,
        layout: 'HeaderBannerLayout',
    },
    {
        path: '/shop',
        component: <Shop/>,
        layout: 'HeaderBannerLayout',
    },
    {
        path: '/cart',
        component: <Cart/>,
        layout: 'HeaderLayout',
    },
    {
        path: '/product/:id',
        component: <ProductDetail />,
        layout: 'HeaderLayout',
    },
    {
        path: '/login',
        component: <Login />,
        layout: 'HeaderLayout',
    },
    {
        path: '/checkout',
        component: <Checkout/>,
        layout: 'HeaderLayout',
    },
    {
        path: '/checkout/order',
        component: <Order/>,
        layout: 'HeaderLayout',
    },
    {
        path:'/account/*',
        component: <Account/>,
        layout: 'HeaderBannerLayout',
    }
];
export default publicRoutes;
