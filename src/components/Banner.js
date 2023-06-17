import Carousel from "react-bootstrap/Carousel";
import "../styles/DefaultLayoutStyle.css";
import "../styles/Banner.css"
export default function Banner() {
  return (
    <div className="container">
      <Carousel className="banner">
        <Carousel.Item>
          <img className="d-block w-100" src="/assets/banner/4.png" alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/assets/banner/6.png" alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/assets/banner/5.png" alt="" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
