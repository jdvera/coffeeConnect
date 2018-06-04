import React from "react";
import "./GroupForm.css";

const GroupForm = props =>

	<form>
		<input placeholder="Group Name" autoFocus="yes" name="groupName" value={props.state.type === "" ? "" : props.state.groupName} onChange={props.handleInputChange} /><br/>
		<input placeholder="Password" name="password" value={props.state.type === "" ? "" : props.state.password} onChange={props.handleInputChange} /><br/>
		<input placeholder="Re-Type Password" name="retype" value={props.state.type === "" ? "" : props.state.retype} onChange={props.handleInputChange} style={props.state.type === "new" ? {display: "inline-block"} : {display: "none"}} /><br/>
		<p id="message" style={props.state.message === "" ? {display: "none"} : {display: "inline-block"}}> {props.state.message} </p>
	</form>

export default GroupForm;