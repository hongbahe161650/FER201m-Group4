import { Table } from "react-bootstrap";
import DefaultLayout from "../layouts/DefaultLayout";
import { useEffect, useState } from "react";
import data from "../data/database.json";
const Cart = () => {
  const [product, setProduct] = useState([]);
  const [searchName, setSearchName] = useState("");
  useEffect(() => {
    setProduct(data.product);
  }, []);
  // serch name: Cach 1
  //   const filterByName = (nameString) => {
  //     const filterProduct = data.product.filter(({ name }) =>
  //       name.toLowerCase().includes(nameString.toLowerCase())
  //     );
  //     setProduct(filterProduct);
  //   };

  //   const handleOnChange = (e) => {
  //     const nameString = e.target.value;
  //     filterByName(nameString)
  //   };
  // cach 2
  const filterProduct = product.filter((item) =>
    item.name.toLowerCase().includes(searchName.toLowerCase())
  );
  const handleInputChange = (e) => {
    setSearchName(e.target.value);
  };
  // click button
  const filterById = (idString) => {
    const filterProduct = data.product.filter(({ id }) =>
      idString.includes(id.toString())
    );
    setProduct(filterProduct);
  };
  
  const handleClick = (id) => {
    filterById(id.toString());
  };
  
  return (
    <DefaultLayout className="container">
      <div className="row">
        <input
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
        />
        <button onClick={() => handleClick(1)}>Id 1</button>
        <button onClick={() => handleClick(2)}>Id 2</button>
        <button onClick={() => handleClick(3)}>Id 3</button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>CatID</th>
              <th>Name</th>
              <th>Price</th>
          
              <th>IMG</th>
            </tr>
          </thead>
          <tbody>
            {filterProduct.map((p) => (
              <tr>
                <td>{p.id}</td>
                <td>{p.catId}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                
                <td>{p.img}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </DefaultLayout>
  );
};

export default Cart;
