import React from "react";
import * as Components from "./Components";

function Login() {
  const [signIn, toggle] = React.useState(true);
  return (
    <div className="container-login">
    <Components.Container>
      <Components.SignInContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Quên Mật Khẩu</Components.Title>
          <Components.Input type="email" placeholder="Email" />
    
          <Components.Anchor href="/login">
            Quay Lại Đăng Nhập ?
          </Components.Anchor>
          <Components.Button href="/#">Quên Mật Khẩu</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Xin Chào!</Components.Title>
            <Components.Paragraph>
              Nhập thông tin cá nhân của bạn để lấy lại mật khẩu ^.^
            </Components.Paragraph>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
    </div>
  );
}

export default Login;
