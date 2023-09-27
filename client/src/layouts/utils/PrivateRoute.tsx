import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";


export type ProtectedRouteProps = {
    // isAuthenticated: boolean;
    // authenticationPath: string;
    component: JSX.Element;
};

export const PrivateRoute = ({ component }: ProtectedRouteProps) => {
    const { authState } = useOktaAuth();
    const navigate = useNavigate();
    if (!authState?.isAuthenticated) {
        if (!authState?.isPending) {
            navigate("/login");
        }
        return <React.Fragment>{component}</React.Fragment>
    }

    return authState?.isAuthenticated ? component : <Navigate to="/login" />;
}
