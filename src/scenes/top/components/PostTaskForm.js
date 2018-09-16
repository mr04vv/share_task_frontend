import React from "react"
import styled from "react-emotion"
import {connect} from "react-redux"
import Calendar from "react-calendar"
import DatePicker from "react-datepicker"
import TextInput from "../../../components/TextInput/TextInput"

class PostTaskForm extends React.Component {

  constructor() {
    super();
    this.state = {
      title: "",
      dead: {
        year: null,
        month: null,
        day: null
      }
    }
  }



  render() {
    return (
    <PostTaskFormWrapper>
    <TextInput label={"タイトル"} value={this.props.title} onChange={e => this.props.handleTitleChange(e)} error={this.props.titleError}/>
      <TextInput label={"締め切り日"} value={this.props.data} onClick={() => this.props.toggleCalendar()} />
      {this.props.isOpenCalendar &&
      <Calendar
        onChange={(e) => this.props.handleDateChange(e)}
        value={this.props.date}
      />}

      <PostTaskButton onClick={() => {this.props.toggleCalendar();this.props.postTask();}}>追加</PostTaskButton>
    </PostTaskFormWrapper>
    )
  }
}

const TitleInput = styled("input")`
`;

const PostTaskFormWrapper = styled("div")`
  width:300px;
  height:500px;
`;

const PostTaskButton = styled("button")`
  margin: 0 auto;
  margin-top: 30px;  
  color: white;
  width: 120px;
  font-size: 14px;
  display: block;
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
    cursor: pointer;
  }
  :active {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 8px, rgba(0, 0, 0, 0.23) 0px 1px 8px;
    background-color: rgb(255, 152, 0, 0.8);
  }
`;

export default connect()(PostTaskForm)