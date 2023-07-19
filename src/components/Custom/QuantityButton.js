import React, { useState } from "react";

const QuantityButton = ({ onChange }) => {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState({
    decrement: false,
    increment: false, 
  });

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    onChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      onChange(quantity - 1);
    }
  };

  return (
    <div style={{ maxWidth: "150px", position: "relative", width: "100%" }}>
      <button
        style={{
          backgroundColor: isHovered.decrement ? "black" : "white",
          color: isHovered.decrement ? "white" : "black",
          padding: "7px 14px",
        }}
        onMouseEnter={() => {
          setIsHovered((prevIsHovered) => ({
            ...prevIsHovered,
            decrement: true,
          }));
        }}
        onMouseLeave={() => {
          setIsHovered((prevIsHovered) => ({
            ...prevIsHovered,
            decrement: false,
          }));
        }}
        onClick={handleDecrement}
      >
        -
      </button>
      <span style={{ padding: "7px 14px" }}>{quantity}</span>
      <button
        style={{
          backgroundColor: isHovered.increment ? "black" : "white",
          color: isHovered.increment ? "white" : "black",
          padding: "7px 14px",
        }}
        onMouseEnter={() => {
          setIsHovered((prevIsHovered) => ({
            ...prevIsHovered,
            increment: true,
          }));
        }}
        onMouseLeave={() => {
          setIsHovered((prevIsHovered) => ({
            ...prevIsHovered,
            increment: false,
          }));
        }}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;
