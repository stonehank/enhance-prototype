### enhance-prototype
###### 用于对类的prototype进行加强。

--------

#### 原则

遇到冲突优先权给原生类。

----------

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

    如果需要对原生类进行修改(尽量不要)，使用
    
    `addMethodBefore(originalName,extraFunc,context)`
    
    和`addMethodAfter(originalName,extraFunc,context)`
    
    `originalName`指要修改的方法名，例如`Array`的`push`方法；
    
    `extraFunc`指额外添加的方法，例如
     
     `function(){console.log('will push'')}`；
    
    `context`指上下文，默认为调用`push`的实例。
    
    这样就确保调用这个方法名的时候，会先执行额外的方法，再执行原来的方法。
    
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

   
* getFuncParamsName

    一个通过AST语法树去获取函数实参名称的方法。
    
    可涵盖任意函数写法。


