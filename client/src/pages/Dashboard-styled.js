import styled from "styled-components";

///// Media Query /////

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(max-width: ${size.mobileM}) and (min-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileL}) and (min-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.tablet}) and (min-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.laptop}) and (min-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptopL}) and (min-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.desktop}) and (min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
};

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`;
