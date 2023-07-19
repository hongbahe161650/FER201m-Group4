import { Breadcrumb, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
const BreadcrumbComponent = () => {
  return (
    <Nav className="" activeKey="/home">
      <Breadcrumb>
        <Breadcrumb.Item
          itemProp="itemListElement"
          itemScope
          className="breadcrumb-item"
        >
          <Link to="/home" className="link-in-react-router-dom">Home</Link>
          <meta itemProp="position" content="1" />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          itemProp="itemListElement"
          itemScope
          className="breadcrumb-item"
        >
          <Link to="/cart" className="link-in-react-router-dom" >Đơn hàng</Link>
          <meta itemProp="position" content="2" />
        </Breadcrumb.Item>
      </Breadcrumb>
    </Nav>
  );
};

export default BreadcrumbComponent;
