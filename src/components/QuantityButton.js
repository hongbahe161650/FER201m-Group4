import React, { useState } from "react";

const QuantityButton = ({ onChange}) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    onChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onChange(quantity - 1);
    }
  };

  return (
    <div style={{maxWidth: '150px', position: 'relative', width: '100%'}}>
      <button style={{backgroundColor: 'white', padding: '7px 14px'}}  onClick={handleDecrement}>-</button>
      <span style={{padding: '7px 14px'}}>{quantity}</span>
      <button style={{backgroundColor: 'white', padding: '7.1px 12.5px'}}  onClick={handleIncrement}>+</button>
    </div>
  );
};

export default QuantityButton;
