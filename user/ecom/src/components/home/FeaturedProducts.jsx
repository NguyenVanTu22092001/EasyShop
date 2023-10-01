import React, { Component, Fragment } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppURL from "../../api/AppURL";
import axios from "axios";
import FeaturedLoading from "../PlaceHolder/FeaturedLoading";
import { NumericFormat } from "react-number-format";
class FeaturedProducts extends Component {
  constructor() {
    super();
    this.state = {
      ProductData: [],
      isLoading: "",
      mainDiv: "d-none",
    };
  }

  componentDidMount() {
    axios
      .get(AppURL.ProductListByRemark("FEATURED"))
      .then((response) => {
        this.setState({
          ProductData: response.data,
          isLoading: "d-none",
          mainDiv: " ",
        });
      })
      .catch((error) => {});
  }

  render() {
    const FeaturedList = this.state.ProductData;
    const MyView = FeaturedList.map((FeaturedList, i) => {
      if (
        FeaturedList.special_price === "na" ||
        FeaturedList.special_price === FeaturedList.price
      ) {
        return (
          <Col className="p-1" key={i} xl={2} lg={2} md={2} sm={4} xs={6}>
            <Link
              className="text-link"
              to={"/productdetails/" + FeaturedList.id}
            >
              <Card className="image-box card">
                <img className="center" src={FeaturedList.image} alt="" />
                <Card.Body>
                  <p className="product-name-on-card">{FeaturedList.title}</p>

                  <p className="product-price-on-card">
                    Price :{" "}
                    <NumericFormat
                      value={FeaturedList.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      } else {
        return (
          <Col className="p-1" key={i} xl={2} lg={2} md={2} sm={4} xs={6}>
            <Link
              className="text-link"
              to={"/productdetails/" + FeaturedList.id}
            >
              <Card className="image-box card">
                <img className="center" src={FeaturedList.image} alt="" />
                <Card.Body>
                  <p className="product-name-on-card">{FeaturedList.title}</p>
                  <p className="product-price-on-card">
                    Price :{" "}
                    <strike className="text-secondary">
                      <NumericFormat
                        value={FeaturedList.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </strike>{" "}
                    <NumericFormat
                      value={FeaturedList.special_price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      }
    });

    return (
      <Fragment>
        <FeaturedLoading isLoading={this.state.isLoading} />

        <div className={this.state.mainDiv}>
          <Container className="text-center" fluid={true}>
            <div className="section-title text-center mb-55">
              <h2>FEATURED PRODUCT</h2>
              <p>Some Of Our Exclusive Collection, You May Like</p>
            </div>

            <Row>{MyView}</Row>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default FeaturedProducts;
