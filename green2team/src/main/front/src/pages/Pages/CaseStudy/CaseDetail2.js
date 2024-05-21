import React, { Component, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

import blog5 from "../../../assets/images/blog/05.jpg";

export default function CaseDetail() {
  const [blog, setBlog] = useState({});
  const { videoBoardNo } = useParams();

  useEffect(() => {
    axios.get(`/page-case-detail2/${videoBoardNo}`)
      .then(response => {
        setBlog(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching blog:', error);
      });

    
    return () => {
     
    };
  }, [videoBoardNo]);

  const extractYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match && match[1];
  };

  return (
    <React.Fragment>        
      <section className="bg-half">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <div className="section-title">
                <div className="text-center">
                  <h4 className="title mb-4">{blog.videoBoardTitle}</h4>

                  {blog.videoViewerUrl && (
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe
                        className="embed-responsive-item"
                        src={`https://www.youtube.com/embed/${extractYouTubeId(blog.videoViewerUrl)}`}
                        title="YouTube Video"
                        allowFullScreen
                        width="800"
                        height="450"
                      ></iframe>
                    </div>
                  )}
              </div>
              <div className="mb-0 mt-4" dangerouslySetInnerHTML={{ __html: blog.videoBoardContent }}></div>
            </div>
            
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}