import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField';
import {red500} from "material-ui/styles/colors";

const inputStyle = {
  textAlign: "center",
  margin: "auto",
  display: "block",
  width: "80%"
};

const errorStyle = {
  color: red500
};

const TextInput = (props) => {

  /**
   * type = "text"
   * id = "email"
   * label = placeholder
   * error = errorText
   * onChange = function()
   */

  const {type, id, label, error, onChange, onClick, value} = props;
  return (
    <MuiThemeProvider>
    <TextField type={type && type} id={id && id} floatingLabelText={label && label}
               errorText={error && error} errorStyle={errorStyle}
               onChange={(e) => onChange(e)} hintStyle={inputStyle} style={inputStyle} onClick={() => onClick && onClick()} value={value && value}/>
    </MuiThemeProvider>
  )

};

export default TextInput