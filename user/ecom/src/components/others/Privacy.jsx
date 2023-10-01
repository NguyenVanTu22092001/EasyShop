import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import axios from "axios";
import parse from "html-react-parser";
import Breadcrumb from "react-bootstrap/Breadcrumb";
// import { Link } from "react-router-dom";

class Privacy extends Component {
  constructor() {
    super();
    this.state = {
      privacy: "",
      loaderDiv: "",
      mainDiv: "d-none",
    };
  }

  componentDidMount() {
    axios
      .get(AppURL.AllSiteInfo)
      .then((response) => {
        let StatusCode = response.status;
        if (StatusCode === 200) {
          let JsonData = response.data[0]["privacy"];
          this.setState({
            privacy: JsonData,
            loaderDiv: "d-none",
            mainDiv: "",
          });
        }
      })
      .catch((error) => {});
  }

  render() {
    return (
      <Fragment>
        <Container>
          <div className="breadbody">
            <Breadcrumb>
              <Breadcrumb.Item href="/">
                {/* {" "}
                <Link to="/"> Home </Link>{" "} */}
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {/* {" "}
                <Link to="/privacy"> Privacy </Link>{" "} */}
                Privacy
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <Row className="p-2">
            <Col
              className="shadow-sm bg-white mt-2"
              md={12}
              lg={12}
              sm={12}
              xs={12}
            >
              <div className={this.state.loaderDiv}>
                <div className="ph-item">
                  <div className="ph-col-12">
                    <div className="ph-row">
                      <div className="ph-col-4"></div>
                      <div className="ph-col-8 empty"></div>
                      <div className="ph-col-6"></div>
                      <div className="ph-col-6 empty"></div>
                      <div className="ph-col-12"></div>
                      <div className="ph-col-12"></div>
                      <div className="ph-col-12"></div>
                      <div className="ph-col-12"></div>
                    </div>
                  </div>
                </div>

                <div className="ph-item">
                  <div className="ph-col-12">
                    <div className="ph-row">
                      <div className="ph-col-4"></div>
                      <div className="ph-col-8 empty"></div>
                      <div className="ph-col-6"></div>
                      <div className="ph-col-6 empty"></div>
                      <div className="ph-col-12"></div>
                      <div className="ph-col-12"></div>
                      <div className="ph-col-12"></div>
                      <div className="ph-col-12"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={this.state.mainDiv}>
                <h4 className="section-title-login">Privacy Page</h4>
                <p className="section-title-contact">
                  {parse(this.state.privacy)}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Privacy;
