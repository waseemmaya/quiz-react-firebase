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
    const { result, enableQuiz, allNames, loaded } = this.state;
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
                    label="Take Quiz"
                    icon={<FormNext />}
                    onClick={() => enableQuiz(i, val.id)}
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
          console.log("if");
          console.log(result[i]);
          
          result[i].status = true

          this.setState({
            result,
            loaded: true
          });
        } else {
          console.log("else");
          result[i].status = false

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
