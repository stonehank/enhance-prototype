function createEnhance(enhanceClass){
  let entity
  let curClass
  return function Enhance(len){
    if(typeof enhanceClass==='string'){
      switch(true){
        case /[Oo]bject/.test(enhanceClass) :
          entity=Object.create({},Object.prototype)
          curClass=Object
          break;
        case /[Aa]rray/.test(enhanceClass) :
          entity=new Array(len||0)
          curClass=Array
          break;
      }
    }
    let enhanceProto={
      constructor:Enhance,
      add:function(key,value){
        enhanceProto[key]=value
        return this
      },
      remove:function(key){
      if(!key){
        Object.setPrototypeOf(enhanceProto,null)
        enhanceProto.constructor=Enhance
        return this
      }
      delete(enhanceProto[key])
      return this
    },
    toRaw:function () {
      // return this.slice()
      // todo
    }
    }
    Object.setPrototypeOf(entity,enhanceProto)
    Object.setPrototypeOf(enhanceProto,curClass.prototype)
    return entity
  }
}

let cusArr=createEnhance('Object')()

cusArr=cusArr.add('findX',function(x){
  return this[x]
})

// cusArr.push(5)
// cusArr.push(7)
// cusArr.push(1)
cusArr['x']=777
cusArr['y']=667
console.log(cusArr.findX('y'))
console.log(cusArr.constructor())
console.log(cusArr.add)
console.log(cusArr.toRaw())

// function CustomStr(str){
//   let custom=Object.create(new String(str),String.prototype)
//   let proto=Object.getPrototypeOf(custom)
//   proto.constructor=CustomStr
//   return custom
// }

// function CustomStr(str){
//   this.constructor=CustomStr
//   this.val=str
//   let newStr=new String(str)
//   let proto=this.__proto__
//   let strProto=Object.getPrototypeOf(newStr)
//   Object.getOwnPropertyNames(strProto).forEach(k=>{
//     if(typeof strProto[k]==='function'){
//       this[k]=strProto[k].bind(newStr)
//     }else{
//       this[k]=strProto[k]
//     }
//   })
// }


// function CustomString(str){
//   let custom=Object.create(new String(str))
//   let proto=Object.getPrototypeOf(custom)
//   // let proto={}
//   // let newS=new CustomStr(str)
//   // Object.setPrototypeOf(custom,proto)
//   // let strProto=Object.getPrototypeOf(newS)
//   // Object.getOwnPropertyNames(strProto).forEach(k=>{
//   //     if(typeof strProto[k]==='function'){
//   //       proto[k]=strProto[k].bind(newS)
//   //     }else{
//   //       proto[k]=strProto[k]
//   //     }
//   //   }
//   // )
//   proto.constructor=CustomString
//   Object.setPrototypeOf(String.prototype,custom)
//   proto.customFirst=function(){
//     console.log(this,custom)
//     // console.log(this instanceof CustomStr,custom instanceof CustomStr,newS instanceof CustomStr)
//     return this.toString()[0]
//   }
//   return custom
// }

function createBasicController(enhanceClass){
  let curClass
  if(typeof enhanceClass==='string'){
    switch(true){
      case /[Ss]tring/.test(enhanceClass) :
        curClass=String
        // oldPro=Object.getPrototypeOf(String.prototype)
        // Object.setPrototypeOf(String.prototype,custom)
        break;
      case /[Nn]umber/.test(enhanceClass) :
        curClass=Number
        // oldPro=Object.getPrototypeOf(Number.prototype)
        // Object.setPrototypeOf(Number.prototype,custom)
        break;
    }
  }

  // let oldPro=Object.getPrototypeOf(Object.assign({},Object.getPrototypeOf(curClass.prototype)))
  let custom=Object.assign({},Object.getPrototypeOf(curClass.prototype))
  // let custom=Object.create(oldPro)
  // debugger
  Object.setPrototypeOf(curClass.prototype,custom)
  // Object.setPrototypeOf(custom,oldPro)
  return {
    add:function(key,value){
      // if(typeof value==='function')value=value

      custom[key]=value
    },
    remove:function(key){
      // if(!key) custom={}

      if(!key){
        let customProto=Object.getPrototypeOf(custom)
        custom=Object.create(customProto)
        Object.setPrototypeOf( curClass.prototype,custom)
      }
      // if(!key) Object.setPrototypeOf(curClass.prototype,oldPro)
      delete(custom[key])
    }
  }

}


// function CustomString(){
//   let custom=Object.create(null)
//   let oldPro=Object.getPrototypeOf(String.prototype)
//   Object.setPrototypeOf(String.prototype,custom)
//   return {
//     add:function(key,value){
//       // if(typeof value==='function')value=value
//       custom[key]=value
//     },
//     remove:function(key){
//       if(!key) Object.setPrototypeOf(String.prototype,oldPro)
//       delete(custom[key])
//       // custom[key]=undefined
//     }
//   }
// }

let x=createBasicController('string')

x.add('sirstV',function(){return this[0]})
x.add('firstV',function(){return this[0]})

x.remove()

module.exports={
  createEnhance
}