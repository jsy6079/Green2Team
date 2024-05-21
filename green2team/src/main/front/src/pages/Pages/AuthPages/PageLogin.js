// React Basic and Bootstrap
import React, { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Input,
  Label,
} from "reactstrap";

import logoDark from "../../../assets/images/logo-dark.png";
import logoLight from "../../../assets/images/logo-light.png";
import rtl from "../../../assets/images/demos/rtl.png";
import dark from "../../../assets/images/demos/dark.png";
import ltr from "../../../assets/images/demos/ltr.png";
import darkrtl from "../../../assets/images/demos/dark-rtl.png";
import admin from "../../../assets/images/demos/admin.png";
import kakao from "../../../assets/images/user/kakao.png";
import login from "../../../assets/images/user/login.svg";




const PageLogin = () => {

//   const navigate = useNavigate();
const [rememberId, setRememberId] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [username, setUsername] = useState('');


useEffect(() => {
  const rememberedUsername = localStorage.getItem('rememberedUsername');
  if (rememberedUsername) {
    setUsername(rememberedUsername);
    setRememberId(true);
  }
}, []);

  async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest('SHA-256', data);
  
  // 해시 값을 16진수 문자열로 변환
  return Array.from(new Uint8Array(hash))
    .map(byte => ('0' + byte.toString(16)).slice(-2))
    .join('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();


    const formData = new FormData(event.target);
    const password = formData.get('password');
    const hashedPassword = await sha256(password);
    formData.set('password', hashedPassword);


    try {
      const response = await axios.post('/api/login',formData);
      console.log('로그인 성공: ', response.data);
      const role = response.data.role;



      // 아이디 저장 기능 추가
      var rememberId = document.getElementById('rememberId').checked;
      if (rememberId) {
        const username = formData.get('username');
        localStorage.setItem('rememberedUsername', username);
      } else if (!rememberId) {
        localStorage.removeItem('rememberedUsername');
      }

 

    // 역할에 따라 페이지 이동
    if (role === "ROLE_ADMIN" || role === "ROLE_BOARD" || role === "ROLE_TRADER") {
        // 관리자인 경우 page-chat 페이지로 이동
        window.location.href = "/page-chat";
      } else {
        // 관리자가 아닌 경우 index-blog 페이지로 이동
        window.location.href = "/index-blog";
      }
    } catch (error) {
        if (error.response) {
            const response = error.response.data
            const errorValue = response.error;
            console.log("로그인 에러 코드 : "+errorValue); 

            // 에러코드에 따른 메세지
            let message = '';
            if (errorValue === 1) {
              message = '아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해주세요.';
            } else if (errorValue === 2) {
              message = '아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해주세요.';
            }else if (errorValue === 3) {
                message = '내부 시스템 문제로 로그인 요청을 처리할 수 없습니다. 관리자에게 문의하세요.';
            }else if (errorValue === 4) {
                message = '인증 요청이 거부되었습니다. 관리자에게 문의하세요.';
            }else if (errorValue === 5) {
                message = '알 수 없는 오류로 로그인 요청을 처리할 수 없습니다. 관리자에게 문의하세요.';
            }else if (errorValue === 11) {
                message = '인증되지 않은 계정입니다. 이메일 인증을 진행해주세요.';
            }
            setErrorMessage(<span style={{ color: 'red', fontWeight: 'bold' }}>{message}</span>);
          } else {
            setErrorMessage('서버에 연결할 수 없습니다.');
          }
        }
      
      };

      const handleRememberIdChange = () => {
        setRememberId(!rememberId);
      };

  return (
    <React.Fragment>    
        <section className="bg-home d-flex align-items-center">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7 col-md-6">
                        <div className="me-lg-5">   
                            <img src={login} className="img-fluid d-block mx-auto" alt=""/>
                        </div>
                    </div>
                          <div className="col-lg-5 col-md-6">
                              <div className="card login-page shadow rounded border-0">
                                  <div className="card-body">
                                      <h4 className="card-title text-center">로그인</h4>  
                                      <form onSubmit={handleSubmit}  className="login-htmlForm mt-4" name="loginForm" id="asd">
                                          <div className="row">
                                              <div className="col-lg-12">
                                              <div className="mb-3">
                                      <Label className="form-label" htmlFor="username">
                                        ID/아이디 <span className="text-danger">*</span>
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
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                      />
                                    </div>
                                      </div>

                                      <div className="mb-3">
                                <Label className="form-label" htmlFor="password">
                                Password/비밀번호 <span className="text-danger">*</span>
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
                                />
                              </div>
                                        <div className="col-lg-12">
                                            <div className="d-flex justify-content-between">
                                                <div className="mb-3">
                                                    <div className="htmlForm-check">
                                                        <input className="htmlForm-check-input" type="checkbox" value="" id="rememberId" name="rememberId" defaultChecked={false} onChange={handleRememberIdChange}  />
                                                        <label className="htmlForm-check-label" htmlFor="flexCheckDefault">아이디 저장</label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="htmlForm-check">
                                                        <input className="htmlForm-check-input" type="checkbox" id="remember-me" name="remember-me" defaultChecked={false}/>
                                                        <label className="htmlForm-check-label" htmlFor="flexCheckDefault">로그인 상태 유지</label>
                                                    </div>
                                                </div>
                                                <p className="htmlForgot-pass mb-0"><a href="/auth-re-password" className="text-dark fw-bold">비밀번호 찾기</a></p>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-0">
                                            <div className="d-grid">
                                                    {errorMessage && <div>{errorMessage}</div>}
                                                <button type="submit" className="btn btn-primary" >로그인</button>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mt-4 text-center">
                                            <h6>소셜 로그인</h6>
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
                                            <p className="mb-0 mt-3"><small className="text-dark me-2">아이디가 없으신가요?</small> <a href="/auth-signup" className="text-dark fw-bold">가입하기</a></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div> 
                </div>
            </div> 
        </section>

        <div className="offcanvas offcanvas-start shadow border-0" tabIndex="-1" id="switcher-sidebar" aria-labelledby="offcanvasLeftLabel">
            <div className="offcanvas-header p-4 border-bottom">
                <h5 id="offcanvasLeftLabel" className="mb-0">
                    <img src={logoDark} height="24" className="light-version" alt=""/>
                    <img src={logoLight} height="24" className="dark-version" alt=""/>
                </h5>
                <button type="button" className="btn-close d-flex align-items-center text-dark" data-bs-dismiss="offcanvas" aria-label="Close"><i className="uil uil-times fs-4"></i></button>
            </div>
            <div className="offcanvas-body p-4 pb-0">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center">
                            <h6 className="fw-bold">Select your color</h6>
                            <ul className="pattern mb-0 mt-3">
                                <li>
                                    <a className="color-list rounded color1" href="javascript: void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Primary" onClick="setColorPrimary()"></a>
                                </li>
                                <li>
                                    <a className="color-list rounded color2" href="javascript: void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Green" onClick="setColor('green')"></a>
                                </li>
                                <li>
                                    <a className="color-list rounded color3" href="javascript: void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Yellow" onClick="setColor('yellow')"></a>
                                </li>
                            </ul>
                        </div>
                        <div className="text-center mt-4 pt-4 border-top">
                            <h6 className="fw-bold">Theme Options</h6>

                            <ul className="text-center style-switcher list-unstyled mt-4">
                                <li className="d-grid"><a href="javascript:void(0)" className="rtl-version t-rtl-light" onClick="setTheme('style-rtl')"><img src={rtl} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '240px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">RTL Version</span></a></li>
                                    <li className="d-grid"><a href="javascript:void(0)" className="ltr-version t-ltr-light" onClick="setTheme('style')"><img src={rtl} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '240px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">LTR Version</span></a></li>
                                    <li className="d-grid"><a href="javascript:void(0)" className="dark-rtl-version t-rtl-dark" onClick="setTheme('style-dark-rtl')"><img src={darkrtl} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '240px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">RTL Version</span></a></li>
                                    <li className="d-grid"><a href="javascript:void(0)" className="dark-ltr-version t-ltr-dark" onClick="setTheme('style-dark')"><img src={dark} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '240px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">LTR Version</span></a></li>
                                    <li className="d-grid"><a href="javascript:void(0)" className="dark-version t-dark mt-4" onClick="setTheme('style-dark')"><img src={dark} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '240px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">Dark Version</span></a></li>
                                    <li className="d-grid"><a href="javascript:void(0)" className="light-version t-light mt-4" onClick="setTheme('style')"><img src={ltr} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '240px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">Light Version</span></a></li>
                                <li className="d-grid"><a href="../../dashboard/dist/index.html" target="_blank" rel="noreferrer" className="mt-4"><img src={admin} className="img-fluid rounded-md shadow-md d-block mx-auto" style={{ width: '240px' }} alt=""/><span className="text-dark fw-medium mt-3 d-block">Admin Dashboard</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="offcanvas-footer p-4 border-top text-center">
                <ul className="list-unstyled social-icon social mb-0">
                    <li className="list-inline-item mb-0"><a href="https://1.envato.market/landrick" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-shopping-cart align-middle" title="Buy Now"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="https://dribbble.com/shreethemes" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-dribbble align-middle" title="dribbble"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="https://www.behance.net/shreethemes" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-behance align-middle" title="behance"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="https://www.facebook.com/shreethemes" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-facebook-f align-middle" title="facebook"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="https://www.instagram.com/shreethemes/" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-instagram align-middle" title="instagram"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="https://twitter.com/shreethemes" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-twitter align-middle" title="twitter"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="mailto:support@shreethemes.in" className="rounded"><i className="uil uil-envelope align-middle" title="email"></i></a></li>
                    <li className="list-inline-item mb-0"><a href="https://shreethemes.in" target="_blank" rel="noreferrer" className="rounded"><i className="uil uil-globe align-middle" title="website"></i></a></li>
                </ul>
            </div>
        </div>
    </React.Fragment>
  );

}
export default PageLogin;
