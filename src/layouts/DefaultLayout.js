import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Top from "../components/Top";
import "../styles/DefaultLayoutStyle.css";
const DefaultLayout = ({ children }) => {
  return (
    <>
      <Top />
      <Banner />

      <div>{children}</div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
