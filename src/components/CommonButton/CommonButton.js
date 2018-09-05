import React from "react"
import styled from "react-emotion"

const CommonButton = (props) => (
  <Button onClick={() => props.onClick()} color={props.color} width={props.width} height={props.height}>
    {props.label}
  </Button>
);

const Button = styled("button")`
 background-color: ${props => props.colors && props.color};
 width: ${props => props.width && props.width};
 height: ${props => props.height && props.height}
`;

export default CommonButton