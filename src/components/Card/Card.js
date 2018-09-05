import React from "react"
import styled from "react-emotion"
import display from "../../styles/display";

const Card = styled("div")`
  flex: 1 0 240px;
  align-self: stretch;
  margin: 0 4px 24px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 2px;
  box-shadow: 0 2px 3px 0 #d0d0d0,
;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  @media (max-width: ${display.BREAK_POINT_SP}px) {
    width: 100%;
    max-width: ${display.BREAK_POINT_SP}px;
  }
`;

export default Card