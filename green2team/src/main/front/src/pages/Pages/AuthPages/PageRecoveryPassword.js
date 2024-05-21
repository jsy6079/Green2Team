// React Basic and Bootstrap
import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Label,
  Card,
  CardBody,
  FormFeedback,
  Input
} from "reactstrap";

//Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Icons
import FeatherIcon from "feather-icons-react";
import ThemeSwitcher from "../../../components/Layout/ThemeSwitcher";
// import images
import recoveryimg from "../../../assets/images/user/recovery.svg";

const PageRecoveryPassword = () => {

  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();



    const formData = new FormData(event.target);

   
    
    formData.get('email')
    console.log(formData.get('email'));
    

    try {
      const response = await axios.post('/api/newOne',formData);
      window.location.href = '/auth-login';
      console.log('이메일 ', response.data);
      
    } catch (error) {
        if (error.response) {
            const response = error.response.data
            const errorValue = response.error;
            console.log("로그인 에러 코드 : "+errorValue); 

            // 에러코드에 따른 메세지
            let message = '';
            if (errorValue === 21) {
              message = '입력된 이메일이 존재하지 않습니다.';
            }
            setErrorMessage(<span style={{ color: 'red', fontWeight: 'bold' }}>{message}</span>);
          } else {
            setErrorMessage('서버에 연결할 수 없습니다.');
          }
        }
      
      };



  // const validation = useFormik({
  //   enableReinitialize: true,

  //   initialValues: {
  //     email: "",
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  //   }),
  //   onSubmit: (values) => {
  //     // console.log(values)
  //   }
  // });

  return (
    <React.Fragment>
      <div className="back-to-home">
        <Link to="/" className="back-button btn btn-icon btn-primary">
          <i>
            <FeatherIcon icon="arrow-left" className="icons" />
          </i>
        </Link>
      </div>
      <section className="bg-home d-flex align-items-center">
        <Container>
          <Row className="align-items-center">
            <Col lg={7} md={6}>
              <div className="me-lg-5">
                <img
                  src={recoveryimg}
                  className="img-fluid d-block mx-auto"
                  alt=""
                />
              </div>
            </Col>
            <Col lg={5} md={6}>
              <Card className="shadow rounded border-0">
                <CardBody>
                  <h4 className="card-title text-center">계정 찾기</h4>

                  <form onSubmit={handleSubmit}  className="login-htmlForm mt-4" name="loginForm" id="asd">
                                          <div className="row">
                                              <div className="col-lg-12">
                                              <div className="mb-3">
                                      <Label className="form-label">
                                        이메일 주소 <span className="text-danger">*</span>
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
                                        type="email"
                                        className="form-control ps-5"
                                        name="email"
                                        id="email"
                                        placeholder="이메일을 입력하세요."
                                      />
                                    </div>
                                      </div>
                                        <div className="col-lg-12 mb-0">
                                            <div className="d-grid">
                                            {errorMessage && <div>{errorMessage}</div>}
                                                <button type="submit" className="btn btn-primary" >제출하기</button>
                                            </div>
                                        </div>
                                        <div className="col-12 text-center">
                                            <p className="mb-0 mt-3"><small className="text-dark me-2">비밀번호가 기억나셨나요?</small> <a href="/auth-signup" className="text-dark fw-bold">로그인</a></p>
                                        </div>
                                    </div>
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
                      <Col lg={12}>
                        <p className="text-muted">
                          Please enter your email address. You will receive a
                          link to create a new password via email.
                        </p>
                        <div className="mb-3">
                          <Label className="form-label" for="email">
                            Email address{" "}
                            <span className="text-danger">*</span>
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
                            placeholder="Enter Your Email Address"
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
                      <Col lg={12}>
                        <div className="d-grid">
                          <Button color="primary">
                            Send
                          </Button>
                        </div>
                      </Col>
                      <div className="mx-auto">
                        <p className="mb-0 mt-3">
                          <small className="text-dark me-2">
                            Remember your password ?
                          </small>{" "}
                          <Link
                            to="auth-login"
                            className="text-dark fw-bold"
                          >
                            Sign in
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
};
export default PageRecoveryPassword;
