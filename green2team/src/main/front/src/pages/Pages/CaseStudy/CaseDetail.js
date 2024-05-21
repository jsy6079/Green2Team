import React, { Component, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

import blog5 from "../../../assets/images/blog/100.png";

export default function CaseDetail() {
  const [blog, setBlog] = useState({});
  const { vrBoardNo } = useParams();

  useEffect(() => {
    axios.get(`/page-case-detail/${vrBoardNo}`)
      .then(response => {
        setBlog(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
      });

    
    return () => {
     
    };
  }, [vrBoardNo]);

  return (
    <React.Fragment>  
          
      <section className="bg-half">
        <Container>
          <Row className="justify-content-center" >
            <Col lg={8} md={10}>
              <div className="section-title">
                <div className="text-center">
                  <h4 className="title mb-4">{blog.vrBoardTitle}</h4>
                  <img
                    src={blog5}
                    className="img-fluid rounded-md shadow-md"
                    alt=""
                  />
                </div>
                <div className="mb-0 mt-4" dangerouslySetInnerHTML={{ __html: blog.vrBoardContent }}></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}