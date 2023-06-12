import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
const Top = () => {
  return (
    <div className="container menu">
      <div className="row">
        <div className="col-12 col-sm-8">
          <ul className="left">
            <li>
              <Link to="/">HOME</Link>
            </li>

            <li> <Link to="/ao">Aos</Link></li>
            <li><Link to="/quan">Quần</Link></li>
            <li><Link to="/phukien">Phụ Kiện</Link></li>
          </ul>
        </div>
        <div className="col-12-col-sm-4">
          <ul className="right">
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Top;
