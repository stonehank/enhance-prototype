const checkIfNeedController=require("./checkIfNeedController");

function createEnhanceInProto(originalClass){
  let controller;
  let initProto=Object.getPrototypeOf(originalClass.prototype);
  let enhanceProto=Object.create(initProto);
  Object.setPrototypeOf(originalClass.prototype,enhanceProto);

  function addProp(key,value){
    if(typeof value!=='function')  enhanceProto[key]=value;
    else enhanceProto[key]=function(){
      if(checkIfNeedController(value)){
        // use try...catch because if write like "addProp('xx',class{...})",should use "new"
        try{
          return value.call(this,controller,...arguments)
        }catch(e){
          if(e.message.includes("invoked without 'new'"))
            value=value.bind(this,controller,...arguments);
          return new value
        }
      }else{
        try{
          return value.call(this,...arguments)
        }catch(e){
          if(e.message.includes("invoked without 'new'"))
            value=value.bind(this,...arguments);
          return new value
        }
      }
    };
    return controller
  }

  function removeProp(key){
    if(!key){
      let originalProto=Object.getPrototypeOf(enhanceProto);
      enhanceProto=Object.create(originalProto);
      Object.setPrototypeOf( originalClass.prototype,enhanceProto)
    }
    delete(enhanceProto[key])
  }
  function addBefore(originalName,extraFunc,context){
    let originalFunc=originalClass.prototype[originalName];
    originalClass.prototype[originalName]= function(...args){
      extraFunc.call(context||this,...args);
      originalFunc.call(this,...args)
    }
  }
  function addAfter(originalName,extraFunc,context=originalClass){
    let originalFunc=originalClass.prototype[originalName];
    originalClass.prototype[originalName]= function(...args){
      originalFunc.call(this,...args);
      extraFunc.call(context || this)
    }
  }
  function unMount() {
    Object.setPrototypeOf( originalClass.prototype,initProto);
    for(let k in controller){
      if(k!=='retrieve')
        delete(controller[k])
    }
  }
  controller= {
    addProp,
    removeProp,
    unMount:unMount,
    addBefore,
    addAfter,
    customMethodList:function(){
      return enhanceProto
    },
    retrieve:function () {
      controller.addProp=addProp;
      controller.removeProp=removeProp;
      controller.unMount=unMount;
      controller.addBefore=addBefore;
      controller.customMethodList=function(){
        return enhanceProto
      };
      Object.setPrototypeOf(originalClass.prototype,enhanceProto);
      return controller
    }
  };
  return controller
}

function createEnhanceOutofProto(originalClass){

  let controller;

  let enhanceProto=Object.create(originalClass.prototype);
  let Enhance=function(){

    let entity=new originalClass(...arguments);

    Object.setPrototypeOf(entity,enhanceProto);

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
  });
  controller= {
    createEntity:function(){
      return Enhance.apply(null,arguments)
    },
    addProp:function(key,value){
      if(typeof value!=='function')  enhanceProto[key]=value;
      else enhanceProto[key]=function(){
        if(checkIfNeedController(value)){
          // use try...catch because if write like "addProp('xx',class{...})",should use "new"
          try{
            return value.call(this,controller,...arguments)
          }catch(e){
            if(e.message.includes("invoked without 'new'"))
              value=value.bind(this,controller,...arguments);
            return new value
          }
        }else{
          try{
            return value.call(this,...arguments)
          }catch(e){
            if(e.message.includes("invoked without 'new'"))
              value=value.bind(this,...arguments);
            return new value
          }
        }
      };
      return controller
    },
    removeProp:function(key){
      if(!key){
        for(let k in enhanceProto){
          delete(enhanceProto[k])
        }
        return controller
      }
      delete(enhanceProto[key]);
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
  };

  return controller
}



module.exports={
  createEnhanceInProto,
  createEnhanceOutofProto,
};