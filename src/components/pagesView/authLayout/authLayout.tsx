import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

interface AuthViewProps {
  children: JSX.Element;
  route: string;
  text: string;
  linkText: string;
}

const AuthLayout = ({ children, route, text, linkText }: AuthViewProps) => {
  return (
    <main className="auth-layout">
      <div className="auth-layout__wrapper">
        <div className="auth-layout__image">
          <img
            className="auth-image__item auth-image__item--slide1"
            src="./images/login-img1.png"
            alt="Iphone with Instagram"
            width="250"
          />
          <img
            className="auth-image__item auth-image__item--slide2"
            src="./images/login-img2.png"
            alt="Iphone with Instagram"
            width="250"
          />
          <img
            className="auth-image__item auth-image__item--slide3"
            src="./images/login-img3.png"
            alt="Iphone with Instagram"
            width="250"
          />
          <img
            className="auth-image__item auth-image__item--slide4"
            src="./images/login-img4.png"
            alt="Iphone with Instagram"
            width="250"
          />
        </div>

        <div className="auth-layout__content">
          <div className="auth-layout__container">
            <header className="auth-layout__header">
              <h1 className="auth-layout__title visually-hidden">Instagram</h1>
              <img
                className="auth-header__logo"
                src="./images/logo.png"
                alt="Instagram logo"
                width="175"
                height="51"
              />
              {linkText === 'Sign In' && (
                <h2 className="auth-header__text">
                  Sign up to see photos and videos from your friends.
                </h2>
              )}
            </header>
            {children}
          </div>
          <div className="auth-layout__container">
            <p className="auth-layout__link">
              {text}
              <Link className="link" to={route}>
                {linkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <footer className="auth-layout__footer">
        <ul className="owners__list">
          <li className="owners__list-item">
            <a
              className="owners__list-link"
              href="https://github.com/huffpufftuff"
            >
              <img src="./images/github.svg" width="16" height="16" />
              <span>HuffPuffTuff</span>
            </a>
          </li>
          <li className="owners__list-item">
            <a className="owners__list-link" href="https://github.com/szyrwel">
              <img src="./images/github.svg" width="16" height="16" />
              <span>Szyrwel</span>
            </a>
          </li>
          <li className="owners__list-item">
            <a className="owners__list-link" href="https://github.com/sid-inc">
              <img src="./images/github.svg" width="16" height="16" />
              <span>Sid-inc</span>
            </a>
          </li>
        </ul>
        <span> © 2023 Instagram from RSSchool </span>
        <a className="rs-logo__link" href="https://rs.school">
          <img
            className="rs-logo__image"
            src="./images/rs_school_js.svg"
            alt="rs school"
            width="80"
            height="29"
          />
        </a>
      </footer>
    </main>
  );
};

export default AuthLayout;
