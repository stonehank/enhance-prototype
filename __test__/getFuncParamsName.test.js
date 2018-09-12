const {getFuncParamsName}=require('../index.js')

let testList=[
  'function x(a,b,c){}' // returns ["a","b","c"]
  ,'function d(){}' // returns []
  ,'function named(a, b, c) {}' // returns ["a","b","c"]
  ,'function x(a /* = 1 */, b /* = true */) {}' // returns ["a","b"]
  ,'function fprintf(handle, fmt /*, {}*/) {}' // returns ["handle","fmt"]
  ,'function x( a, b = 1, c ){}' // returns ["a","b","c"]
  ,'function x(a=4*(5/3), b) {}' // returns ["a","b"]
  ,'function x(a /* function() yes */, \n /* no, */b)/* omg! */{}' // returns ["a","b"]
  ,'function x( A, b \n,c ,d \n ) \n {}' // returns ["A","b","c","d"]
  ,'function x(a,b){}' // returns ["a","b"]
  ,'function $args(func) {}' // returns ["func"]
  ,'function Object() {}' // returns []
  ,'e=>{}'
  ,'(a,b)=>{}'
  ,'(e)=>1'
  ,'(a=65,b=undefined)=>"string"'
  ,'x=e=>{}'
  ,'x=(e)=>{}'
  ,'let x=(e,b)=>{}'
  ,'let x=e=>5'
  ,'x=function(bb){}'
  ,'let x=function(aa,cc){}'

]
let answer=[
  "[ 'a', 'b', 'c' ]"
  ,"[]"
  ,"[ 'a', 'b', 'c' ]"
  ,"[ 'a', 'b' ]"
  ,"[ 'handle', 'fmt' ]"
  ,"[ 'a', 'b', 'c' ]"
  ,"[ 'a', 'b' ]"
  ,"[ 'a', 'b' ]"
  ,"[ 'A', 'b', 'c', 'd' ]"
  ,"[ 'a', 'b' ]"
  ,"[ 'func' ]"
  ,"[]"
  ,"[ 'e' ]"
  ,"[ 'a', 'b' ]"
  ,"[ 'e' ]"
  ,"[ 'a', 'b' ]"
  ,"[ 'e' ]"
  ,"[ 'e' ]"
  ,"[ 'e', 'b' ]"
  ,"[ 'e' ]"
  ,"[ 'bb' ]"
  ,"[ 'aa', 'cc' ]"
]

test("get function parameters' name", () => {
  for(let i=0;i<test.length;i++){
    expect(getFuncParamsName(testList[i])).toEqual(answer[i])
  }
});





