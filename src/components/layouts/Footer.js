import React from "react";

function Footer() {
  return (
    <div className="container" style={{borderLeft:'none',borderRight:'none'}}>
      <div className="row" style={{padding:'15px'}}>
        <div className="col-8">
          <div className="row">
            <div className="row">
              <div className="col-4">
                <div className="col-footer">
                  <div className="headingFooter" style={{fontWeight:'650',fontSize:'medium',paddingBottom:'20px'}}>VỀ CHÚNG TÔI</div>
                  <div className="nav_footer">
                    <p>Câu chuyện thương hiệu</p>
                    <p>Đôi Cánh Yêu Thương</p>
                    <p>Tin tức</p>
                    <p>Tuyển dụng</p>
                    <p>Liên hệ</p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="col-footer">
                  <div className="headingFooter" style={{fontWeight:'650',fontSize:'medium',paddingBottom:'20px'}}>CHÍNH SÁCH BÁN HÀNG</div>
                  <div className="nav_footer">
                    <p>Chính sách đổi hàng</p>
                    <p>Chính sách bảo hành</p>
                    <p>Chính sách hội viên</p>
                    <p>Chính sách giao nhận</p>
                    <p>Hướng dẫn mua hàng</p>
                    <p>Chính sách bảo mật</p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="col-footer">
                  <div className="headingFooter" style={{fontWeight:'650',fontSize:'medium',paddingBottom:'20px'}}>TƯ VẤN</div>
                  <div className="nav_footer">
                    <p>Tư vấn phong cách</p>
                    <p>Tư vấn chọn size</p>
                    <p>Hỏi đáp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="col-info-right">
            <h4>THEO DÕI BẢN TIN CỦA CHÚNG TÔI</h4>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
