import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from '../src/Layouts/DefaultLayout';
import Router from '../src/Routes';
import ScrollBackToTop from './Components/ScrollBackToTop';
import ScrollTop from './Components/ScrollBackToTop/ScrollTop';
import HeaderBannerLayout from './Layouts/HeaderBannerLayout';
import HeaderLayout from './Layouts/HeaderLayout';
import NotFound from './Pages/NotFound';
// import Loading from './Components/Loading/loading';
function App() {
    return (
        <>
            {/* Toastify */}
            <ToastContainer></ToastContainer>
            {/* Auto Scroll Top When Redirect Other Page */}
            <ScrollTop></ScrollTop>
            {/* ScrollToBackTop */}
            <ScrollBackToTop></ScrollBackToTop>
            {/* <BrowserRouter> */}
                <Routes>

                    {Router.map((e, i) => {
                        let Layout = DefaultLayout;
                        if (e.layout === 'HeaderBannerLayout') {
                            Layout = HeaderBannerLayout;
                        } else if (e.layout === 'HeaderLayout') {
                            Layout = HeaderLayout;
                        }
                        return <Route key={i} path={e.path} element={<Layout>{e.component}</Layout>}></Route>;
                    })}
                    <Route
                        path="*"
                        element={
                            <HeaderLayout>
                                <NotFound />
                            </HeaderLayout>
                        }
                    />
                </Routes>
            {/* </BrowserRouter> */}
        </>
    );
}

export default App;
