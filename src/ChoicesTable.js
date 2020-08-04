
import React, { useState } from 'react';


export default function ({questionTitle, categoryId, questionId, onChange}){


  const onSelectHandler = (e)=>{
    if( onChange && typeof onChange  == "function"){
      onChange({categoryId, questionId, value: parseInt(e.target.value) });
    }
  };


  return (
    <table className="c-choices-table">
      <tbody>
        <tr>
          <td colSpan="5">{questionTitle}</td>
        </tr>
        <tr>
          <td><label><input type="radio" name={categoryId +"."+questionId} value={0} onChange={onSelectHandler} />１</label></td>
          <td><label><input type="radio" name={categoryId +"."+questionId} value={1} onChange={onSelectHandler}/>２</label></td>
          <td><label><input type="radio" name={categoryId +"."+questionId} value={2} onChange={onSelectHandler}/>３</label></td>
          <td><label><input type="radio" name={categoryId +"."+questionId} value={3} onChange={onSelectHandler}/>４</label></td>
        </tr>
      </tbody>
    </table>
  );
}