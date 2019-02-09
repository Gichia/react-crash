import React, { Component } from "react";
import PropTypes from "prop-types";

export class AddTodo extends Component {
    state = {
        title: ""
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: "" })
    }

    changeTitle = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.submitForm} style={{ display: "flex" }}>
        <input 
            type="text" 
            name="title"
            style={{ flex: "10", padding: "5px" }} 
            placeholder="Add Todo..."
            value={this.state.title}
            onChange={this.changeTitle}
            required
        />
        <input 
            type="submit" 
            value="Add Todo" 
            className="btn"
            style={{ flex: "1" }}
        />
      </form>
    )
  }
}

AddTodo.propTypes = {
  submitForm: PropTypes.func.isRequired
}

export default AddTodo
