//drill 1
const express = require ('express');
const morgan = require ('morgan');

const app = express();

app.use(morgan('dev'));

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
  const c = parseFloat(c);
  const sum = `The sum of ${a} and ${b} is ${c}`;

  res.send(sum);
});
 
app.listen(8080, ()=> console.log('Server on 8080') );