const {createEnhanceInProto}=require('../../index.js')

test('create Array controller', () => {
  let controller=createEnhanceInProto(Array)
  expect(Object.prototype.toString.call(controller)).toBe('[object Object]')
  expect(typeof controller.addProp).toBe('function')
  expect(typeof controller.removeProp).toBe('function')
  expect(typeof controller.unMount).toBe('function')
  expect(typeof controller.addBefore).toBe('function')
  expect(typeof controller.addAfter).toBe('function')
  expect(typeof controller.customPropList).toBe('function')
  // controller.unMount()
});

test('add method', () => {
  let controller=createEnhanceInProto(Array)
  controller.addProp('immutablePush',function () {
    let newArr=this.slice()
    newArr.push(...arguments)
    return newArr
  })
  let arr=[1,2,3]
  expect(arr.immutablePush(4)).toEqual([1,2,3,4])
  expect(arr).toEqual([1,2,3])
  controller.unMount()
});

test('add method before', () => {
  let controller=createEnhanceInProto(Array)
  let aux=[]
  controller.addBefore('push',function () {
    for(let i=0;i<arguments.length;i++){
      this[i]=arguments[i]
    }
  },aux)
  let arr=[1,2,3]
  arr.push(4)
  expect(aux[0]).toBe(4)
  controller.unMount()
});

test('add method after', () => {
  let controller=createEnhanceInProto(Array)
  let aux=[]
  controller.addAfter('push',function () {
      aux=this
  })
  let arr=[1,2,3]
  arr.push(4)
  expect(aux).toBe(arr)
  controller.unMount()
});

test('addBefore do not have return statement', () => {
  let controller=createEnhanceInProto(Array)
  let aux=[]
  controller.addBefore('push',function () {
    return 1
  })
  let arr=[1,2,3]
  let returnValue=arr.push(4)
  expect(returnValue).toBe(4)
  controller.unMount()
});

test('addAfter  have return statement, but will fail to race the raw method', () => {
  let controller=createEnhanceInProto(Array)
  let aux=[]
  controller.addAfter('push',function () {
    return "raw push have return statement"
  })
  controller.addAfter('forEach',function () {
    return "raw forEach do not have return statement"
  })
  let arr=[1,2,3]
  let pushReturn=arr.push(123)
  let forEachReturn=arr.forEach(n=>n*2)
  expect(pushReturn).toBe(4)
  expect(forEachReturn).toBe("raw forEach do not have return statement")
  controller.unMount()
});

test('add property', () => {
  let controller=createEnhanceInProto(Array)
  controller.addProp('specialString','string')
  controller.addProp('specialArray',[1,2,3])
  controller.addProp('specialObject',{value:true})
  controller.addProp('specialNumber',54)
  let arr=[1,2,3]
  expect(arr.specialString).toBe("string")
  expect(arr.specialArray).toEqual([1,2,3])
  expect(arr.specialObject).toEqual({value:true})
  expect(arr.specialNumber).toBe(54)
  controller.unMount()
});


