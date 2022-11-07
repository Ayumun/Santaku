'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');

  //show scoreに必要
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p'); //querySelectorでresult直下のpを取得する

  const quizSet = shuffle([
    {q: 'What is A?', c: ['A0', 'A1', 'A2']},
    {q: 'What is B?', c: ['B0', 'B1', 'B2']},
    {q: 'What is C?', c: ['C0', 'C1', 'C2']},
  ]);

  let currentNum = 0;
  let isAnswered;
  let score = 0;

  //questionのtextContentにcurrentNum=0つまり、quizSezの0番目の要素が入る
  //question.textContent = quizSet[currentNum].q;

  //要素をシャッフル
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); //random()*10なら1から10までの要素で乱数生成
      [arr[j], arr[i]] = [arr[i], arr[j]]; //最後の要素iとランダム要素jを入れ替え
    }
    return arr;
  }


  //洗濯した答えが正解かどうかを判定する関数
  function checkAnswer(li) {
    if (isAnswered) { //isAnswered === trueの意味
        return;
      }
      isAnswered = true;

    //元配列の0番目の要素が正解になる
    if (li.textContent === quizSet[currentNum].c[0]) {
      //console.log('correct');
      li.classList.add('correct'); //正解ならcorrectクラスをadd
      score++;
    } else {
      //console.log('wrong');
      li.classList.add('wrong'); //不正解ならwrongクラスをadd
    }
    btn.classList.remove('disabled'); //btnクラスからdisabledを取り除く
    //デフォルトではdisabledは、付いているおり、回答を選ぶと外れる
  }
  

  //クイズを描画する関数
  function setQuiz() {
    isAnswered = false; //何も回答していない状態ではfalse

    //問題文
    question.textContent = quizSet[currentNum].q; 

    //前の問題を消して、1つの問題のみ画面に表示
    while (choices.firstChild) {
        choices.removeChild(choices.firstChild);
    }
    
    //選択肢
    const shuffledChoices = shuffle([...quizSet[currentNum].c]); //参照だけ渡すことで、本当の要素は席替えしない
        // console.log(quizSet[currentNum].c);
        //li要素を作って、そのtextcontentにforEachで取得した、currentNum.cの値をchoice関数で動かして代入する
        //以下は見た目(li要素)を、作って値を代入していく処理
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            })
            choices.appendChild(li); //appendChild：動的に要素を追加する
    });
    //最後の問題の時は、次へボタンの表示をshow scoreに変更する
    if (currentNum === quizSet.length - 1) {
        btn.textContent = 'Show Score';
    }
  }

  setQuiz(); //次の問題

  btn.addEventListener('click', () => {
    //ボタンにdisabledクラスがついていたら次の処理に行かないようにする
    if (btn.classList.contains('disabled')) { //disabledクラスは回答を選択すると外れるようになっている
        return; //disableがついていたら、処理をせずにreturn
      }
    //選択肢を選択して次の問題に行く時は、ボタンをグレーに戻すためにdisableをつける
    btn.classList.add('disabled');

    //正解数をカウント
    if (currentNum === quizSet.length - 1) {
        // console.log(`Score: ${score} / ${quizSet.length}`);
        scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
        result.classList.remove('hidden');
    } else {
        currentNum++;
        setQuiz();
    }

  });
}