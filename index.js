// function createBasicController(enhanceClass){
//   let CurClass
//   if(typeof enhanceClass==='string'){
//     switch(true){
//       case /[Ss]tring/.test(enhanceClass) :
//         CurClass=String
//         break;
//       case /[Nn]umber/.test(enhanceClass) :
//         CurClass=Number
//         break;
//     }
//   }
//   let enhancePrototype=Object.assign({},Object.getPrototypeOf(CurClass.prototype))
//   Object.setPrototypeOf(CurClass.prototype,enhancePrototype)
//   return {
//     addMethod:function(key,value){
//       // if(typeof value==='function')value=value.bind(null,this)
//       enhancePrototype[key]=value
//     },
//     removeMethod:function(key){
//       if(!key){
//         let originalProto=Object.getPrototypeOf(enhancePrototype)
//         enhancePrototype=Object.create(originalProto)
//         Object.setPrototypeOf( CurClass.prototype,enhancePrototype)
//       }
//       delete(enhancePrototype[key])
//     }
//   }
// }

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
        return value.call(this,controller,...arguments)
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

  function createEnhancePro(originClass){
    
    return{
      addMethod:function (key,value) {
        
      },
      removeMethod:function (key) {
        
      },
      enhanceList:function () {
        
      }
    }
  
  }


module.exports={
  // createBasicController,
  createEnhance
}