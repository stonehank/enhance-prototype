const {createEnhanceInProto}=require('../../index.js')

test('create Array controller', () => {
  let controller=createEnhanceInProto(Array)
  expect(Object.prototype.toString.call(controller)).toBe('[object Object]')
  expect(typeof controller.addMethod).toBe('function')
  expect(typeof controller.removeMethod).toBe('function')
  expect(typeof controller.unMount).toBe('function')
  expect(typeof controller.addMethodBefore).toBe('function')
  expect(typeof controller.addMethodAfter).toBe('function')
  expect(typeof controller.customMethodList).toBe('function')
  // controller.unMount()
});

test('add method before', () => {
  let controller=createEnhanceInProto(Array)
  let aux=[]
  controller.addMethodBefore('push',function () {
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
  controller.addMethodBefore('push',function () {
      aux=this
  })
  let arr=[1,2,3]
  arr.push(4)
  expect(aux).toBe(arr)
  controller.unMount()
});


test('add property', () => {
  let controller=createEnhanceInProto(Array)
  controller.addMethod('specialString','string')
  controller.addMethod('specialArray',[1,2,3])
  controller.addMethod('specialObject',{value:true})
  controller.addMethod('specialNumber',54)
  let arr=[1,2,3]
  expect(arr.specialString).toBe("string")
  expect(arr.specialArray).toEqual([1,2,3])
  expect(arr.specialObject).toEqual({value:true})
  expect(arr.specialNumber).toBe(54)
  controller.unMount()
});


