const {createEnhance}=require('../index.js')


test('create Function', () => {
  let controller=createEnhance(Function)
  let addSum=controller.createEntity('a','b','return a+b')
  let oneParams=controller.createEntity('x','')
  expect(addSum.length).toBe(2);
  expect(addSum(5,8)).toBe(13);
  expect(oneParams.length).toBe(1);
});



test('add custom method', () => {
  let controller=createEnhance(Function)
  let cusFunc=controller.createEntity()
  controller.addMethod('test1',function(){
    return 'test1'
  })
  expect(cusFunc.test1()).toBe('test1');
});

test('remove single method', () => {
  let controller=createEnhance(Function)
  let cusFunc=controller.createEntity()

  controller.addMethod('test1',function(){
    return 'test1'
  })
  controller.addMethod('test2',function(){
    return 'test2'
  })
  controller.removeMethod('test1')
  expect(cusFunc.test1).toBe(undefined);
  expect(cusFunc.test2()).toBe('test2');
});


test('remove all', () => {
  let controller=createEnhance(Function)
  let cusFunc=controller.createEntity()

  controller.addMethod('test1',function(){
    return 'test1'
  })
  controller.addMethod('test2',function(){
    return 'test2'
  })
  controller.removeMethod()
  expect(cusFunc.test1).toBe(undefined);
  expect(cusFunc.test2).toBe(undefined);
});


test('raw convert to enhance', () => {
  let controller=createEnhance(Function)
  let raw=function(){
    return 'raw'
  }
  controller.addMethod('test1',function(){
    return 'test1'
  })
  let enhance=controller.toEnhance(raw)
  expect(enhance.test1).not.toBe(undefined);
});



test('enhance convert to raw ', () => {
  let controller=createEnhance(Function)
  let cus=controller.createEntity()
  controller.addMethod('test1',function(){
    return 'test1'
  })
  controller.addMethod('test2',function(){
    return 'test2'
  })
  let raw=cus.toRaw()

  expect(raw.addMethod).toBe(undefined);
  expect(raw.test1).toBe(undefined);
  expect(raw.test2).toBe(undefined);
});


test('multi entity', () => {
  let controller=createEnhance(Function)
  let cusFunc=controller.createEntity()
  let cusFunc2=cusFunc.constructor()
  controller.addMethod('test1',function(){
    return 'test1'
  })
  controller.addMethod('test2',function(){
    return 'test2'
  })
  let cusFunc3=cusFunc2.constructor()
  expect(typeof cusFunc2.test1).toBe('function');
  expect(typeof cusFunc2.test2).toBe('function');
  expect(typeof cusFunc3.test2).toBe('function');
  controller.removeMethod()
  expect(cusFunc.test1).toBe(undefined);
  expect(cusFunc.test2).toBe(undefined);
  expect(cusFunc2.test1).toBe(undefined);
  expect(cusFunc2.test2).toBe(undefined);
  expect(cusFunc3.test2).toBe(undefined);
});