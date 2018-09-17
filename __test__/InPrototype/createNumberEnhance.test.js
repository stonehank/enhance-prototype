const {createEnhanceInProto}=require('../../index.js')


test('create number controller', () => {
  let controller=createEnhanceInProto(Number)
  expect(Object.prototype.toString.call(controller)).toBe('[object Object]')
  expect(typeof controller.addProp).toBe('function')
  expect(typeof controller.removeProp).toBe('function')
  controller.unMount()
});


test('add method', () => {
  let controller=createEnhanceInProto(Number)
  controller.addProp('toBinary',function () {
    let num=this,mod,binary=''
    while(num>0){
      mod=num %2
      binary=mod+binary;
      num=Math.floor(num/2)
    }
    return binary
  })
  controller.addProp('toBinary',function () {
    let num=this,mod,binary=''
    while(num>0){
      mod=num %2
      binary=mod+binary;
      num=Math.floor(num/2)
    }
    return binary
  })
  let n=17
  expect(n.toBinary()).toBe('10001')
  controller.unMount()
});


test('remove specified method', () => {
  let controller=createEnhanceInProto(Number)
  controller.addProp('test1',function () {
    console.log('test1')
  })
  controller.addProp('test2',function () {
    console.log('test2')
  })
  controller.removeProp('test1')
  let n=56
  expect(n.test1).toBe(undefined)
  expect(typeof n.test2).toBe('function')
  controller.unMount()
});

test('remove all method', () => {
  let controller=createEnhanceInProto(Number)

  controller.addProp('test1',function () {
    console.log('test1')
  })
  controller.addProp('test2',function () {
    console.log('test2')
  })
  controller.removeProp()
  let n=56
  expect(n.test1).toBe(undefined)
  expect(n.test2).toBe(undefined)
});


test('controller unmount', () => {
  let controller=createEnhanceInProto(Number)
  controller.addProp('test1',function () {
    console.log('test1')
  })
  controller.addProp('test2',function () {
    console.log('test2')
  })
  controller.unMount()
  let n=57
  expect(n.test1).toBe(undefined)
  expect(n.test2).toBe(undefined)
  expect(controller.addProp).toBe(undefined)
});


test('controller retrieve', () => {
  let controller=createEnhanceInProto(Number)
  controller.addProp('test1',function () {
    console.log('test1')
  })
  controller.addProp('test2',function () {
    console.log('test2')
  })
  controller.unMount()
  controller.retrieve()
  let n=57
  expect(n.test1).not.toBe(undefined)
  expect(n.test2).not.toBe(undefined)
  expect(controller.addProp).not.toBe(undefined)
  controller.unMount()
});