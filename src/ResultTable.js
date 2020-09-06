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


export default function ResultTable({answers}){
  const humanRes       = calcSum(answers, "human")
  const creativeRes    = calcSum(answers, "creative")
  const organizationRes= calcSum(answers, "organization")
  const stabilityRes   = calcSum(answers, "stability")

  return (
    <>
      <table className="c-result-table">
        <tbody>
          <tr>
            <th>
              対人・非対人<br/>
              高いと対人、低いと非対人 
            </th>
            <td>{typeof humanRes === "number" ? `${humanRes}%`: "未決定"}</td>
          </tr>
          <tr>
            <th>
              自分で仕事を作る・与えられた仕事を確実にこなす<br/>
              高いと仕事を作る、低いと与えられた仕事を確実にこなしていく
            </th>
            <td>{typeof creativeRes === "number" ? `${creativeRes}%`: "未決定"}</td>
          </tr>
          <tr>
            <th>
              組織・非組織<br/>
              高いと非組織、低いと組織
            </th>
            <td>{typeof organizationRes === "number" ? `${organizationRes}%`: "未決定"}</td>
          </tr>
          <tr>
            <th>
              革新・安定  <br/>
              高いと安定、低いと革新
            </th>
            <td>{typeof stabilityRes === "number" ? `${stabilityRes }%`: "未決定"}</td>
          </tr>
        </tbody>
      </table>

      <div className="c-result-bar">
        <div className="e-title">対人・非対人</div>
        <div className="e-graph">
          <div className="e-left">非対人</div>
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
          <div className="e-right">対人</div>
        </div>

      </div>
    </>
  );

}