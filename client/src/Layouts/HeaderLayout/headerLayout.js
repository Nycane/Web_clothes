import Header from "../Components/Header";
import Footer from "../Components/Footer";
function HeaderLayout({children}) {
    return (  
      <>
            <Header bg={true}></Header>
                    {children}
            <Footer></Footer>
      </>
    )
}

export default HeaderLayout;