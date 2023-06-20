import DefaultLayoutDetail from "../layouts/DefaultLayoutDetail";
import "../styles/DefaultLayoutStyle.css";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuantityButton from "../components/QuantityButton";
import { Cart, CreditCard, Repeat, XLg } from "react-bootstrap-icons";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  //khởi tạo 1 state cartItems chứa các sản phẩm trong giỏ hàng
  const [cartItems, setCartItems] = useState([]);

  //
  const [showCart, setShowCart] = useState(true);

  //
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  //
  const [price, setPrice] = useState(0);

  //remove sản phẩm trong cart
  const handleRemove = (id) => {
    const arr = cartItems.filter((item) => item.id !== id);
    setCartItems(arr);
    // handlePrice();
  }

  //
  useEffect(() => {
    fetch("http://localhost:9999/product")
      .then((res) => res.json())
      .then((result) => {
        const fetChedProduct = result.find((item) => item.id === parseInt(id));
        if (fetChedProduct) {
        setProduct(fetChedProduct);
        setPrice(parseInt(fetChedProduct.price.replace(/[^0-9.-]+/g,"")));
        }
      });
  }, [id]);

  //
  useEffect(() => {
    if (product.price) {
      setPrice(Number(product.price));
    }
  }, [product]);

  //giá sản phẩm
  const handlePrice = () => {
    let ans = 0;
    cartItems.forEach((item) => {
      const itemPrice = parseInt(item.price.replace(/[^0-9.-]+/g,""));
      const itemAmount = Number(item.amount);
      if (!isNaN(itemPrice) && !isNaN(itemAmount)) {
        ans += itemPrice * itemAmount;
      }
    });
    setPrice(ans);
  };  

  useEffect(() => {
    handlePrice();
  }, [cartItems]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    fetch("http://localhost:9999/product")
      .then((res) => res.json())
      .then((result) => {
        const selectedItem = result.find((item) => item.id === parseInt(id) && item.color.includes(color) && item.size.includes(selectedSize));
        if (selectedItem) {
        setProduct(selectedItem);
        setPrice(parseInt(selectedItem.price.replace(/[^0-9.-]+/g,"")));
        }
      });
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    fetch("http://localhost:9999/product")
      .then((res) => res.json())
      .then((result) => {
        const selectedItem = result.find((item) => item.id === parseInt(id) && item.color.includes(selectedColor) && item.size.includes(size));
        if (selectedItem) {
        setProduct(selectedItem);
        setPrice(parseInt(selectedItem.price.replace(/[^0-9.-]+/g,"")));
        }
      });
  };

  //hàm kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
  const isItemInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  //
  const handleChange = (item, d) => {
    const arr = [...cartItems];
    const ind = arr.indexOf(item);
    arr[ind] = {...arr[ind]};
    arr[ind].amount += d;

    if (arr[ind].amount === 0) {
        arr[ind].amount = 1;
    }
    setCartItems(arr);
  }

  //
  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Vui lòng chọn color và size!");
      return;
    }
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      color: selectedColor,
      size: selectedSize,
      amount: 1,
    };
    const itemIndex = cartItems.findIndex(
      (item) =>
        item.id === product.id &&
        item.color === selectedColor &&
        item.size === selectedSize
    );
    if (itemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[itemIndex].amount += 1;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, newItem]);
    }
    handlePrice();
    setShowCart(true);
  };

  //HIỂN THỊ CART
  const renderCart = () => {
    return (
      <div className="product_cart">
        <div style={{ display: "flex" }}>
          <h5 style={{ paddingRight: "250px" }}>GIỎ HÀNG</h5>
          <XLg onClick={() => setShowCart(false)} style={{ fontSize: "20px" }} />
        </div>
        <p
          style={{
            width: "100%",
            height: "0.7px",
            backgroundColor: "gray",
            opacity: "0.5",
          }}
        ></p>

        {cartItems.map((item) => (
          <div className="row" key={item.id}>
            <div className="col-4">
              <img height={"150px"} src={item.img} thumbnail alt={item.name} />
            </div>
            <div
              style={{ paddingLeft: "60px", marginTop: "20px" }}
              className="col-8"
            >
              <h6>{item.name}</h6>
              <p>
                {item.color} / {item.size}
              </p>
              <div style={{ display: "flex" }}>
                {/* <QuantityButton onChange={handleQuantityChange} /> */}
                <div style={{maxWidth: '150px', position: 'relative', width: '100%'}}>
                <button style={{backgroundColor: 'white', padding: '7px 14px'}} onClick={() => handleChange(item, -1)}>-</button>
                <span style={{padding: '7px 14px'}}>{item.amount}</span>
                <button style={{backgroundColor: 'white', padding: '7.1px 12.5px'}} onClick={() => handleChange(item, 1)}>+</button>
                </div>
                <p onClick={() => handleRemove(item.id)} style={{ marginTop: "8px" }}>Xoá</p>
              </div>
            </div>

            <p
              style={{
                marginTop: "310px",
                width: "100%",
                height: "0.7px",
                backgroundColor: "gray",
                opacity: "0.5",
              }}
            ></p>

            <div className="row cart_total">
              <h6 style={{ paddingBottom: "10px", paddingRight: "250px" }}>
                Tạm tính
              </h6>
              {/* price */}
              <h6>${price}</h6>
              
              <p
                style={{
                  width: "90%",
                  height: "1.2px",
                  backgroundColor: "gray",
                  opacity: "0.4",
                }}
              ></p>
              <button
                onClick={() => handleAddToCart(product)}
                className="add_to_cart"
              >
                <Cart style={{ marginRight: "5px" }} />
                <p style={{ marginBottom: "0px" }}>Đi tới giỏ hàng</p>
              </button>
              <button
                className="check_out_cart"
                style={{
                  marginTop: "17px",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                MUA NGAY
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // PRODUCT DETAIL
  //Cắt chuỗi description
  const description = product && product.description ? product.description : "";
  const splitStrings = description.split(/THIẾT KẾ:|CHẤT LIỆU:/);
  const substringDesign = splitStrings[1] ? splitStrings[1].split("\n") : [];
  const substringMaterial = splitStrings[2] ? splitStrings[2].split("\n") : [];

  //bắt sự kiện con trỏ chuột
  const [isHoveredColor, setIsHoveredColor] = useState([]);
  const [isHoveredSize, setIsHoveredSize] = useState([]);

  //set số lượng của quantityButton
  const [quantity, setQuantity] = useState(1);

  //Click ảnh thumbnail -> hiện ảnh carousel tương ứng
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoverThumbnail, setIsHoveredThumbnail] = useState([]);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    // setIsHoveredThumbnail(true);
    setIsHoveredThumbnail(
      Array(product.img?.length || 0)
        .fill(false)
        .map((val, i) => i === index)
    );
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  useEffect(() => {
    if (product && product.color) {
      setIsHoveredColor(Array(product.color?.length || 0).fill(false));
    }
  }, [product]);

  useEffect(() => {
    if (product && product.size) {
      setIsHoveredSize(Array(product.size?.length || 0).fill(false));
    }
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
                    // ảnh nhỏ
                    thumbnail
                    onClick={() => handleThumbnailClick(0)}
                    index={0}
                    style={{
                      border: isHoverThumbnail[0] ? "2px solid #000" : "none",
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
                      border: isHoverThumbnail[1] ? "2px solid #000" : "none",
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
            {product && product.color && (
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
                        border: selectedColor === color,
                        borderBottom: isHoveredColor[index]
                          ? "2px solid #000"
                          : "none",
                      }}
                      onClick={() => handleColorSelect(color)}
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
            {product && product.size && (
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
                        borderBottom: selectedSize === size,
                        borderBottom: isHoveredSize[index]
                          ? "2px solid #000"
                          : "none",
                      }}
                      onClick={() => handleSizeSelect(size)}
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

          <div>
            <button
              onClick={() => handleAddToCart(product)}
              className="add_to_cart"
              style={{ marginTop: "30px" }}
            >
              <Cart style={{ marginRight: "5px" }} />
              <p style={{ marginBottom: "0px" }}>Thêm vào giỏ hàng</p>
            </button>
            {cartItems.length > 0 && renderCart()}
          </div>

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
            <Repeat style={{ marginRight: "5px" }} />
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

      {/* PRODUCT DESCRIPTION */}
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
