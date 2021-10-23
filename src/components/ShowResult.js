import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

const ShowResult = ({ questions, createMarkup, reset }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (questions.length > 0) {
      setScore(
        questions.filter((q) => q.userAnswer === q.correct_answer).length * 10
      );
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Card
        style={{ marginTop: '50px', backgroundColor: 'rgb(186, 233, 233)' }}
      >
        <CardHeader
          title='Marksheet'
          titleTypographyProps={{ variant: 'h3' }}
          style={{
            textAlign: 'center',
            backgroundColor: 'rgb(73, 189, 235)',
            color: 'white',
          }}
        ></CardHeader>
        <CardContent>
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.59rem',
              fontWeight: 'bold',
            }}
          >
            Full Srore: {questions.length * 10}
          </p>
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.59rem',
              fontWeight: 'bold',
            }}
          >
            Total Srore: {score}
          </p>
        </CardContent>
      </Card>

      {questions.map((q, i) => {
        return (
          <Card key={i} style={{ marginTop: '15px' }}>
            <div className='question'>
              <p
                className='questionText'
                dangerouslySetInnerHTML={createMarkup(q.question)}
              ></p>
            </div>
            <hr />
            <CardContent>
              <div style={{ textAlign: 'center' }} className='answerq'>
                <b>Your Answer: </b>{' '}
                <p
                  dangerouslySetInnerHTML={createMarkup(q.userAnswer)}
                  className={
                    q.userAnswer === q.correct_answer ? 'correct' : 'wrong'
                  }
                ></p>
                <hr />
                <b>Correct Answer : </b>
                <p
                  dangerouslySetInnerHTML={createMarkup(q.correct_answer)}
                  className='correct'
                ></p>
              </div>
              <p style={{ float: 'right', color: 'blue' }}>
                <b>Mark : {q.userAnswer === q.correct_answer ? '10' : '00'} </b>
              </p>
            </CardContent>
          </Card>
        );
      })}
      <div>
        <Button
          variant='contained'
          onClick={reset}
          style={{ marginTop: '35px', marginBottom: '15px', width: '100%' }}
          color='primary'
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ShowResult;
