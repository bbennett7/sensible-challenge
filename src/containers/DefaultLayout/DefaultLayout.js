import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styles from './DefaultLayout.module.scss';
import RouteConfig from '../../router/RouteConfig';

const DefaultLayout = () => {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Switch>
          {RouteConfig.map((route) => {
            return (
              <Route
                key={route.path}
                exact={route.exact}
                path={route.path}
                name={route.name}
                component={route.component}
              />
            );
          })}

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default DefaultLayout;
