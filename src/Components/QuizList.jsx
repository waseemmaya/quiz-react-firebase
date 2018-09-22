import React, { Component } from "react";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";
import Heading from "grommet/components/Heading";
import FormNext from "grommet/components/icons/base/FormNext";

class QuizList extends Component {
  render() {
    const { result, enableQuiz } = this.props;
    return (
      <div>
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
            console.log('val',val.quiz.myKey);
            return (
              <Box
                key={i}
                justify="center"
                align="center"
                wrap={true}
                pad="large"
                margin="medium"
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
                  primary={true}
                />
              </Box>
            );
          })}
        </Box>
      </div>
    );
  }
}

export default QuizList;
