const checkIfNeedController=require("./checkIfNeedController")

function createEnhanceInProto(originalClass){
  let controller
  let initProto=Object.getPrototypeOf(originalClass.prototype)
  let enhanceProto=Object.create(initProto)
  Object.setPrototypeOf(originalClass.prototype,enhanceProto)

  function addMethod(key,value){
    if(typeof value!=='function')  enhanceProto[key]=value
    else enhanceProto[key]=function(){
      if(checkIfNeedController(value)){
        // if addMethod('xx',class{...})
        try{
          return value.call(this,controller,...arguments)
        }catch(e){
          if(e.message.includes("invoked without 'new'"))
            value=value.bind(this,controller,...arguments)
          return new value
        }
      }else{
        try{
          return value.call(this,...arguments)
        }catch(e){
          if(e.message.includes("invoked without 'new'"))
            value=value.bind(this,...arguments)
          return new value
        }
      }
    }
    return controller
  }

  function removeMethod(key){
    if(!key){
      let originalProto=Object.getPrototypeOf(enhanceProto)
      enhanceProto=Object.create(originalProto)
      Object.setPrototypeOf( originalClass.prototype,enhanceProto)
    }
    delete(enhanceProto[key])
  }
  function addMethodBefore(originalName,extraFunc,context){
    let originalFunc=originalClass.prototype[originalName]
    originalClass.prototype[originalName]= function(...args){
      extraFunc.call(context||this,...args)
      originalFunc.call(this,...args)
    }
  }
  function addMethodAfter(originalName,extraFunc,context=originalClass){
    let originalFunc=originalClass.prototype[originalName]
    originalClass.prototype[originalName]= function(...args){
      originalFunc.call(this,...args)
      extraFunc.call(context || this)
    }
  }
  function unMount() {
    Object.setPrototypeOf( originalClass.prototype,initProto)
    for(let k in controller){
      if(k!=='retrieve')
        delete(controller[k])
    }
  }
  controller= {
    addMethod:addMethod,
    removeMethod:removeMethod,
    unMount:unMount,
    addMethodBefore,
    addMethodAfter,
    customMethodList:function(){
      return enhanceProto
    },
    retrieve:function () {
      controller.addMethod=addMethod
      controller.removeMethod=removeMethod
      controller.unMount=unMount
      controller.addMethodBefore=addMethodBefore
      controller.customMethodList=function(){
        return enhanceProto
      }
      Object.setPrototypeOf(originalClass.prototype,enhanceProto)
      return controller
    }
  }
  return controller
}

function createEnhanceOutofProto(originalClass){

  let controller

  let enhanceProto=Object.create(originalClass.prototype);
  let Enhance=function(){

    let entity=new originalClass(...arguments)

    Object.setPrototypeOf(entity,enhanceProto)

    return entity
  };

  Object.defineProperties(enhanceProto,{
    constructor:{
      value:Enhance
    },
    toRaw:{
      value:function () {
        return  Object.setPrototypeOf(this,originalClass.prototype)
      }
    }
  })
  controller= {
    createEntity:function(){
      return Enhance.apply(null,arguments)
    },
    addMethod:function(key,value){
      if(typeof value!=='function')  enhanceProto[key]=value
      else enhanceProto[key]=function(){
        if(checkIfNeedController(value)){
          // if addMethod('xx',class{...})
          try{
            return value.call(this,controller,...arguments)
          }catch(e){
            if(e.message.includes("invoked without 'new'"))
              value=value.bind(this,controller,...arguments)
            return new value
          }
        }else{
          try{
            return value.call(this,...arguments)
          }catch(e){
            if(e.message.includes("invoked without 'new'"))
              value=value.bind(this,...arguments)
            return new value
          }
        }
      }
      return controller
    },
    removeMethod:function(key){
      if(!key){
        for(let k in enhanceProto){
          delete(enhanceProto[k])
        }
        return controller
      }
      delete(enhanceProto[key])
      return controller
    },
    customMethodList:function(){
      return enhanceProto
    },
    toEnhance:function (structure) {
      return Object.setPrototypeOf(structure,enhanceProto)
    },
    toRaw:function toRaw(enhanceStructure) {
      return  Object.setPrototypeOf(enhanceStructure,originalClass.prototype)
    }
  }

  return controller
}



module.exports={
  createEnhanceInProto,
  createEnhanceOutofProto,
}