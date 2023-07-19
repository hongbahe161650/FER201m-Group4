import Banner from "./Banner";
import Footer from "./Footer";
import Top from "./Top";
import "../styles/DefaultLayoutStyle.css";
const DefaultLayout = ({className, children }) => { 

  return (
    <>
    <div className="container border-0">
    <Top />
      <Banner />
      <div>{children}</div>
      <Footer />
    </div>
    </>
  );
};

export default DefaultLayout;
