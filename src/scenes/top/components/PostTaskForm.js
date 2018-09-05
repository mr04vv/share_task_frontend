import React from "react"
import styled from "react-emotion"
import {connect} from "react-redux"
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
    <TextInput label={"タイトル"} onChange={e => this.props.handleTitleChange(e)} error={this.props.titleError}/>
      <PostTaskButton onClick={() => this.props.postTask()}>追加</PostTaskButton>
    </PostTaskFormWrapper>
    )
  }
}

const TitleInput = styled("input")`
`;

const PostTaskFormWrapper = styled("div")`
  width:300px;
`;

const PostTaskButton = styled("button")`
i
`;

export default connect()(PostTaskForm)