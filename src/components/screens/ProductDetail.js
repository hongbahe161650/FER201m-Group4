import DefaultLayoutDetail from "../layouts/DefaultLayoutDetail";
import "../styles/DefaultLayoutStyle.css";
import { React, useEffect, useState } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import QuantityButton from "../Custom/QuantityButton";
import { Cart, Dash, Plus } from "react-bootstrap-icons";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import {
  Button,
  Card,
  Container,
  FormControl,
  InputGroup,
  ListGroup,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import OffCanvas from "react-bootstrap/Offcanvas";
import NotFound from "../layouts/NotFound";
import ToastComponent from "../Custom/Toast";
import Loader from "../layouts/Loader";
import { convertToCurrencyFormat } from "../Custom/CustomFunction";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cartList, setCartList] = useState([]);
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("UserID"))
      ? JSON.parse(localStorage.getItem("UserID"))
      : { id: "PUBLIC_USER" }
  );
  const navigation = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);
    
  const handleToggleToast = () => {
    setShowToast(!showToast);
  };
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:9999/api/carts").then((res) => res.json()),
      fetch("http://localhost:9999/api/products").then((res) => res.json()),
    ])
      .then(([cartsData, productsData]) => {
        const listCart = cartsData.filter((cart) => cart.userId == user.id)[0];
        const mergedCart = listCart
          ? listCart.products
              .map((item) => {
                const product = productsData.find(
                  (p) => p.id === item.productId
                );
                if (product) {
                  return {
                    ...item,
                    name: product.name,
                    price: product.price,
                    img: product.img,
                    blurImg: product.blurImg,
                  };
                }
                return null;
              })
              .filter((item) => item !== null)
          : [];
        let foundProduct = productsData.find(
          (product) => product.id === parseInt(id)
        );
        setCarts(cartsData);
        scrollToTop();
        setProduct(foundProduct ? foundProduct : {});
        setCartList(mergedCart ? mergedCart : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);
  //hover and click size and color properties
  const [hoveredColor, setHoveredColor] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [hoveredSize, setHoveredSize] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  //Cắt chuỗi description
  const description = product && product.description ? product.description : "";
  const splitStrings = description.split(/THIẾT KẾ:|CHẤT LIỆU:/);
  const substringDesign = splitStrings[1] ? splitStrings[1].split("\n") : [];
  const substringMaterial = splitStrings[2] ? splitStrings[2].split("\n") : [];

  //Canvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setTimeout(() => {
      const navElement = document.querySelector(".nav");
      const offcanvasElement = document.querySelector(".offcanvas");
      if (offcanvasElement) {
        navElement.style.zIndex = "1";
      }
    }, 50);
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  //HIỂN THỊ CART
  const handleAddToCart = (flag) => {
    if (!selectedColor || !selectedSize) {
      handleToggleToast();

      return;
    }
    const index = cartList.findIndex(
      (product) =>
        product.productId == id &&
        product.color == selectedColor &&
        product.size == selectedSize
    );
    let newCart;
    if (index !== -1) {
      cartList[index].quantity += quantity;
      setCartList(cartList);
    } else {
      newCart = {
        productId: product.id,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
        name: product.name,
        price: product.price,
        img: product.img,
        blurImg: product.blurImg,
      };
      cartList.push(newCart);
      setCartList(cartList);
    }
    const filteredObjects = cartList.map(
      ({ productId, color, size, quantity }) => ({
        productId,
        color,
        size,
        quantity,
      })
    );
    const updatedUserData = {
      id: carts.length + 1,
      userId: user.id,
      products: filteredObjects,
    };
    let temp = true;
    const updatedData = carts.map(function (item) {
      if (item.userId == updatedUserData.userId) {
        temp = false;
        return updatedUserData;
      }
      return item;
    });
    if (temp) {
      updatedData.push(updatedUserData);
    }
    fetch("http://localhost:9999/api/carts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (flag === "addToCart") {
          handleShow();
        } else if (flag === "buyNow") {
          navigation('/cart')
        }
      })
      .catch((error) => {
        console.error(error);
      });

  };
  // PRODUCT DETAIL

  //Click ảnh thumbnail -> hiện ảnh carousel tương ứng
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoverThumbnail, setIsHoveredThumbnail] = useState([]);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    setIsHoveredThumbnail(
      Array(product.img?.length || 0)
        .fill(false)
        .map((val, i) => i === index)
    );
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  const handleDelteCartProduct = (id, color, size) => {
    const filteredArray = cartList.filter((item) => {
      return (
        item.productId !== id || item.size !== size || item.color !== color
      );
    });
    setCartList(filteredArray);
    let updatedData = carts.map(function (item) {
      if (item.userId === user.id) {
        const updatedProducts = item.products.filter(function (product) {
          return (
            product.productId !== id ||
            product.color !== color ||
            product.size !== size
          );
        });

        return {
          userId: item.userId,
          products: updatedProducts,
        };
      }
      return item;
    });
    fetch("http://localhost:9999/api/carts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <>
      {loading ? (
        <Loader />
      ) : product != undefined ? (
        <div className="container border-0">
          <DefaultLayoutDetail>
            <OffCanvas
              show={show}
              onHide={handleClose}
              placement="end"
              style={{ width: "450px" }}
            >
              <OffCanvas.Header
                closeButton
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.2)",
                  fontWeight: 600,
                }}
              >
                <OffCanvas.Title>GIỎ HÀNG</OffCanvas.Title>
              </OffCanvas.Header>
              <OffCanvas.Body>
                <Card>
                  <Card.Body>
                    <div className="list_product_cart__scroll">
                      <ListGroup className="list_product_cart">
                        {cartList.map((cart, index) => (
                          <ListGroup.Item
                            style={{ display: "flex" }}
                            key={index}
                          >
                            <Image
                              src={cart.img}
                              alt={cart.name}
                              style={{ width: "40%", height: "40%" }}
                            />
                            <div
                              className="list_product_cart__info"
                              style={{ paddingLeft: "20px" }}
                            >
                              <h3
                                style={{
                                  fontWeight: "500",
                                  fontSize: "16px",
                                  lineHeight: "20px",
                                }}
                              >
                                {cart.name}
                              </h3>
                              <p>
                                {cart.color} / {cart.size}
                              </p>
                              <div
                                className="option_production"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-around",
                                }}
                              >
                                <div className="option_production-number">
                                  <InputGroup>
                                    <Button variant="outline-secondary">
                                      <Dash size={20} color="black" />
                                    </Button>
                                    <FormControl
                                      type="text"
                                      className="form-control quantity"
                                      value={cart.quantity}
                                      style={{ width: "44px" }}
                                      onChange={() => {}}
                                    />
                                    <Button variant="outline-secondary">
                                      <Plus size={20} color="black" />
                                    </Button>
                                  </InputGroup>
                                </div>
                                <span
                                  className="btn-delete-item"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handleDelteCartProduct(
                                      cart.productId,
                                      cart.color,
                                      cart.size
                                    )
                                  }
                                >
                                  Xóa
                                </span>
                              </div>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                  </Card.Body>
                  <Card.Footer fixed="bottom">
                    <Link to="/cart">
                      <Button>Mua Ngay</Button>
                    </Link>
                  </Card.Footer>
                </Card>
              </OffCanvas.Body>
            </OffCanvas>
            <div>
              <ToastComponent
                message="Vui lòng chọn size và color"
                showToast={showToast}
                handleCloseToast={handleToggleToast}
              />
            </div>
            <div className="row" style={{ marginTop: "60px" }}>
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
                            border: isHoverThumbnail[0]
                              ? "2px solid #000"
                              : "none",
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
                            border: isHoverThumbnail[1]
                              ? "2px solid #000"
                              : "none",
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
                  style={{ width: "100%" }}
                >
                  <Carousel.Item>
                    <img
                      style={{ width: "100%" }}
                      src={product.img}
                      alt={product.name}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      style={{ width: "100%" }}
                      src={product.blurImg}
                      alt={product.name}
                    />
                  </Carousel.Item>
                </Carousel>
              </div>

              <div className="col-4" style={{ marginTop: "25px" }}>
                <h1 className="name_production">{product.name}</h1>
                <p className="price_production">{convertToCurrencyFormat(product.price)}</p>
                <p
                  style={{ marginTop: "10px", marginBottom: "0px" }}
                  className="color_production"
                >
                  <p>Chọn màu</p>
                  {product && product.color && (
                    <ul className="select_product_color">
                      {product.color.map((color) => {
                        return (
                          <p
                            key={color}
                            onMouseEnter={() => {
                              setHoveredColor(color);
                            }}
                            onMouseLeave={() => {
                              setHoveredColor(null);
                            }}
                            onClick={() => {
                              setSelectedColor(color);
                            }}
                            style={{
                              borderBottom:
                                hoveredColor === color ||
                                selectedColor === color
                                  ? "2px solid black"
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

                <div style={{ marginTop: "0px" }} className="size_production">
                  <pre>Chọn size</pre>
                  {product && product.size && (
                    <ul className="select_product_size">
                      {product.size.map((size) => {
                        return (
                          <p
                            key={size}
                            onMouseEnter={() => {
                              setHoveredSize(size);
                            }}
                            onMouseLeave={() => {
                              setHoveredSize(null);
                            }}
                            onClick={() => {
                              setSelectedSize(size);
                            }}
                            style={{
                              borderBottom:
                                hoveredSize === size || selectedSize === size
                                  ? "2px solid black"
                                  : "none",
                            }}
                          >
                            {size}
                          </p>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <p style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ marginRight: "15px", marginBottom: "0px" }}>
                    Số lượng
                  </p>
                  <QuantityButton onChange={handleQuantityChange} />
                </p>

                <div>
                  <Button
                    onClick={() => handleAddToCart("addToCart")}
                    className="add_to_cart"
                    style={{ marginTop: "30px" }}
                  >
                    <Cart style={{ marginRight: "5px" }} />
                    <p style={{ marginBottom: "0px" }}>Thêm vào giỏ hàng</p>
                  </Button>
                </div>

                <Button
                  onClick={() => handleAddToCart("buyNow")}
                  className="check_out_cart"
                  style={{
                    marginTop: "17px",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  Mua ngay
                </Button>
              </div>
            </div>

            <div
              style={{
                marginBottom: "60px",
                marginTop: "30px",
                padding: "25px",
              }}
            >
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
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ProductDetail;
