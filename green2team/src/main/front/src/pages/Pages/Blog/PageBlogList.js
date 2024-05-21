import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class VideoBoard extends Component {
  // 클래스의 생성자(초기 상태 설정)
  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
      currentPage: 1,
    };
  }

  // 컴포넌트 마운트 된 후 호출되는 componentDidMount 메서드(초기 데이터 가져옴)
  componentDidMount() {
    this.fetchData(this.state.currentPage);
  }

  // 데이터 가져오는 fetchData 메서드
  fetchData = (page) => {
    fetch(`http://localhost:8080/board/videoBoard?pageNum=${page}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          blogs: data.videoLists, // 전체 데이터
          pageSize: 8,
          totalPages: Math.ceil(data.page.total / 8), // 총 페이지 수
          currentPage: page, // 현재 선택된 페이지 번호
        });
      })
      .catch((error) => {
        console.error('Error fetching data : ', error);
      });
  };

  // 페이지 변경 처리를 위한 handlePageChange 메서드
  handlePageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      this.fetchData(page);
    });
  };

  // 상세보기 페이지로 넘어가기 위한 handleClick 메서드
  handleClick = () => {
    window.scrollTo(0, 0);
    if (this.props.history) {
      this.props.history.push('/page-case-detail2');
    }
  };

  render() {
    const { blogs, currentPage, totalPages } = this.state;

    

    return (
      <React.Fragment>
        {/* HEADER */}
        <section className="bg-half-170 bg-light d-table w-100">
          <Container>
            <Row className="mt-5 justify-content-center">
              <Col lg={12} className="text-center">
                <div className="pages-heading">
                  <h4 className="title mb-0">영상 게시판</h4>
                  <br />
                  <h6 className="mb-0">
                    법률이 정하는 주요방위산업체에 종사하는 근로자의
                    단체행동권은 법률이 정하는 바에 의하여 <br />
                    이를제한하거나인정하지 아니할 수 없다. 대통렁 국무총리
                    국무위원
                  </h6>
                </div>
              </Col>
            </Row>

            <div className="position-breadcrumb">
              <nav aria-label="breadcrumb" className="d-inline-block">
                <ul className="breadcrumb rounded shadow mb-0 px-4 py-2">
                  <li className="breadcrumb-item">
                    <div>Station-J 동영상</div>
                  </li>
                </ul>
              </nav>
            </div>
          </Container>
        </section>

        {/* HEADER(Box 둥글게) */}
        <div className="position-relative">
          <div className="shape overflow-hidden text-white">
            <svg
              viewBox="0 0 2880 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>

        {/* BOARD */}
        <section className="section">
          <Container>
            {/* BOARD Content */}
            <Row className="d-flex">
              {blogs.map((blog, key) => {
                const strippedContent = blog.videoBoardContent.replace(/<[^>]*>/g, '');
                return (
                  key % 2 === 0 ? (
                    <Col lg={6} xs={12} key={key} className="mb-4 pb-2" style={{ display: 'flex' }} >
                      <Card className="blog rounded border-0 shadow overflow-hidden flex-grow-1">
                        <Row className="align-items-center g-0">
                          <Col md={6}>
                            <img
                              src={blog.videoThumbnailImgUrl}
                              className="img-fluid"
                              alt="Landrick"
                              style={{ width: '350px', height: '180px' }}
                            />
                            <div className="overlay bg-dark"></div>
                            <div className="author">
                              <small className="text-light user d-block">
                                <i className="uil uil-user"></i>{' '}
                                {blog.videoWriter}
                              </small>
                              <small className="text-light date">
                                <i className="uil uil-calendar-alt"></i>
                                {blog.videoRegdate.slice(0, 10)}
                              </small>
                            </div>
                          </Col>

                          <Col md={6}>
                            <CardBody className="content">
                              <h5>
                                <div
                                  to="#"
                                  className="card-title title text-dark"
                                >
                                  {blog.videoBoardTitle}
                                </div>
                              </h5>
                              <p className="text-muted mb-0">
                                {strippedContent.length > 30
                                  ? `${strippedContent.substring(0, 30)}...`
                                  : strippedContent}
                              </p>
                              <div className="post-meta d-flex justify-content-between mt-3">
                                <div to="#" className="text-muted like">
                                  <i className="uil uil-heart me-1"></i>
                                  {blog.videoViews}
                                </div>

                                <Link
                                  to={`/page-case-detail2/${blog.videoBoardNo}`}
                                  className="text-muted readmore"
                                  onClick={this.handleClick}
                                >
                                  더보기 <i className="uil uil-angle-right-b"></i>
                                </Link>
                              </div>
                            </CardBody>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ) : (
                    <Col lg={6} xs={12} key={key} className="mb-4 pb-2 " style={{ display: 'flex' }}>
                      <Card className="blog rounded border-0 shadow overflow-hidden flex-grow-1">
                        <Row className="align-items-center g-0">
                          <Col md={{ size: 6, order: 1 }} xs={{ order: 2 }}>
                            <CardBody className="content">
                              <h5>
                                <div
                                  to="#"
                                  className="card-title title text-dark"
                                >
                                  {blog.videoBoardTitle}
                                </div>
                              </h5>
                              <p className="text-muted mb-0">
                                {strippedContent.length > 30
                                  ? `${strippedContent.substring(0, 30)}...`
                                  : strippedContent}
                              </p>
                              <div className="post-meta d-flex justify-content-between mt-3">
                                <div to="#" className="text-muted like">
                                  <i className="mdi mdi-heart-outline me-1"></i>
                                  {blog.videoViews}
                                </div>

                                <Link
                                  to={`/page-case-detail2/${blog.videoBoardNo}`}
                                  className="text-muted readmore"
                                  onClick={this.handleClick}
                                >
                                  더보기<i className="uil uil-angle-right-b"></i>
                                </Link>
                              </div>
                            </CardBody>
                          </Col>

                          <Col md={{ size: 6, order: 2 }} xs={{ order: 1 }}>
                            <img
                              src={blog.videoThumbnailImgUrl}
                              className="img-fluid"
                              alt="Landrick"
                              style={{ width: '350px', height: '180px' }}
                            />
                            <div className="overlay bg-dark"></div>
                            <div className="author">
                              <small className="text-light user d-block">
                                <i className="uil uil-user"></i>
                                {blog.videoWriter}
                              </small>
                              <small className="text-light date">
                                <i className="uil uil-calendar-alt"></i>
                                {blog.videoRegdate.slice(0, 10)}
                              </small>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  )
                );
              })}

              {/* PAGINATION */}
              <Col xs="12">
                <Pagination listClassName="justify-content-center mb-0">
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink
                      onClick={() => this.handlePageChange(currentPage - 1)}
                      previous
                    />
                  </PaginationItem>

                  {[...Array(totalPages).keys()].map((page) => {
                    if (
                      page + 1 === currentPage ||
                      page + 1 === currentPage - 1 ||
                      page + 1 === currentPage + 1 ||
                      (currentPage === 1 && page < 3) ||
                      (currentPage === totalPages && page >= totalPages - 3)
                    ) {
                      return (
                        <PaginationItem
                          key={page}
                          active={page + 1 === currentPage}
                        >
                          <PaginationLink
                            onClick={() => this.handlePageChange(page + 1)}
                          >
                            {page + 1}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}

                  <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink
                      onClick={() => this.handlePageChange(currentPage + 1)}
                      next
                    />
                  </PaginationItem>
                </Pagination>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default VideoBoard;