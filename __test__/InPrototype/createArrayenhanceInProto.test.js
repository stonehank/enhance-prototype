const {createEnhanceInProto}=require('../../index.js')

test('create Array controller', () => {
  let controller=createEnhanceInProto(Array)
  expect(Object.prototype.toString.call(controller)).toBe('[object Object]')
  expect(typeof controller.addProp).toBe('function')
  expect(typeof controller.removeProp).toBe('function')
  expect(typeof controller.unMount).toBe('function')
  expect(typeof controller.addBefore).toBe('function')
  expect(typeof controller.addAfter).toBe('function')
  expect(typeof controller.customMethodList).toBe('function')
  // controller.unMount()
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
  controller.addBefore('push',function () {
      aux=this
  })
  let arr=[1,2,3]
  arr.push(4)
  expect(aux).toBe(arr)
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


