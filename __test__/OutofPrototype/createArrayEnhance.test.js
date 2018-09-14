const {createEnhanceOutofProto}=require('../../index.js')

let extraMethod={
  slice:function (controller,start=0,end) {
    let sliceArr=Array.prototype.slice.call(this,start,end)
    return controller.toEnhance(sliceArr)
  },
  concat:function (controller) {
    let args=[].slice.call(arguments,1)
    let concatArr=Array.prototype.concat.call(this,...args)
    return controller.toEnhance(concatArr)
  }
}


test('create Array', () => {
  let controller=createEnhanceOutofProto(Array)
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
  let controller=createEnhanceOutofProto(Array)
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
  let controller=createEnhanceOutofProto(Array)
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
  let controller=createEnhanceOutofProto(Array)
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
  let controller=createEnhanceOutofProto(Array)
  let rawArr=[1,2,3,4,5]
  controller.addMethod('getLast',function(){
    return this[this.length-1]
  })
  let enhanceArr=controller.toEnhance(rawArr)
  expect(enhanceArr.getLast).not.toBe(undefined);
});


test('add custom slice, should not convert to raw', () => {
  let controller=createEnhanceOutofProto(Array)
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

test('add custom concat, should not convert to raw', () => {
  let controller=createEnhanceOutofProto(Array)
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
  let controller=createEnhanceOutofProto(Array)
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


test('multi entity', () => {
  let controller=createEnhanceOutofProto(Array)
  let cusArr=controller.createEntity()
  let cusArr2=cusArr.constructor()
  cusArr.push(1)
  cusArr.push(2)
  cusArr.push(3)
  controller.addMethod('getFirst',function(){
    return this[0]
  })
  controller.addMethod('getLast',function(){
    return this[this.length-1]
  })
  let cusArr3=cusArr2.constructor()
  expect(typeof cusArr2.getFirst).toBe('function');
  expect(typeof cusArr2.getLast).toBe('function');
  expect(typeof cusArr3.getLast).toBe('function');
  controller.removeMethod()
  expect(cusArr.getFirst).toBe(undefined);
  expect(cusArr.getLast).toBe(undefined);
  expect(cusArr2.getFirst).toBe(undefined);
  expect(cusArr2.getLast).toBe(undefined);
  expect(cusArr3.getLast).toBe(undefined);
});


test('add property', () => {
  let controller=createEnhanceOutofProto(Array)
  let curArr=controller.createEntity()
  controller.addMethod('specialString','string')
  controller.addMethod('specialArray',[1,2,3])
  controller.addMethod('specialObject',{value:true})
  controller.addMethod('specialNumber',54)
  let arr=[1,2,3]
  expect(curArr.specialString).toBe("string")
  expect(curArr.specialArray).toEqual([1,2,3])
  expect(curArr.specialObject).toEqual({value:true})
  expect(curArr.specialNumber).toBe(54)
});