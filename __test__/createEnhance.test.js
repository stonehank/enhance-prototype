const {createEnhance}=require('../index.js')

test('create Array,init string', () => {
  let cusArr=createEnhance('Array')('firstValue')
  expect(cusArr.length).toBe(1);
  expect(cusArr[0]).toBe('firstValue');
});

test('create Array,init length 5', () => {
  let cusArr=createEnhance('Array')(5)
  expect(cusArr.length).toBe(5);
});

test('add custom method', () => {
  let cusArr=createEnhance('Array')()
  cusArr.push(1)
  cusArr.push(2)
  cusArr.push(3)
  cusArr.addMethod('getFirst',function(arr){
    return arr[0]
  })
  expect(cusArr.getFirst()).toBe(1);
});

test('remove single method', () => {
  let cusArr=createEnhance('Array')()
  cusArr.push(1)
  cusArr.push(2)
  cusArr.push(3)
  cusArr.addMethod('getFirst',function(arr){
    return arr[0]
  })
  cusArr.addMethod('getLast',function(arr){
    return arr[arr.length-1]
  })
  cusArr.removeMethod('getFirst')
  expect(cusArr.getFirst).toBe(undefined);
  expect(cusArr.getLast()).toBe(3);
});

test('remove all', () => {
  let cusArr=createEnhance('Array')()
  cusArr.push(1)
  cusArr.push(2)
  cusArr.push(3)
  cusArr.addMethod('getFirst',function(arr){
    return arr[0]
  })
  cusArr.addMethod('getLast',function(arr){
    return arr[arr.length-1]
  })
  cusArr.removeMethod()
  expect(cusArr.getFirst).toBe(undefined);
  expect(cusArr.getLast).toBe(undefined);
});

test('to raw structure', () => {
  let cusArr=createEnhance('Array')()
  cusArr.push(1)
  cusArr.push(2)
  cusArr.push(3)
  cusArr.addMethod('getFirst',function(arr){
    return arr[0]
  })
  cusArr.addMethod('getLast',function(arr){
    return arr[arr.length-1]
  })
  let rawArr=cusArr.toRaw()
  expect(rawArr.length).toBe(3);
  expect(rawArr[1]).toBe(2);
  expect(rawArr.addMethod).toBe(undefined);
  expect(rawArr.getFirst).toBe(undefined);
  expect(rawArr.getLast).toBe(undefined);
});



test('create Object', () => {
  let cusObj=createEnhance('object')()
  expect(Object.prototype.toString.call(cusObj)).toBe('[object Object]');
});

test('add custom method', () => {
  let cusObj=createEnhance('object')()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  cusObj.addMethod('getSize',function(obj){
    return Object.keys(obj).length
  })
  expect(cusObj.getSize()).toBe(3);
});

test('remove specified method', () => {
  let cusObj=createEnhance('object')()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  cusObj.addMethod('getSize',function(obj){
    return Object.keys(obj).length
  })
  cusObj.addMethod('getFunctionKey',function(obj){
    return Object.keys(obj).filter(k=>typeof obj[k]==='function')
  })
  expect(cusObj.getFunctionKey()).toEqual(['z']);
  cusObj.removeMethod('getFunctionKey')
  expect(cusObj.getFunctionKey).toBe(undefined);
});

test('remove all', () => {
  let cusObj=createEnhance('object')()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  cusObj.addMethod('getSize',function(obj){
    return Object.keys(obj).length
  })
  cusObj.addMethod('getFunctionKey',function(obj){
    return Object.keys(obj).filter(k=>typeof obj[k]==='function')
  })

  cusObj.removeMethod()
  expect(cusObj.getSize).toBe(undefined);
  expect(cusObj.getFunctionKey).toBe(undefined);
});

test('to raw structure,is sallowCopy', () => {
  let cusObj=createEnhance('object')()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  cusObj.addMethod('getSize',function(obj){
    return Object.keys(obj).length
  })
  cusObj.addMethod('getFunctionKey',function(obj){
    return Object.keys(obj).filter(k=>typeof obj[k]==='function')
  })

  let rawObj=cusObj.toRaw()
  expect(rawObj.y===cusObj.y).toBe(true);
  expect(rawObj.x).toBe(1);
  expect(rawObj.addMethod).toBe(undefined);
  expect(rawObj.getFunctionKey).toBe(undefined);
  expect(rawObj.getSize).toBe(undefined);
});
