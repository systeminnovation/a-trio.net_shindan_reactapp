
import React  from 'react';


export default function ({questionTitle, categoryId, questionId, onChange}){


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
          <label class="c-answer-button">
            <input type="radio" name={categoryId +"."+questionId} value={0} onChange={onSelectHandler} class="e-radio" />
            <span className="e-number">１</span>
          </label>
        </li>
        <li className="e-answer">
          <label class="c-answer-button">
            <input type="radio" name={categoryId +"."+questionId} value={1} onChange={onSelectHandler} class="e-radio" />
            <span className="e-number">２</span>
          </label>
        </li>
        <li className="e-answer">
          <label class="c-answer-button">
            <input type="radio" name={categoryId +"."+questionId} value={2} onChange={onSelectHandler} class="e-radio" />
            <span className="e-number">３</span>
          </label>
        </li>
        <li className="e-answer">
          <label class="c-answer-button">
            <input type="radio" name={categoryId +"."+questionId} value={3} onChange={onSelectHandler} class="e-radio" />
            <span className="e-number">４</span>
          </label>
        </li>
      </ul>
    </div>
  );
}