
const reComments = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg
const reNewLine=/\r\n/g

function checkInParentheses(str){
  str=(str.match(/(function.*?|class.*?constructor|^)(\((.|\s)*?\))/)||[''])[2]
  debugger
  return str.substring(1,str.length)
}

module.exports=function checkIfNeedController(func){
  let fnStr=func.toString()
  if(fnStr.startsWith("controller=>")) return true
  fnStr=fnStr.replace(reComments,'').replace(reNewLine,'')
  let paramsStr=checkInParentheses(fnStr)
  return /^\s*?controller.*/.test(paramsStr)
}


