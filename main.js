const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("database.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  } else if(req.method === "PATCH") {
    req.body.updatedAt = Date.now();
  }
  next();
});

server.put("/api/carts", (req, res) => {
  const updatedCarts = req.body;
  router.db.set("carts", updatedCarts).write();
  res.json(updatedCarts);
});

server.put("/api/products", (req, res) => {
  const updatedCarts = req.body;
  router.db.set("products", updatedCarts).write();
  res.json(updatedCarts);
});

server.put("/api/orders", (req, res) => {
  const updatedOrders = req.body;
  router.db.set("orders", updatedOrders).write();
  res.json(updatedOrders);
});

server.put("/api/users", (req, res) => {
  const updatedUsers = req.body;
  router.db.set("users", updatedUsers).write();
  res.json(updatedUsers);
});

server.patch("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  const users = router.db.get("users").value();
  const userIndex = users.findIndex((user) => parseInt(user.id) === parseInt(userId));

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    router.db.set("users", users).write();

    res.json(users[userIndex]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

server.patch("/api/products/:id", (req, res) => {
  const userId = req.params.id;
  const updatedProduct = req.body;

  const products = router.db.get("products").value();
  const productIndex = products.findIndex(
    (product) => parseInt(product.id) === parseInt(userId)
  );

  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    router.db.set("products", products).write();

    res.json(products[productIndex]);
  } else {
    res.status(404).json({ error: "product not found" });
  }
});
server.post("/api/products", (req, res) => {
  const newProduct = req.body;

  const products = router.db.get("products").value();
  const productWithId = { id: products.length + 1, ...newProduct };

  products.push(productWithId);
  router.db.set("products", products).write();

  res.status(201).json(productWithId);
});

server.delete("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const products = router.db.get("products").value();

  const productIndex = products.findIndex(
    (product) => parseInt(product.id) === parseInt(productId)
  );

  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1)[0];
    router.db.set("products", products).write();
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

server.put("/api/forgot_password", (req, res) => {
  const updatedData = req.body;
  router.db.set("forgot_password", updatedData).write();
  res.json(updatedData);
});

// Use default router
server.use("/api", router);
server.listen(9999, () => {
  console.log("JSON Server is running");
});
