import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, UNSAFE_RouteContext } from 'react-router-dom';
import * as ROUTES from './constants/route';
// const Login = lazy(() => import ( './pages/login'));
import Login from './pages/login';
import SignUp from './pages/signup';
import DashBoard from './pages/dashboard';
import Not_Found from './pages/not-found';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';

import ProtectedRoute from './helpers/protected-route';
import IsUserLoggedIn from './helpers/is-user-logged-in';
import Profile from './pages/profile';


function App() {
  const { user } = useAuthListener();
  // console.log('a', user);
  return (
    <UserContext.Provider value = {{ user }}>
    <Router>
      <Suspense fallback={<p>Loading....</p>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={user? (<DashBoard />):(<Login />)} />
          <Route path={ROUTES.SIGN_UP} element={user? (<DashBoard />):(<SignUp />)} />
          <Route path={ROUTES.DASHBOARD} element={user? (<DashBoard />):(<Login />)} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path="*" element={<Not_Found />} />
        </Routes>
      </Suspense>
    </Router>
  </UserContext.Provider>
  ); 
}
export default App;
