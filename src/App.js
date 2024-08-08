import React, { Component } from "react";
import { QUESTIONS } from "./questions";
import Score from "./score";
import QuestionList from "./questionList";
import FinalScore from "./finalScore";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      totalQuestion: Object.keys(QUESTIONS).length,
      ans: 0,
      attempt: 0,
      finalScore: false,
    };
    this.getAns = this.getAns.bind(this);
  }

  componentDidMount() {
    const yourscore = localStorage.getItem('score');
    if (yourscore >= 0 && yourscore != null) {
      this.setState({ finalScore: true });
      this.setState({ score: yourscore });
    }

  }


  getAns(data) {
    this.setState({ attempt: this.state.attempt + 1 });
    if (data === "yes") {
      let currentScore = (100 * (this.state.ans + 1)) / this.state.totalQuestion;
      this.setState({ score: currentScore });
      this.setState({ ans: this.state.ans + 1 });
    }
    if (this.state.attempt + 1 === this.state.totalQuestion) {
      this.setState({ finalScore: true });
      localStorage.setItem('score', (100 * (this.state.ans + 1)) / this.state.totalQuestion)
    }
  }


  render() {

    return (
      <div className="main__wrap">
        <main className="container">
          {
            this.state.finalScore === true ? (
              <div>
                <FinalScore score={this.state.score} />
              </div>
            ) : (
              <div>
                <Score score={this.state.score} />
                <QuestionList qstnList={QUESTIONS} getAnsProps={this.getAns} />
              </div>
            )
          }
        </main>
      </div>
    );
  }
}

export default App;
