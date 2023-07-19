import { Button, Form, InputGroup, Table } from "react-bootstrap";
import DefaultLayout from "../layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dash, Plus } from "react-bootstrap-icons";
import Loader from "../layouts/Loader";
import { convertToCurrencyFormat } from "../Custom/CustomFunction";

const Cart = () => {
  const [mergeProducts, setMergeProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation = useNavigate();
  const [carts,setCarts] =useState();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("UserID"))
      ? JSON.parse(localStorage.getItem("UserID"))
      : { id: "PUBLIC_USER" }
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:9999/api/carts").then((res) => res.json()),
      fetch("http://localhost:9999/api/products").then((res) => res.json()),
    ])
      .then(([cartsData, productsData]) => {
        const listCart = cartsData.filter((cart) => cart.userId == user.id)[0];
        const foundProduct = productsData;
        const mergedCart = listCart
        ? listCart.products
            .map((item) => {
              const product = foundProduct.find((p) => p.id === item.productId);
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
        setCarts(cartsData);
        setMergeProducts(mergedCart);
        setTotalPrice(
          mergedCart.reduce(function (acc, product) {
            var price = parseFloat(product.price.replace(/\D/g, ""));
            return acc + price * product.quantity;
          }, 0)
        );
        setLoading(false); 
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false); 
      });
  }, []);


  const handleUpdateCart = (operator, productId, quantity) => {
    var updatedCart;
    if (operator === "+") {
      updatedCart = mergeProducts.map((product) => {
        if (product.productId === productId) {
          return { ...product, quantity: quantity + 1 };
        }
        return product;
      });
    } else if (operator === "-") {
      updatedCart = mergeProducts.map((product) => {
        if (product.productId === productId) {
          if (quantity === 1) {
            return { ...product, quantity: 1 };
          }
          return { ...product, quantity: quantity - 1 };
        }
        return product;
      });
    }
    let lmeo = updatedCart.map((cartupdate) => {
      return {
        productId: cartupdate.productId,
        quantity: cartupdate.quantity,
        size: cartupdate.size,
        color: cartupdate.color,
      };
    });
    const setUpdatedData = carts.map(
      (data) => {
        if (data.userId == user.id) {
          return {
            ...data,
            products: lmeo,
          };
        }
        return data;
      }
    );
    fetch('http://localhost:9999/api/carts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(setUpdatedData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    setMergeProducts(updatedCart);
    setTotalPrice(
      updatedCart.reduce(function (acc, product) {
        var price = parseFloat(product.price.replace(/\D/g, ""));
        return acc + price * product.quantity;
      }, 0)
    );
  };

  const handleDeleteProductInCart = (id) => {
    const result = window.confirm("Bạn có chắc chắn muốn tiếp tục?");
    if (result) {
      let mergeProductsUpdated = mergeProducts.filter(function (product) {
        return product.productId !== id;
      });
      setMergeProducts(mergeProductsUpdated);
      setTotalPrice(
        mergeProductsUpdated.reduce(function (acc, product) {
          var price = parseFloat(product.price.replace(/\D/g, ""));
          return acc + price * product.quantity;
        }, 0)
      );
      let updatedData = carts.map(function (
        item
      ) {
        if (item.userId == user.id) {
          const updatedProducts = item.products.filter(function (product) {
            return product.productId !== id;
          });

          return {
            userId: item.userId,
            products: updatedProducts,
          };
        }

        return item;
      });
      fetch('http://localhost:9999/api/carts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <>
    {loading ? (
      <Loader />
    ) : (
    <DefaultLayout className="container border-0">
      <div
        className="row"
        style={{
          paddingTop: "23px",
          borderTop: "solid 1px black",
          paddingBottom: "150px",
        }}
      >
        <div className="col-8">
          <div className="heading_layout_other">
            <h2>GIỎ HÀNG CỦA BẠN ({mergeProducts.length})</h2>
          </div>
          <Table className="cart-table">
            <tbody>
              {mergeProducts.map((mergedCart, index) => (
                <tr key={index}>
                  <td width="180px">
                    <Link to={`/product/detail/${mergedCart.productId}`}>
                      <img
                        src={`${mergedCart.img}`}
                        className="img_prd_cart"
                        alt={`${mergedCart.productId}`}
                        style={{
                          display: "inline-block",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Link>
                  </td>
                  <td>
                    <div className="info-production">
                      <h3 className="name_production">
                        <p
                          onClick={() => {
                            navigation(
                              `/product/detail/${mergedCart.productId}`
                            );
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {mergedCart.name}
                        </p>
                      </h3>
                      <div>
                        <div className="chooseSize-group">
                          <span className="btn-chooseSize">
                            {mergedCart.color} / {mergedCart.size} <i></i>
                          </span>
                          {/* ... */}
                        </div>
                      </div>
                      <div className="option_production">
                        <div className="option_production-number">
                          <InputGroup>
                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                handleUpdateCart(
                                  "-",
                                  mergedCart.productId,
                                  mergedCart.quantity
                                )
                              }
                            >
                              <Dash style={{ color: "black" }} />
                            </Button>
                            <Form.Control
                              type="text"
                              className="quantity"
                              value={mergedCart.quantity}
                              onChange={() => {}}
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={() =>
                                handleUpdateCart(
                                  "+",
                                  mergedCart.productId,
                                  mergedCart.quantity
                                )
                              }
                            >
                              <Plus style={{ color: "black" }} />
                            </Button>
                          </InputGroup>
                        </div>
                        <span
                          className="btn-delete-item"
                          onClick={() => {
                            handleDeleteProductInCart(mergedCart.productId);
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.cursor = "pointer";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.cursor = "auto";
                          }}
                        >
                          Xóa
                        </span>
                      </div>
                    </div>
                  </td>
                  <td width="150px" style={{ verticalAlign: "top" }}>
                    <div className="product-price">{convertToCurrencyFormat(mergedCart.price)}</div>
                  </td>
                  <td style={{ verticalAlign: "top" }}>
                    <span className="btn-favorite " data-id="4063">
                      <i></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="col-4">
          <div className="box_order_cart">
            <div className="box_order_cart__price">
              <ul>
                <li
                  style={{
                    listStyleType: "none",
                    fontSize: "larger",
                    fontWeight: "57-",
                  }}
                >
                  <span className="tille">Tạm tính:</span>
                  <span className="price black">
                    {convertToCurrencyFormat(totalPrice)}
                  </span>
                </li>
              </ul>
            </div>
            <div className="note_footer">
              <p>
                <strong>Miễn phí</strong> vận chuyển cho đơn hàng từ{" "}
                <strong>500k</strong>
              </p>
            </div>

            <Button
              type="button"
              className="btn btn-default-black btn_buy_now"
              variant="dark"
              onClick={() => {
                navigation("/order");
              }}
              style={{ padding: "11px" }}
            >
              TIẾN HÀNH ĐẶT HÀNG ({mergeProducts.length})
            </Button>
            <p>
              <strong>Ưu đãi hội viên</strong>
            </p>
            <p>
              Tích điểm đổi quà và rất nhiều ưu đãi đặc biệt khác, chỉ dành cho
              hội viên của Aristino.
            </p>
          </div>
        </div>
      </div>
      ;
    </DefaultLayout>
    )}
    </>
  );
};

export default Cart;
