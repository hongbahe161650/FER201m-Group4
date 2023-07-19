import DefaultLayoutDetail from "../layouts/DefaultLayoutDetail";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Card, Col, Row } from "react-bootstrap";
import { convertToCurrencyFormat } from "../Custom/CustomFunction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [topUser, setTopUser] = useState("");
  const [topUserPrice, setTopUserPrice] = useState(0);
  const [topProductQuantity, setTopProductQuantity] = useState(0);
  const [topProduct, setTopProduct] = useState({});
  const [products, setProducts] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:9999/api/orders").then((res) => res.json()),
      fetch("http://localhost:9999/api/products").then((res) => res.json()),
    ])
      .then(([ordersData, productsData]) => {
        setProducts(productsData);
        setOrders(ordersData);

        const productQuantities = {};
        const userTotals = {};

        let maxTotal = 0;
        let maxTotalUser = "";
        let maxQuantity = 0;
        let maxQuantityProductId = "";

        ordersData.forEach((entry) => {
          const { products } = entry;
          products.forEach((product) => {
            const { productId, quantity } = product;
            if (productQuantities[productId]) {
              productQuantities[productId] += quantity;
            } else {
              productQuantities[productId] = quantity;
            }
          });

          const { email, total } = entry;
          if (userTotals[email]) {
            userTotals[email] += total;
          } else {
            userTotals[email] = total;
          }
        });

        for (const [email, total] of Object.entries(userTotals)) {
          if (total > maxTotal) {
            maxTotal = total;
            maxTotalUser = email;
          }
        }

        for (const [productId, quantity] of Object.entries(productQuantities)) {
          if (quantity > maxQuantity) {
            maxQuantity = quantity;
            maxQuantityProductId = productId;
          }
        }
        setTopProduct(productsData.find(product => product.id == maxQuantityProductId));
        setTopProductQuantity(maxQuantity);
        setTopUserPrice(maxTotal);
        setTopUser(maxTotalUser);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateTotalAmountByMonth = (orders) => {
    const totalsByMonth = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      console.log( i); 
      const orderTimestamp = new Date(order.timestamp);
      const orderMonth = orderTimestamp.getMonth();
      const orderYear = orderTimestamp.getFullYear();
      const orderTotal = order.total;

      let monthKey = `${orderYear}-${orderMonth}`;
      if(i>=126){
        monthKey = '2023-6';
      }
      if (!totalsByMonth[monthKey]) {
        totalsByMonth[monthKey] = 0;
      }
      if(monthKey == '2023-6'){
        console.log(orderTotal)
      }
      totalsByMonth[monthKey] += orderTotal;
    }
    console.log(totalsByMonth);
    return totalsByMonth;
  };

  function calculateTotalOrdersByMonth(orders) {
    const ordersByMonth = {};

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const orderTimestamp = new Date(order.timestamp);
      const orderMonth = orderTimestamp.getMonth();
      const orderYear = orderTimestamp.getFullYear();

      const monthKey = `${orderYear}-${orderMonth}`;

      if (!ordersByMonth[monthKey]) {
        ordersByMonth[monthKey] = 0;
      }
      ordersByMonth[monthKey]++;
    }

    return ordersByMonth;
  }

  const totalsByMonth = calculateTotalAmountByMonth(orders);
  const ordersByMonth = calculateTotalOrdersByMonth(orders);

  const labelsOrderByMonth = [
    "2023-2",
    "2023-3",
    "2023-4",
    "2023-5",
    "2023-6",
    "2023-7",
  ];

  const dataSaleValue = {
    labels: labelsOrderByMonth,
    datasets: [
      {
        label: "Sales value",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [
          totalsByMonth["2023-1"],
          totalsByMonth["2023-2"],
          totalsByMonth["2023-3"],
          totalsByMonth["2023-4"],
          totalsByMonth["2023-5"],
          totalsByMonth["2023-6"],
        ],
      },
    ],
  };
  console.log( totalsByMonth["2023-6"]);
  const dataOrderByMonth = {
    labels: labelsOrderByMonth,
    datasets: [
      {
        fill: true,
        label: "Orders by month",
        data: [
          ordersByMonth["2023-1"],
          ordersByMonth["2023-2"],
          ordersByMonth["2023-3"],
          ordersByMonth["2023-4"],
          ordersByMonth["2023-5"],
          ordersByMonth["2023-6"],
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const options1 = {
    responsive: true,
    title: "Order by Month",
    aspectRatio: 5,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        tension: 0,
      },
    },
  };

  return (
    <div className="container border-0">
      <DefaultLayoutDetail>
        <Row style={{ marginTop: "20px" }}>
          <Col md={6}>
            <div style={{ width: "650px", height: "250px", display: "flex" }}>
              <Bar data={dataSaleValue} options={options1} />
            </div>
          </Col>
          <Col md={6} style={{ paddingLeft: "15%", paddingTop: "4%" }}>
            <Card
              bg="info"
              text="white"
              style={{ width: "18rem" }}
              className="mb-2"
            >
              <Card.Header>Top 1 Customer </Card.Header>
              <Card.Body>
                <Card.Title>{topUser} </Card.Title>
                <Card.Title>
                  Spend : {convertToCurrencyFormat(topUserPrice)}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div style={{ width: "600px", height: "250px", display: "flex",marginTop:'14%',marginLeft:'6%' }}>
              <Line options={options1} data={dataOrderByMonth} />;
            </div>
          </Col>

          <Col md={6} style={{ paddingLeft: "15%", paddingTop: "4%",marginBottom:'30px' }}>
            <Card
              bg="light"
              text="black"
              style={{ width: "18rem" }}
              className="mb-2"
            >
              <Card.Img
                src={topProduct ? topProduct.img : ""}
                alt="Card image"
                style={{maxWidth: "100%" ,opacity: '0.5'}}
              />
              <Card.ImgOverlay>
                <Card.Header>Top 1 Product </Card.Header>
                <Card.Body>
                  <Card.Title>{topProduct ? topProduct.name : ""}</Card.Title>
                  <Card.Title>Quantity Solded: {topProductQuantity}</Card.Title>
                </Card.Body>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      </DefaultLayoutDetail>
    </div>
  );
};

export default Dashboard;
