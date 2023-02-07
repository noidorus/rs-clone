import React, { Component, lazy } from 'react';
import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';

interface IProps {}

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));

class App extends Component {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
          </Routes>
        </Suspense>
      </Router>
    );
  }
}

export default App;
