import DefaultLayout from "../layouts/DefaultLayout";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../layouts/Loader";
import { convertToCurrencyFormat } from "../Custom/CustomFunction";
const Ao = () => {
  const [originalProduct, setOriginalProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [listShirtCategories, setListShirtCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:9999/api/products").then((res) => res.json()),
      fetch("http://localhost:9999/api/categories").then((res) => res.json()),
    ])
      .then(([productData, categoryData]) => {
        const listShirt = productData.filter((shirt) => shirt.catId === 1);
        setOriginalProduct(listShirt);
        setFilteredProduct(listShirt);
        setListShirtCategories(categoryData[0].detail);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  const handleClick = (nameString) => {
    const filtered = originalProduct.filter(({ name }) =>
      name.toLowerCase().includes(nameString.toLowerCase())
    );
    setFilteredProduct(filtered);
  };

  const handleMouseEnter = (event, product) => {
    event.currentTarget.getElementsByTagName("img")[0].src = product.blurImg;
  };

  const handleMouseLeave = (event, product) => {
    event.currentTarget.getElementsByTagName("img")[0].src = product.img;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <DefaultLayout className="container border-0">
          <div className="Product-content">
            <h2>ÁO</h2>
            {listShirtCategories.map((category, index) => (
              <button key={index} onClick={() => handleClick(category)}>
                {category}
              </button>
            ))}
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
                  <Card className="card-content" style={{ height: "400px" }}>
                    <div className="blurry-image">
                      <Link to={`/product/detail/${product.id}`}>
                        <Card.Img src={product.img} />
                      </Link>
                    </div>
                    <Card.Body>
                      <Link to={`/product/detail/${product.id}`}>
                        <Card.Text style={{ fontWeight: "500" }}>
                          {product.name}
                        </Card.Text>
                      </Link>
                      <Card.Title>{convertToCurrencyFormat(product.price)}</Card.Title>
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        </DefaultLayout>
      )}
    </>
  )
  
};


export default Ao;
