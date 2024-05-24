import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//Import Icons
import FeatherIcon from "feather-icons-react";

// Blog Images
import blog1 from "../../../../assets/images/blog/01.jpg";
import blog2 from "../../../../assets/images/blog/02.jpg";
import blog3 from "../../../../assets/images/blog/03.jpg";
import blog4 from "../../../../assets/images/blog/04.jpg";
import blog5 from "../../../../assets/images/blog/05.jpg";
import blog6 from "../../../../assets/images/blog/06.jpg";

export default class AllBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [
      ],
    };
  }
  render() {
    return (
      <React.Fragment>
        <Container className="mt-100 mt-60">
          <Row className="align-items-center mb-4 pb-2">
            <Col md={8}>
            </Col>
          </Row>
          <Row>
            {this.state.blogs.map((blog, key) => (
              <Col lg={4} md={6} className="mt-4 pt-2" key={key}>
                <Card className="blog rounded border-0 shadow overflow-hidden">
                  <div className="position-relative">
                    <img src={blog.image} className="card-img-top" alt="..." />
                    <div className="overlay rounded-top bg-dark"></div>
                  </div>
                  <CardBody className="content">
                    <h5>
                      <Link to="#" className="card-title title text-dark">
                        {blog.title}
                      </Link>
                    </h5>
                    <div className="post-meta d-flex justify-content-between mt-3">
                      <ul className="list-unstyled mb-0">
                        <li className="list-inline-item me-2 mb-0">
                          <Link to="#" className="text-muted like">
                            <i className="uil uil-heart me-1"></i>33
                          </Link>
                        </li>{" "}
                        <li className="list-inline-item">
                          <Link to="#" className="text-muted comments">
                            <i className="uil uil-comment me-1"></i>08
                          </Link>
                        </li>
                      </ul>
                      <Link
                        to="#"
                        className="text-muted readmore"
                      >
                        Read More <i className="uil uil-angle-right-b"></i>
                      </Link>
                    </div>
                  </CardBody>
                  <div className="author">
                    <small className="text-light user d-block">
                      <i className="mdi mdi-account"></i> Calvin Carlo
                    </small>
                    <small className="text-light date">
                      <i className="mdi mdi-calendar-check"></i> 13th August,
                      2019
                    </small>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
