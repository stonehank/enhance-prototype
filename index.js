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
  let os=Object.prototype.toString
  let entity
  let CurClass
  return function Enhance(len){
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
    let enhanceProto=Object.create(null)
    let controllerProto={
      constructor:Enhance,
      addMethod:function(key,value){
        if(typeof value==='function')value=value.bind(null,this)
        enhanceProto[key]=value
        return this
      },
      removeMethod:function(key){
        if(!key){
          let originalProto=Object.getPrototypeOf(enhanceProto)
          enhanceProto=Object.create(originalProto)
          Object.setPrototypeOf(controllerProto,enhanceProto)
          // enhanceProto.constructor=Enhance
          return this
        }
        delete(enhanceProto[key])
        return this
      },
      toRaw:function () {
        let type=os.call(this)
        switch(type.substring(8,type.length-1)){
          // 浅拷贝，还是引用关系
          case 'Object':
            return Object.assign({},this)
          case 'Array':
            return this.slice()
        }
      }
    }

    Object.setPrototypeOf(entity,controllerProto)
    Object.setPrototypeOf(controllerProto,enhanceProto)
    Object.setPrototypeOf(enhanceProto,CurClass.prototype)
    return entity
  }
}

module.exports={
  createBasicController,
  createEnhance
}