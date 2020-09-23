import React, { Component } from 'react'
import axios from "axios"
import renderHTML from "../Functions/renderHTML"
import { Redirect } from 'react-router-dom'
import Answers from './Answers'
import { Link } from "react-router-dom"

export class DisplayQuery extends Component {

  state = {
    aquery: [],
    loading: true,
  }

  componentDidMount() {
    axios
      .get(
        `https://api.stackexchange.com/2.2/questions/${this.props.questionID}?&site=stackoverflow&filter=withbody`
      )
      .then((res) => {
        this.setState({ aquery: res.data.items, loading: false });
      });
  }

  render() {
    return this.state.loading ? (
      <div className="loader-wrapper center-align">
        <div className="center-align preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    ) : this.props.questionID !== "" ? (
      <div>
        <div className="question-head"><Link className="btn-flat white-text" to="/">Back</Link></div>
        {this.state.aquery.map((s) => (
          <div className="question-body" key={s.title}>
            <h2><a rel="noopener noreferrer" target="_blank" className="black-text" href={s.link}>{renderHTML(s.title)}</a></h2>
            {renderHTML(s.body)}
          </div>
        ))}
        <h2 className="answers-interlude">Answers</h2>
        <Answers questionID={this.props.questionID} aquery={this.state.aquery}/>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default DisplayQuery