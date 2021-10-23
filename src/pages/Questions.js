import React, { useState, useEffect } from 'react';
import axios from 'axios';

//import Login from './Login/Login';


import ShowResult from '../components/ShowResult';
import Loader from '../img/loader.svg';
import { Button, Card, CardContent } from '@material-ui/core';

const Questions = ({ match, history }) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const [questions, setQuestions] = useState([]);
  const [curQuestionNo, setCurQuestionNo] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);
  const [result, setResult] = useState(false);

  const createMarkup = (text) => {
    return { __html: text };
  };

  const fetchQuizData = async () => {
    setLoading(true);
    try {
      const url = `https://opentdb.com/api.php?amount=${
        match.params.no
      }&category=${
        match.params.cat
      }&difficulty=${match.params.dif.toLowerCase()}&type=multiple`;
      const { data } = await axios.get(url);

      setQuestions(data.results);
      setAllAnswers(
        [
          ...data.results[0].incorrect_answers,
          data.results[0].correct_answer,
        ].sort(() => Math.random() - 0.5)
      );
    } catch (error) {
      console.log('Fetch quiz error =====>>>>', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizData();
    // eslint-disable-next-line
  }, []);

  const nextQuestion = () => {
    if (!questions[curQuestionNo].userAnswer) {
      alert('Please select one answer !');
      return false;
    }

    setAllAnswers(
      [
        ...questions[curQuestionNo + 1].incorrect_answers,
        questions[curQuestionNo + 1].correct_answer,
      ].sort(() => Math.random() - 0.5)
    );

    setCurQuestionNo(curQuestionNo + 1);
  };
  const showResult = () => {
    if (!questions[curQuestionNo].userAnswer) {
      alert('Please select one answer !');
      return false;
    }

    setResult(true);
  };

  const reset = () => {
    history.push('/question');
  };

  const getAnswer = (e, ans) => {
    questions[curQuestionNo].userAnswer = ans;
    setSelected(ans);
  };

  return (
    <>
      {loading ? (
        <div className='loader'>
          <img src={Loader} alt='Loading...' />
        </div>
      ) : !result ? (
        <div>
          {questions.length > 0 && (
            <>
              <Card className='questionContent'>
                <div className='question'>
                  <p
                    dangerouslySetInnerHTML={createMarkup(
                      questions[curQuestionNo].question
                    )}
                    className='questionText'
                  ></p>
                </div>
                <hr />
                <CardContent>
                  {allAnswers.map((ans, i) => {
                    return (
                      <div
                        style={
                          selected === ans ? {fontSize: "44px", color : 'blue'}
                           : {}
                        }
                        key={i}
                        onClick={(e) => {
                          getAnswer(e, ans);
                        }}
                      >
                        <p dangerouslySetInnerHTML={createMarkup(ans)}></p>
                      </div>
                    );
                  })}

                  <div>
                    <Button
                      variant='outlined'
                      color='secondary'
                      style={{ float: 'right' }}
                      onClick={
                        questions.length === curQuestionNo + 1
                          ? showResult
                          : nextQuestion
                      }
                    >
                      {questions.length === curQuestionNo + 1
                        ? 'Show Result'
                        : 'Next Qustion'}
                    </Button>
                    <Button variant='outlined' onClick={reset}>
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      ) : (
        <ShowResult
          questions={questions}
          createMarkup={createMarkup}
          reset={reset}
        />
      )}
    </>
  );
};

export default Questions;
