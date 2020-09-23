import React, { Component } from 'react'
import { Link } from "react-router-dom"
import  renderHTML from '../Functions/renderHTML'

class DisplayQueries extends Component {

  render() {
    return (
      <div className="display-queries">
        <form onSubmit={this.props.handleOnSubmit}>
          <div className="input-field">
            <input
              id="query"
              onChange={this.props.handleChange}
              type="text"
            />
            <label htmlFor="query">Enter query</label>
          </div>
          <button className="btn-small">Search</button>
        </form>
        <ul className="questions-list">
          {this.props.squestion.map((squestion) => (
            <li key={squestion.question_id}>
              <Link
                onClick={() =>
                  this.props.questionIdHandler(squestion.question_id)
                }
                to={`/question/${squestion.question_id}`}
              >
                {renderHTML(squestion.title)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DisplayQueries
