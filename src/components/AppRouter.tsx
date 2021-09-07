import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { privateRoutes, publicRoutes, RouteName } from "../routes";
import { useTypesSelector } from "../hooks/useTypedSelector";

const AppRouter = () => {


 const {isAuth} = useTypesSelector(state => state.auth)


  return isAuth ? (
    <Switch>
      {privateRoutes.map((router) => (
        <Route
          path={router.path}
          exact={router.exact}
          component={router.component}
          key={router.path}
        />
      ))}
      <Redirect to={RouteName.EVENT} /> 
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map((router) => (
        <Route
          path={router.path}
          exact={router.exact}
          component={router.component}
          key={router.path}
        />
      ))}
       <Redirect to={RouteName.LOGIN} /> 
    </Switch>
  );
};

export default AppRouter;
