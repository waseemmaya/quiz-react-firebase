import React, { Component } from "react";
import App from "grommet/components/App";
import Box from "grommet/components/Box";
import Spinning from "grommet/components/icons/Spinning";
import Registration from "./Components/Registration";
import MyHeader from "./Components/MyHeader";
import MyFooter from "./Components/MyFooter";
import ShowQuiz from "./Components/ShowQuiz";
import QuizList from "./Components/QuizList";
import swal from "sweetalert";
import fire from "./fire";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      quizName: "",
      currentQuiz: "",
      result: [],
      allNames: [],
      isAuth: false,
      enableList: false,
      enableQuiz: false
    };
  }

  render() {
    const {
      displayName,
      isAuth,
      result,
      enableList,
      allNames,
      enableQuiz,
      currentQuiz,
      quizName
    } = this.state;
    return (
      <App centerd="true">
        <MyHeader
          displayName={displayName}
          goHome={this.goHome}
          isAuth={isAuth}
          logout={this.logout}
        />

        {!isAuth &&
          !enableList && <Registration enableList={this.enableList} />}
        {isAuth &&
          enableList && (
            <QuizList
              allNames={allNames}
              result={result}
              enableQuiz={this.enableQuiz}
            />
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
        <MyFooter />
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
    const { isAuth} = this.state;
    if (isAuth) {
      this.setState({
        enableList: true,
        enableQuiz: false
      });
    } else {
      this.setState({
        enableList: false,
        enableQuiz: false
      });
    }
  
  };

  enableQuiz = (i, name, pass) => {
    const key = pass;
    let myID = localStorage.getItem("myID");
    let scoreRef = fire.database().ref(`Users/${myID}`);
    let a = this.state.result[i].id;
    let quizName = name;
    scoreRef.on("value", x => {
      let data = x.val();

      if (typeof data[quizName] === "undefined") {
        swal("Proctoring Key:", `Default Key is : ${key}`, {
          icon: "success",
          buttons: true,
          content: "input"
        }).then(value => {
          if (value === key) {
            this.setState({
              quizName: quizName,
              currentQuiz: a,
              enableQuiz: true,
              enableList: false
            });
          } else {
            console.log("wrong key");
          }
        });
      } else {
        swal(
          `You have already given test and your score is ${
            data[quizName].myScore
          } / ${data[quizName].outOf}`
        );
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
    const { result, allNames } = this.state;
    let quizes = fire.database().ref(`AllQuiz`); //get from props
    quizes.on("child_added", snapshot => {
      // console.log('snapshot', snapshot.val());
      let quiz = {
        quiz: snapshot.val(),
        id: snapshot.key
      };

      //   console.log(snapshot);
      result.push(quiz);
      allNames.push(quiz.id);

      this.setState({
        allNames,
        result,
        loaded: true
      });

      // console.log(this.state.allNames);
    });
  }

  enableList = displayName => {
    // console.log('displayName',displayName);

    this.setState({
      displayName: displayName,
      isAuth: true,
      enableList: true
    });
  };

  logout = () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        fire
          .auth()
          .signOut()
          .then(() => {
            console.log("Sign Out Successfully...!");
            this.setState({
              isAuth: false,
              enableList: false,
              enableQuiz: false,
              displayName: ""
            });
            localStorage.clear();
          })
          .catch(function(error) {});

        // swal("Logout Successfully!", {
        //   icon: "success"
        // });
      } else {
        // swal("Your imaginary file is safe!");
      }
    });
  };
}

export default Quiz;
