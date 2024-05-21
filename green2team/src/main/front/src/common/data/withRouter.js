import React from "react";
import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <React.Fragment>
                <Component
                    {...props}
                    router={{ location, navigate, params }}
                />
            </React.Fragment>
        );
    }

    return ComponentWithRouterProp;
}

export default withRouter;