### enhance-prototype
###### 用于对类的prototype进行加强。

--------

#### 原则

遇到冲突优先权给原生类。

----------

#### 安装

`npm install enhance-prototype --save`

------

#### 例子

* 创建控制器
```js
var {createEnhanceInProto} = require("enhance-prototype")
let ctrl=createEnhanceInProto(Array)
```
* 添加自定义方法
```js
ctrl.addMethod('sum',()=>{
  this.reduce((acc,cur)=>acc+cur,0)
})
```

* 调用自定义方法
```js
let arr=[1,2]
arr.sum() // 3
```

---------

#### API

* createEnhanceInProto

    注入prototype的加强方式：
    
    ```
                 enhanceProto
     .__proto__       |
                  prototype         
     .__proto__       |
               entity(rawClass)
    ```
    
    当执行自定义方法时，会先查找原生的方法，找不到才去查找`enhanceProto`(相对更安全，尽量不去修改原生类的方法和属性)。

    所有原生创建的实例原型链都会受到改变。

* createEnhanceOutofProto

    非注入prototype的加强方式：
    
        ```
                   rawClass.prototype         
         .__proto__       |
                     enhanceProto
         .__proto__       |
                     enhanceEntity
        ```
    只有通过`createEnhanceOutofProto`控制器创建才是加强实例，原生类创建的实例不受任何影响，
    可以通过`toRaw`和`toEnhance`对加强实例和原生实例互相转换。
    
    当执行自定义方法时，会先查找`enhanceProto`，找不到再去原生类的原型链查找。
    
    非注入prototype的特点是加强类的方法和原生类是互不影响的，你可以在加强类自定义方法上任意调用原生类的方法，
    进行包装。


* controller
    
1. `addProp(name,value)`

    添加自定义属性，返回controller
   
   value如果是`Function`，`function([controller],...args)`
      
   例如：
   
   ```js
    let ctrl=createEnhanceInProto(Array)
    ctrl.addProp('immutablePush',function(){
        let newArr=this.slice()
        newArr.push(...arguments)
        return newArr
    })
 
    let arr=[1,2,3]
    let newArr=arr.push(4)
    // arr:[1,2,3]
    // newArr:[1,2,3,4]
   ```
   
   如果需要使用controller，放在第一个参数位置，会查找传入的形参判断是否需要controller。

    ```js
    let ctrl=createEnhanceInProto(Array)
    ctrl.addProp('showController',function(controller){
       console.log(typeof controller.addProp==="function")    
       return controller
    })
    let arr=[1]
    arr.showController()
     
    // true
    // {addProp: ƒ, removeProp: ƒ, …}
    ```
   
2. `removeProp(name)`

    删除自定义方法，返回controller
      
    填入参数则删除原型链上对应的属性，不填则删除所有属性。
    
3. `customPropList`
    
    返回当前所有自定义属性，返回当前所有自定义属性`<Object>`
    
4. `unMount`

    `retrieve`
    
    只出现在`createEnhanceInProto`。

    注销当前控制器及自定义prototype及恢复
    
    跟`removeProp()`不同的是，这个会彻底取消原型链，并且清空controller的所有方法，并且额外添加一个`retrieve`方法。
    
    可以用来恢复，这时如果设置`controller=null`将彻底注销。
       
5.  `addBefore(originalName,extraFunc,context)`
       
     `addAfter(originalName,extraFunc,context)`

    只出现在`createEnhanceInProto`。
    
    对原生类进行修改(尽量不要)
    
    参数：
    
    `originalName`指要修改的方法名，例如`Array`的`push`方法
    
    `extraFunc`指额外添加的方法
     
    `context`指上下文，默认为调用`push`的实例
    
    例如：
    `ctrl.addBefore('push',()=>console.log('will push'))`
        