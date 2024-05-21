// React Basic and Bootstrap
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Card,
  CardBody,
  FormFeedback
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Icons
import FeatherIcon from "feather-icons-react";
import ThemeSwitcher from "../../../components/Layout/ThemeSwitcher";
// import images
import signup from "../../../assets/images/user/signup.svg";
import kakao from "../../../assets/images/user/kakao.png";

const PageSignUp = () => {

  const [errMsgId, setErrMsgId] = useState('');
  const [errMsgEmail, setErrMsgEmail] = useState('');
  const [errMsgPw, setErrMsgPw] = useState('');
  const [errMsgJoin, setErrMsgJoin] = useState('');
  const [Id, setId] = useState('');
  const [Email, setEmail] = useState('');
  const [Pw, setPw] = useState('');
  const [agree, setAgree] = useState(false);

  const handleAgreeChange = (event) => {
    //setAgree(event.target.checked); // 체크 상태를 업데이트
    if(agree){
      setAgree(false);
      
    }else{
      setAgree(true);
      // setAgree(event.target.checked);
      setErrMsgJoin();
    }
  };

  async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest('SHA-256', data);
  
  // 해시 값을 16진수 문자열로 변환
  return Array.from(new Uint8Array(hash))
    .map(byte => ('0' + byte.toString(16)).slice(-2))
    .join('');
  }


  // 아이디 검증 문구
  function onlyNumberAndEnglish(str) {
    return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
  }

  
  async function stop(){
    const username = document.getElementById("username").value;
    try {
      const response = await axios.post('/api/id', { username:username}, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const result = response.data.success;
      console.log(result);
      return result; // response.data.success 값에 따라 true 또는 false를 반환
  } catch (error) {
      console.error('에러 발생: ', error);
      // 에러 처리
      return false; // 에러 발생 시 false 반환
  }
}

  const usernameChk = async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    let message1 = '';
    if(username==''){
      message1 = '아이디를 입력하세요.';
      setErrMsgId(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
      setId(false);
    } else if (onlyNumberAndEnglish(username) === false) {
      message1 = '올바르지 않은 아이디 형식입니다';
      setErrMsgId(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
      setId(false);
    }else {
        const stopResult = await stop();
        if (stopResult) {
            message1 = '이미 존재하는 아이디입니다.';
            setErrMsgId(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
            setId(false);
        } else {
            message1 = '사용 가능한 아이디입니다.';
            setErrMsgId(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
            setId(true);
            setErrMsgJoin();
        }
    }
};




  // 이메일 검증 문구

function validateEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}



  async function stopE(){
    const email = document.getElementById("email").value;
    try {
      const response = await axios.post('/api/email', { email:email}, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const result = response.data.success;
      console.log(result);
      return result; // response.data.success 값에 따라 true 또는 false를 반환
  } catch (error) {
      console.error('에러 발생: ', error);
      // 에러 처리
      return false; // 에러 발생 시 false 반환
  }
}

  const emailChk = async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    let message1 = '';
    if(email==''){
      message1 = '이메일을 입력하세요.';
      setErrMsgEmail(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
      setEmail(false);
    } else if (validateEmail(email) === false) {
          message1 = '올바르지 않은 이메일 형식입니다.';
          setErrMsgEmail(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
          setEmail(false);
    }else {
        const stopResult = await stopE();
        if (stopResult) {
            message1 = '이미 가입된 이메일입니다.';
            setErrMsgEmail(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
            setEmail(false);
        } else {
            message1 = '사용 가능한 이메일입니다.';
            setErrMsgEmail(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
            setEmail(true);
            setErrMsgJoin();
        }
    }
};


  // 비밀번호 검증 문구
  
  function validatePw(password) {
    return /^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/.test(password);
  }
  
  
    const passwordChk = async (event) => {
      event.preventDefault();
      const password = document.getElementById("password").value;
      let message1 = '';
      if(password==''){
        message1 = '비밀번호를 입력하세요.';
        setErrMsgPw(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
        setPw(false);
      } else if (validatePw(password) === false) {
            message1 = '비밀번호에는 특수문자가 포함되어야 합니다.';
            setErrMsgPw(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
            setPw(false);
      }else {
            message1 = '사용 가능한 비밀번호입니다.';
            setErrMsgPw(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
            setPw(true);
            setErrMsgJoin();
      }
  };


  // 전체 submit 핸들러

  const handleSubmit = async (event) => {
    event.preventDefault();

    let message1 = '';
    const formData = new FormData(event.target);
    if(Id==false){
      message1 = '아이디 입력창을 확인해주세요.';
      setErrMsgJoin(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
    }else if(Email==false){
      message1 = '이메일 입력창을 확인해주세요.';
      setErrMsgJoin(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
    }else if(Pw==false){
      message1 = '비밀번호 입력창을 확인해주세요.';
      setErrMsgJoin(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
    }else if(agree == false){
      message1 = '약관을 확인해주세요.';
      setErrMsgJoin(<span style={{ color: 'red', fontWeight: 'bold' }}>{message1}</span>);
    }else{

      const password = formData.get('password');
      const hashedPassword = await sha256(password);
      formData.set('password', hashedPassword);

      try {
        const response = await axios.post('/api/newMember',formData);
        console.log('회원가입 성공: ', response.data);
        alert('이메일 인증메일이 발송되었습니다. 인증 후 로그인을 해주세요.');
        window.location.href = "/index-blog";
      } catch (error) {
          if (error.response) {
              const response = error.response.data
              const errorValue = response.error;
              console.log("로그인 에러 코드 : "+errorValue); 
  
              // 에러코드에 따른 메세지
              if (errorValue === 1) {
                alert('정상적이지 않은 접근입니다.');
              }
            } else {
              alert('서버에 연결할 수 없습니다.');
            }
          }
    }
  };




  return (
    <React.Fragment>
      <div className="back-to-home">
        <Link to="/" className="back-button btn btn-icon btn-primary">
          <i>
            <FeatherIcon icon="arrow-left" className="icons" />
          </i>
        </Link>
      </div>
      <section className="bg-auth-home d-table w-100">
        <Container>
          <Row className="align-items-center">
            <Col lg={7} md={6}>
              <div className="me-lg-5">
                <img
                  src={signup}
                  className="img-fluid d-block mx-auto"
                  alt=""
                />
              </div>
            </Col>
            <Col lg={5} md={6}>
              <Card className="shadow rounded border-0">
                <CardBody>
                  <h4 className="card-title text-center">회원 가입</h4>

                  <form onSubmit={handleSubmit}   className="login-htmlForm mt-4" name="loginForm" id="asd">
                                          <div className="row">
                                              <div className="col-lg-12">
                                              <div className="mb-3">
                                      <Label className="form-label" htmlFor="username" >
                                        ID/아이디 <span className="text-danger">*</span>{errMsgId && <div>{errMsgId}</div>}
                                      </Label>
                                      <div className="form-icon position-relative">
                                        <i>
                                          <FeatherIcon
                                            icon="user"
                                            className="fea icon-sm icons"
                                          />
                                        </i>
                                      </div>
                                      <Input
                                        type="text"
                                        className="form-control ps-5"
                                        name="username"
                                        id="username"
                                        placeholder="ID"
                                        onBlur={usernameChk}
                                        
                                      />
                                    </div>
                                      </div>
                                      <div className="col-lg-12">
                                              <div className="mb-3">
                                      <Label className="form-label" htmlFor="email" >
                                        Email/이메일 인증 <span className="text-danger">*</span>{errMsgEmail && <div>{errMsgEmail}</div>}
                                      </Label>
                                      <div className="form-icon position-relative">
                                        <i>
                                          <FeatherIcon
                                            icon="mail"
                                            className="fea icon-sm icons"
                                          />
                                        </i>
                                      </div>
                                      <Input
                                        type="text"
                                        className="form-control ps-5"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        onBlur={emailChk}
                                        
                                        
                                      />
                                    </div>
                                      </div>

                                      <div className="mb-3">
                                <Label className="form-label" htmlFor="password">
                                Password/비밀번호 <span className="text-danger">*</span>{errMsgPw && <div>{errMsgPw}</div>}
                                </Label>
                                <div className="form-icon position-relative">
                                  <i>
                                    <FeatherIcon
                                      icon="key"
                                      className="fea icon-sm icons"
                                    />
                                  </i>
                                </div>
                                <Input
                                  type="password"
                                  className="form-control ps-5"
                                  name="password"
                                  id="password"
                                  placeholder="Password" 
                                  onBlur={passwordChk}                           
                                />
                              </div>
                                        <div className="col-lg-12">
                                            <div className="d-flex justify-content-between">
                                                <div className="mb-3">
                                                    <div className="htmlForm-check">
                                                        <input className="htmlForm-check-input" type="checkbox" value="" id="agree" name="agree" checked={agree} onChange={handleAgreeChange}  />
                                                        <label className="htmlForm-check-label" htmlFor="flexCheckDefault">약관 동의</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-0">
                                            <div className="d-grid">
                                                    {errMsgJoin && <div>{errMsgJoin}</div>}
                                                <button type="submit" className="btn btn-primary" >회원 가입</button>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mt-4 text-center">
                                            <h6>소셜 회원 가입</h6>
                                            <div className="row">
                                                <div className="col-6 mt-3">
                                                    <div className="d-grid">
                                                      <a href="http://localhost:8080/oauth2/authorization/kakao" className="btn btn-light">
                                                          <img src={kakao} alt="Kakao" className="mr-2" /> 카카오톡
                                                      </a>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-6 mt-3">
                                                    <div className="d-grid">
                                                        <a href="http://localhost:8080/oauth2/authorization/google" className="btn btn-light"><i className="mdi mdi-google text-danger"></i> 구글</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 text-center">
                                            <p className="mb-0 mt-3"><small className="text-dark me-2">이미 아이디가 있으신가요?</small> <a href="/auth-login" className="text-dark fw-bold">로그인</a></p>
                                        </div>
                                    </div>
                                    <input type="hidden" value="false" id="username_chk" name="username_chk"></input>
                                    <input type="hidden" value="false" id="email_chk" name="email_chk"></input>
                                    <input type="hidden" value="false" id="password_chk" name="password_chk"></input>
                                </form>
                  
                  {/* <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                    className="login-form mt-4"
                  >
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="firstname">
                            First name <span className="text-danger">*</span>
                          </Label>
                          <div className="form-icon position-relative">
                            <i>
                              <FeatherIcon
                                icon="user"
                                className="fea icon-sm icons"
                              />
                            </i>
                          </div>
                          <Input
                            type="text"
                            className="form-control ps-5"
                            name="firstname"
                            id="firstname"
                            placeholder="First Name"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.firstname || ""}
                            invalid={
                              validation.touched.firstname && validation.errors.firstname ? true : false
                            }
                          />
                          {validation.touched.firstname && validation.errors.firstname ? (
                            <FormFeedback type="invalid">{validation.errors.firstname}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="lastname">
                            Last name <span className="text-danger">*</span>
                          </Label>
                          <div className="form-icon position-relative">
                            <i>
                              <FeatherIcon
                                icon="user-check"
                                className="fea icon-sm icons"
                              />
                            </i>
                          </div>
                          <Input
                            type="text"
                            className="form-control ps-5"
                            name="lastname"
                            id="lastname"
                            placeholder="Last Name"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.lastname || ""}
                            invalid={
                              validation.touched.lastname && validation.errors.lastname ? true : false
                            }
                          />
                          {validation.touched.lastname && validation.errors.lastname ? (
                            <FormFeedback type="invalid">{validation.errors.lastname}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md="12">
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="email">
                            Your Email <span className="text-danger">*</span>
                          </Label>
                          <div className="form-icon position-relative">
                            <i>
                              <FeatherIcon
                                icon="mail"
                                className="fea icon-sm icons"
                              />
                            </i>
                          </div>
                          <Input
                            type="text"
                            className="form-control ps-5"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email && validation.errors.email ? true : false
                            }
                          />
                          {validation.touched.email && validation.errors.email ? (
                            <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col md={12}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="password">
                            Password <span className="text-danger">*</span>
                          </Label>
                          <div className="form-icon position-relative">
                            <i>
                              <FeatherIcon
                                icon="key"
                                className="fea icon-sm icons"
                              />
                            </i>
                          </div>
                          <Input
                            type="password"
                            className="form-control ps-5"
                            name="password"
                            id="password"
                            placeholder="password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
                            invalid={
                              validation.touched.password && validation.errors.password ? true : false
                            }
                          />
                          {validation.touched.password && validation.errors.password ? (
                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>

                      <Col md={12}>
                        <div className="mb-3">
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="flexCheckDefault"
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              I Accept{" "}
                              <Link to="#" className="text-primary">
                                Terms And Condition
                              </Link>
                            </Label>
                          </div>
                        </div>
                      </Col>
                      <Col md={12}>
                        <div className="d-grid">
                          <Button color="primary">
                            Register
                          </Button>
                        </div>
                      </Col>
                      <Col md={12} className="mt-4 text-center">
                        <h6>Or Signup With</h6>
                        <Row>
                          <Col className="col-6 mt-3">
                            <div className="d-grid">
                              <Link to="#" className="btn btn-light"><i className="mdi mdi-facebook text-primary"></i> Facebook</Link>
                            </div>
                          </Col>

                          <Col className="col-6 mt-3">
                            <div className="d-grid">
                              <Link to="#" className="btn btn-light"><i className="mdi mdi-google text-danger"></i> Google</Link>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <div className="mx-auto">
                        <p className="mb-0 mt-3">
                          <small className="text-dark me-2">
                            Already have an account ?
                          </small>{" "}
                          <Link
                            to="/auth-login"
                            className="text-dark fw-bold"
                          >
                            Sign In
                          </Link>
                        </p>
                      </div>
                    </Row>
                  </Form> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>


    </React.Fragment>
  );
}
export default PageSignUp;
