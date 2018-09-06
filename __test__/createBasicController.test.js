const {createBasicController}=require('../index.js')

test('create string controller', () => {
  let controller=createBasicController('string')
  expect(Object.prototype.toString.call(controller)).toBe('[object Object]')
  expect(typeof controller.addMethod).toBe('function')
  expect(typeof controller.removeMethod).toBe('function')
});


test('add method', () => {
  let controller=createBasicController('string')
  controller.addMethod('frequence',function () {
    let c={},freq=[]
    for(let i=0;i<this.length;i++){
      if(!c[this[i]])c[this[i]]=1
      else c[this[i]]++
    }
    debugger
    for(let i=0;i<this.length;i++){
      freq[i]=c[this[i]]
    }
    return freq
  })
  let str='accordance'
  expect(str.frequence()).toEqual([2,3,3,1,1,1,2,1,3,1])
});


test('remove specified method', () => {
  let controller=createBasicController('string')
  controller.addMethod('test1',function () {
    console.log('test1')
  })
  controller.addMethod('test2',function () {
    console.log('test2')
  })
  controller.removeMethod('test1')
  let str='a'
  expect(str.test1).toBe(undefined)
  expect(typeof str.test2).toBe('function')
});

test('remove all method', () => {
  let controller=createBasicController('string')
  controller.addMethod('test1',function () {
    console.log('test1')
  })
  controller.addMethod('test2',function () {
    console.log('test2')
  })
  controller.removeMethod()
  let str='a'
  expect(str.test1).toBe(undefined)
  expect(str.test2).toBe(undefined)
});


/*-------number-----------*/


test('create number controller', () => {
  let controller=createBasicController('number')
  expect(Object.prototype.toString.call(controller)).toBe('[object Object]')
  expect(typeof controller.addMethod).toBe('function')
  expect(typeof controller.removeMethod).toBe('function')
});


test('add method', () => {
  let controller=createBasicController('number')
  controller.addMethod('toBinary',function () {
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
});


test('remove specified method', () => {
  let controller=createBasicController('number')
  controller.addMethod('test1',function () {
    console.log('test1')
  })
  controller.addMethod('test2',function () {
    console.log('test2')
  })
  controller.removeMethod('test1')
  let n=56
  expect(n.test1).toBe(undefined)
  expect(typeof n.test2).toBe('function')
});

test('remove all method', () => {
  let controller=createBasicController('number')
  controller.addMethod('test1',function () {
    console.log('test1')
  })
  controller.addMethod('test2',function () {
    console.log('test2')
  })
  controller.removeMethod()
  let n=56
  expect(n.test1).toBe(undefined)
  expect(n.test2).toBe(undefined)
});