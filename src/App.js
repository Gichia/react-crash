import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from "axios";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
// import uuid from "uuid";
import "./App.css";

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then(res => this.setState({ todos: res.data }))
  }

  markComplete = (id) => {
    this.setState( { todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) } );
  }

  addTodo = (title) => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title,
    //   completed: false
    // }
    // this.setState({ todos: [...this.state.todos, newTodo] })
    axios.post("https://jsonplaceholder.typicode.com/todos", {
      title,
      completed: false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  }

  delTodo = (id) => {
    // this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
                <AddTodo addTodo={this.addTodo}/>
              </React.Fragment>
            )} />

            <Route path="/about" component={About} />

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
