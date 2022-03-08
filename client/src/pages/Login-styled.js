import styled from "styled-components";

export const LoginPage = styled.div`
  background-color: #fff;
`;

export const Header = styled.div`
  width: 100%;
  background: #fff;
  text-align: center;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);

  span {
    display: inline-block;
    letter-spacing: -2px;
    font-weight: 500;
    font-size: 30px;
    user-select: none;
    color: #2fe070;
    padding: 20px 0;
  }
`;

export const FormSection = styled.div`
  height: 60vh;
  //   text-align: center;
  width: 50vh;
  margin: auto;

  span {
    display: block;
  }

  .login-title {
    text-align: center;
    font-size: 35px;
    font-weight: 700;
    margin: 20px 0;
  }

  Label {
    display: block;
    text-align: left;
    font-size: 18px;
  }

  input {
    width: 100%;
    height: 40px;
    font-size: 18px;
    margin: 10px 0;
    padding: 0 10px;
    border: 1px solid #a5a5a5;
    border-radius: 13px;

    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #a5a5a5;
      font-size: 16px;
      font-weight: 300;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #a5a5a5;
      font-size: 16px;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: #a5a5a5;
      font-size: 16px;
    }
  }

  input:focus {
    border: 2px solid #2fe070;
  }

  input[type="checkbox"] {
    width: 16px;
    height: auto;
    margin: 0;
  }

  .remember-me-label {
    text-align: left;
    display: inline;
    width: auto;
    font-size: 16px;
  }

  .forgot-password {
      font-size 16px;
      color: #000;
  }

  .forgot-password:active {
      color: #2fe070;
  }

  .btn-short {
    background-color: #2fe070;
    // background-image: linear-gradient(40deg, #0bbfbf 0%, #2fe070 74%);

    width: 50%;
    display: block;
    margin: 30px auto 0;
    border: 0;
    color: #fff;
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 3px;
    border-radius: 30px;
    text-transform: uppercase;
    transition: all 0.15s ease-in-out;
  }

  .btn-short:hover {
    background-color: #2bcc66;
    // background-image: linear-gradient(40deg, #2fe070 0%, #0bbfbf 74%);
  }

  hr {
    margin: 20px 0;
    border: 0;
    border-top: 1px solid #ccc;
  }

  //////// Third Party Sign in ///////////////////////////////////////

  button.btn-long {
    width: 100%;
    display: block;
    margin: 10px auto 0;
    border: 0;
    color: #fff;
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 3px;
    border-radius: 30px;
    text-transform: uppercase;
    transition: all 0.15s ease-in-out;
  }

  .icon {
    margin-right: 15px;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.5);
  }

  button:active {
    transform: translateY(0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }

  button.btn-long:active {
    background-color: #adadad;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
