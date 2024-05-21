import React, { Suspense,useState, useEffect  } from "react";
import Layout from "./components/Layout/index";
import { Route, Routes, Navigate } from "react-router-dom";
import PageLogin from "./pages/Pages/AuthPages/PageLogin";
import axios from 'axios';

// Import Css
import "./assets/css/materialdesignicons.min.css";
import "./Apps.scss";

// Include Routes
import routes from "./routes/allRoutes";
import withRouter from "./common/data/withRouter";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null); // CSRF 토큰 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        // CSRF 토큰 요청
        const csrfResponse = await axios.get("/api/csrf");
        const csrf = csrfResponse.data;
        setCsrfToken(csrf.token);

        // 사용자 데이터 요청
        const userResponse = await axios.post("/api/user", null, {
          headers: {
            [csrf.headerName]: csrf.token // CSRF 토큰을 요청 헤더에 추가
          }
        });
        setUserRole(userResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error("사용자 데이터 가져오기 오류:", error);
        setIsLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
        // 오류를 적절하게 처리합니다.
      }
    };
    fetchData();
  }, []); // useEffect를 컴포넌트가 처음 마운트될 때만 실행하도록 설정

  const hasAccess = (route) => {
    if (isLoading || !userRole) {
      return false;
    }
    
    return (
      route.requiredRole === undefined ||
      route.requiredRole.includes(userRole.role)
    );
  };

  const LoaderComponent = () => (
    <div id="loading">
      <div id="status">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {isLoading ? <LoaderComponent /> : (
        <Suspense fallback={<LoaderComponent />}>
          <Routes>
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={
                  !hasAccess(route) ? (
                    <Navigate to="/auth-login" replace />
                  ) : route.isWithoutLayout ? (
                    route.component
                  ) : (
                    <Layout hasDarkTopBar={route.isTopbarDark}>
                      {route.component}
                    </Layout>
                  )
                }
              />
            ))}
          </Routes>
        </Suspense>
      )}
    </React.Fragment>
  );
};

export default withRouter(App);