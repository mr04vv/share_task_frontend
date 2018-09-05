import React from "react"
import { withRouter } from "react-router";
import styled from "react-emotion"
import {connect} from "react-redux";

import TextInput from "../../../components/TextInput/TextInput"
import {loginAction} from "../../../redux/modules/users/userLogin";
import display from "../../../styles/display"
import {Link} from "react-router-dom";

const requiredError = "必須項目です";
const passwordError = "8文字以上のパスワードが使用可能です";
const patternError = "半角英数字のみ利用可能です";

class LoginForm extends React.Component {

  constructor() {
    super();
    this.state = {
      userId: "",
      userIdError: "",
      password: "",
      passwordError: "",
    }
  }

  deleteLoginError() {
    this.props.loginErrorType &&
    this.props.setLoginErrorType(0)
  }

  handleEmailChange(e) {
    this.deleteLoginError();
    this.setState({
      userId: e.target.value,
      userIdError: ""
    })
  }

  handlePasswordChange(e) {
    this.deleteLoginError();
    this.setState({
      password: e.target.value,
      passwordError: "",
      confirmPasswordError: ""
    })
  }

  login() {

    if (!this.setError()) {
      this.props.register(this.state.userId, this.state.password)
        .then(() => {
          this.props.history.push("/")
        })
        .catch((err) => {
          this.props.setLoginErrorType(err);
        })
    }

  }

  setError() {
    let Error = false;

    if (!this.state.userId.match(/^[A-Za-z0-9]*$/)) {
      this.setState({
        userIdError: patternError
      });
      Error = true
    }

    if (this.state.userId.length === 0) {
      this.setState({
        userIdError: requiredError
      });
      Error = true
    }

    if (this.state.password.length === 0) {
      this.setState({
        passwordError: requiredError
      });
      Error = true
    }


    if (this.state.password.length > 0 && this.state.password.length < 8) {
      this.setState({
        passwordError: passwordError
      });
      Error = true
    }
    return Error
  }

  render() {
    return (
      <LoginFormWrapper>
        <LoginLabel>ログイン画面</LoginLabel>
        <TextInput onChange={e => this.handleEmailChange(e)} label={"ユーザーID"}
                   error={this.state.userIdError}/>
        <TextInput type={"password"} onChange={e => this.handlePasswordChange(e)} label={"パスワード"}
                   error={this.state.passwordError}/>
        <LoginButton onClick={() => this.login()}>ログイン</LoginButton>
        <ToRegisterWrapper>
          <ToRegisterLabel>
            登録がお済みでない方は
            <RegisterLink to={"/register"}>こちら</RegisterLink>
          </ToRegisterLabel>
        </ToRegisterWrapper>
      </LoginFormWrapper>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.userLogin.data
});

const mapDispatchToProps = dispatch => ({
  register: (name, pass) => {
    const data = {
      name: name,
      password: pass
    };
    return dispatch(loginAction(data))
  }
});


const LoginFormWrapper = styled("div")`
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

const LoginButton = styled("button")`
  color: white;
  width: 40%;
  height: 30px;
  font-size: 14px;
  display: block;
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

const LoginLabel = styled("div")`
  font-size: 17px;
  color: orange;
  text-align: center;
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    font-size: 14px;
  }
`;

const ToRegisterWrapper = styled("div")`
  text-align: center;
  margin-top: 18px;
`;

const ToRegisterLabel = styled("div")`
  display: inline;
  text-align: center;
  font-size: 12px;
`;

const RegisterLink = styled(Link)`
  font-size: 12px;
  color: orange;
`;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))
