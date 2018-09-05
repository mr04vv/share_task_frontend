import React from "react"
import {connect} from "react-redux"
import styled from "react-emotion"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import display from "../../styles/display"
import {logout} from "../../redux/modules/users/userLogin"
import {withRouter} from "react-router-dom"

import image from "../../images/task_logo.png"
import logo from "../../images/logo_transparent.png"

class Header extends React.Component {

  static get propTypes() {
    return {
      isLogin: PropTypes.bool
    };
  }

  doLogout() {
    this.props.logout();
    this.props.history.push("/login");
  }

  render() {

    const isMobile = window.innerWidth <= display.BREAK_POINT_TB;


    return (
      <HeaderWrapper>
        <ImageWrapper src={image}/>
        <HomeLink to={"/"}>
          <LogoWrapper src={logo}/>
        </HomeLink>
        {this.props.isLogin && (!isMobile ? <LogoutButton onClick={() => this.doLogout()}>ログアウト</LogoutButton> : <div>m</div>)}
      </HeaderWrapper>
    )
  }
}

const HeaderWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  height: 48px;
  padding: 8px 20px;
  box-sizing: border-box;
  border-bottom: solid 1px #ccc;
  background: orange;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HomeLink = styled(Link)`
  margin-right: auto;
  margin-left: 10px;
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    margin: 0 auto;
  }
`;

const ImageWrapper = styled("img")`
  height: 100%;
`;

const LogoWrapper = styled("img")`
  height: 30px;
  margin-top: 7px;
`;

const LogoutButton = styled("button")`
  outline: none;
  color: white;
  cursor: pointer;
  font-size: 12px;
`;

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(null,mapDispatchToProps)(Header))