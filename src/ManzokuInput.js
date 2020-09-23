import React, {useState} from 'react';

import Slider from 'react-rangeslider';

export default function ManzokuInput({title, defaultValue, onChange}){ //純粋ではないのでここにある


  const [value, setValue] = useState(defaultValue);

  //単にフォームの値が変わるときはほっとく。
  const handleChange = (val)=>{
    setValue(val);
  }


  //手を離した時にバリデーションする。
  const handleDecide = ()=>{
    let val = value;
    if(typeof val === "string"){
      val = parseInt(val);

      if(isNaN(val)){
        val = 0;

      }
    }

    if(val < 0 || val > 100){
      alert("0 から 100 の値を入力してください。")
      val = Math.min(100, Math.max(0, val));
    }
    setValue(val);

    if(onChange && typeof onChange === "function"){
      onChange(val);
    }
  }

  const handleInputFocus = (e)=>{

    e.target.select();
  }


  return (
    <div className="c-manzoku-input">
      <div className="e-title" dangerouslySetInnerHTML={{__html:title}}></div>
      <div className="e-text">
        <input className="c-input-number" type="number" 
          value={value} 
          onChange={(e)=>handleChange(e.target.value)}
          onBlur={handleDecide}
          onFocus={handleInputFocus}
          />%
      </div>
      <div className="e-range">
        <Slider
          className="e-range"
          min={0} max={100} 
          value={value}
          onChange={handleChange}
          onChangeComplete={handleDecide}
        />

      </div>
    </div>
  );
}