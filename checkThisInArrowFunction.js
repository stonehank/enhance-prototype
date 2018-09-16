
const arrowFnChecker=/(\(.*?\)|\w*)\s*=>(.*)/
const evalChecker=/eval\s*\(\s*('|"|`)(.*?)\1\)/

function checkIfHasThis(str){
  let inQuote=false,quoteType=null,target='this',j=0
  for(let i=0;i<str.length;i++){
    if(inQuote && str[i]!==quoteType) continue;
    let hasQuote=str[i].match(/['"`]/)
    if(hasQuote){inQuote=!inQuote;quoteType=hasQuote[0]}
    if(str[i]===target[j])j++
    else j=0
    if(j===target.length)return true
  }
  return false
}


module.exports=function checkThisInArrowFunction(func){
  let fnStr
  if(typeof func==="string")fnStr=func
  else if(typeof func==="function")fnStr=func.toString()
  if(!arrowFnChecker.test(fnStr))return false
  let evalMatch=fnStr.match(evalChecker)
  if(evalMatch){
    let evalInner=evalMatch[2]
    if(checkIfHasThis(evalInner))return true
  }
  return checkIfHasThis(fnStr)
}

