const {createEnhanceInProto}=require('../../index.js')

test('create Function controller', () => {
  let controller=createEnhanceInProto(Function)
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
  let controller=createEnhanceInProto(Function)
  controller.addProp('_cloneName_',function () {
    return this.name
  })
  let aFn=function name_a(){}
  let bFn=function(){}
  expect(aFn._cloneName_()).toBe("name_a")
  expect(bFn._cloneName_()).toBe("bFn")
  controller.unMount()
});





