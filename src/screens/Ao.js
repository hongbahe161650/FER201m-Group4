import DefaultLayout from "../layouts/DefaultLayout";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import data from "../data/database.json";

const Ao = () => {
  const [originalProduct, setOriginalProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    setOriginalProduct(data.product);
    setFilteredProduct(data.product);
  }, []);

  const filterByName = (nameString) => {
    const filtered = originalProduct.filter(({ name }) =>
      name.toLowerCase().includes(nameString.toLowerCase())
    );
    setFilteredProduct(filtered);
  };

  const handleClick = (name) => {
    filterByName(name);
  };

  const handleMouseEnter = (event, product) => {
    event.currentTarget.getElementsByTagName("img")[0].src = product.blurImg;
  };

  const handleMouseLeave = (event, product) => {
    event.currentTarget.getElementsByTagName("img")[0].src = product.img;
  };

  return (
    <DefaultLayout className="container">
      <div className="Product-content">
        <h2>ÁO</h2>
        <button onClick={() => handleClick("Áo Sơ Mi")}>Áo Sơ Mi</button>
        <button onClick={() => handleClick("Áo Polo")}>Áo Polo</button>
        <button onClick={() => handleClick("Áo Khoác")}>Áo Khoác</button>
        <button onClick={() => handleClick("Áo Len")}>Áo Len</button>
      </div>
      <br />
      <div className="row">
        {filteredProduct
          .filter((product) =>
            product.name.toLowerCase().includes("Áo".toLowerCase())
          )
          .map((product) => (
            <div
              key={product.id}
              className="col-md-3"
              onMouseEnter={(event) => handleMouseEnter(event, product)}
              onMouseLeave={(event) => handleMouseLeave(event, product)}
            >
              <Card className="card-content">
                <div className="blurry-image">
                  <Card.Img  src={product.img} />
                </div>
                <Card.Body>
                  <Card.Text style={{ fontWeight: "500" }}>
                    {product.name}
                  </Card.Text>
                  <Card.Title>{product.price}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </DefaultLayout>
  );
};

export default Ao;
