import React, { Component } from 'react';
import BlogBox from '../../../../components/Shared/BlogBox';
import FeatherIcon from 'feather-icons-react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class PopularPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      loading: true,
    };
  }




  componentDidMount() {
    // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너를 추가합니다.
    window.addEventListener('scroll', this.handleScroll);

    axios
      .get('/index-blog/vr')
      .then((response) => {
        this.setState({ blogs: response.data }); // blogs로 수정
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  handleClick = () => {
    window.scrollTo(0, 0);
    if (this.props.history) {
      this.props.history.push('/page-blog-grid');
    }
  };

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
  

  render() {
    return (
      <React.Fragment>
        <Container className="mt-4 mt-lg-0">
          <Row className="align-items-center mb-4 pb-2">
            <Col md={8}>
              <div id="archiving-section" className="section-title text-center text-md-start">
                <h4 className="mb-4">VR 아카이빙</h4>
                <p className="text-muted mb-0 para-desc">
                  외국인은 국제법과
                  <span className="text-primary fw-bold">조약이 정하는</span>
                  바에 의하여 그 지위가 보장된다. 국민의 모든 자유와 권리는
                  국가안전보장·질서유지 또는 공공복리를 위하여 필요한 경우에
                  한하여 법률로
                </p>
              </div>
            </Col>
            <Col md={4} className="mt-4 mt-sm-0">
              <div className="text-center text-md-end">
                <Link
                  to="/page-blog-grid"
                  className="btn btn-soft-primary"
                  onClick={this.handleClick}
                >
                  더보기
                  <i>
                    <FeatherIcon icon="arrow-right" className="fea icon-sm" />
                  </i>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <BlogBox blogs={this.state.blogs} />
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
