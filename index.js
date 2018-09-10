function createBasicController(enhanceClass){
  let CurClass
  if(typeof enhanceClass==='string'){
    switch(true){
      case /[Ss]tring/.test(enhanceClass) :
        CurClass=String
        break;
      case /[Nn]umber/.test(enhanceClass) :
        CurClass=Number
        break;
    }
  }
  let enhancePrototype=Object.assign({},Object.getPrototypeOf(CurClass.prototype))
  Object.setPrototypeOf(CurClass.prototype,enhancePrototype)
  return {
    addMethod:function(key,value){
      // if(typeof value==='function')value=value.bind(null,this)
      enhancePrototype[key]=value
    },
    removeMethod:function(key){
      if(!key){
        let originalProto=Object.getPrototypeOf(enhancePrototype)
        enhancePrototype=Object.create(originalProto)
        Object.setPrototypeOf( CurClass.prototype,enhancePrototype)
      }
      delete(enhancePrototype[key])
    }
  }
}

function createEnhance(enhanceClass){
  let os=Object.prototype.toString;
  let entity,CurClass;
  let enhanceProto=Object.create(null);
  let Enhance=function(len){
    if(typeof enhanceClass==='string'){
      switch(true){
        case /[Oo]bject/.test(enhanceClass) :
          entity=Object.create(null)
          CurClass=Object
          break;
        case /[Aa]rray/.test(enhanceClass) :
          let argsNum=arguments.length
          entity=new Array(argsNum?len:0)
          CurClass=Array
          break;
      }
    }
    Object.setPrototypeOf(entity,enhanceProto)
    Object.setPrototypeOf(enhanceProto,CurClass.prototype)
    return entity
  };
  Object.defineProperties(enhanceProto,{
    constructor:{
      value:Enhance
    },
    toRaw:{
      value:function () {
        let type=os.call(this)
        switch(type.substring(8,type.length-1)){
          // 浅拷贝
          case 'Object':
            return Object.assign({},this)
          case 'Array':
            return this.slice()
        }
      }
    }
  })
  return  {
    createEntity:function(len){
      let argsNum=arguments.length
      return Enhance(argsNum?len:0)
    },
    addMethod:function(key,value){
      // if(typeof value==='function')value=value.bind(null,this)
      enhanceProto[key]=value
      return this
    },
    removeMethod:function(key){
      if(!key){
        for(let k in enhanceProto){
          delete(enhanceProto[k])
        }
        return this
      }
      delete(enhanceProto[key])
      return this
    },
    toEnhance:function (structure) {
      let structureType=os.call(structure)
      if(structureType==="[object Object]"){
        return this.createEntity(structure)
      }else if(structureType==="[object Array]"){
        return this.createEntity(...structure)
      }
    }
  }
  }

  function addMethodBefore(func,extraMethod,context=null){
    return function(...args){
      extraMethod()
      func.call(context,...args)
    }
  }

  function addMethodAfter(func,extraMethod,context=null){
    return function(...args){
      func.call(context,...args)
      extraMethod()
    }
  }

module.exports={
  createBasicController,
  createEnhance
}