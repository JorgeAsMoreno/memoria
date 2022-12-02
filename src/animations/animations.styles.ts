import styled, { keyframes } from "styled-components";

export const gradient = keyframes`
  0% {
    color: #cf59e6;
  }

  50% {
    color: #6bc5f8;
  }

  100% {
    color: #cf59e6;
  }
`;

export const gradientButton = keyframes`
  0% {
    background: #cf59e6;
  }

  50% {
    background: #6bc5f8;
  }

  100% {
    background: #cf59e6;
  }
`;

export const showBoard = keyframes`
  0% {
    margin-top: 120%;
  } 100% {
    margin-top: 0%;
  }
`