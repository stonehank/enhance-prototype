const {createEnhanceInProto}=require('../../index.js')

test('create string controller', () => {
  let controller=createEnhanceInProto(String)
  expect(Object.prototype.toString.call(controller)).toBe('[object Object]')
  expect(typeof controller.addProp).toBe('function')
  expect(typeof controller.removeProp).toBe('function')
  controller.unMount()
});


test('add method', () => {
  let controller=createEnhanceInProto(String)
  controller.addProp('frequence',function () {
    let c={},freq=[]
    for(let i=0;i<this.length;i++){
      if(!c[this[i]])c[this[i]]=1
      else c[this[i]]++
    }
    for(let i=0;i<this.length;i++){
      freq[i]=c[this[i]]
    }
    return freq
  })
  let str='accordance'
  expect(str.frequence()).toEqual([2,3,3,1,1,1,2,1,3,1])
  controller.unMount()
});

test('add unmount method', () => {
  let controller=createEnhanceInProto(String)
  controller.addProp('doneAndUnmount',function (controller) {
    console.log('work done!')
    controller.unMount()
  })
  let str='acd'
  str.doneAndUnmount()
  expect(controller.addProp).toBe(undefined)
});

test('custom method will not override original method', () => {
  let controller=createEnhanceInProto(String)
  controller.addProp('toLowerCase',function () {
    return "custom toLowerCase"
  })
  let str='acd'
  expect(str.toLowerCase()).toBe("acd")
});

test('remove specified method', () => {
  let controller=createEnhanceInProto(String)
  controller.addProp('test1',function () {
    console.log('test1')
  })
  controller.addProp('test2',function () {
    console.log('test2')
  })
  controller.removeProp('test1')
  let str='a'
  expect(str.test1).toBe(undefined)
  expect(typeof str.test2).toBe('function')
  controller.unMount()
});

test('remove all method', () => {
  let controller=createEnhanceInProto(String)
  controller.addProp('test1',function () {
    console.log('test1')
  })
  controller.addProp('test2',function () {
    console.log('test2')
  })
  controller.removeProp()
  let str='a'
  expect(str.test1).toBe(undefined)
  expect(str.test2).toBe(undefined)
});

test('controller unmount', () => {
  let controller=createEnhanceInProto(String)
  controller.addProp('test1',function () {
    console.log('test1')
  })
  controller.addProp('test2',function () {
    console.log('test2')
  })
  controller.unMount()
  let str='a'
  expect(str.test1).toBe(undefined)
  expect(str.test2).toBe(undefined)
  expect(controller.addProp).toBe(undefined)
});


test('controller retrieve', () => {
  let controller=createEnhanceInProto(String)
  controller.addProp('test1',function () {
    console.log('test1')
  })
  controller.addProp('test2',function () {
    console.log('test2')
  })
  controller.unMount()
  controller.retrieve()
  let str='a'
  expect(str.test1).not.toBe(undefined)
  expect(str.test2).not.toBe(undefined)
  expect(controller.addProp).not.toBe(undefined)
  controller.unMount()
});
/*-------number-----------*/


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