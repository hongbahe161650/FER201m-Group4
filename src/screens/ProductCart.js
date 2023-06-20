import DefaultLayoutDetail from "../layouts/DefaultLayoutDetail";
import "../styles/DefaultLayoutStyle.css";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuantityButton from "../components/QuantityButton";
import { Cart, CreditCard, Repeat, XLg } from "react-bootstrap-icons";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
 
 const renderCart = () => {
    const [price, setPrice] = useState(0);

    //remove sản phẩm trong cart
    const handleRemove = (id) => {
    const arr = cartItems.filter((item) => item.id !== id);
    setCartItems(arr);
    handlePrice();
  }

  //giá sản phẩm
    const handlePrice = () => {
    let ans = 0;
    cartItems.map((item) => (ans += item.price * item.quantity));
    setPrice(ans);
  }

    useEffect(() => {
        handlePrice();
    });

    return (
      <div className="product_cart">
        <div style={{ display: "flex" }}>
          <h5 style={{ paddingRight: "250px" }}>GIỎ HÀNG</h5>
          <XLg style={{ fontSize: "20px" }} />
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
                <span style={{padding: '7px 14px'}}>{quantity}</span>
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

  export default renderCart;
