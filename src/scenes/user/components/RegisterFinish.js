import React from "react"
import {Link} from "react-router-dom"
import styled from "react-emotion"
import display from "../../../styles/display"

export default class RegisterFinish extends React.Component {
  render() {
    return (
      <RegisterFinishWrapper>
        <RegisterFinishLabel>登録が完了しました</RegisterFinishLabel>
        <LoginLinkWrapper to={"/login"}>
          <LoginLink>
            今すぐログイン
          </LoginLink>
        </LoginLinkWrapper>
      </RegisterFinishWrapper>
    )
  }
}

const RegisterFinishWrapper = styled("div")`
  width: 450px;
  padding: 20px;
  margin: 0 auto;
  margin-top: 100px;
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    box-shadow: none;
    width: unset;
    margin-top: unset;
  }
  
`;

const RegisterFinishLabel = styled("div")`
  font-size: 20px;
  color: orange;
  text-align: center;
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    font-size: 17px;
    margin-top: 30px;
  }
`;

const LoginLinkWrapper = styled(Link)`

`;

const LoginLink = styled("div")`
  color: white;
  width: 40%;
  text-align: center;
  font-size: 14px;
  display: block;
  padding: 5px 12px;
  margin: 40px auto 0px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  background-color: rgb(255, 152, 0);
  border-radius: 2px;
  border: 10px;
  outline: none;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  transition-property: all;
  transition-duration: 450ms;
  transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  transition-delay: 0ms;
  :hover {
    background-color: rgb(255, 152, 0, 0.9);
  }
  :active {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 8px, rgba(0, 0, 0, 0.23) 0px 1px 8px;
    background-color: rgb(255, 152, 0, 0.8);

  }
`;

