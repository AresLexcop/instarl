import React from 'react';
import propTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';
import * as ROUTES from '../constants/route';

export default function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return (
            <Navigate
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location }
              }} replace
            />
          );
        }

        return null;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  user: propTypes.object,
  children: propTypes.object.isRequired
};
