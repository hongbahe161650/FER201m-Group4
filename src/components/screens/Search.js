import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DefaultLayoutDetail from "../layouts/DefaultLayoutDetail";
import Loader from "../layouts/Loader";
import { Card } from "react-bootstrap";

const Search = () => {
  const { state } = useLocation();
  const {
    searchResult: initialSearchResult,
    searchParams: initialSearchParams,
  } = state;
  const [originalProduct, setOriginalProduct] = useState([]);
  const [params, setParams] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setOriginalProduct(initialSearchResult);
    setParams(initialSearchParams);
    setLoading(false);
  }, []);

  useEffect(() => {
    handleLmeo(initialSearchResult, initialSearchParams);
  }, [initialSearchResult, initialSearchParams]);

  const handleLmeo = (initialSearchResult, initialSearchParams) => {
    setOriginalProduct(initialSearchResult);
    setParams(initialSearchParams);
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
        <div className="container border-0">
          <DefaultLayoutDetail>
            {originalProduct.length !== 0 ? (
              <div>
                <section
                  className="page_search_resuilt"
                  style={{ padding: "3rem 0" }}
                >
                  <div className="container-fluid">
                    <div className="text-center">
                      <h4>
                        <strong>KẾT QUẢ TÌM KIẾM</strong>
                      </h4>
                      <br />
                      <p>Từ khóa tìm kiếm: "{params}"</p>
                      <div
                        className="light-title"
                        style={{
                          height: "1px",
                          background: "#000",
                          width: "60px",
                          margin: "15px auto",
                        }}
                      ></div>
                    </div>
                  </div>
                </section>
                <section className="productMain">
                  <div className="container-fluid">
                    <div className="heading-group">
                      <span>Tìm được {originalProduct.length} kết quả</span>
                    </div>
                  </div>

                  <div className="productMain_list swiper-initialized swiper-horizontal swiper-pointer-events swiper-free-mode">
                    <div className="row">
                      {originalProduct.map((product) => (
                        <div
                          key={product.id}
                          className="col-md-3"
                          onMouseEnter={(event) =>
                            handleMouseEnter(event, product)
                          }
                          onMouseLeave={(event) =>
                            handleMouseLeave(event, product)
                          }
                        >
                          <Card
                            className="card-content"
                            style={{ height: "400px" }}
                          >
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
                              <Card.Title>{product.price}</Card.Title>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                    </div>

                    <div className="flex-block">
                      <p>Đang hiển thị {originalProduct.length} sản phẩm</p>
                      <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center"></ul>
                      </nav>
                    </div>
                    <span
                      className="swiper-notification"
                      aria-live="assertive"
                      aria-atomic="true"
                    ></span>
                  </div>
                </section>
              </div>
            ) : (
              <section className="page_search_resuilt">
                <div className="container-fluid">
                  <div className="text-center">
                    <h4>
                      <strong>KẾT QUẢ TÌM KIẾM</strong>
                    </h4>
                    <br />
                    <p>Từ khóa tìm kiếm: "{params}"</p>
                    <div className="light-title"></div>
                    <br />
                    <p>
                      <img
                        width="400"
                        src="https://aristino.com/Content/pc/images/img-search-erro%201.png"
                        alt="Tìm kiếm"
                      />
                    </p>
                    <br />
                    <p>Không sản phẩm nào được tìm thấy</p>
                  </div>
                </div>
              </section>
            )}
          </DefaultLayoutDetail>
        </div>
      )}
    </>
  );
};

export default Search;
