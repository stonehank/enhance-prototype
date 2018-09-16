const checkIfNeedController=require("../checkIfNeedController.js")

let answer=[false,true,false,true,true,true,true,true,false,false,false,false,true,false,false,true,false,true]
let testList=[
  `function(){}`,
  `function x(controller,b){}`,
  `function( /* controller*/b){}`,
  `y=function(controller,b){}`,
  `controller=>5+6`,
  `(controller,a,c)=>5+3`,
  `class{constructor(controller,b){}}`,
  `class A{init(a,b){};constructor(controller,b){}}`,
  `class B{init(a,b){let l=function(controller){}};constructor(b){}}`,
  `function async(a=function(controller){},b="controller"){}`,
  `function *(a="controller",b){}`,
  `function (control,b){}`,
  `function z( /* controller*/controller){}`,
  new Function,
  new Function('control=controller','x=5'),
  new Function('controller','a','x=5'),
  `function(
    /*controller*/
    a,b
  ){}`,
  `function p(

    controller,
    /*controller*/
    a,b
  ){}`,
]

let res
for(let i=0;i<testList.length;i++){
  test(`check ${i} has parameter "controller"`, () => {
    res=checkIfNeedController(testList[i])
    expect(res).toEqual(answer[i])
  })
}

