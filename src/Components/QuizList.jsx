import React, { Component } from "react";
import Box from "grommet/components/Box";
import Section from "grommet/components/Section";

import Button from "grommet/components/Button";
import Heading from "grommet/components/Heading";
import FormNext from "grommet/components/icons/base/FormNext";
import fire from "../fire";

class QuizList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      btn: true,
      enableQuiz: this.props.enableQuiz,
      result: this.props.result,
      allNames: this.props.allNames
    };
  }
  render() {
    const { result, enableQuiz, loaded } = this.state;
    // console.log("propsResult", allNames);

    return (
      <Section>
        <Heading
          tag="h3"
          strong={false}
          uppercase={true}
          truncate={false}
          align="center"
          margin="small"
        >
          All Available Quizes
        </Heading>
        {loaded ? (
          <Box
            direction="row"
            justify="center"
            align="center"
            wrap={true}
            pad="medium"
            margin="medium"
            colorIndex="light-1"
          >
            {result.map((val, i) => {
              // console.log('name',val.id);
              return (
                <Box
                  key={i}
                  justify="center"
                  align="center"
                  wrap={true}
                  pad="medium"
                  margin="large"
                  colorIndex="light-1"
                >
                  <Heading tag="h2">{val.id}</Heading>
                  <Button
                    secondary={false}
                    accent={false}
                    critical={false}
                    plain={true}
                    label={val.btnText}
                    icon={<FormNext />}
                    onClick={() => enableQuiz(i, val.id, val.pass)}
                    primary={val.status}
                  />
                </Box>
              );
            })}
          </Box>
        ) : (
          <h1>Hello</h1>
        )}
      </Section>
    );
  }

  componentWillMount() {
    const { allNames, result } = this.state;

    // console.log(result[1]);
    // console.log(allNames);

    let myID = localStorage.getItem("myID");
    let scoreRef = fire.database().ref(`Users/${myID}`);
    scoreRef.on("value", x => {
      let data = x.val();

      for (let i = 0; i < allNames.length; i++) {
        if (typeof data[allNames[i]] === "undefined") {
          // console.log('ifResult***', data[allNames[i]]);

          result[i].status = true;
          var randNo = Math.floor(10044 + Math.random() * 9000);
          result[i].pass = `pass${randNo}`;
          let btnText =`Take Quiz`;
          result[i].btnText = btnText;


          this.setState({
            result,
            loaded: true
          });
        } else {
          // console.log(data[allNames[i]]);

          let myScore = data[allNames[i].myScore];
          let outOf = data[allNames[i].outOf];
          // console.log("oldScore", myScore);
          // console.log("outOf", outOf);
          let a = data[allNames[i]];
          let score = a.myScore;
          let total = a.outOf;
          // console.log('score',score);
          // console.log('total',total);


          // result[i].score = score;
          // result[i].total = total;
          let btnText =`Your score ${score}/${total}`;

          result[i].btnText = btnText;
          
          result[i].status = false;
          var randNo = Math.floor(10044 + Math.random() * 9000);
          result[i].pass = `pass${randNo}`;

          this.setState({
            result,
            loaded: true
          });
        }
      }
    });

    // console.log('a',a);
  }
}

export default QuizList;
