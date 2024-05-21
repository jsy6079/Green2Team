import React, { Component } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link } from "react-router-dom";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "" // 검색어 상태 초기화
    };
  }

  // 입력 필드 값이 변경될 때 호출되는 메서드
  handleInputChange = (e) => {
    this.setState({ searchText: e.target.value }); // 입력된 검색어를 상태에 설정
  };

  // 검색 폼을 제출할 때 호출되는 메서드
  handleSubmit = (e) => {
    e.preventDefault(); // 기본 제출 동작 방지
    const { searchText } = this.state;
    // 검색어가 입력되었는지 확인
    if (searchText.trim() !== "") {
      // 검색어가 입력되었으면, 해당 검색어를 사용하여 페이지 이동 URL 생성
      const url = `/page-all-cases-search/${searchText}`;
      console.log(searchText);
      // 페이지 이동
      window.location.href = url;
    } else {
      // 검색어가 입력되지 않았을 때 처리할 로직
      alert("검색어를 입력하세요.");
    }
  };

  render() {
    const { searchText } = this.state; // 검색어 상태 가져오기

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col lg={12}>
              <div className="features-absolute blog-search">
                <Row className="justify-content-center">
                  <Col md={10}>
                    <div className="subcribe-form">
                      <Form style={{ maxWidth: "800px" }} onSubmit={this.handleSubmit}>
                        <FormGroup>
                          <input
                            type="text"
                            id="course"
                            name="name"
                            className="rounded-pill shadow-md bg-white"
                            placeholder="Search keywords..."
                            value={searchText}
                            onChange={this.handleInputChange} // 입력 필드 값 변경 시 호출되는 메서드
                          />
                          <Button
                            type="submit"
                            color="primary"
                            className="btn btn-pills"
                          >
                            Search
                          </Button>
                        </FormGroup>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}