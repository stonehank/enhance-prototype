const {createEnhanceOutofProto}=require('../../index.js')

test('create Object', () => {
  let controller=createEnhanceOutofProto(Object)
  let cusObj=controller.createEntity()
  expect(Object.prototype.toString.call(cusObj)).toBe('[object Object]');
});

test('add custom method', () => {
  let controller=createEnhanceOutofProto(Object)
  let cusObj=controller.createEntity()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  controller.addProp('getSize',function(){
    return Object.keys(this).length
  })
  expect(cusObj.getSize()).toBe(3);
});

test('remove specified method', () => {
  let controller=createEnhanceOutofProto(Object)
  let cusObj=controller.createEntity()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  controller.addProp('getSize',function(){
    return Object.keys(this).length
  })
  controller.addProp('getFunctionKey',function(){
    return Object.keys(this).filter(k=>typeof this[k]==='function')
  })
  expect(cusObj.getFunctionKey()).toEqual(['z']);
  controller.removeProp('getFunctionKey')
  expect(cusObj.getFunctionKey).toBe(undefined);
});

test('remove all', () => {
  let controller=createEnhanceOutofProto(Object)
  let cusObj=controller.createEntity()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  controller.addProp('getSize',function(){
    return Object.keys(this).length
  })
  controller.addProp('getFunctionKey',function(){
    return Object.keys(this).filter(k=>typeof this[k]==='function')
  })

  controller.removeProp()
  expect(cusObj.getSize).toBe(undefined);
  expect(cusObj.constructor).not.toBe(undefined);
  expect(cusObj.toRaw).not.toBe(undefined);
  expect(cusObj.getFunctionKey).toBe(undefined);
});

test('to raw object,is sallowCopy', () => {
  let controller=createEnhanceOutofProto(Object)
  let cusObj=controller.createEntity()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  controller.addProp('getSize',function(){
    return Object.keys(this).length
  })
  controller.addProp('getFunctionKey',function(){
    return Object.keys(this).filter(k=>typeof this[k]==='function')
  })

  let rawObj=cusObj.toRaw()
  expect(rawObj.y===cusObj.y).toBe(true);
  expect(rawObj.x).toBe(1);
  expect(rawObj.addProp).toBe(undefined);
  expect(rawObj.getFunctionKey).toBe(undefined);
  expect(rawObj.getSize).toBe(undefined);
});

test('rawObj convert to enhance', () => {
  let controller=createEnhanceOutofProto(Object)
  let rawObj={x:1,y:2}
  controller.addProp('test1',a=>a)
  let enhanceObj=controller.toEnhance(rawObj)
  expect(enhanceObj.test1).not.toBe(undefined);
});


test('multi entity', () => {
  let controller=createEnhanceOutofProto(Object)
  let cusObj=controller.createEntity()
  let cusObj2=cusObj.constructor()
  cusObj.x=1
  cusObj.y=[1,2]
  cusObj.z=function(){}
  controller.addProp('getSize',function(){
    return Object.keys(this).length
  })
  controller.addProp('getFunctionKey',function(){
    return Object.keys(this).filter(k=>typeof this[k]==='function')
  })
  let cusObj3=cusObj2.constructor()
  expect(typeof cusObj2.getSize).toBe('function');
  expect(typeof cusObj2.getFunctionKey).toBe('function');
  expect(typeof cusObj3.getFunctionKey).toBe('function');
  controller.removeProp()
  expect(cusObj.getSize).toBe(undefined);
  expect(cusObj.getFunctionKey).toBe(undefined);
  expect(cusObj2.getSize).toBe(undefined);
  expect(cusObj2.getFunctionKey).toBe(undefined);
  expect(cusObj3.getFunctionKey).toBe(undefined);
});