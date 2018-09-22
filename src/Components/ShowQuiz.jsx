import React, { Component } from "react";
import FormField from "grommet/components/FormField";
import RadioButton from "grommet/components/RadioButton";
import Form from "grommet/components/Form";
import Box from "grommet/components/Box";
import Label from "grommet/components/Label";
import Button from "grommet/components/Button";
import Footer from "grommet/components/Footer";
import Spinning from "grommet/components/icons/Spinning";
import swal from "sweetalert";

import fire from "../fire";
class ShowQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      result: [],
      loaded: false
    };
  }
  render() {
    const { loaded } = this.state;

    return (
      <div>
        {!loaded ? (
          <Box justify="between" align="center">
            <Spinning size="xlarge" />
          </Box>
        ) : (
          this.renderQuiz()
        )}
      </div>
    );
  }

  renderQuiz = () => {
    const { result } = this.state;
    // console.log('name',result.id.name);

    return (
      <Box
        justify="between"
        align="center"
        wrap={true}
        pad="medium"
        margin="small"
        colorIndex="light-1"
      >
        <Form>
          {result.map((val, i) => {
            let data = val.quiz;
            return (
              <FormField key={i}>
                <Box
                  justify="center"
                  align="center"
                  wrap={true}
                  pad="small"
                  margin="small"
                  colorIndex="light-1"
                >
                  <Label>{data.question}</Label>
                </Box>
                <RadioButton
                  id={"choice" + i}
                  onChange={e => this.handleVal(e, i)}
                  name={"q" + i}
                  label={data.answers.ans1}
                  value={data.answers.ans1}
                />
                <RadioButton
                  id={"id" + i + 1}
                  onChange={e => this.handleVal(e, i)}
                  name={"q" + i}
                  label={data.answers.ans2}
                  value={data.answers.ans2}
                />
                <RadioButton
                  id={"id" + i + 2}
                  onChange={e => this.handleVal(e, i)}
                  name={"q" + i}
                  label={data.answers.ans3}
                  value={data.answers.ans3}
                />
              </FormField>
            );
          })}
          <Footer justify="between" size="large">
            <Button label="Submit" onClick={this.handleSubmit} primary={true} />
          </Footer>
        </Form>
      </Box>
    );
  };

  handleVal(e, i) {
    const { result } = this.state;
    var { score } = this.state;
    let correctAns = result[i].quiz.correctAns;
    let getVal = e.target.value;
    if (getVal === correctAns) {
      // console.log("Correct");
      score++;
      this.setState({
        score
      });

      // console.log("Correct");
      // console.log(score);
    } else {
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { result, score } = this.state;
    const { quizName } = this.props;
    console.log("name", result.id);

    let myID = localStorage.getItem("myID");

    let scoreRef = fire.database().ref(`Users/${myID}/${quizName}`);
    scoreRef.set({
      myScore: score,
      outOf : result.length
    });

    scoreRef.on("value", x => {
      let data = x.val();
      let myScr = data.myScore;
      console.log(myScr);
      // let userName = localStorage.setItem("myName", uffName);
    });

    // list[quizIndex].eachQuiz

    let final = `
          Your Score is ${score}/${result.length}
    `;
    // let initScore = 0;
    swal(final).then(()=> {
       this.props.back();
    })
    // swal("Your Score is " + this.state.score + "/ " + list[quizIndex].eachQuiz.length);
    this.setState({
      score: 0
    });

    this.props.back();

    return false;
  };

  componentWillMount() {
    const { result } = this.state;
    const { currentQuiz } = this.props;

    let quizes = fire.database().ref(`AllQuiz/${currentQuiz}`); //get from props
    quizes.on("child_added", snapshot => {
      
      
      let quiz = {
        quiz: snapshot.val(),
        id: snapshot.key
      };

      //   console.log(snapshot);

      result.push(quiz);

      this.setState({
        result,
        loaded: true
      });

      // console.log("quiz name", quizName);
    });
  }
}

export default ShowQuiz;
