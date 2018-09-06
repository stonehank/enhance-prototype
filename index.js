function createBasicController(enhanceClass){
  let curClass
  if(typeof enhanceClass==='string'){
    switch(true){
      case /[Ss]tring/.test(enhanceClass) :
        curClass=String
        break;
      case /[Nn]umber/.test(enhanceClass) :
        curClass=Number
        break;
    }
  }

  let custom=Object.assign({},Object.getPrototypeOf(curClass.prototype))
  Object.setPrototypeOf(curClass.prototype,custom)
  return {
    addMethod:function(key,value){
      // if(typeof value==='function')value=value.bind(null,this)
      custom[key]=value
    },
    removeMethod:function(key){
      if(!key){
        let customProto=Object.getPrototypeOf(custom)
        custom=Object.create(customProto)
        Object.setPrototypeOf( curClass.prototype,custom)
      }
      delete(custom[key])
    }
  }
}

function createEnhance(enhanceClass){
  let os=Object.prototype.toString
  let entity
  let curClass
  return function Enhance(len){
    if(typeof enhanceClass==='string'){
      switch(true){
        case /[Oo]bject/.test(enhanceClass) :
          entity=Object.create(null)
          curClass=Object
          break;
        case /[Aa]rray/.test(enhanceClass) :
          let argsNum=arguments.length
          entity=new Array(argsNum?len:0)
          curClass=Array
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
    Object.setPrototypeOf(enhanceProto,curClass.prototype)
    return entity
  }
}

module.exports={
  createBasicController,
  createEnhance
}