import React, { FunctionComponent } from 'react';
import { Global, css } from '@emotion/react';

const defaultStyle = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Netflix Sans, Ubuntu, -apple-system, BlinkMacSystemFont,
      Segoe UI, Poppins, Roboto, Helvetica Neue, sans-serif;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
  }

  menu,
  ol,
  ul {
    list-style: none;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .blind {
    overflow: hidden;
    position: absolute;
    left: -999px;
    width: 1px;
    height: 1px;
    white-space: nowrap;
    line-height: 999px;
  }

  @media (max-width: 768px) {
    html,
    body {
      font-size: 10px;
    }
  }
`;

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />;
};

export default GlobalStyle;
