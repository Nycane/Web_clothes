import SliderHeader from '../Components/Header/Components/SlideHeader';
import Footer from '../Components/Footer/footer';
import Header from '../Components/Header/header';

function DefaultLayout({ children }) {
    return (
        <>
            <SliderHeader>
                <Header bg={false}></Header>
            </SliderHeader>
            {children}
            <Footer></Footer>
        </>
    );
}

export default DefaultLayout;
