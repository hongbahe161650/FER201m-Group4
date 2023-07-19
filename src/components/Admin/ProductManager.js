import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Figure,
  Form,
  InputGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
// import "./ProductManager.css";
import { useEffect, useState } from "react";
import { ArchiveFill, PencilSquare } from "react-bootstrap-icons";
import NotFound from "../layouts/NotFound";
import Loader from "../layouts/Loader";
import axios from "axios";
import Pagination from "../Custom/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { convertToCurrencyFormat } from "../Custom/CustomFunction";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("UserID"))
      ? JSON.parse(localStorage.getItem("UserID")).isAdmin
      : false
  );
  const [newProductAdded, setNewProductAdd] = useState({});
  const [updateProduct, setUpdateProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [currentSortOrder, setCurrentSortOrder] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const SIZE_KEY = {
    shirts: ["S", "ML", "XL", "XXL"],
    pants: [27, 28, 29, 30, 31, 32, 33],
    shoes: [39, 40, 41, 42, 43],
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:9999/api/products").then((res) => res.json()),
      fetch("http://localhost:9999/api/categories").then((res) => res.json()),
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        setNewProductAdd((prevProduct) => ({
          ...prevProduct,
          id: productsData[productsData.length - 1].id + 1,
        }));
        setTotalPages(Math.ceil(productsData.length / 10));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
    scrollToTop();
  }, [currentPage]);

  const fetchData = () => {
    fetch(`http://localhost:9999/api/products?_page=${currentPage}&_limit=10`)
      .then((response) => {
        const totalCount = parseInt(response.headers.get("X-Total-Count"));
        setTotalPages(Math.ceil(totalCount / 10));
        return response.json();
      })
      .then((json) => {
        setProducts(json);
        setFilteredProducts([]);
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (page) => {
    fetchData();
    setCurrentPage(page);
  };
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  const uploadImage = async (formData) => {
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dyxlwy5wf/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;
      return imageUrl;
    } catch (error) {
      throw error;
    }
  };

  const handleCloseModal = () => {
    if (isEditing) {
      setIsEditing(false);
    }
    setShowModal(false);
    var elements = document.getElementsByClassName("form-control");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.value = "";
    }
  };
  const handleEditProduct = (id) => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    setUpdateProduct(foundProduct);

    setIsEditing(true);
    setShowModal(true);
  };
  //done
  const handleDeleteProduct = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product"
    );
    if (confirm) {
      fetch(`http://localhost:9999/api/products/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            handlePageChange(currentPage);
          } else {
            throw new Error("Something went wrong");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  //done
  const handleClickSaveEdit = (id) => {
    fetch(`http://localhost:9999/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        handlePageChange(currentPage);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    setIsEditing(false);
    setShowModal(false);
  };
  //done
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isEditing) {
      fetch("http://localhost:9999/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductAdded),
      })
        .then((response) => response.json())
        .then((data) => {
          handlePageChange(currentPage);
        })
        .catch((error) => {
          alert("error");
          console.error(error);
        });
      setShowModal(false);
      setNewProductAdd({});
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  const convertToNumber = (string) => {
    const filteredString = string.replace(/[.,đ]/g, "");
    return parseInt(filteredString);
  };

  const handleSortBy = (type) => {
    switch (type) {
      case "id":
        const sortProductsById = [...products].sort((a, b) =>
          currentSortOrder.id === "asc" ? a.id - b.id : b.id - a.id
        );

        const newSortOrderId = currentSortOrder.id === "asc" ? "desc" : "asc";
        setCurrentSortOrder({ id: newSortOrderId });
        setProducts(sortProductsById);

        break;

      case "name":
        const sortProductsByName = [...products].sort((a, b) =>
          currentSortOrder.name === "asc"
            ? a.name.localeCompare(b.name, "vi")
            : b.name.localeCompare(a.name, "vi")
        );
        const newSortOrderName =
          currentSortOrder.name === "asc" ? "desc" : "asc";
        setCurrentSortOrder({ name: newSortOrderName });
        setProducts(sortProductsByName);

        break;
      case "price":
        const sortProductsByPrice = [...products].sort((a, b) => {
          const convertedA = convertToNumber(a.price);
          const convertedB = convertToNumber(b.price);
          console.log(convertedB);
          if (currentSortOrder.price === "asc") {
            return convertedA - convertedB;
          } else {
            return convertedB - convertedA;
          }
        });

        const newSortOrderPrice =
          currentSortOrder.price === "asc" ? "desc" : "asc";
        setCurrentSortOrder({ price: newSortOrderPrice });
        setProducts(sortProductsByPrice);

        break;
      case "quantity":
        const sortProductsByQuantity = [...products].sort((a, b) => {
          return currentSortOrder.amount === "asc"
            ? a.amount - b.amount
            : b.amount - a.amount;
        });
        const newSortOrderQuantity =
          currentSortOrder.amount === "asc" ? "desc" : "asc";
        setCurrentSortOrder({ amount: newSortOrderQuantity });
        setProducts(sortProductsByQuantity);

        break;
      default:
        return 0;
    }
  };
  useEffect(() => {
    function filterProductsByName(searchName) {
      if (searchName) {
        return products.filter((product) =>
          product.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchName
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
        );
      }
      return products;
    }
    const searchResult = filterProductsByName(searchName);

    if (searchResult.length === 0 && searchName) {
      setErrorMessage("Not Found");
    } else {
      setErrorMessage("");
    }
    setFilteredProducts(searchResult.length !== 0 ? searchResult : []);
  }, [searchName]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : isAdmin ? (
        <div className="container border-0" style={{ marginTop: "17px" }}>
          <Card>
            <Card.Header>
              <Row>
                <Col sm={6}>
                  <h2>Manager Product </h2>
                </Col>
                <Col sm={6}>
                  <Button
                    variant="info"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Mới
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      window.history.back(-1);
                    }}
                    style={{ marginLeft: "70%" }}
                  >
                    Quay lại
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col sm={4}></Col>
                <Col sm={4} className="m-2">
                  <div className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      onChange={(e) => setSearchName(e.target.value)}
                    />
                    {errorMessage && (
                      <div className="error-message" style={{ color: "red" }}>
                        {errorMessage}
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="scrollable-area" style={{ overflow: "auto" }}>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th
                        style={{ cursor: "pointer",display: "flex" }}
                        onClick={() => handleSortBy("id")}
                      >
                        {currentSortOrder.id === 'asc' ? <FontAwesomeIcon icon={faSortUp} style={{paddingRight:'1px'}}/> : <FontAwesomeIcon icon={faSortDown} style={{paddingRight:'1px'}}/>} ID 
                      </th>
                      <th>Image</th>
                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSortBy("name")}
                      >
                        {currentSortOrder.name === 'asc' ? <FontAwesomeIcon icon={faSortUp} style={{paddingRight:'1px'}}/> : <FontAwesomeIcon icon={faSortDown} style={{paddingRight:'1px'}}/>} Name
                      </th>
                      <th>Color</th>
                      <th>Size</th>
                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSortBy("price")}
                      >
                        {currentSortOrder.price === 'asc' ? <FontAwesomeIcon icon={faSortUp} style={{paddingRight:'1px'}}/> : <FontAwesomeIcon icon={faSortDown} style={{paddingRight:'1px'}}/>} Price
                      </th>
                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSortBy("quantity")}
                      >
                       {currentSortOrder.amount === 'asc' ? <FontAwesomeIcon icon={faSortUp} style={{paddingRight:'1px'}}/> : <FontAwesomeIcon icon={faSortDown} style={{paddingRight:'1px'}}/>}  Quantity
                      </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(filteredProducts.length === 0
                      ? products
                      : filteredProducts
                    ).map((product, index) => (
                      <tr key={index}>
                        <td>{product.id}</td>
                        <td>
                          <Figure.Image
                            src={product.img}
                            alt={product.name}
                            style={{ maxWidth: 100, maxHeight: 100 }}
                            rounded
                          />
                        </td>

                        <td>{product.name}</td>
                        <td>{product.color.join(", ")}</td>
                        <td>{product.size.join(", ")}</td>
                        <td>{convertToCurrencyFormat(product.price)}</td>
                        <td>{product.amount}</td>
                        <td>
                          <PencilSquare
                            style={{
                              color: "white",
                              backgroundColor: "yellow",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleEditProduct(product.id);
                            }}
                            required
                          />
                          <ArchiveFill
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleDeleteProduct(product.id);
                            }}
                          />
                        </td>
                      </tr>
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

          <Modal show={showModal} onHide={handleCloseModal}>
            <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {isEditing
                    ? `Chỉnh sửa sản phẩm (ID:${updateProduct.id})`
                    : "Thêm mới sản phẩm"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
                  <Form.Control
                    placeholder="Product Name"
                    aria-label="product_name"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            name: e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            name: e.target.value,
                          }));
                    }}
                    defaultValue={isEditing ? updateProduct.name : ""}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Giá</InputGroup.Text>
                  <Form.Control
                    placeholder="Price"
                    aria-label="product_price"
                    aria-describedby="basic-addon3"
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            price: e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            price: e.target.value,
                          }));
                    }}
                    defaultValue={isEditing ? updateProduct.price : ""}
                    required
                  />
                  <InputGroup.Text>đ</InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Category
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {categories.map((category, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
                            setNewProductAdd((prevProduct) => ({
                              ...prevProduct,
                              catId: category.id,
                            }));
                          }}
                        >
                          {`${category.name} (${category.id})`}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Form.Control
                    placeholder={isEditing ? updateProduct.catId : "Category"}
                    aria-label="product_category"
                    aria-describedby="basic-addon3"
                    defaultValue={isEditing ? updateProduct.catId : ""}
                    value={newProductAdded.catId ? newProductAdded.catId : ""}
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            catId: e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            catId: e.target.value,
                          }));
                    }}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Description</InputGroup.Text>
                  <Form.Control
                    placeholder="Description"
                    as="textarea"
                    aria-label="With textarea"
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            description: e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            description: e.target.value,
                          }));
                    }}
                    defaultValue={isEditing ? updateProduct.description : ""}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <DropdownButton
                    variant="outline-secondary"
                    title="Size"
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item
                      onClick={(e) => {
                        setNewProductAdd((prevProduct) => ({
                          ...prevProduct,
                          size: SIZE_KEY.shirts,
                        }));
                      }}
                    >
                      Áo
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => {
                        setNewProductAdd((prevProduct) => ({
                          ...prevProduct,
                          size: SIZE_KEY.pants,
                        }));
                      }}
                    >
                      Quần
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => {
                        setNewProductAdd((prevProduct) => ({
                          ...prevProduct,
                          size: SIZE_KEY.shoes,
                        }));
                      }}
                    >
                      Giầy/Dép
                    </Dropdown.Item>
                  </DropdownButton>
                  <Form.Control
                    placeholder={
                      isEditing ? updateProduct.size : "Separated by commas"
                    }
                    aria-label="product_category"
                    defaultValue={isEditing ? updateProduct.size : ""}
                    value={newProductAdded.size ? newProductAdded.size : ""}
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            size: e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            size: e.target.value,
                          }));
                    }}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Color</InputGroup.Text>
                  <Form.Control
                    placeholder="Separated by commas"
                    aria-label="product_color"
                    aria-describedby="basic-addon3"
                    defaultValue={isEditing ? updateProduct.color : ""}
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            color: e.target.value
                              ? e.target.value.split(",")
                              : e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            color: e.target.value
                              ? e.target.value.split(",")
                              : e.target.value,
                          }));
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Quantity</InputGroup.Text>
                  <Form.Control
                    placeholder="Quantity"
                    aria-label="product_quantity"
                    aria-describedby="basic-addon3"
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            amount: e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            amount: e.target.value,
                          }));
                    }}
                    defaultValue={isEditing ? updateProduct.amount : ""}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Image</InputGroup.Text>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();

                      reader.onloadend = async () => {
                        const imageDataUrl = reader.result;

                        const formData = new FormData();
                        formData.append("file", imageDataUrl);
                        formData.append("upload_preset", `shop_assets`);

                        await uploadImage(formData)
                          .then((imageUrl) => {
                            isEditing
                              ? setUpdateProduct((prevProduct) => ({
                                  ...prevProduct,
                                  img: imageUrl,
                                }))
                              : setNewProductAdd((prevProduct) => ({
                                  ...prevProduct,
                                  img: imageUrl,
                                }));
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      };

                      if (file) {
                        reader.readAsDataURL(file);
                      }
                    }}
                    required
                  />
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();

                      reader.onloadend = async () => {
                        const imageDataUrl = reader.result;
                        //them anh vao cloudiary
                        const formData = new FormData();
                        formData.append("file", imageDataUrl);
                        formData.append("upload_preset", `shop_assets`);

                        await uploadImage(formData)
                          .then((imageUrl) => {
                            isEditing
                              ? setUpdateProduct((prevProduct) => ({
                                  ...prevProduct,
                                  blurImg: imageUrl,
                                }))
                              : setNewProductAdd((prevProduct) => ({
                                  ...prevProduct,
                                  blurImg: imageUrl,
                                }));
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      };

                      if (file) {
                        reader.readAsDataURL(file);
                      }
                    }}
                    required
                  />
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={
                    isEditing
                      ? () => {
                          handleClickSaveEdit(updateProduct.id);
                        }
                      : () => {}
                  }
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ProductManager;
