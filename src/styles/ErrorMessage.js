import styled from "react-emotion";
import display from "./display";

export const ErrorMessage = styled("p")`
  @media screen and (min-width: ${display.BREAK_POINT_SP}px) {
    color: #d60000;
    background-color: #fdd9d9;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
    white-space: pre-wrap;
    width: -webkit-fill-available;
    position: absolute;
  }
  @media screen and (max-width: ${display.BREAK_POINT_SP}px) {
    color: #d60000;
    font-size: 12px;
    white-space: pre-wrap;
    text-align: center
  }
`;