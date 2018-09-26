const checkThisInArrowFunctionTest=require("../checkThisInArrowFunction.js")

let a=()=>this
let b=()=>'this'
let c=()=>'flsd slfjfwom this sdf'
let d=()=>{eval('this')}
let e=()=>{let t=4;return t+'his'}
let f=()=>{let thi='flsd slfjfwom this sdf';return this}
let g=function(){let x=this;return this}
let h=function(){let x="this"}
let i=function(){let a=()=>{return this};return this}

test('check if arrowFunction has this', () => {

  expect(checkThisInArrowFunctionTest(a)).toBe(true);
  expect(checkThisInArrowFunctionTest(b)).toBe(false);
  expect(checkThisInArrowFunctionTest(c)).toBe(false);
  expect(checkThisInArrowFunctionTest(d)).toBe(true);
  expect(checkThisInArrowFunctionTest(e)).toBe(false);
  expect(checkThisInArrowFunctionTest(f)).toBe(true);
  expect(checkThisInArrowFunctionTest(g)).toBe(false);
  expect(checkThisInArrowFunctionTest(h)).toBe(false);
  expect(checkThisInArrowFunctionTest(i)).toBe(false);
});