const {createEnhanceOutofProto}=require('../../index.js')


test('create Set', () => {
  let controller=createEnhanceOutofProto(Set)
  let stringSet=controller.createEntity('firstValue')
  let arraySet=controller.createEntity([1,2,3,3,1])
  let emptyArr=controller.createEntity()
  expect(stringSet.size).toBe(10);
  expect(arraySet.size).toBe(3);
  expect(emptyArr.size).toBe(0);
});



test('add custom method', () => {
  let controller=createEnhanceOutofProto(Set)
  let cusSet=controller.createEntity()
  cusSet.add(1)
  cusSet.add(2)
  cusSet.add(3)
  controller.addMethod('getFirst',function(){
    for(let v of this){
      return v
    }
  })
  expect(cusSet.getFirst()).toBe(1);
});

test('remove single method', () => {
  let controller=createEnhanceOutofProto(Set)
  let cusSet=controller.createEntity()
  cusSet.add(1)
  cusSet.add(2)
  cusSet.add(3)
  controller.addMethod('getFirst',function(){
    for(let v of this){
      return v
    }
  })
  controller.addMethod('getLast',function(){
    let lastV
    for(let v of this)lastV=v
    return lastV
  })
  controller.removeMethod('getFirst')
  expect(cusSet.getFirst).toBe(undefined);
  expect(cusSet.getLast()).toBe(3);
});

test('remove all', () => {
  let controller=createEnhanceOutofProto(Set)
  let cusSet=controller.createEntity()
  cusSet.add(1)
  cusSet.add(2)
  cusSet.add(3)
  controller.addMethod('getFirst',function(){
    return 1
  })
  controller.addMethod('getLast',function(){
    return 3
  })
  controller.removeMethod()
  expect(cusSet.getFirst).toBe(undefined);
  expect(cusSet.getLast).toBe(undefined);
});

test('rawSet convert to enhance', () => {
  let controller=createEnhanceOutofProto(Set)
  let rawSet=new Set([1,2,3,4,5])
  controller.addMethod('getLast',function(){
    let lastV
    for(let v of this)lastV=v
    return lastV
  })
  let enhanceSet=controller.toEnhance(rawSet)
  expect(enhanceSet.getLast()).toBe(5);
});

test('to raw set', () => {
  let controller=createEnhanceOutofProto(Set)
  let cusSet=controller.createEntity([1,2,3,4,5])
  controller.addMethod('getFirst',function(){
    return 1
  })
  controller.addMethod('getLast',function(){
    return 5
  })
  let rawSet=cusSet.toRaw()
  expect(rawSet.size).toBe(5);
  expect(rawSet.has(2)).toBe(true);
  expect(rawSet.addMethod).toBe(undefined);
  expect(rawSet.getFirst).toBe(undefined);
  expect(rawSet.getLast).toBe(undefined);
});


test('multi entity', () => {
  let controller=createEnhanceOutofProto(Set)
  let cusSet=controller.createEntity([1,2,3,4,5])
  let cusSet2=cusSet.constructor()
  controller.addMethod('getFirst',function(){
    return 1
  })
  controller.addMethod('getLast',function(){
    return 5
  })
  let cusSet3=cusSet2.constructor()
  expect(typeof cusSet2.getFirst).toBe('function');
  expect(typeof cusSet2.getLast).toBe('function');
  expect(typeof cusSet3.getLast).toBe('function');
  controller.removeMethod()
  expect(cusSet.getFirst).toBe(undefined);
  expect(cusSet.getLast).toBe(undefined);
  expect(cusSet2.getFirst).toBe(undefined);
  expect(cusSet2.getLast).toBe(undefined);
  expect(cusSet3.getLast).toBe(undefined);
});