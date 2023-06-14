import DefaultLayoutDetail from "../layouts/DefaultLayoutDetail";
import "../styles/DefaultLayoutStyle.css";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuantityButton from "../components/QuantityButton";
import { Cart, CreditCard, ArrowRepeat } from "react-bootstrap-icons";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  //Cắt chuỗi description
  const description = product.description || "";
  const splitStrings = description.split(/THIẾT KẾ:|CHẤT LIỆU:/);
  const substringDesign = splitStrings[1] ? splitStrings[1].split("\n") : [];
  const substringMaterial = splitStrings[2] ? splitStrings[2].split("\n") : [];

  //bắt sự kiện con trỏ chuột
  const [isHoveredColor, setIsHoveredColor] = useState([]);
  const [isHoveredSize, setIsHoveredSize] = useState([]);

  const [quantity, setQuantity] = useState(1);

  //Click ảnh thumbnail -> hiện ảnh carousel tương ứng
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoverThumbnail, setIsHoveredThumbnail] = useState([]);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    // setIsHoveredThumbnail(true);
    setIsHoveredThumbnail(Array(product.img?.length || 0).fill(false).map((val, i) => i === index));
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  useEffect(() => {
    setIsHoveredColor(Array(product.color?.length || 0).fill(false));
  }, [product]);

  useEffect(() => {
    setIsHoveredSize(Array(product.size?.length || 0).fill(false));
  }, [product]);

  useEffect(() => {
    fetch("http://localhost:9999/product")
      .then((res) => res.json())
      .then((result) => {
        const r = result.find((p) => p.id === parseInt(id));
        setProduct(r);
      });
  }, []);

  return product ? (
    <DefaultLayoutDetail className="container">
      <div className="row" style={{ marginTop: "60px" }}>
        {/* Image Product */}
        <div className="col-2">
          <div style={{ marginLeft: "30px" }}>
            <div style={{ flexDirection: "column" }}>
              <div className="swiperImgProduct_detail">
                <div>
                  <Image
                    src={product.img}
                    thumbnail
                    onClick={() => handleThumbnailClick(0)}
                    index={0}
                    style={{
                        border: isHoverThumbnail[0] ? '2px solid #000' : 'none' 
                    }}
                  />
                </div>
                <div>
                  <Image
                    src={product.blurImg}
                    thumbnail
                    onClick={() => handleThumbnailClick(1)}
                    index={1}
                    style={{
                        border: isHoverThumbnail[1] ? '2px solid #000' : 'none' 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="col-6">
          <Carousel
            activeIndex={activeIndex}
            onSelect={(index) => setActiveIndex(index)}
            style={{ width: "520px" }}
          >
            <Carousel.Item>
              <img
                style={{ width: "520px" }}
                src={product.img}
                alt={product.name}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ width: "520px" }}
                src={product.blurImg}
                alt={product.name}
              />
            </Carousel.Item>
          </Carousel>
        </div>
        {/* Thông tin sản phẩm -> add to cart */}
        <div className="col-4" style={{ marginTop: "25px" }}>
          <h1 className="name_production">{product.name}</h1>
          <p className="price_production">{product.price}</p>
          <p
            style={{ marginTop: "10px", marginBottom: "0px" }}
            className="color_production"
          >
            <p>Chọn màu</p>
            {product.color && (
              <ul className="select_product_color">
                {product.color.map((color, index) => {
                  return (
                    <p
                      key={color}
                      onMouseEnter={() => {
                        //Sự kiện được kích hoạt khi con trỏ chuột đi vào phần tử.
                        const newBorder = [...isHoveredColor];
                        newBorder[index] = true;
                        setIsHoveredColor(newBorder);
                      }}
                      onMouseLeave={() => {
                        //Sự kiện được kích hoạt khi con trỏ chuột ra khỏi phần tử.
                        const newBorder = [...isHoveredColor];
                        newBorder[index] = false;
                        setIsHoveredColor(newBorder);
                      }}
                      style={{
                        borderBottom: isHoveredColor[index]
                          ? "2px solid #000"
                          : "none",
                      }}
                    >
                      {color}
                    </p>
                  );
                })}
              </ul>
            )}
          </p>

          <p style={{ marginTop: "0px" }} className="size_production">
            <p>Chọn size</p>
            {product.size && (
              <ul className="select_product_size">
                {product.size.map((size, index) => {
                  return (
                    <p
                      key={size}
                      onMouseEnter={() => {
                        //Sự kiện được kích hoạt khi con trỏ chuột đi vào phần tử.
                        const newBorder = [...isHoveredSize];
                        newBorder[index] = true;
                        setIsHoveredSize(newBorder);
                      }}
                      onMouseLeave={() => {
                        //Sự kiện được kích hoạt khi con trỏ chuột ra khỏi phần tử.
                        const newBorder = [...isHoveredSize];
                        newBorder[index] = false;
                        setIsHoveredSize(newBorder);
                      }}
                      style={{
                        borderBottom: isHoveredSize[index]
                          ? "2px solid #000"
                          : "none",
                      }}
                    >
                      {size}
                    </p>
                  );
                })}
              </ul>
            )}
          </p>

          <p style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "15px", marginBottom: "0px" }}>Số lượng</p>
            <QuantityButton onChange={handleQuantityChange} />
          </p>

          <button className="add_to_cart" style={{ marginTop: "30px" }}>
            <Cart style={{ marginRight: "5px" }} />
            <p style={{ marginBottom: "0px" }}>Thêm vào giỏ hàng</p>
          </button>

          <button
            className="check_out_cart"
            style={{
              marginTop: "17px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            Mua ngay
          </button>

          <p style={{ marginTop: "15px" }} className="product_bonus">
            <CreditCard style={{ marginRight: "5px" }} />
            <p style={{ marginBottom: "0px" }}>
              Đa dạng phương thức thanh toán
            </p>
          </p>
          <p
            style={{
              width: "90%",
              height: "0.2px",
              backgroundColor: "gray",
              opacity: "0.3",
            }}
          ></p>
          <p className="product_bonus">
            <ArrowRepeat style={{ marginRight: "5px" }} />
            <p style={{ marginBottom: "0px" }}>
              Đổi hàng miễn phí lên đến 30 ngày
            </p>
          </p>
          <p
            style={{
              width: "90%",
              height: "0.2px",
              backgroundColor: "gray",
              opacity: "0.3",
            }}
          ></p>
        </div>
      </div>

      {/* Product Description */}
      <div style={{ marginBottom: "60px", marginTop: "30px" }}>
        <p style={{ fontWeight: "600", fontSize: "18px" }}>
          Thông tin sản phẩm
        </p>
        <p
          style={{
            width: "100%",
            height: "0.7px",
            backgroundColor: "gray",
            opacity: "0.5",
          }}
        ></p>
        <p>{splitStrings[0]}</p>
        <p>THIẾT KẾ:</p>
        <p>
          {substringDesign.map((substring, index) => {
            return <p key={index}>{substring}</p>;
          })}
        </p>
        <p>CHẤT LIỆU:</p>
        <p>
          {substringMaterial.map((substring, index) => {
            return <p key={index}>{substring}</p>;
          })}
        </p>
      </div>
    </DefaultLayoutDetail>
  ) : (
    "No product matched/found!"
  );
};

export default ProductDetail;
