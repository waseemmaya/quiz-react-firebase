import React, { Component } from 'react';
import Box from "grommet/components/Box";
import Button from 'grommet/components/Button';
import Value from 'grommet/components/Value';

class QuizList extends Component {

    render() { 
        const {result, enableQuiz} = this.props;
        return ( 
            <div>
                <h1>Quiz List</h1>
                {result.map((val,i) => {
                    // console.log(val.id);
                    return (
                        <Box key={i} justify='center'
                        align='center'
                        wrap={true}
                        pad='medium'
                        margin='medium'
                        colorIndex='light-1'>
                        <Value value={val.id}
                 />
                    <Button label='See Quizes'
                    onClick={() => enableQuiz(i,val.id)}
                    primary={true} />
                    </Box>
                    )
                })}
            </div>
         );
    }
}
 
export default QuizList;