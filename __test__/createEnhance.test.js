const {createEnhance}=require('../index.js')

test('create Array,init string', () => {
  let controller=createEnhance('Array')
  let cusArr=controller.createEntity('firstValue')
  expect(cusArr.length).toBe(1);
  expect(cusArr[0]).toBe('firstValue');
});

test('create Array,init length 5', () => {
  let controller=createEnhance('Array')
  let cusArr=controller.createEntity(5)
  expect(cusArr.length).toBe(5);
});

test('add custom method', () => {
  let controller=createEnhance('Array')
  let cusArr=controller.createEntity()
  cusArr.push(1)
  cusArr.push(2)
  cusArr.push(3)
  controller.addMethod('getFirst',function(){
    return this[0]
  })
  expect(cusArr.getFirst()).toBe(1);
});

test('remove single method', () => {
  let controller=createEnhance('Array')
  let cusArr=controller.createEntity()
  cusArr.push(1)
  cusArr.push(2)
  cusArr.push(3)
  controller.addMethod('getFirst',function(){
    return this[0]
  })
  controller.addMethod('getLast',function(){
    return this[this.length-1]
  })
  controller.removeMethod('getFirst')
  expect(cusArr.getFirst).toBe(undefined);
  expect(cusArr.getLast()).toBe(3);
});

test('remove all', () => {
  let controller=createEnhance('Array')
  let cusArr=controller.createEntity()
  cusArr.push(1)
  cusArr.push(2)
  cusArr.push(3)
  controller.addMethod('getFirst',function(){
    return this[0]
  })
  controller.addMethod('getLast',function(){
    return this[this.length-1]
  })
  controller.removeMethod()
  expect(cusArr.getFirst).toBe(undefined);
  expect(cusArr.getLast).toBe(undefined);
});

test('to raw structure', () => {
  let controller=createEnhance('Array')
  let cusArr=controller.createEntity()
  cusArr.push(1)
  cusArr.push(2)
  cusArr.push(3)
  controller.addMethod('getFirst',function(){
    return this[0]
  })
  controller.addMethod('getLast',function(){
    return this[this.length-1]
  })
  let rawArr=cusArr.toRaw()
  expect(rawArr.length).toBe(3);
  expect(rawArr[1]).toBe(2);
  expect(rawArr.addMethod).toBe(undefined);
  expect(rawArr.getFirst).toBe(undefined);
  expect(rawArr.getLast).toBe(undefined);
});



test('create Object', () => {
  let controller=createEnhance('object')
  let cusObj=controller.createEntity()
  expect(Object.prototype.toString.call(cusObj)).toBe('[object Object]');
});

test('add custom method', () => {
  let controller=createEnhance('object')
  let cusObj=controller.createEntity()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  controller.addMethod('getSize',function(){
    return Object.keys(this).length
  })
  expect(cusObj.getSize()).toBe(3);
});

test('remove specified method', () => {
  let controller=createEnhance('object')
  let cusObj=controller.createEntity()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  controller.addMethod('getSize',function(){
    return Object.keys(this).length
  })
  controller.addMethod('getFunctionKey',function(){
    return Object.keys(this).filter(k=>typeof this[k]==='function')
  })
  expect(cusObj.getFunctionKey()).toEqual(['z']);
  controller.removeMethod('getFunctionKey')
  expect(cusObj.getFunctionKey).toBe(undefined);
});

test('remove all', () => {
  let controller=createEnhance('object')
  let cusObj=controller.createEntity()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  controller.addMethod('getSize',function(){
    return Object.keys(this).length
  })
  controller.addMethod('getFunctionKey',function(){
    return Object.keys(this).filter(k=>typeof this[k]==='function')
  })

  controller.removeMethod()
  expect(cusObj.getSize).toBe(undefined);
  expect(cusObj.getFunctionKey).toBe(undefined);
});

test('to raw structure,is sallowCopy', () => {
  let controller=createEnhance('object')
  let cusObj=controller.createEntity()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  controller.addMethod('getSize',function(){
    return Object.keys(this).length
  })
  controller.addMethod('getFunctionKey',function(){
    return Object.keys(this).filter(k=>typeof this[k]==='function')
  })

  let rawObj=cusObj.toRaw()
  expect(rawObj.y===cusObj.y).toBe(true);
  expect(rawObj.x).toBe(1);
  expect(rawObj.addMethod).toBe(undefined);
  expect(rawObj.getFunctionKey).toBe(undefined);
  expect(rawObj.getSize).toBe(undefined);
});


test('multi entity', () => {
  let controller=createEnhance('object')
  let cusObj=controller.createEntity()
  let cusObj2=cusObj.constructor()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  controller.addMethod('getSize',function(){
    return Object.keys(this).length
  })
  controller.addMethod('getFunctionKey',function(){
    return Object.keys(this).filter(k=>typeof this[k]==='function')
  })
  let cusObj3=cusObj2.constructor()
  expect(typeof cusObj2.getSize).toBe('function');
  expect(typeof cusObj2.getFunctionKey).toBe('function');
  expect(typeof cusObj3.getFunctionKey).toBe('function');
  controller.removeMethod()
  expect(cusObj.getSize).toBe(undefined);
  expect(cusObj.getFunctionKey).toBe(undefined);
  expect(cusObj2.getSize).toBe(undefined);
  expect(cusObj2.getFunctionKey).toBe(undefined);
  expect(cusObj3.getFunctionKey).toBe(undefined);
});