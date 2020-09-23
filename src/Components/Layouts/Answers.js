import React, { Component } from 'react'
import axios from "axios"
import renderHTML from "../Functions/renderHTML";

class Answers extends Component {

    state = {
        answers: [],
        isAccepted: false,
    }


    componentDidMount() {
        axios.get(
            `https://api.stackexchange.com/2.2/questions/${this.props.questionID}/answers?order=desc&sort=votes&site=stackoverflow&filter=withbody`
          )
          .then((res) => {
            this.setState({ answers: res.data.items });
            res.data.items.map((r) => 
                r.is_accepted ? this.setState({isAccepted: true}) : null
            )
          });
    }

    render() {
        return this.state.isAccepted ? (
          <div className="answers confirmed">
            {this.state.answers.map((s) =>
              s.is_accepted ? (
                <div className="answer-body" key={s.answer_id}>
                  {renderHTML(s.body)}
                </div>
              ) : null
            )}
          </div>
        ) : (
          <div className="answers">
            {this.state.answers.length === 0 ? <p>No answers yet</p> : this.state.answers.map((s) =>
                <div className="answer-body" key={s.answer_id}>
                  {renderHTML(s.body)}
                </div>
            )}
          </div>
        );
    }
}

export default Answers
