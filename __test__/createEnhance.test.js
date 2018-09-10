const {createEnhance}=require('../index.js')

let extraMethod={
  slice:function (controller,start=0,end) {
    let sliceArr=Array.prototype.slice.call(this,start,end)
    return controller.toEnhance(sliceArr)
  },
  concat:function (controller) {
    let args=[].slice.call(arguments,1)
    let concatArr=Array.prototype.concat.apply(this,args)
    return controller.toEnhance(concatArr)
  }
}


test('create Array', () => {
  let controller=createEnhance(Array)
  let stringArr=controller.createEntity('firstValue')
  let undefinedArr=controller.createEntity(undefined)
  let nullArr=controller.createEntity(null)
  let numArr=controller.createEntity(5)
  let emptyArr=controller.createEntity()
  expect(stringArr.length).toBe(1);
  expect(stringArr[0]).toBe('firstValue');
  expect(undefinedArr[0]).toBe(undefined);
  expect(nullArr[0]).toBe(null);
  expect(numArr.length).toBe(5);
  expect(emptyArr.length).toBe(0);
});



test('add custom method', () => {
  let controller=createEnhance(Array)
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
  let controller=createEnhance(Array)
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
  let controller=createEnhance(Array)
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

test('rawArr convert to enhance', () => {
  let controller=createEnhance(Array)
  let rawArr=[1,2,3,4,5]
  controller.addMethod('getLast',function(){
    return this[this.length-1]
  })
  let enhanceArr=controller.toEnhance(rawArr)
  expect(enhanceArr.getLast).not.toBe(undefined);
});


test(' slice should not convert to raw', () => {
  let controller=createEnhance(Array)
  controller.addMethod('slice',extraMethod.slice)
  let cusArr=controller.createEntity()
  cusArr.push(1)
  cusArr.push(2)
  cusArr.push(3)
  cusArr.push(4)
  cusArr.push(5)
  cusArr.push(6)
  controller.addMethod('getFirst',function(){
    return this[0]
  })
  controller.addMethod('getLast',function(){
    return this[this.length-1]
  })
  let xArr=cusArr.slice(2,4)
  expect(xArr.getFirst).not.toBe(undefined);
  expect(xArr.length).toBe(2);
  expect(xArr).toEqual([3,4]);
});

test(' concat should not convert to raw', () => {
  let controller=createEnhance(Array)
  controller.addMethod('concat',extraMethod.concat)
  let cusArr=controller.createEntity()
  cusArr.push(1)
  cusArr.push(2)
  cusArr.push(3)
  cusArr.push(4)
  cusArr.push(5)
  cusArr.push(6)
  controller.addMethod('getFirst',function(){
    return this[0]
  })
  controller.addMethod('getLast',function(){
    return this[this.length-1]
  })
  let xArr=cusArr.concat([7,8],[9,10])
  expect(xArr.getFirst).not.toBe(undefined);
  expect(xArr.length).toBe(10);
  expect(xArr[8]).toBe(9);
  expect(xArr[5]).toBe(6);
});



test('to raw array', () => {
  let controller=createEnhance(Array)
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
  let controller=createEnhance(Object)
  let cusObj=controller.createEntity()
  expect(Object.prototype.toString.call(cusObj)).toBe('[object Object]');
});

test('add custom method', () => {
  let controller=createEnhance(Object)
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
  let controller=createEnhance(Object)
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
  let controller=createEnhance(Object)
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
  expect(cusObj.constructor).not.toBe(undefined);
  expect(cusObj.toRaw).not.toBe(undefined);
  expect(cusObj.getFunctionKey).toBe(undefined);
});

test('to raw object,is sallowCopy', () => {
  let controller=createEnhance(Object)
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

test('rawObj convert to enhance', () => {
  let controller=createEnhance(Object)
  let rawObj={x:1,y:2}
  controller.addMethod('test1',function(){
    return 1
  })
  let enhanceObj=controller.toEnhance(rawObj)
  expect(enhanceObj.test1).not.toBe(undefined);
});


test('multi entity', () => {
  let controller=createEnhance(Object)
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