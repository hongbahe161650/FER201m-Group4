import DefaultLayout from "../layouts/DefaultLayout";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import data from "../data/database.json";
import { Container, Row, Col } from "react-bootstrap";

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
    <DefaultLayout>
      <Container>
        <div className="button-container">
          <button className="button-style" onClick={() => handleClick("short")}>
            Quần Short
          </button>
          <button className="button-style" onClick={() => handleClick("âu")}>
            Quần Âu
          </button>
          <button className="button-style" onClick={() => handleClick("jean")}>
            Quần Jean
          </button>
        </div>
        <Row>
          {filteredProduct
            .filter((product) =>
              product.name.toLowerCase().includes("Quần".toLowerCase())
            )
            .map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="card-content">
                  <div
                    className="blurry-image"
                    onMouseEnter={(event) => handleMouseEnter(event, product)}
                    onMouseLeave={(event) => handleMouseLeave(event, product)}
                  >
                    <Card.Img
                      onClick={() =>
                        (window.location.href = `product/detail/${product.id}`)
                      }
                      src={product.img}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Text
                      onClick={() =>
                        (window.location.href = `product/detail/${product.id}`)
                      }
                      style={{ fontWeight: "500", cursor: "pointer" }}
                    >
                      {product.name}
                    </Card.Text>
                    <Card.Title>{product.price}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default Ao;
