import { useEffect, useState } from "react";
import NotFound from "../layouts/NotFound";
import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";
import Loader from "../layouts/Loader";
import Pagination from "../Custom/Pagination";
import { convertToCurrencyFormat } from "../Custom/CustomFunction";

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [clickedOrder, setClickedOrder] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("UserID"))
      ? JSON.parse(localStorage.getItem("UserID")).isAdmin
      : false
  );
  const [resultString, setResultString] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:9999/api/orders").then((res) => res.json()),
      fetch("http://localhost:9999/api/products").then((res) => res.json()),
    ])
      .then(([cartsData, productsData]) => {
        fetchData();
        setProducts(productsData);
        setTotalPages(Math.ceil(cartsData.length / 10));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    fetch(`http://localhost:9999/api/orders?_page=${currentPage}&_limit=10`)
      .then((response) => {
        const totalCount = parseInt(response.headers.get("X-Total-Count"));
        setTotalPages(Math.ceil(totalCount / 10));
        return response.json();
      })
      .then((json) => {
        setOrders(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (page) => {
    fetchData();
    setCurrentPage(page);
  };

  const OrderInfoRow = ({ order, index }) => {
    const { id, userId, email, products, total, status, timestamp } = order;

    return (
      <tr
        id={`order${id}`}
        key={index}
        style={{ cursor: "pointer" }}
        onClick={() => handleShowOrderInfo(id)}
      >
        <td>{id}</td>
        <td>{userId}</td>
        <td>{email}</td>
        <td>{products.length}</td>
        <td>{convertToCurrencyFormat(total)}</td>
        <td>{status}</td>
        <td>{timestamp}</td>
      </tr>
    );
  };
  const handleShowOrderInfo = async (id) => {
    await setClickedOrder(orders.find((order) => order.id == id));
    handleShow();
  };
  useEffect(() => {
    if (clickedOrder) {
      console.log(clickedOrder,clickedOrder.products)
      setResultString(
        clickedOrder.products
          ? clickedOrder.products
              .map((product1) => {
                const product2 = products.find(
                  (product) => product.id == product1.productId
                );
                if (product2) {
                  return `${product2.name} - Quantity: ${product1.quantity}`;
                }
                return "";
              })
              .join("\n")
          : ""
      );
    }
  }, [clickedOrder, products]);
  console.log(resultString);
  return (
    <>
      {loading ? (
        <Loader />
      ) : isAdmin ? (
        <div className="container border-0" style={{ marginTop: "15px" }}>
          <div className="table-wrapper" style={{ paddingTop: "12px" }}>
            <Card className="text-center">
              <Card.Header>
                <Row>
                  <Col sm={6}>
                    <h2>Manager Orders </h2>
                  </Col>
                  <Col sm={6}>
                    <Button
                      variant="dark"
                      onClick={() => {
                        window.history.back(-1);
                      }}
                      style={{ marginLeft: "70%" }}
                    >
                      Quay lại
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <div
                  className="scrollable-area"
                  style={{ overflow: "auto", paddingTop: "11px" }}
                >
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>UserID</th>
                        <th>Email</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <OrderInfoRow
                          key={index}
                          order={order}
                          in
                          dex={index}
                        />
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Pagination
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </Card.Footer>
            </Card>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Order ID : {clickedOrder.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={clickedOrder.email}
                    disabled
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput3"
                >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={clickedOrder.address}
                    disabled
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={clickedOrder.phone}
                    disabled
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput5"
                >
                  <Form.Label>Products</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={resultString}
                    disabled
                    className="pre-wrap"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
                  <Form.Label>Total Price</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={convertToCurrencyFormat(clickedOrder.total)}
                    disabled
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default OrderManager;
