import React, { Component } from "react";
import { Col, Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

class BlogBox extends Component {

  

  handleClick = () => {
    window.scrollTo(0, 0);
    if (this.props.history) {
      this.props.history.push('/page-case-detail2');
    }
  };

  

  render() {

    // blog.vrRegdate에서 날짜를 가져와서 yyyy-mm-dd 형식으로 변환
    const blogsWithFormattedDate = this.props.blogs.map(blog => {
    const originalDate = new Date(blog.videoRegdate); // blog.vrRegdate를 Date 객체로 변환
    const year = originalDate.getFullYear(); // 연도 가져오기
    const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // 월 가져오기 (0부터 시작하므로 +1 필요), 2자리로 만들기
    const day = String(originalDate.getDate()).padStart(2, '0'); // 일 가져오기, 2자리로 만들기
    const formattedDate = `${year}-${month}-${day}`; // yyyy-mm-dd 형식으로 날짜 조합
    // HTML 태그 제거
    const strippedContent = blog.videoBoardContent.replace(/<[^>]*>/g, '');
    const truncatedContent = strippedContent;
    

    return {
      ...blog,
      videoRegdate: formattedDate, // 변경된 날짜로 업데이트된 블로그 객체 반환
      videoBoardContent: truncatedContent // 변경된 글자수를 블로그 객체 반환
      };
    });


    return (
      
      <React.Fragment>
        {blogsWithFormattedDate.map((blog, key) => (
          <Col lg="4" md="6" className="mt-4 pt-2" key={key} name="blog" style={{ display: 'flex' }}>
            <Card className="blog rounded border-0 shadow">
              <div className="position-relative">
                <CardImg top src={blog.videoThumbnailImgUrl} className="rounded-top" alt="" style={{ width: '350px', height: '235px' }} />
                <div className="overlay rounded-top bg-dark"></div>
              </div>
              <CardBody className="content m-0">
              <div style={{
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                    maxWidth: '100%',
                    textAlign: 'left'
                }}>
                  <Link to="#" className="text-muted comments">
                    {blog.videoBoardContent}
                  </Link>
                </div>
                <div className="post-meta d-flex justify-content-between mt-3">
                  <ul className="list-unstyled mb-0">
                    <li className="list-inline-item me-2 mb-0">
                      <Link to="#" className="text-muted like">
                        <i className="uil uil-heart me-1"></i>
                        {blog.videoViews}
                      </Link>
                    </li>{" "}
                    {/* <li className="list-inline-item">
                      <Link to="#" className="text-muted comments">
                        <i className="uil uil-comment me-1"></i>
                        {blog.comment}
                      </Link>
                    </li> */}
                  </ul>
                  <Link to={`/page-case-detail2/${blog.videoBoardNo}`} className="text-muted readmore" onClick={this.handleClick}>
                    Read More <i className="uil uil-angle-right-b"></i>
                  </Link>
                </div>
              </CardBody>
              <div className="author">
                <small className="text-light user d-block">
                  <i className="mdi mdi-account"></i> {blog.videoWriter}
                </small>
                <small className="text-light date">
                  <i className="mdi mdi-calendar-check"></i> {blog.videoRegdate}
                </small>
              </div>
            </Card>
          </Col>
        ))}
      </React.Fragment>
    );
  }
}

export default BlogBox;