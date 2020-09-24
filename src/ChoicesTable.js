
import React  from 'react';


export default function ({questionTitle, categoryId, questionId, answers, onChange}){

  const value = answers[categoryId][questionId];


  const onSelectHandler = (e)=>{
    if( onChange && typeof onChange  == "function"){
      onChange({categoryId, questionId, value: parseInt(e.target.value) });
    }
  };


  return (
    <div className="c-choices-table">
      <div className="e-question">{questionTitle}</div>
      <ul className="e-answers">
        <li className="e-answer">
          <label className="c-answer-button">
            <input type="radio" name={categoryId +"."+ questionId} 
              value={0} checked={value === 0} 
              onChange={onSelectHandler} className="e-radio" />
            <span className="e-number">１</span>
          </label>
        </li>
        <li className="e-answer">
          <label className="c-answer-button">
            <input type="radio" name={categoryId +"."+ questionId} 
              value={1} checked={value === 1} 
              onChange={onSelectHandler} className="e-radio" />
            <span className="e-number">２</span>
          </label>
        </li>
        <li className="e-answer">
          <label className="c-answer-button">
            <input type="radio" name={categoryId +"."+ questionId} 
              value={2} checked={value === 2} 
              onChange={onSelectHandler} className="e-radio" />
            <span className="e-number">３</span>
          </label>
        </li>
        <li className="e-answer">
          <label className="c-answer-button">
            <input type="radio" name={categoryId +"."+ questionId} 
              value={3} checked={value === 3} 
              onChange={onSelectHandler} className="e-radio" />
            <span className="e-number">４</span>
          </label>
        </li>
      </ul>
    </div>
  );
}