const checkIfNeedController=require("../checkIfNeedController.js")


let testList=[
  function x(){},
  function x(controller,b){},
  function x( /* controller*/b){},
  x=function(controller,b){},
  controller=>5+6,
  (controller,a,c)=>5+3,
  class{constructor(controller,b){}},
  class A{init(a,b){};constructor(controller,b){}},
  class A{init(a,b){let x=function(controller){}};constructor(b){}},
  function async(a=function(controller){},b="controller"){},
  function *(a="controller",b){},
  function (control,b){},
  function x( /* controller*/controller){},
  new Function,
  new Function('control=controller','x=5'),
  new Function('controller','a','x=5'),
  function x(
    /*controller*/
    a,b
  ){},
  function x(

    controller,
    /*controller*/
    a,b
  ){}
]

let answer=[
  false,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  true
]


for(let i=0;i<testList.length;i++){
  test(`check ${i} has parameter "controller"`, () => {
    expect(checkIfNeedController(testList[i])).toBe(answer[i])
  })
}

