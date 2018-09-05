import React from "react"
import {connect} from "react-redux"
import styled from "react-emotion"
import display from "../../../styles/display";
import PropTypes from "prop-types";
import Modal from "react-modal"
import TaskCard from "../../../components/TaskCard/TaskCard"
import {fetchTaskListAction} from "../../../redux/modules/tasks/taskList";
import {postTaskAction} from "../../../redux/modules/tasks/taskPost";
import {ModalStyle} from "../../../styles/modalStyle";
import PostTaskForm from "../components/PostTaskForm"

const TITLE_ERROR = "タイトルを入力してください";

class MyTaskList extends React.Component {
  static get propTypes() {
    return {
      taskList: PropTypes.array,
    };
  }

  static get defaultProps() {
    return {
      taskList: []
    };
  }
  constructor() {
    super();
    this.state = {
      loaded: false,
      titleError: null,
      modalIsOpen: false,
      title: "",
      dead: {
        year: null,
        month: null,
        day: null
      }
    }
  }

  toggleModal() {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  }


  postTask() {
    if (this.state.title === "") {
      this.setState({
        titleError: TITLE_ERROR
      });
      return
    }
    this.props.postTask(this.state.title,this.state.dead,this.props.userData.id).then(() => {
      this.setState({
        title: "",
        modalIsOpen: false
      });
      this.props.fetchTaskList(`/user?id=${this.props.userData.id}`)
    })
  }

  componentDidMount() {
    this.props.fetchTaskList(`/user?id=${this.props.userData.id}`).then(() => {
      this.setState({
        loaded: true
      })
    })
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value,
      titleError: null
    })
  }


  render() {

    const {userData, taskList} = this.props;

    return (
      (userData && this.state.loaded) &&
      <Container>
        <NameButtonWrapper>
        <NameWrapper>
        {userData.name}さんの最近のタスク
        </NameWrapper>
        <AddTaskButton onClick={() => this.toggleModal()}>追加</AddTaskButton>
        </NameButtonWrapper>
        <TaskListWrapper>

          {taskList && taskList.main && this.props.taskList.main.map(t => (
            <TaskCard title={t.title} dead={t.dead}/>
          ))}
        </TaskListWrapper>
        <Modal
          style={ModalStyle}
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.toggleModal()}
          contentLabel="Example Modal"
        >
          <PostTaskForm postTask={() => this.postTask()} handleTitleChange={(e) => this.handleTitleChange(e)} titleError={this.state.titleError}/>
        </Modal>
      </Container>
    )
  }
}

const Container = styled("div")`
  width: 85%;
  font-size: 18px;
  font-weight: bold;
  margin: 5px auto;
  margin-top: 40px;
  color: orange;
`;

const TaskListWrapper = styled("div")`
 @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
  margin-top: 10px;
  }
`;

const NameButtonWrapper = styled("div")`
`;

const NameWrapper = styled("div")`
  display: inline;
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    display: block;
    text-align: center;
  }
`;

const AddTaskButton = styled("button")`
  float: right;
  margin-right: 60px;
  color: white;
  width: 120px;
  font-size: 14px;
  display: inline;
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
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    margin: 0 auto;
    display: block;
    float: unset;
  }
`;

const mapStateToProps = state => ({
  taskList: state.taskList.data
});

const mapDispatchToProps = dispatch => ({
  fetchTaskList: (query) => dispatch(fetchTaskListAction(query)),
  postTask: (title, dead,id) => {
    const data = {
      title: title,
      user_id:id,
      // dead: {
      //   year: dead.year && dead.year,
      //   month: dead.month && dead.month,
      //   day: dead.day && dead.day
      // },
      dead: {
        year: 2018,
        month: 8,
        day: 31
      }
    };
    return dispatch(postTaskAction(data))
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(MyTaskList)