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

class VrBoard extends Component {
  // 클래스의 생성자(초기 상태 설정)
  constructor(props) {
    super(props);

    this.state = {
      blogs: [],
      currentPage: 1,
      currentYear: null,
    };
  }

  // 컴포넌트 마운트 된 후 호출되는 componentDidMount 메서드(초기 데이터 가져옴)
  componentDidMount() {
    this.fetchData(this.state.currentPage);
  }

  // 데이터 가져오는 fetchData 메서드
  fetchData = (page) => {
    fetch(`http://localhost:8080/board/vrBoard?pageNum=${page}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          blogs: data.vrLists, // 전체 데이터
          pageSize: 9,
          totalPages: Math.ceil(data.page.total / 9), // 총 페이지 수
          currentPage: page, // 현재 선택된 페이지 번호
          currentYear: null, // 년도값 null로 설정
        });
      })
      .catch((error) => {
        console.error('Error fetching data : ', error);
      });
  };

  // 년도별 데이터를 가져오는 fetchDataByYear 메서드
  fetchDataByYear = (year, page) => {
    fetch(`http://localhost:8080/board/vrBoardByYear/${year}?pageNum=${page}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          blogs: data.vrLists, // 전체 데이터
          pageSize: 9,
          totalPages: Math.ceil(data.page.total / 9), // 총 페이지 수
          currentPage: page, // 현재 선택된 페이지 번호
          currentYear: year, // 현재 선택된 년도
        });
      })
      .catch((error) => {
        console.error('Error fetching data : ', error);
      });
  };

  // 년도 변경 처리를 위한 handleYearChange 메서드
  handleYearChange = (year) => {
    if (year === null) {
      this.fetchData(this.state.currentPage);
    } else {
      this.fetchDataByYear(year, 1); // 선택된 년도의 첫 페이지 데이터 요청
    }
  };

  // 페이지 변경 처리를 위한 handleYearPageChange 메서드
  handleYearPageChange = (page) => {
    const { currentYear } = this.state;
    if (currentYear !== null) {
      this.fetchDataByYear(currentYear, page); // 년도별 데이터 조회 메서드
    } else {
      this.fetchData(page); // 전체 데이터 조회 메서드
    }
  };

  // 상세보기 페이지로 넘어가기 위한 handleClick 메서드
  handleClick = () => {
    window.scrollTo(0, 0);
    if (this.props.history) {
      this.props.history.push('/page-case-detail');
    }
  };

  // 컴포넌트의 UI를 정의하는 render 메서드
  render() {
  
    const { blogs, currentPage, totalPages, currentYear } = this.state;

    return (
      <React.Fragment>
        {/* HEADER */}
        <section className="bg-half-170 bg-light d-table w-100">
          <Container>
            <Row className="mt-5 justify-content-center">
              <Col lg={12} className="text-center">
                <div className="pages-heading">
                  <h4 className="title mb-0"> 360° VR 아카이빙 </h4>
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
                    <div>360° VR 아카이빙</div>
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
            {/* YEAR Select */}
            <Row>
              <Col>
                <div>
                  <ul className="container-filter list-inline mb-0 filter-options text-center">
                    <li
                      className={`list-inline-item categories-name border text-dark rounded ${
                        currentYear === null ? 'active' : ''
                      }`}
                      onClick={() => this.handleYearChange(null)} // null로 변경
                      data-group="all"
                    >
                      전체
                    </li>
                    <li
                      className={`list-inline-item categories-name border text-dark rounded ${
                        currentYear === 2024 ? 'active' : ''
                      }`}
                      onClick={() => this.handleYearChange(2024)}
                      data-group="2024"
                    >
                      2024
                    </li>
                    <li
                      className={`list-inline-item categories-name border text-dark rounded ${
                        currentYear === 2025 ? 'active' : ''
                      }`}
                      onClick={() => this.handleYearChange(2025)}
                      data-group="2025"
                    >
                      2025
                    </li>
                    <li
                      className={`list-inline-item categories-name border text-dark rounded ${
                        currentYear === 2026 ? 'active' : ''
                      }`}
                      onClick={() => this.handleYearChange(2026)}
                      data-group="2026"
                    >
                      2026
                    </li>
                  </ul>
                </div>
                <br />
              </Col>
            </Row>

            {/* BOARD Content */}
            <Row className="d-flex" >
              {blogs.map((blog, key) => {
                // HTML 태그 제거
                const strippedContent = blog.vrBoardContent.replace(/<[^>]*>/g, '');

      // 사진조정
                return (
                  <Col lg="4" md="6" className="mb-4 pb-2" key={key} name="blog" style={{ display: 'flex' }}>
                    <Card className="blog rounded border-0 shadow overflow-hidden flex-grow-1">
                      <div className="position-relative">
                        <CardImg
                          top
                          src={blog.vrThumbnailImgUrl}
                          className="rounded-top"
                          alt=""
                          style={{ width: '350px', height: '235px' }}
                    
                        />
                        <div className="overlay rounded-top bg-dark"></div>
                      </div>

                      <CardBody className="content m-0">
                        <div
                          className="badge"
                          style={{
                            backgroundColor: 'rgb(47, 78, 231)',
                            marginBottom: '10px',
                          }}
                        >
                          {blog.vrRegdate.slice(0, 4)}
                        </div>

                        <h5>
                          <div className="card-title title text-dark">
                            {blog.vrBoardTitle}
                          </div>
                        </h5>
                        <div>
                          <div className="text-muted comments"
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: '1',
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'normal',
                              maxWidth: '100%',
                              textAlign: 'left'
                          }}
                          >
                            {strippedContent}
                          </div>
                        </div>
          
                        <div className="post-meta d-flex justify-content-between mt-3">
                          <div className="text-muted like">
                            <i className="mdi mdi-heart-outline me-1"></i>
                            {blog.vrViews}
                          </div>
                          <Link
                            to={`/page-case-detail/${blog.vrBoardNo}`}
                            className="text-muted readmore"
                            onClick={this.handleClick}
                          >
                            더보기 <i className="uil uil-angle-right-b"></i>
                          </Link>
                        </div>
                      </CardBody>
        {/* 사진고정 */}
                      <div className="author">
                        <small className="text-light user d-block">
                          <i className="mdi mdi-account"></i> {blog.vrWriter}
                        </small>
                        <small className="text-light date">
                          <i className="mdi mdi-calendar-check"></i>
                          {blog.vrRegdate.slice(0, 10)}
                        </small>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
             

              {/* PAGINATION */}
            <Row>
              <Col xs="12">
                <Pagination listClassName="justify-content-center mb-0">
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink
                      onClick={() => this.handleYearPageChange(currentPage - 1)}
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
                            onClick={() => this.handleYearPageChange(page + 1)}
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
                      onClick={() => this.handleYearPageChange(currentPage + 1)}
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

export default VrBoard;
