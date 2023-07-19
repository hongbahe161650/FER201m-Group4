import { Nav } from 'react-bootstrap';

const NavMenuDashboard = () => {
  return (
    <div className="nav_menu_dashboard">
      <Nav>
        <Nav.Item>
          <Nav.Link href="https://aristino.com/tai-khoan.html?tab=order" rel="nofollow">
            Đơn hàng
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="https://aristino.com/tai-khoan.html?tab=information" rel="nofollow">
            Tài khoản
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="https://aristino.com/tai-khoan.html?tab=address" rel="nofollow">
            Địa chỉ
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="https://aristino.com/dich-vu.html" rel="nofollow">
            Dịch vụ
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="https://aristino.com/tai-khoan/Logout.html" rel="nofollow">
            Đăng xuất
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default NavMenuDashboard;
