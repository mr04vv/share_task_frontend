import React from "react"
import styled from "react-emotion"
import display from "../../styles/display";



export default class TaskCard extends React.Component {
  render() {
    const {title, dead} = this.props;
    return (
      <TaskCardWrapper>
        <TaskTitle>{title}</TaskTitle>
        <TaskDeadLine>{dead.year && `${dead.year}年`}{dead.month && `${dead.month}月`}{dead.day && `${dead.day}日`}</TaskDeadLine>
      </TaskCardWrapper>
    )
  }
}

const TaskCardWrapper = styled("div")`
  background: white;
  display: flex;
  padding: 10px;
  border-radius: 5px;
  border-bottom: solid 1px #eeeeee;
  position: relative;
  padding: 20px 10px 20px 8%;
  :hover {
    cursor: pointer;
    background: #FFE4B5;
  }
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    min-width: unset;
    padding: 10px 10px 10px 10px;
  }
`;

const TaskTitle = styled("div")`
  color: black;
  width: 70%;
  font-weight: bold;
  font-size: 14px; 
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    font-size: 11px  
  }
`;

const TaskDeadLine = styled("div")`
  color: gray;
  font-weight: bold;
  font-size: 14px;
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    font-size: 11px  
  }
`;
