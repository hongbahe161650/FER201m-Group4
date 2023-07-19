import { Container, Table } from "react-bootstrap";
import DefaultLayout from "../layouts/DefaultLayout";
import BreadcrumbComponent from "../Custom/BreadcrumbComponent";
import NavMenuDashboard from "../Custom/NavMenuDashboard";
import { useEffect, useState } from "react";
import Loader from "../layouts/Loader";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("UserID"))
      ? JSON.parse(localStorage.getItem("UserID"))
      : { id: "PUBLIC_USER" }
  );
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    Promise.all([
      fetch("http://localhost:9999/api/products").then((res) => res.json()),
      fetch("http://localhost:9999/api/orders").then((res) => res.json()),
    ])
      .then(([productsData, ordersData]) => {
        const addNameForProduct = (id, quantity) => {
          const changedProduct = productsData.filter((product) => product.id == id)[0];
      
          return {
            productId: id,
            quantity: quantity,
            name: changedProduct.name,
            price: parseInt(changedProduct.price.split("đ")[0].replace(".", "")),
          };
        };
        setProducts(productsData);
        setOrders(ordersData
          .filter((order) => {
            return order.userId == user.id;
          })
          .map((order) => {
            const orderProducts = order.products.map((product) => {
              return addNameForProduct(product.productId, product.quantity);
            });
            return { ...order, products: orderProducts };
          }));
        setLoading(false); 
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false); 
      });
  }, []);
  const convertToCurrencyFormat = (number) => {
    const numberString = number.toString();
    let formattedString = "";

    for (let i = numberString.length - 1, count = 0; i >= 0; i--, count++) {
      if (count !== 0 && count % 3 === 0) {
        formattedString = "." + formattedString;
      }
      formattedString = numberString[i] + formattedString;
    }

    return formattedString;
  };
  return (
    <>
    {loading ? (
      <Loader />
    ) : (
    <DefaultLayout>
      <Container style={{ border: "none", paddingBottom: "250px" }}>
        <BreadcrumbComponent />
        <Table striped border="true" hover>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày mua</th>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá tiền</th>
              <th>Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order.products.map((product, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.timestamp}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{`${convertToCurrencyFormat(
                    product.price * product.quantity
                  )}đ`}</td>
                  <td>{order.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </DefaultLayout>
  )}
  </>
  )
};

export default ViewOrder;
