import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import FadeIn from "react-fade-in";
import bgImg from "../../../assets/images/2.jpg";

function AllCases() {
  const [blogs, setBlogs] = useState([]);
  const { searchText } = useParams();
  // const history = useHistory();

  useEffect(() => {
    axios.get(`/page-all-cases-search/${searchText}`)
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [searchText]);

  // HTML 태그 제거 및 글자수 제한 함수
  function stripHtmlTagsAndLimitText(text, limit) {
    // text가 정의되지 않았거나 null 또는 undefined인 경우 빈 문자열로 처리
    if (!text) return '';
  
    const strippedContent = text.replace(/<[^>]*>/g, '');
    const limitedContent = strippedContent.length > limit
      ? `${strippedContent.substring(0, limit)}...`
      : strippedContent;
    return limitedContent;
  }

  const handleClick = () => {
    window.scrollTo(0, 0);
    history.push();
  };

  return (
    <React.Fragment>
      <section className="bg-half-170 d-table w-100" style={{ background: `url(${bgImg}) center center` }}>
        <div className="bg-overlay"></div>
        <Container>
          <Row className="mt-5 justify-content-center">
            <Col lg={12} className="text-center">
              <div className="pages-heading">
                <h4 className="title text-white title-dark mb-0">'{searchText}' 검색 결과 </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
        </div>
      </div>
      <section className="section">


      <Container>
  <Row className="projects-wrapper d-flex">
    {blogs.map((blog, key) => (
      <Col
        key={key}
        lg={4}
        md={6}
        xs={12}
        className="mt-4 pt-2 business"
        style={{ display: 'flex' }}
      >
        <FadeIn delay={100}>
          <Card 
            className="blog border-0 work-container work-primary work-classic shadow rounded-md overflow-hidden flex-grow-1"
            style={{ width: '350px', height: '400px' }} // 고정된 크기를 지정합니다.
          >
            <img
              src={blog.videoBoardNo ? blog.videoThumbnailImgUrl : blog.vrThumbnailImgUrl}
              className="img-fluid work-image"
              alt="Landrick"
              style={{ width: '100%', height: '235px' }}
            />
            <CardBody className="content m-0">
              <div className="content">
                <h5 className="mt-3">
                  <Link
                    to={
                      blog.vrBoardNo
                        ? `/page-case-detail/${blog.vrBoardNo}`
                        : `/page-case-detail2/${blog.videoBoardNo}`
                    }
                    className="text-dark title"
                  >
                    {blog.videoBoardTitle || blog.vrBoardTitle}
                  </Link>
                </h5>
                <p className="text-muted"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                  maxWidth: '100%',
                  textAlign: 'left'
              }}>
                  {/* HTML 태그 제거 및 글자수 제한 적용 */}
                  {stripHtmlTagsAndLimitText(blog.videoBoardContent || blog.vrBoardContent)}
                </p>
                <Link
                  to={
                    blog.vrBoardNo
                      ? `/page-case-detail/${blog.vrBoardNo}`
                      : `/page-case-detail2/${blog.videoBoardNo}`
                  }
                  className="link h6"
                >
                  Read More{" "}
                  <i className="uil uil-angle-right-b align-middle"></i>
                </Link>
              </div>
            </CardBody>
          </Card>
        </FadeIn>
      </Col>
    ))}
  </Row>
</Container>

      </section>
    </React.Fragment>
  );
}

export default AllCases;