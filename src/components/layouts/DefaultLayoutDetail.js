import Footer from "./Footer";
import Top from "./Top";
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
