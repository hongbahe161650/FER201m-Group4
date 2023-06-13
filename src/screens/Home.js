import React, { useEffect, useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "react-bootstrap/Card";
import data from "../data/database.json";

const Home = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(data.product);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleMouseEnter = (event, product) => {
    event.currentTarget.getElementsByTagName("img")[0].src = product.blurImg;
  };

  const handleMouseLeave = (event, product) => {
    event.currentTarget.getElementsByTagName("img")[0].src = product.img;
  };

  const getRandomProducts = (arr, count) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomProducts1 = getRandomProducts(product, 6);
  const randomProducts2 = getRandomProducts(product, 6);

  return (
    <DefaultLayout>
      <Container>
        <h2>Danh Mục Nổi Bật</h2>
        <Slider {...settings}>
          {randomProducts1.map((productItem) => (
            <div key={productItem.id} className="col-sm-3">
              <Card style={{ width: "15rem" }}>
                <div
                  className="blurry-image"
                  onMouseEnter={(event) => handleMouseEnter(event, productItem)}
                  onMouseLeave={(event) => handleMouseLeave(event, productItem)}
                >
                  <Card.Img
                    variant="top"
                    src={productItem.img}
                    onClick={() =>
                      (window.location.href = `product/detail/${productItem.id}`)
                    }
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <Card.Body>
                  <Card.Text
                    onClick={() =>
                      (window.location.href = `product/detail/${productItem.id}`)
                    }
                    style={{ fontWeight: "500", cursor: "pointer" }}
                  >
                    {productItem.name}
                  </Card.Text>
                  <Card.Text>
                    {productItem.price} <strong>đ</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
        <br />
        <img src="/assets/banner/2.png" style={{width:"100%"}} />
        <h2>Sản Phẩm Mới</h2>
        <Slider {...settings}>
          {randomProducts2.map((productItem) => (
            <div key={productItem.id} className="col-sm-3">
              <Card style={{ width: "15rem" }}>
                <div
                  className="blurry-image"
                  onMouseEnter={(event) => handleMouseEnter(event, productItem)}
                  onMouseLeave={(event) => handleMouseLeave(event, productItem)}
                >
                  <Card.Img
                    variant="top"
                    src={productItem.img}
                    onClick={() =>
                      (window.location.href = `product/detail/${productItem.id}`)
                    }
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <Card.Body>
                  <Card.Text
                    onClick={() =>
                      (window.location.href = `product/detail/${productItem.id}`)
                    }
                    style={{ fontWeight: "500", cursor: "pointer" }}
                  >
                    {productItem.name}
                  </Card.Text>
                  <Card.Text>
                    {productItem.price} <strong>đ</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </Container>
    </DefaultLayout>
  );
};

export default Home;
