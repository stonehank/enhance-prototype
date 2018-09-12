const esprima = require('esprima')

function getFuncParamsName(func){
  let str
  if(typeof func==="function"){
    str=func.toString()
    str='let x='+str
  }
  // else if(typeof func==="string")str=func
  else throw new Error('func type error!')
  const astEsprima=esprima.parse(str)
  let node=astEsprima.body[0]
  let funcParams=[]
// 2
  if(node.type==="ExpressionStatement")node=node.expression
// 5
  if(node.type==="VariableDeclaration")node=node.declarations[0].init
// 4
  if(node.type==="AssignmentExpression")node=node.right
// 6
  if(node.type==="FunctionExpression")funcParams=node.params
// 3
  if(node.type==="ArrowFunctionExpression")funcParams=node.params
// 1
  if(node.type==="FunctionDeclaration")funcParams=node.params
  return funcParams.map(o=>{
    while(o.type!=='Identifier')o=o.left
    return o.name
  })
}


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
  let enhancePrototype=Object.create(Object.getPrototypeOf(CurClass.prototype))
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

  let controller

  let enhanceProto=Object.create(enhanceClass.prototype);
  let Enhance=function(){

    let entity=enhanceClass.apply(enhanceClass,arguments)

    Object.setPrototypeOf(entity,enhanceProto)

    return entity
  };

  Object.defineProperties(enhanceProto,{
    constructor:{
      value:Enhance
    },
    toRaw:{
      value:function () {
        return  Object.setPrototypeOf(this,enhanceClass.prototype)
      }
    }
  })
  controller= {
    createEntity:function(){
      return Enhance.apply(null,arguments)
    },
    addMethod:function(key,value){
      enhanceProto[key]=function(){
        if(typeof value!=='function') return value
        // ast树找出参数名称[]
        let params=getFuncParamsName(value)
        if(params.includes('controller')){
          return value.call(this,controller,...arguments)
        }else{
          return value.call(this,...arguments)
        }
      }
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
      return Object.setPrototypeOf(structure,enhanceProto)
    },
    toRaw:function toRaw(enhanceStructure) {
      return  Object.setPrototypeOf(enhanceStructure,enhanceClass.prototype)
    }
  }

  return controller
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

  function createEnhanceProto(originClass){
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
      let initProto=Object.getPrototypeOf(CurClass.prototype)
      let enhancePrototype=Object.create(initProto)
      Object.setPrototypeOf(CurClass.prototype,enhancePrototype)

      function addMethod(key,value){
        enhancePrototype[key]=value
      }

      function removeMethod(key){
        if(!key){
          let originalProto=Object.getPrototypeOf(enhancePrototype)
          enhancePrototype=Object.create(originalProto)
          Object.setPrototypeOf( CurClass.prototype,enhancePrototype)
        }
        delete(enhancePrototype[key])
      }

      function unMount() {
        Object.setPrototypeOf( CurClass.prototype,initProto)
        for(let k in this){
          if(k!=='retrieve')
            delete(this[k])
        }
      }
      return {
        addMethod:addMethod,
        removeMethod:removeMethod,
        enhanceList:function () {

        },
        unMount:unMount,
        retrieve:function () {
          this.addMethod=addMethod
          this.removeMethod=removeMethod
          this.unMount=unMount
          Object.setPrototypeOf(CurClass.prototype,enhancePrototype)
        }
      }
    }

  }


module.exports={
  createBasicController,
  createEnhance,
  getFuncParamsName
}