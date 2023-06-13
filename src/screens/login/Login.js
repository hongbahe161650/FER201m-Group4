import React from "react";
import * as Components from './Components';

function Login() {
    const [signIn, toggle] = React.useState(true);
     return(
        <div className="container-login">
         <Components.Container>
             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form>
                     <Components.Title>Đăng Ký</Components.Title>
                     <Components.Input type='text' placeholder='Name' />
                     <Components.Input type='email' placeholder='Email' />
                     <Components.Input type='password' placeholder='Password' />
                     <Components.Button>Đăng Ký</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form>
                      <Components.Title>Đăng Nhập</Components.Title>
                      <Components.Input type='email' placeholder='Email' />
                      <Components.Input type='password' placeholder='Password' />
                      <Components.Anchor href='/forgotpassword'>Quên Mật Khẩu ?</Components.Anchor>
                      <Components.Button>Đăng Nhập</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                 <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title>Chào mừng trở lại!</Components.Title>
                     <Components.Paragraph>
                     Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn ^.^
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Đăng Nhập
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>Xin Chào!</Components.Title>
                       <Components.Paragraph>
                       Nhập thông tin cá nhân của bạn và bắt đầu hành trình với chúng tôi ^.^
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Đăng Ký
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>
         </div>
     )
}

export default Login;