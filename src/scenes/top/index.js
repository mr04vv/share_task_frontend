import React, {Fragment} from "react"
import {connect} from "react-redux"
import { Redirect } from "react-router-dom";

import Header from "../../components/Header/Header";
import { fetchMeAction } from "../../redux/modules/users/user"
import MyTaskList from "./components/MyTaskList";




class TopPage extends React.Component {

  constructor() {
    super();
    this.state = {
      fetchMeSuccess: false,
      loaded: false
    };
  }

  componentDidMount() {
    this.props.fetchMe().then(() => {
      this.setState({
        loaded: true,
        fetchMeSuccess: true
      });
      console.log(this.state.fetchMeSuccess);
    }).catch(() => {
      this.setState({
        loaded: true
      })
    })
  }

  render() {
    return (
      this.state.loaded ? (this.state.fetchMeSuccess ?
      <Fragment>
        <Header isLogin/>
        <MyTaskList userData={this.props.userData}/>
      </Fragment> :
        <Redirect to={"login"}/>) :
        <Header/>

    )
  }
}

const mapStateToProps = state => ({
  userData: state.fetchMe.data
});

const mapDispatchToProps = dispatch => ({
  fetchMe: () => dispatch(fetchMeAction())
});

export default connect(mapStateToProps,mapDispatchToProps)(TopPage)