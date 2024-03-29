
const express = require ('express');
const morgan = require ('morgan');

const app = express();
app.use(morgan('dev'));

//drill 1
app.get('/sum',(req,res)=>{
  const {a,b} = req.query;

  if(!a){
    return res.status(400).send('Please provide a number a');
  }
  if(!b){
    return res.status(400).send('Plese provide a number b');
  }
  const floatA = parseFloat(a);
  console.log(typeof floatA);
  const floatB = parseFloat(b);
  console.log(typeof floatB);
  if(typeof floatA !=='number'){
    return res.status(400).send('A is not a number');
  }
  if(typeof floatB !=='number'){
    return res.status(400).send('B is not a number');
  }
  const c = floatA + floatB;
  const sum = `The sum of ${a} and ${b} is ${c}`;

  res.send(sum);
});
//drill 2
app.get('/cipher',(req,res)=>{
  const{text , shift} = req.query;
  if(!text){
    return res.status(400).send('Please provide a text');
  }
  if(!shift){
    return res.status(400).send('Plese provide a shift');
  }
  let shiftInt = parseInt(shift);
  if(typeof text !=='string'){
    return res.status(400).send('text is not a string');
  }
  if(typeof shiftInt !=='number'){
    return res.status(400).send('shift is not a number');
  }

  let wordArray = text.split('');
  let resultArray = [];
  wordArray.forEach(letter => {
    let letterCode = letter.charCodeAt(0);
    let newLetterCode = letterCode + shiftInt;
    resultArray.push(String.fromCharCode(newLetterCode));
  });

  let result = resultArray.join('');
  return res.send(result);
});
//drill 3
app.get('/lotto',(req,res)=>{
  const{arr} = req.query;
  if(!arr){
    return res.status(400).send('Please provide an array');
  }
  if(typeof arr !== 'object'){
    return res.status(400).send('Has to be an array');

  }
  if(arr.length!==6){
    return res.status(400).send('array length is not 6');
  }
  let randomNums=[];
  for (let i=0;i<6;i++) {
    let randomNum=Math.ceil(Math.random()*20);
    randomNums.push(randomNum);
  }
  let matchingCount = 0;
  let workingArray = [];
  arr.forEach(numberString => {
    workingArray.push(parseInt(numberString));
  });
  workingArray.forEach((number , index) => {
    if (number < 1 || number > 20){

      return res.status(400).send(`arr index: ${index} is >20 or < 1`);
    }
    for (let i = 0; i < randomNums.length ; i ++){
      if(number === randomNums[i]){
        matchingCount ++;
      }
    }
  });

  if (matchingCount < 4){
    let myString = 'Sorry you lose , matchingCount : ' + matchingCount;
    return res.send(myString);
  }

  if (matchingCount === 4){
    let myString = 'congratulations! you win a FREE ticket , matchingCount : ' + matchingCount;
    return res.send(myString);
  }
  if (matchingCount === 5){
    let myString = 'congratulations! you win $100 , matchingCount : ' + matchingCount;
    return res.send(myString);
  }
  if (matchingCount === 6){
    let myString = 'Wow! Unbelievable! You could have won the mega millions!, matchingCount : ' + matchingCount;
    return res.send(myString);
  }
  else{
    let randomNumsString = randomNums.join(', ');
    let myNumsString = workingArray.join(', ');
    let resultString = 'myNums: ' + myNumsString + ' randomNums: ' + randomNumsString + 'matching amount: ' + matchingCount;
    return res.send(resultString);
  }




  
});

app.listen(8080, ()=> console.log('Server on 8080') );