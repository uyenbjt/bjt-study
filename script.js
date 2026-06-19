fetch('BJT - quiz.csv')
.then(r=>r.text())
.then(t=>{
console.log(t.split('\n')[1]);
});
