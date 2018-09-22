import React, { Component } from "react";
import App from "grommet/components/App";
import Box from "grommet/components/Box";
import Spinning from "grommet/components/icons/Spinning";
import Registration from "./Components/Registration";
import MyHeader from "./Components/MyHeader";
import ShowQuiz from "./Components/ShowQuiz";
import QuizList from "./Components/QuizList";
import swal from "sweetalert";

import fire from "./fire";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizName: "",
      currentQuiz: "",
      result: [],
      isAuth: false,
      enableList: false,
      enableQuiz: false
    };
  }

  render() {
    const {
      isAuth,
      result,
      enableList,
      enableQuiz,
      currentQuiz,
      quizName
    } = this.state;
    return (
      <App centerd="true">
        <MyHeader goHome={this.goHome} isAuth={isAuth} logout={this.logout} />
        {!isAuth &&
          !enableList && <Registration enableList={this.enableList} />}
        {isAuth &&
          enableList && (
            <QuizList result={result} enableQuiz={this.enableQuiz} />
          )}
        {isAuth &&
          !enableList &&
          enableQuiz && (
            <ShowQuiz
              quizName={quizName}
              currentQuiz={currentQuiz}
              back={this.back}
            />
          )}
      </App>
    );
  }

  back = () => {
    this.setState({
      enableList: true,
      enableQuiz: false
    });
  };

  goHome = () => {
    this.setState({
      enableList: true,
      enableQuiz: false
    });
  };

  enableQuiz = (i, name) => {
    swal("Proctoring Key:", {
      content: "input"
    }).then(value => {
      if (value === 'test') {
        let myID = localStorage.getItem("myID");
        let scoreRef = fire.database().ref(`Users/${myID}`);
        let a = this.state.result[i].id;
        let quizName = name;
    
        scoreRef.on("value", x => {
          let data = x.val();
    
          if (typeof data[quizName] === "undefined") {
            this.setState({
              quizName: quizName,
              currentQuiz: a,
              enableQuiz: true,
              enableList: false
            });
          } else {
            swal(
              `You have already given test and your score is ${
                data[quizName].myScore
              } / ${data[quizName].outOf}`
            );
          }
        });
      } else {
        console.log('wrong key');
        
      }
    });
  };

  spin = () => {
    return (
      <Box justify="between" align="center">
        <Spinning size="xlarge" />
      </Box>
    );
  };

  componentWillMount() {
    const { result } = this.state;
    let quizes = fire.database().ref(`AllQuiz`); //get from props
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

      //   console.log(this.state.result);
    });
  }

  enableList = () => {
    this.setState({
      isAuth: true,
      enableList: true
    });
  };

  logout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        console.log("Sign Out Successfully...!");
        this.setState({
          isAuth: false,
          enableList: false,
          enableQuiz: false
        });
        localStorage.clear();
      })
      .catch(function(error) {});
  };
}

export default Quiz;
