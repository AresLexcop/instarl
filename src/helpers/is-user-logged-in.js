import React from 'react';
import propTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';
import * as ROUTES from '../constants/route';

export default function IsUserLoggedIn({ user, LoggedInPath, children, ...rest }) {
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
                pathname: LoggedInPath,
                state: { from: location }
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

IsUserLoggedIn.propTypes = {
  LoggedInPath: propTypes.string.isRequired,
  user: propTypes.object,
  children: propTypes.object.isRequired
};
