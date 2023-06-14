import Footer from "../components/Footer";
import Top from "../components/Top";
import "../styles/DefaultLayoutStyle.css";
const DefaultLayoutDetail = ({className, children }) => {
  return (
    <>
      <Top />
      <div className={className}>{children}</div>
      <Footer />
    </>
  );
};

export default DefaultLayoutDetail;
