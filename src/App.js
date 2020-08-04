import React, { useState } from 'react';
import './App.scss';
import './ChoicesTable.js';
import ChoicesTable from './ChoicesTable.js';
import ResultTable from './ResultTable.js';


function App() {

  const [answers, setAnswers] = useState({
    human:{
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
    },
    creative:{
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
    },

    organization:{
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
    },

    stability:{
      q1: null,
      q2: null,
      q3: null,
      q4: null,
      q5: null,
    },
  });

  console.log(answers);


  const onSelectHandler = ({questionId, categoryId, value})=>{
    setAnswers({
      ...answers, 
      [categoryId]:{
        ...answers[categoryId], 
        [questionId]:value
      }
    });

  };


  return (
    <div className="App">
      <p>１：全くそうではない　2：そうではない　3：その通り　4：全くその通り </p>
      <ChoicesTable 
        questionTitle="いちばん満足できるのは、自分の技能と努力の結果として何かを成し得たときだ" 
        categoryId="organization" 
        questionId="q3"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="既成概念にとらわれない発想ができる" 
        categoryId="creative" 
        questionId="q2"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="人から感謝される仕事がしたい" 
        categoryId="human" 
        questionId="q1"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="自分で事業を立ち上げ、軌道に乗せていくことが夢だ" 
        categoryId="organization" 
        questionId="q5"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="自由と裁量より、保障と安定のほうが自分にとっては大切だ" 
        categoryId="stability" 
        questionId="q1"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="結果や内容で評価される職場で働きたい" 
        categoryId="creative" 
        questionId="q1"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="よいキャリアだと実感できるのは、自分なりのアイデアと技能を元にして起業するときだ" 
        categoryId="organization" 
        questionId="q4"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="意にそぐわない配置をして雇用を脅かすような組織には長くとどまろうとは思わない" 
        categoryId="stability" 
        questionId="q2"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="対人サービスの仕事に興味がある" 
        categoryId="human" 
        questionId="q2"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="こだわりが強いほうだ" 
        categoryId="creative" 
        questionId="q3"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="仕事は自分で作るものだと思う" 
        categoryId="creative" 
        questionId="q4"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="話すことが得意である" 
        categoryId="human" 
        questionId="q3"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="ふだん組織の中では、安全と保障を実感できる仕事を求めている" 
        categoryId="stability" 
        questionId="q3"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="キャリアで安定と保障を実感できるのが夢だ" 
        categoryId="stability" 
        questionId="q4"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="コミュニケーションが得意" 
        categoryId="human" 
        questionId="q4"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="自分の作品を作るような仕事がしたい" 
        categoryId="creative" 
        questionId="q5"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="人と関わる仕事がしたい" 
        categoryId="human" 
        questionId="q5"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="自分で会社を起こす元となりそうなアイデアをいつも注意して探している" 
        categoryId="organization" 
        questionId="q1"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="どこかの組織で高い地位を得るより、自分自身で事業を起こすことのほうが大切だと思う" 
        categoryId="organization" 
        questionId="q2"
        onChange={onSelectHandler}
      />
      <ChoicesTable 
        questionTitle="自分の職業人生でいちばん満足できるのは、経済面・雇用面での安定を感じられるときだ" 
        categoryId="stability" 
        questionId="q5"
        onChange={onSelectHandler}
      />

      <ResultTable answers={answers}/>

    </div>
  );
}

export default App;
