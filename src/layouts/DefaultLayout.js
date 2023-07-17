import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Top from "../components/Top";
<<<<<<< HEAD

const DefaultLayout = ({ children }) => {
=======
import "../styles/DefaultLayoutStyle.css";
const DefaultLayout = ({className, children }) => {
>>>>>>> 1da8130ca209d89722ac281df640106058d92e8b
  return (
    <>
      <Top />
      <Banner />
<<<<<<< HEAD
      <div>{children}</div>
=======
      <div className={className}>{children}</div>
>>>>>>> 1da8130ca209d89722ac281df640106058d92e8b
      <Footer />
    </>
  );
};

export default DefaultLayout;
