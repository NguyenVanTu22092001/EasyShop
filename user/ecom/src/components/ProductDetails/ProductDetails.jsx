import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";

// import ReactDOM from "react-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
// import { Navbar, Nav } from "react-bootstrap";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
// import { click } from "@testing-library/user-event/dist/click";
import SuggestedProduct from "./SuggestedProduct";
import ReviewList from "./ReviewList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppURL from "../../api/AppURL";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import parse from "html-react-parser";
class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      previewImg: "0",
      isSize: null,
      isColor: null,
      color: "",
      size: "",
      quantity: "",
      productCode: null,
      addToCart: "Add To Cart",
      PageRefreshStatus: false,
      addToFav: "Favourite",
      OrderNow: "Order Now",
      PageRedirectStauts: false,
    };
  }
  componentDidMount() {}
  imgOnClick = (event) => {
    let imgSrc = event.target.getAttribute("src");
    // let previewImg = document.getElementById("previewImg");
    // ReactDOM.findDOMNode(previewImg).setAttribute("src", imgSrc);
    this.setState({ previewImg: imgSrc });
  };

  addToCart = () => {
    let isSize = this.state.isSize;
    let isColor = this.state.isColor;
    let color = this.state.color;
    let size = this.state.size;
    let quantity = this.state.quantity;
    let productCode = this.state.productCode;
    let email = this.props.user.email;

    if (isColor === "YES" && color.length === 0) {
      toast.error("Please Select Color", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (isSize === "YES" && size.length === 0) {
      toast.error("Please Select Size", { position: toast.POSITION.TOP_RIGHT });
    } else if (quantity.length === 0) {
      toast.error("Please Select Quantity", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (!localStorage.getItem("token")) {
      toast.warn("Please You have to Login First", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      this.setState({ addToCart: "Adding..." });
      let MyFormData = new FormData();
      MyFormData.append("color", color);
      MyFormData.append("size", size);
      MyFormData.append("quantity", quantity);
      MyFormData.append("product_code", productCode);
      MyFormData.append("email", email);

      axios
        .post(AppURL.addToCart, MyFormData)
        .then((response) => {
          if (response.data === 1) {
            toast.success("Product Added Successfully", {
              // position: "top-right",
              position: toast.POSITION.TOP_RIGHT,
            });
            this.setState({ addToCart: "Add To Cart" });
            this.setState({ PageRefreshStatus: true });
          } else {
            toast.error("Your Request is not done ! Try Aagain", {
              // position: "top-right",
              position: toast.POSITION.TOP_RIGHT,
            });
            this.setState({ addToCart: "Add To Cart" });
          }
        })
        .catch((error) => {
          toast.error("Your Request is not done ! Try Aagain", {
            position: "top-right",
          });
          this.setState({ addToCart: "Add To Cart" });
        });
    }
  };
  addToFav = () => {
    this.setState({ addToFav: "Adding..." });
    let productCode = this.state.productCode;
    let email = this.props.user.email;

    if (!localStorage.getItem("token")) {
      toast.warn("Please You have to Login First", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      axios
        .get(AppURL.AddFavourite(productCode, email))
        .then((response) => {
          if (response.data === 1) {
            toast.success("Product is in Favourite", {
              position: toast.POSITION.TOP_RIGHT,
            });
            this.setState({ addToFav: "Favourite" });
          } else {
            toast.error("Your Request is not done ! Try Aagain", {
              position: toast.POSITION.TOP_RIGHT,
            });
            this.setState({ addToFav: "Favourite" });
          }
        })
        .catch((error) => {
          toast.error("Your Request is not done ! Try Aagain", {
            position: toast.POSITION.TOP_RIGHT,
          });
          this.setState({ addToFav: "Favourite" });
        });
    }
  }; // end ADD TO FAV

  colorOnChange = (event) => {
    let color = event.target.value;
    // alert(color);
    this.setState({ color: color });
  };

  sizeOnChange = (event) => {
    let size = event.target.value;
    // alert(size);
    this.setState({ size: size });
  };

  quantityOnChange = (event) => {
    let quantity = event.target.value;
    this.setState({ quantity: quantity });
  };
  PageRefresh = () => {
    if (this.state.PageRefreshStatus === true) {
      let URL = window.location.pathname;
      return <Redirect to={URL} />;
    }
    return null;
  };

  PriceOption(price, special_price) {
    if (special_price === "na") {
      return (
        <p className="product-price-on-card">
          {" "}
          Price :{" "}
          <NumericFormat
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />{" "}
        </p>
      );
    } else {
      return (
        <p className="product-price-on-card">
          Price :{" "}
          <strike className="text-secondary">
            <NumericFormat
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />{" "}
          </strike>{" "}
          <NumericFormat
            value={special_price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </p>
      );
    }
  }
  orderNow = () => {
    let isSize = this.state.isSize;
    let isColor = this.state.isColor;
    let color = this.state.color;
    let size = this.state.size;
    let quantity = this.state.quantity;
    let productCode = this.state.productCode;
    let email = this.props.user.email;

    if (isColor === "YES" && color.length === 0) {
      toast.error("Please Select Color", { position: "top-right" });
    } else if (isSize === "YES" && size.length === 0) {
      toast.error("Please Select Size", { position: "top-right" });
    } else if (quantity.length === 0) {
      toast.error("Please Select Quantity", { position: "top-right" });
    } else if (!localStorage.getItem("token")) {
      toast.warn("Please You have to Login First", {
        position: "top-right",
      });
    } else {
      this.setState({ addToCart: "Adding..." });
      let MyFormData = new FormData();
      MyFormData.append("color", color);
      MyFormData.append("size", size);
      MyFormData.append("quantity", quantity);
      MyFormData.append("product_code", productCode);
      MyFormData.append("email", email);

      axios
        .post(AppURL.addToCart, MyFormData)
        .then((response) => {
          if (response.data === 1) {
            toast.success("Product Added Successfully", {
              position: "top-right",
            });
            this.setState({ OrderNow: "Order Now" });
            this.setState({ PageRedirectStauts: true });
          } else {
            toast.error("Your Request is not done ! Try Aagain", {
              position: "top-right",
            });
            this.setState({ addToCart: "Add To Cart" });
          }
        })
        .catch((error) => {
          toast.error("Your Request is not done ! Try Aagain", {
            position: "top-right",
          });
          this.setState({ addToCart: "Add To Cart" });
        });
    }
  }; /// End orderNow Mehtod

  PageRedirect = () => {
    if (this.state.PageRedirectStauts === true) {
      return <Redirect to="/cart" />;
    }
    return null;
  };
  render() {
    let ProductAllData = this.props.data;
    let title = ProductAllData["productList"][0]["title"];
    let brand = ProductAllData["productList"][0]["brand"];
    let category = ProductAllData["productList"][0]["category"];
    let subcategory = ProductAllData["productList"][0]["subcategory"];
    let image = ProductAllData["productList"][0]["image"];

    if (this.state.previewImg === "0") {
      this.setState({ previewImg: image });
    }
    let price = ProductAllData["productList"][0]["price"];
    let product_code = ProductAllData["productList"][0]["product_code"];
    // let remark = ProductAllData["productList"][0]["remark"];
    let special_price = ProductAllData["productList"][0]["special_price"];
    // let star = ProductAllData["productList"][0]["star"];

    let image_one = ProductAllData["productDetails"][0]["image_one"];
    let image_two = ProductAllData["productDetails"][0]["image_two"];
    let image_three = ProductAllData["productDetails"][0]["image_three"];
    let image_four = ProductAllData["productDetails"][0]["image_four"];
    let color = ProductAllData["productDetails"][0]["color"];
    let size = ProductAllData["productDetails"][0]["size"];

    // let product_id = ProductAllData["productDetails"][0]["product_id"];
    let short_description =
      ProductAllData["productDetails"][0]["short_description"];
    let long_description =
      ProductAllData["productDetails"][0]["long_description"];

    var ColorDiv = "d-none";
    if (color !== "na") {
      let ColorArray = color.split(",");
      var ColorOption = ColorArray.map((ColorList, i) => {
        return (
          <option key={i.toString()} value={ColorList}>
            {" "}
            {ColorList}{" "}
          </option>
        );
      });
      ColorDiv = "";
    } else {
      ColorDiv = "d-none";
    }

    var SizeDiv = "d-none";
    if (size !== "na") {
      let SizeArray = size.split(",");
      var SizeOption = SizeArray.map((SizeList, i) => {
        return (
          <option key={i} value={SizeList}>
            {" "}
            {SizeList}{" "}
          </option>
        );
      });
      SizeDiv = "";
    } else {
      SizeDiv = "d-none";
    }
    if (this.state.isSize === null) {
      if (size !== "na") {
        this.setState({ isSize: "YES" });
      } else {
        this.setState({ isSize: "NO" });
      }
    }

    if (this.state.isColor === null) {
      if (color !== "na") {
        this.setState({ isColor: "YES" });
      } else {
        this.setState({ isColor: "NO" });
      }
    }

    if (this.state.productCode === null) {
      this.setState({ productCode: product_code });
    }

    return (
      <Fragment>
        <Container fluid={true} className="BetweenTwoSection">
          <div className="breadbody">
            <Breadcrumb>
              <Breadcrumb.Item href="/">
                <span>Home</span>
              </Breadcrumb.Item>

              <LinkContainer to={"/productcategory/" + category}>
                <Breadcrumb.Item>
                  <span>{category}</span>
                </Breadcrumb.Item>
              </LinkContainer>
              <LinkContainer
                to={"/productsubcategory/" + category + "/" + subcategory}
              >
                <Breadcrumb.Item>
                  <span>{subcategory}</span>
                </Breadcrumb.Item>
              </LinkContainer>

              <Breadcrumb.Item>{title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Row className="p-2">
            <Col
              className="shadow-sm bg-white pb-3 mt-4"
              md={12}
              lg={12}
              sm={12}
              xs={12}
            >
              <Row>
                <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                  {/* <img
                    id="previewImg"
                    className="bigimage"
                    src={image_one}
                    alt=""
                  /> */}
                  <InnerImageZoom
                    className="detailimage"
                    zoomScale={1.8}
                    zoomType={"hover"}
                    src={this.state.previewImg}
                    zoomSrc={this.state.previewImg}
                  />
                  <Container className="my-3">
                    <Row>
                      <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                        <img
                          onClick={this.imgOnClick}
                          className="w-100 smallimage product-sm-img"
                          alt=""
                          src={image_one}
                        />
                      </Col>
                      <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                        <img
                          onClick={this.imgOnClick}
                          className="w-100 smallimage product-sm-img"
                          alt=""
                          src={image_two}
                        />
                      </Col>
                      <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                        <img
                          onClick={this.imgOnClick}
                          className="w-100 smallimage product-sm-img"
                          alt=""
                          src={image_three}
                        />
                      </Col>
                      <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                        <img
                          onClick={this.imgOnClick}
                          className="w-100 smallimage product-sm-img"
                          alt=""
                          src={image_four}
                        />
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col className="p-3 " md={6} lg={6} sm={12} xs={12}>
                  <h5 className="Product-Name"> {title} </h5>
                  <h6 className="section-sub-title"> {short_description} </h6>

                  {this.PriceOption(price, special_price)}

                  <h6 className="mt-2">
                    Category : <b>{category}</b>{" "}
                  </h6>

                  <h6 className="mt-2">
                    SubCategory : <b>{subcategory}</b>
                  </h6>

                  <h6 className="mt-2">
                    Brand : <b>{brand}</b>
                  </h6>

                  <h6 className="mt-2">
                    Product Code : <b>{product_code}</b>
                  </h6>

                  <div className={ColorDiv}>
                    <h6 className="mt-2"> Choose Color </h6>

                    <select
                      onChange={this.colorOnChange}
                      className="form-control form-select"
                    >
                      <option>Choose Color</option>
                      {ColorOption}
                    </select>
                  </div>

                  <div className={SizeDiv}>
                    <h6 className="mt-2"> Choose Size </h6>
                    <select
                      onChange={this.sizeOnChange}
                      className="form-control form-select"
                    >
                      <option>Choose Size</option>
                      {SizeOption}
                    </select>
                  </div>

                  <div className="">
                    <h6 className="mt-2"> Choose Quantity </h6>
                    <select
                      onChange={this.quantityOnChange}
                      className="form-control form-select"
                    >
                      <option>Choose Quantity</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                    </select>
                  </div>

                  <div className="input-group mt-3">
                    <button
                      onClick={this.addToCart}
                      className="btn site-btn m-1 "
                    >
                      {" "}
                      <i className="fa fa-shopping-cart"></i>{" "}
                      {this.state.addToCart}
                    </button>
                    <button
                      onClick={this.orderNow}
                      className="btn btn-primary m-1"
                    >
                      {" "}
                      <i className="fa fa-car"></i> {this.state.OrderNow}{" "}
                    </button>
                    <button
                      onClick={this.addToFav}
                      className="btn btn-primary m-1"
                    >
                      {" "}
                      <i className="fa fa-heart"></i> {this.state.addToFav}{" "}
                    </button>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col className="" md={6} lg={6} sm={12} xs={12}>
                  <h6 className="mt-2">DETAILS</h6>
                  <p> {parse(long_description)} </p>
                </Col>

                <Col className="" md={6} lg={6} sm={12} xs={12}>
                  <ReviewList code={product_code} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <SuggestedProduct
          subcategory={subcategory}
          productCode={product_code}
        />
        {this.PageRefresh()}
        {this.PageRedirect()}
        <ToastContainer />
      </Fragment>
    );
  }
}

export default ProductDetails;
