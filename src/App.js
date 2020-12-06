import React, { useState, useEffect } from 'react';
import './scss/App.scss';
import './ChoicesTable.js';
import ChoicesTable from './ChoicesTable.js';
import ResultTable, {calcSum} from './ResultTable.js';
import siteLogo from './img/site-logo.jpg';
import { RadarChart, PolarGrid, PolarRadiusAxis,  PolarAngleAxis, Radar, Tooltip} from 'recharts';
import { BrowserRouter as Router, Route, Link, useLocation, useHistory, Redirect} from 'react-router-dom'
import ManzokuInput from './ManzokuInput';

import superagent from 'superagent';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


const manzokuJP = {
  shigoto: "仕事",
  okane: "お金",
  kenkou: "健康",
  aijou: "愛情",
  yuujin: "友人",
  chishiki: "知識",
  shumi: "趣味",
  busshitsu: "物質",
};

function App() {
  const [manzokus, setManzokus] = useState({
    shigoto: 50,
    okane: 50,
    kenkou: 50,
    aijou: 50,
    yuujin: 50,
    chishiki: 50,
    shumi: 50,
    busshitsu: 50,
  });

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  //表示させたいデータ群
  const dataRadar = Object.keys(manzokus).map(key=>{
    const manzoku = manzokus[key];

    return {
      rank: manzokuJP[key], 
      value: manzoku
    };
  });

  /*
  [
    { rank: '国語', value: 120 },
    { rank: '数学', value: 85 },
    { rank: '理科', value: 65 },
    { rank: '社会', value: 35 },
    { rank: '英語', value: 35 },
    ];*/

  const onChangeManzoku = (key)=>(num)=>{
    console.log("onchange manxoku")
    console.log(num);
    

    setManzokus({
      ...manzokus,
      [key]:num
    });
    /*
    return false;
    */
  }

  const [answers, setAnswers] = useState({
    human:{
      q1: null, q2: null, q3: null, q4: null, q5: null,
    },
    creative:{
      q1: null, q2: null, q3: null, q4: null, q5: null,
    },
    organization:{
      q1: null, q2: null, q3: null, q4: null, q5: null,
    },
    stability:{
      q1: null, q2: null, q3: null, q4: null, q5: null,
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


  //満足度に全て 0 - 100 の数字が入っているか
  const hasManzoku = Object.keys(manzokus).reduce((hasManzoku,currentKey)=>{
    const hasNumber = 
      typeof manzokus[currentKey] === "number" &&
      0 <= manzokus[currentKey] &&  
      manzokus[currentKey] <= 100;
    return hasManzoku && hasNumber;
  }, true);

  const hasAnswers =
    typeof calcSum(answers, "human") === "number" &&  
    typeof calcSum(answers, "creative") === "number" &&  
    typeof calcSum(answers, "organization") === "number" &&  
    typeof calcSum(answers, "stability") === "number";

  const hasName = userName && typeof userName === "string" && userName.length > 0;

  var emailregexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  const hasEmail = userEmail && typeof userEmail === "string" && userEmail.length > 0 &&
    emailregexp.test(userEmail)
  ;

  const isCompleted = hasManzoku && hasAnswers && hasName && hasEmail;

  console.log({
    hasManzoku,
    hasAnswers,
    hasName,
    hasEmail
  });



  const questionPageProps = {
    onChangeManzoku,
    manzokus,
    onSelectHandler,
    answers,
    userEmail,
    userName,
    setUserName,
    setUserEmail,
    hasManzoku,
    hasAnswers,
    hasName,
    hasEmail,
    isCompleted,
  };

  return (
    <Router basename="/atoriotest/tekishoku">

      <ScrollToTop></ScrollToTop>

      <div className="c-content-column">
        <h1 className="p-site-logo">
          <img className="e-img" src={siteLogo} alt="a-trio"/>
          <span className="e-title">幸せなお仕事診断</span>
        </h1>

        <Route exact path='/'>
          <QuestionPage {...questionPageProps}>

          </QuestionPage>
          

        </Route>

        <Route path='/result' render={()=>( 
          !isCompleted ? <Redirect to="/"/> :
        <>
          <h2 className="u-tac">{userName}さんの診断結果</h2>

          <h3 className="u-tal">現在の満足度は？</h3>
          <div className="c-grid p-radar-chart">
            <div className="c-grid__cell is-6 is-sp-12 u-tac"> 
              <div className="p-radar-chart__wrapper">
                <RadarChart // レーダーチャートのサイズや位置、データを指定
                  height={300} //レーダーチャートの全体の高さを指定
                  width={320} //レーダーチャートの全体の幅を指定
                  cx="50%" //要素の左を基準に全体の50%移動
                  cy="50%" //要素の上を基準に全体の50%移動
                  data={dataRadar} //ここにArray型のデータを指定
                  style={{margin: "0 auto"}}
                >
                  <PolarGrid /> 
                  <PolarAngleAxis //ぐるっと回る軸
                    dataKey="rank" //Array型のデータの、数値を表示したい値のキーを指定
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} //放射状の軸
                  />
                  <Radar //レーダーの色や各パラメーターのタイトルを指定
                    name="満足度"  //hoverした時に表示される名前を指定 
                    dataKey="value" //Array型のデータのパラメータータイトルを指定
                    stroke="#fbc300"  //レーダーの線の色を指定
                    fill="#fbc300" //レーダーの中身の色を指定
                    fillOpacity={0.6} //レーダーの中身の色の薄さを指定
                  />
                  <Tooltip />
                </RadarChart>

              </div>
            </div>
            <div className="c-grid__cell is-6 is-sp-12">

              <div className="p-result-insight u-sp-mt-0">
                ◆それぞれの項目について100点満点はどういう状態なのか考えてみましょう。
              </div>
            </div>

          </div>
          
          <h3>お仕事傾向</h3>
          <ResultTable answers={answers}/>

          <div className="p-result-insight">
            <p>
              ◆幸せな仕事をみつけるための３つの問い（診断結果をふまえて、考えてみましょう）
            </p>

            <ul className="u-pl-30">
              <li>あなたが最もワクワクするときはどんな時ですか？</li>
              <li>今、最も興味・関心のある仕事について、十分に情報収集できていますか？</li>
              <li>将来に向けて、今すぐ行動できそうなことはありますか？</li>
            </ul>
            <p>
              行動しないと、未来は変わりません。是非、イメージして行動に移してみましょう！
            </p>
          </div>

          <div className="p-result-links c-grid u-mb-100 u-mt-100">
            <div className="c-grid__cell is-6 is-sp-12 u-sp-mb-20">
              <Link target="_blank" rel="noopener noreferrer" className="c-button is-width-full" to="/">もう一度診断をうける</Link>
            </div>
            <div className="c-grid__cell is-6 is-sp-12">
              <a href="http://a-trio.net/" target="_blank" rel="noopener noreferrer" className="c-button  is-width-full">a-trio のWebサイトへ</a>
            </div>
          </div>
        </>)}/>



      </div>


    </Router>
  );
}

function QuestionPage(props){
  const {
    onChangeManzoku,
    manzokus,
    onSelectHandler,
    answers,
    userEmail,
    userName,
    setUserName,
    setUserEmail,
    hasManzoku,
    hasAnswers,
    hasName,
    hasEmail,
    isCompleted,
  } = props;


  let history = useHistory();

  const onResultClickHandler = (e)=>{
    console.log(e);
    console.log("結果ボタンがクリックされました。");

    /*
      Content-Type: multipart/form-data
      accept: application/json
      accept-encoding: gzip, deflate
      user-agent: Mozilla
    
    */

    //TODO 名前などのバリデーション
    /*

        {
          !hasManzoku ?
            <li>全ての満足度に回答しましょう。</li>
            :null
        }
        {
          !hasAnswers ?
            <li>全ての質問に回答しましょう。</li>
            :null
        }
        {
          !hasName ?
            <li>お名前を教えてください。<br/>ニックネームでも可です。</li>
            :null
        }
        {
          !hasEmail ?
            <li>メールアドレスを教えてください。<br/>診断結果をお送りします。</li>
            :null
        }

    */ 

    if(isCompleted){
      let userResult = "";
      //診断結果の文字列を生成

      userResult += 
        "1. 満足度調査\n" +
        ` 仕事:${manzokus["shigoto"]}%\n`+
        ` お金: ${manzokus["okane"]}%\n`+
        ` 健康: ${manzokus["kenkou"]}%\n`+
        ` 愛情（家族・恋人）:${manzokus["aijou"]} %\n` +
        ` 友人関係: ${manzokus["yuujin"]}%\n` +
        ` 知識・学び: ${manzokus["chishiki" ]}%\n`  +
        ` 趣味: ${manzokus["shumi" ]}%\n` +
        ` 住んでいる場所・環境など物質面: ${manzokus["busshitsu" ]}%\n\n`;
        

      userResult += ""+
        "2. お仕事傾向\n"+
        ` 非対人←→対人: ${calcSum(answers, "human")}%\n`+
        ` 組織←→非組織: ${calcSum(answers, "creative")}%\n`+
        ` 革新的←→安定型: ${calcSum(answers, "organization")}%\n`+
        ` 仕事をこなす←→仕事を作る: ${calcSum(answers, "stability")}%\n`;

        


      superagent
        //.post('http://localhost:8002/wp-json/contact-form-7/v1/contact-forms/6/feedback')

        .post('http://shokikawaguchi.sakura.ne.jp/atoriotest/wp-json/contact-form-7/v1/contact-forms/272/feedback')

        
        .accept('application/json') 
        .field('your-name', userName) //TODO 名前を入れる
        .field('your-email', userEmail)
        .field('your-result', userResult )
        .end((err, res) => {
          // Calling the end function will send the request
          console.log(err);
          const json = JSON.parse(res.text);
          console.log(json)

          switch(json.status){
          case "mail_sent":
            console.log(json.message);
            //移動する
            alert(json.message);
            
            console.log({history});

            history.push("/result")
            break;
          case "validation_failed":
            alert("メールアドレスが正しくありません。");
            break;
          }
        });
    }
    else{
      alert("必須項目を入力してください。");


    }
  }

  return ( <>
    <p className="u-tac u-mb-20">あなたは今、自分の状況にどれくらい満足していますか？</p>
    <p className="p-description">
      “幸せなおしごと・働き方”探しは、自分についてじっくり考えることから始まります。<br/><br/>

      キャリアデザインを考える場合、自分だけでなく、家族など周りの人達へも影響を与えること
      があります。だからこそ、自分の価値観を大切に、将来のビジョンをイメージしておくことが、
      自分や家族の幸せのためにも大切なことなのです。<br/><br/>

      後半は適職を探すヒントにしていただくための診断です。<br/><br/>

      私にとっての幸せな働き方・おしごとは何か、是非、一緒に考えていきましょう。<br/>
    </p>


    <h2>現在の満足度診断</h2>
    <p className="u-mb-20">
      あなたは現在の生活にどの程度満足していますか？ それぞれの項目の満足度を0〜100%で数値化してみましょう。
    </p>


    <ManzokuInput title="仕事" 
      defaultValue={manzokus["shigoto"]} onChange={onChangeManzoku("shigoto")}/>
    <ManzokuInput title="お金" 
      defaultValue={manzokus["okane"]} onChange={onChangeManzoku("okane")}/>
    <ManzokuInput title="健康" 
      defaultValue={manzokus["kenkou"]} onChange={onChangeManzoku("kenkou")}/>
    <ManzokuInput title="愛情（家族・恋人）" 
      defaultValue={manzokus["aijou"]} onChange={onChangeManzoku("aijou")}/>

    <ManzokuInput title="友人関係" 
      defaultValue={manzokus["yuujin"]} onChange={onChangeManzoku("yuujin")}/>
    <ManzokuInput title="知識・学び" 
      defaultValue={manzokus["chishiki" ]} onChange={onChangeManzoku("chishiki")}/>
    <ManzokuInput title="趣味" 
      defaultValue={manzokus["shumi" ]} onChange={onChangeManzoku("shumi")}/>
    <ManzokuInput title="住んでいる場所・<br/>環境など物質面" 
      defaultValue={manzokus["busshitsu" ]} onChange={onChangeManzoku("busshitsu")}/>

    <h2>おしごと傾向診断 簡易版</h2>
    <p>１：全くそうではない　<br/>2：そうではない　<br/>3：その通り　<br/>4：全くその通り </p>
    <p>のうち、当てはまるものを選んでください。考え込まずに、直感で答えましょう。</p>

    <ChoicesTable 
      questionTitle="いちばん満足できるのは、自分の技能と努力の結果として何かを成し得たときだ" 
      categoryId="organization" questionId="q3" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="既成概念にとらわれない発想ができる" 
      categoryId="creative" questionId="q2" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="人から感謝される仕事がしたい" 
      categoryId="human" questionId="q1" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="自分で事業を立ち上げ、軌道に乗せていくことが夢だ" 
      categoryId="organization" questionId="q5" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="自由と裁量より、保障と安定のほうが自分にとっては大切だ" 
      categoryId="stability" questionId="q1" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="結果や内容で評価される職場で働きたい" 
      categoryId="creative" questionId="q1" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="よいキャリアだと実感できるのは、自分なりのアイデアと技能を元にして起業するときだ" 
      categoryId="organization" questionId="q4" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="意にそぐわない配置をして雇用を脅かすような組織には長くとどまろうとは思わない" 
      categoryId="stability" questionId="q2" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="対人サービスの仕事に興味がある" 
      categoryId="human" questionId="q2" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="こだわりが強いほうだ" 
      categoryId="creative" questionId="q3" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="仕事は自分で作るものだと思う" 
      categoryId="creative" questionId="q4" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="話すことが得意である" 
      categoryId="human" questionId="q3" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="ふだん組織の中では、安全と保障を実感できる仕事を求めている" 
      categoryId="stability" questionId="q3" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="キャリアで安定と保障を実感できるのが夢だ" 
      categoryId="stability" questionId="q4" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="コミュニケーションが得意" 
      categoryId="human" questionId="q4" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="自分の作品を作るような仕事がしたい" 
      categoryId="creative" questionId="q5" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="人と関わる仕事がしたい" 
      categoryId="human" questionId="q5" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="自分で会社を起こす元となりそうなアイデアをいつも注意して探している" 
      categoryId="organization" questionId="q1" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="どこかの組織で高い地位を得るより、自分自身で事業を起こすことのほうが大切だと思う" 
      categoryId="organization" questionId="q2" answers={answers} onChange={onSelectHandler} />
    <ChoicesTable 
      questionTitle="自分の職業人生でいちばん満足できるのは、経済面・雇用面での安定を感じられるときだ" 
      categoryId="stability" questionId="q5" answers={answers} onChange={onSelectHandler} />


    <table className="p-info-table u-mt-20 u-mb-20">
      <tbody>
        <tr>
          <th>
            お名前
            <br className="u-sp"/>
            <small>ニックネーム可</small>
          </th>
          <td><input className="c-input-text" type="text" value={userName} onChange={(e)=>setUserName(e.target.value)}/></td>
        </tr>
        <tr>
          <th>メール<br className="u-sp"/>アドレス</th>
          <td><input className="c-input-text" type="email" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/></td>
        </tr>
      </tbody>
    </table> 

    <div className="c-content-column">

      <ul>
        {
          !hasManzoku ?
            <li>全ての満足度に回答しましょう。</li>
            :null
        }
        {
          !hasAnswers ?
            <li>全ての質問に回答しましょう。</li>
            :null
        }
        {
          !hasName ?
            <li>お名前を教えてください。<br/>ニックネームでも可です。</li>
            :null
        }
        {
          !hasEmail ?
            <li>メールアドレスを教えてください。<br/>診断結果をお送りします。</li>
            :null
        }
      </ul>

    </div>
    
    <p className="u-tac u-mb-100">
      {
        isCompleted ? 
          <button onClick={onResultClickHandler} className="c-button is-center">結果を見る</button>
          :
          <>
            <span className="c-button is-center is-sealed">結果を見る</span>

          </>
      }
    </p>

    </>);
}


export default App;
