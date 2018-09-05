function Enhance(enhanceClass){
  let custom
  if(typeof enhanceClass==='string'){
    switch(true){
      case /[Oo]bject/.test(enhanceClass) :
        custom=Object.create({},Object.prototype)
        break;
      case /[Aa]rray/.test(enhanceClass) :
        custom=Object.create([],Array.prototype)
        break;
    }
  }
  let proto=Object.getPrototypeOf(custom)
  proto.constructor=Enhance
  let controlObj={
    context:custom,
    add:function(key,value){
      proto[key]=value
      return controlObj
    },
    remove:function(key){
      if(!key){
        Object.setPrototypeOf(proto,null)
        proto.constructor=Enhance
        return controlObj
      }
      delete(proto[key])
      return controlObj
    }
  }
  return controlObj
}

let control=Enhance('array')

control=control.add('firstV',function(){
  return this[0]
})

let cusArr=control.context

cusArr.push(5)
cusArr.push(7)
cusArr.push(1)

console.log(cusArr)


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


function CustomString(){
  let custom=Object.create(null)
  let oldPro=Object.getPrototypeOf(String.prototype)
  Object.setPrototypeOf(String.prototype,custom)
  return {
    add:function(key,value){
      // if(typeof value==='function')value=value
      custom[key]=value
    },
    remove:function(key){
      if(!key) Object.setPrototypeOf(String.prototype,oldPro)
      delete(custom[key])
      // custom[key]=undefined
    }
  }
}

let customStr=CustomString()
customStr.add('customFirst',function(custom){
  // console.log(custom)
  return this.toString()[0]
})
customStr.add('customLast',function(){
  let str=this.toString()
  return str[str.length-1]
})
let x='abc'

console.log(x.customFirst())
console.log(x.customLast())
customStr.remove('customFirst')

console.log(x.customFirst)
console.log(x.customLast)

customStr.remove()