import React, {Fragment} from "react"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import Header from "../../components/Header/Header";
import display from "../../styles/display"
import LoginForm from "./components/LoginForm";
import status from "../../utilities/statusCode"
import {ErrorMessage} from "../../styles/ErrorMessage"
import {fetchMeAction} from "../../redux/modules/users/user";

const USER_NAME_ERROR = "ユーザー名またはパスワードが間違っています";
const SERVER_ERROR = "現在アクセスが集中しています\n時間をおいて再度お試しください";

class LoginHome extends React.Component {

  constructor() {
    super();
    this.state = {
      loginErrorType: 0,
      fetchMeSuccess: false
    }
  }

  setLoginErrorType(type) {
    this.setState({
      loginErrorType: type
    })
  }

  componentDidMount() {
    this.props.fetchMe().then(() => {
      this.setState({
        fetchMeSuccess: true
      })
    })
  }

  render() {
    const isMobile = window.innerWidth <= display.BREAK_POINT_TB;
    const errorType = this.state.loginErrorType;

    return (
      !this.state.fetchMeSuccess ?
      <Fragment>
        <Header loginStatus={this.props.loginStatus}/>
        {!isMobile && errorType !== 0 && (errorType === status.NOT_FOUND ? <ErrorMessage>{USER_NAME_ERROR}</ErrorMessage> : <ErrorMessage>{SERVER_ERROR}</ErrorMessage>)}
        <LoginForm loginErrorType={errorType} setLoginErrorType={(type) => this.setLoginErrorType(type)}/>
        {isMobile && errorType !== 0 && (errorType === status.NOT_FOUND ? <ErrorMessage>{USER_NAME_ERROR}</ErrorMessage> : <ErrorMessage>{SERVER_ERROR}</ErrorMessage>)}
      </Fragment> :
        <Redirect to={"/"}/>
    )
  }
}

const mapStateToProps = state => ({
  loginStatus: state.userLogin.status
});

const mapDispatchToProps = dispatch => ({
  fetchMe: () => dispatch(fetchMeAction())
});

export default connect(mapStateToProps,mapDispatchToProps)(LoginHome)