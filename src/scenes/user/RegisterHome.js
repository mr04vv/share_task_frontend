import React, {Fragment} from "react"
import {connect} from "react-redux"

import RegisterForm from "./components/RegisterForm"
import Header from "../../components/Header/Header";
import display from "../../styles/display"
import status from "../../utilities/statusCode"
import {ErrorMessage} from "../../styles/ErrorMessage"
import RegisterFinish from "./components/RegisterFinish"

const USER_NAME_ERROR = "このユーザー名は使用できません\n他のユーザー名をお試しください";
const SERVER_ERROR = "現在アクセスが集中しています\n時間をおいて再度お試しください";

class RegisterHome extends React.Component {

  constructor() {
    super();
    this.state = {
      registerErrorType: 0,
      registerFinish: false
    }
  }

  setRegisterErrorType(type) {
    this.setState({
      registerErrorType: type
    })
  }

  setRegisterFinish() {
    this.setState({
      registerFinish: true
    })
  }

  render() {
    const isMobile = window.innerWidth <= display.BREAK_POINT_TB;
    const errorType = this.state.registerErrorType;

    return (
      <Fragment>
        <Header/>
        {!this.state.registerFinish ?
          <Fragment>
            {!isMobile && errorType !== 0 && (errorType === status.BAD_REQUEST ?
              <ErrorMessage>{USER_NAME_ERROR}</ErrorMessage> : <ErrorMessage>{SERVER_ERROR}</ErrorMessage>)}
            <RegisterForm registerErrorType={errorType} setRegisterErrorType={(type) => this.setRegisterErrorType(type)}
                          setRegisterFinish={() => this.setRegisterFinish()}/>
            {isMobile && errorType !== 0 && (errorType === status.BAD_REQUEST ?
              <ErrorMessage>{USER_NAME_ERROR}</ErrorMessage> : <ErrorMessage>{SERVER_ERROR}</ErrorMessage>)}
          </Fragment>
          : <RegisterFinish/>
        }
      </Fragment>
    )
  }
}

const mapStateToprops = state => ({
  registerFinish: state.userRegister.status
});

export default connect(mapStateToprops)(RegisterHome)