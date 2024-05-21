import React, { Component } from "react";

import BlogBox from "../../../../components/Shared/BlogBox";
import BlogBox2 from "../../../../components/Shared/BlogBox2";

//Import Icons
import FeatherIcon from "feather-icons-react";

// Blog Images
import blog1 from "../../../../assets/images/blog/04.jpg";
import blog2 from "../../../../assets/images/blog/05.jpg";
import blog3 from "../../../../assets/images/blog/06.jpg";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

export default class RecentPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      loading: true
    };
  }

  componentDidMount() {

  // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너를 추가합니다.
  window.addEventListener('scroll', this.handleScroll);

    axios.get('/index-blog/video')
      .then(response => {
        this.setState({ blogs: response.data }); // blogs로 수정
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  componentWillUnmount() {
    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너를 제거합니다.
    window.removeEventListener('scroll', this.handleScroll);
  }


  handleScroll = () => {
    const scrollTop = window.pageYOffset;
  
    // 예를 들어, 스크롤이 일정 위치에 도달했을 때 특정 작업을 수행한다고 가정합니다.
    if (scrollTop > 200) {
      // 스크롤이 일정 위치 이상으로 내려갔을 때 특정 클래스를 추가하거나 스타일을 변경하는 등의 작업을 수행합니다.
      // 예시:
      // document.getElementById('some-element').classList.add('scrolled-down');
    } else {
      // 스크롤이 일정 위치 이하로 올라갔을 때 특정 클래스를 제거하거나 스타일을 초기화하는 등의 작업을 수행합니다.
      // 예시:
      // document.getElementById('some-element').classList.remove('scrolled-down');
    }
  };


  handleClick = () => {
    // 페이지 이동 전 스크롤 위치 저장
    window.scrollTo(0, 0);
    
    // 페이지 이동
    if (this.props.history) {
      this.props.history.push('/page-case-detail2');
    }
  };


  render() {
    return (
      <React.Fragment>
        <Container className="mt-100 mt-60">
          <Row className="align-items-center mb-4 pb-2">
            <Col md={8}>
              <div id="video-section" className="section-title text-center text-md-start">
                <h4 className="mb-4">영상 게시판</h4>
                <p className="text-muted mb-0 para-desc">
                이 헌법시행 당시의{" "}
                  <span className="text-primary fw-bold">
                    대법원장
                  </span>{" "}
                  대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다.
                </p>
              </div>
            </Col>

            <Col md={4} className="mt-4 mt-sm-0">
              <div className="text-center text-md-end">
                <Link to="/page-blog-list" className="btn btn-soft-primary" onClick={this.handleClick}>
                  더보기{" "}
                  <i>
                    <FeatherIcon icon="arrow-right" className="fea icon-sm" />
                  </i>
                </Link>
              </div>
            </Col>
          </Row>
          <div className="row">
            <BlogBox2 blogs={this.state.blogs} />
          </div>
        </Container>


        <Container className="mt-100 mt-60">
          <Row className="align-items-center mb-4 pb-2">
            <Col md={8}>
              <div id="digital-section" className="section-title text-center text-md-start">
                <h4 className="mb-4">디지털 조감도</h4>
                <p className="text-muted mb-0 para-desc">
                이 헌법시행 당시의{" "}
                  <span className="text-primary fw-bold">
                    대법원장
                  </span>{" "}
                  대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다.
                </p>
              </div>
            <div>
             <div style={{ background: '#000', width: '1200px', height: '500px', margin: 'auto', marginBottom: '100px', marginTop: '50px' }}></div>
            </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
