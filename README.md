引用类型 

非注入prototype，控制一体化

非注入prototype：可以通过toRaw返回原始值

控制一体化：多了一层prototype，但方便管理，任何实例都可以对class管理

基本类型

注入prototype，控制分离

控制分离：实例不可以对class进行管理，需要用额外的管理器

注入prototype：所有基本类型原型链都会受到改变