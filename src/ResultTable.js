import React  from 'react';

function calcSum (answers, category){
  if(Object.keys(answers[category]).find( (qID) => typeof answers[category][qID] !== "number" ) ){
    return null;
  }
  const points = Object.keys(answers[category]).reduce(
    (sum, qID) => answers[category][qID]  + sum ,
    0
  );
  return Math.round(points/15*100);
}

function ResultBar({title, left, right, humanRes}){
  return(
    <div className="c-result-bar">
      <div className="e-title" >{title}</div>
      <div className="e-graph">
      <div className="e-left" dangerouslySetInnerHTML={{__html:left}}></div>
        <div className="e-bar">
          <div className="e-line"/>
          <div className="e-memoris">
            {
              [0,1,2,3,4,5,6,7,8,9,10].map(e=>(
                <div className="e-memori"></div>
              ))

            }
          </div>
          <div className="e-point" style={typeof humanRes === "number" ? {left:`${humanRes}%`}: {"display":"none"}}></div>
        </div>
        <div className="e-right"  dangerouslySetInnerHTML={{__html:right}}></div>
      </div>

    </div>
  );
}

export default function ResultTable({answers}){
  const humanRes       = calcSum(answers, "human")
  const creativeRes    = calcSum(answers, "creative")
  const organizationRes= calcSum(answers, "organization")
  const stabilityRes   = calcSum(answers, "stability")

  return (
    <>
      <ResultBar title="対人・非対人" left="非対人" right="対人" humanRes={humanRes}/>

      <ResultBar title="組織・非組織" left="組織" right="非組織" humanRes={organizationRes}/>

      <ResultBar title="革新・安定" left="革新的" right="安定型" humanRes={stabilityRes}/>

      <ResultBar title="自分で仕事を作る・与えられた仕事を確実にこなす" left="仕事を<br/>こなす" right="仕事を<br>作る" humanRes={creativeRes}/>

    </>
  );

}