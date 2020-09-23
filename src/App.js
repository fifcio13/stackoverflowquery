import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import axios from 'axios'
import DisplayQuery from './Components/Layouts/DisplayQuery';
import DisplayQueries from './Components/Layouts/DisplayQueries';
import Error from './Components/Layouts/Error';

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      squestion: [],
      questionID: ''
    };

    this.questionIdHandler = this.questionIdHandler.bind(this);
  }

  questionIdHandler(value) {
    this.setState({
      questionID: value
    })
    // console.log(value)
  }

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q=${this.state.query}`
      )
      .then((res) => {
        this.setState({ squestion: res.data.items });
      });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App container">
          <nav className="center-align">
              <Link to="/" className="logo">
                stack<strong>overflow</strong> query
              </Link>
          </nav>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <DisplayQueries
                  handleChange={this.handleChange}
                  handleOnSubmit={this.handleOnSubmit}
                  questionIdHandler={this.questionIdHandler}
                  squestion={this.state.squestion}
                />
              )}
            />
            <Route
              path="/question/:id"
              render={() => (
                <DisplayQuery
                  questionID={this.state.questionID}
                  squestion={this.state.squestion}
                />
              )}
            />
            <Route path="/*" component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App
