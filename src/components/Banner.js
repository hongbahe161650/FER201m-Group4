import Carousel from "react-bootstrap/Carousel";
import "../styles/DefaultLayoutStyle.css";
export default function Banner() {
  return (
<div className="banner">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="/assets/1.png" alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/assets/2.png" alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/assets/3.png" alt="" />
        </Carousel.Item>
      </Carousel>
</div>
  );
}
