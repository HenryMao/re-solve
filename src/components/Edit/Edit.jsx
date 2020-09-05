import React, { useState, useEffect, useContext } from 'react';
import Question from './Question';
import createdContext from '../Create/createdContext';

const categories = ['Arts', 'General', 'Math', 'Science', 'Software']
export default function Edit(props){
  
  const context = useContext(createdContext);
  useEffect(() => {
    console.log("context inside ", context.title[0]);
  }, [])
  const [state, setState] = useState(categories);
  const [stateCategory, setStateCategory] = useState({value: context.title[0].category_name});
  const [difficulty, setDifficulty] = useState({value: context.title[0].difficulty});
  const [gameTitle, setGameTitle] = useState({value: context.title[0].quiz_name});
  const [questions, setQuestions] = useState(context.quiz);
  const [count, setCount] = useState(questions.length);
  
  useEffect(() => {
    console.log("1", questions);
    console.log("2", gameTitle);
    console.log("3", difficulty);
    console.log("4", stateCategory);
    console.log("5", count)
  })

  const addQuestion = function() {
    setCount(count+1);
    setQuestions([...questions, {
      id: count,
      question: '',
      image: '',
      points_per_question: 125,
      time_per_question: 20,
      answers: [
        { answer: '', correct_answer: false },
        { answer: '', correct_answer: false },
        { answer: '', correct_answer: false },
        { answer: '', correct_answer: false },
        { answer: '', correct_answer: false }
      ],
    }])  
  };

 
  const deleteQuestion = function(index) {
    console.log("time to delete a question, how about index = ", index);
    let temp=[];
    questions.map((question)=>{
      if(question.id !== index){
        temp.push(question);
      }
    })
    setQuestions(temp);
  };


  const updateQuestion = function(index, newQuestion) {
   let clonedQuestions = [...questions];
    clonedQuestions[index] = newQuestion;
    setQuestions(clonedQuestions);
  };
  
  const handleChangeCategory = (event) => {
    setStateCategory({value: event.target.value});
  }

  const handleChangeDifficulty = (event) => {
    setDifficulty({value: event.target.value});
  }

  const updateGameTitle = (event)=>{
    setGameTitle(event.target.value);
  }

  
    let display = questions.map((question, index) => {
        return <Question 
          key={question.id}
          id={question.id}
          question={question}
          index={index}
          onDelete={() => {
            deleteQuestion(index)
          }}
          onChange={newQuestion => {
            updateQuestion(index, newQuestion)
          }}
        />
    })
  
  
  



 
  
  return (
    <div>
    <form>
      <label>
        Game Title:
        <input type="text" value={gameTitle.value} onChange={updateGameTitle} />
        <br/>
        <br/>
        Category:
        <select value={stateCategory.value} onChange={handleChangeCategory}>
          { state.map(category => {
            return ( 
              <option value={category} key={category}>
              {category}
              </option>
            )
          }) }
        </select>
        Difficulty:
        <select value={difficulty.value} onChange={handleChangeDifficulty}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
        {display}
      <br/>
      <button type="button" onClick={addQuestion}>Add Question</button>
      <br/>
      <button
        type="button"  
        onClick={()=>{context.editQuiz(gameTitle.value, stateCategory.value, questions, questions.length, parseInt(difficulty.value), questions[0].created_quiz_id)}}>
          Save/Post Quiz       
      </button>
   </form>
   </div>
  )

}
