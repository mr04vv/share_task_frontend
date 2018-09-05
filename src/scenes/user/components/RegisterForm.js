import React from "react"
import styled from "react-emotion"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import TextInput from "../../../components/TextInput/TextInput"
import {registerAction} from "../../../redux/modules/users/userRegister"
import display from "../../../styles/display"

const requiredError = "必須項目です";
const passwordNotMatchError = "パスワードが一致しません";
const shortError = "8文字以上のパスワードが使用可能です";
const patternError = "半角英数字のみ利用可能です";

class RegisterForm extends React.Component {

  constructor() {
    super();
    this.state = {
      userId: "",
      userIdError: "",
      password: "",
      passwordError: "",
      confirmPassword: "",
      confirmPasswordError: "",
      nickName: "",
      nickNameError: "",
    }
  }

  deleteRegisterError() {
    this.props.registerErrorType &&
      this.props.setRegisterErrorType(0)
  }

  handleEmailChange(e) {
    this.deleteRegisterError();
    this.setState({
      userId: e.target.value,
      userIdError: ""
    })
  }

  handlePasswordChange(e) {
    this.deleteRegisterError();
    this.setState({
      password: e.target.value,
      passwordError: "",
      confirmPasswordError: ""
    })
  }

  handleConfirmPasswordChange(e) {
    this.deleteRegisterError();
    this.setState({
      confirmPassword: e.target.value,
      passwordError: "",
      confirmPasswordError: ""
    })
  }

  handleNickNameChange(e) {
    this.deleteRegisterError();
    this.setState({
      nickName: e.target.value,
      nickNameError: ""
    })
  }

  register() {

    if (!this.setError()) {
      this.props.register(this.state.userId, this.state.password)
        .then(() => {
          this.props.setRegisterFinish();
        })
        .catch((err) => {
          this.props.setRegisterErrorType(err);
        })
    }

  }

  setError() {
    let Error = false;
    const PassError = this.state.passwordError && this.state.confirmPasswordError

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

    if (this.state.confirmPassword.length === 0) {
      this.setState({
        confirmPasswordError: requiredError
      });
      Error = true
    }

    if (this.state.nickName.length === 0) {
      this.setState({
        nickNameError: requiredError
      });
      Error = true
    }


    if (!PassError && this.state.password !== this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: passwordNotMatchError,
        passwordError: passwordNotMatchError
      });
      Error = true
    }

    if (!PassError && this.state.password.length > 0 && this.state.password.length < 8) {
      this.setState({
        confirmPasswordError: shortError,
        passwordError: shortError
      });
      Error = true
    }
    return Error
  }

  render() {
    return (
      <RegisterFormWrapper>
        <RegisterLabel>登録画面</RegisterLabel>
        <TextInput pattern="^[0-9]+$" onChange={e => this.handleEmailChange(e)} label={"ユーザーID"}
                   error={this.state.userIdError}/>
        <TextInput onChange={e => this.handleNickNameChange(e)} label={"ニックネーム"} error={this.state.nickNameError}/>
        <TextInput type={"password"} onChange={e => this.handlePasswordChange(e)} label={"パスワード"}
                   error={this.state.passwordError}/>
        <TextInput type={"password"} onChange={e => this.handleConfirmPasswordChange(e)} label={"パスワードの確認"}
                   error={this.state.confirmPasswordError}/>
        <RegisterButton onClick={() => this.register()}>新規登録</RegisterButton>
        <ToLoginWrapper>
        <ToLoginLabel>すでに登録お済みの方は</ToLoginLabel><LoginLink to={"/login"}>こちら</LoginLink>
        </ToLoginWrapper>
      </RegisterFormWrapper>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.userRegister.data
});

const mapDispatchToProps = dispatch => ({
  register: (name, pass) => {
    const data = {
      name: name,
      password: pass
    };
    return dispatch(registerAction(data))
  }
});


const RegisterFormWrapper = styled("div")`
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

const RegisterButton = styled("button")`
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

const RegisterLabel = styled("div")`
  font-size: 17px;
  color: orange;
  text-align: center;
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    font-size: 14px;
  }
`;

const ToLoginWrapper = styled("div")`
  text-align: center;
  margin-top: 10px;
`;

const ToLoginLabel = styled("div")`
  display: inline;
  text-align: center;
  font-size: 12px;
`;

const LoginLink = styled(Link)`
  font-size: 12px;
  color: orange;
`;

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
