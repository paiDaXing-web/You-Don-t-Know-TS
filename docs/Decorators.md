### 3.装饰器 Decorators

#### 3.1 装饰者模式

装饰者模式（Decorator Pattern）也称为装饰器模式，在不改变对象自身的基础上，动态增加额外的职责。属于结构型模式的一种。

使用装饰者模式的优点：把对象核心职责和要装饰的功能分开了。非侵入式的行为修改。

举个例子来说，原本长相一般的女孩，借助美颜功能，也能拍出逆天的颜值。只要善于运用辅助的装饰功能，开启瘦脸，增大眼睛，来点磨皮后，咔嚓一拍，惊艳无比。

经过这一系列叠加的装饰，你还是你，长相不增不减，却能在镜头前增加了多重美。如果你愿意，还可以尝试不同的装饰风格，只要装饰功能做的好，你就能成为“百变星君”。

可以用代码表示，把每个功能抽象成一个类：

```typescript
// 女孩子
class Girl {
  faceValue() {
    console.log("我原本的脸");
  }
}

class ThinFace {
  constructor(girl) {
    this.girl = girl;
  }
  faceValue() {
    this.girl.faceValue();
    console.log("开启瘦脸");
  }
}

class IncreasingEyes {
  constructor(girl) {
    this.girl = girl;
  }
  faceValue() {
    this.girl.faceValue();
    console.log("增大眼睛");
  }
}
```

从代码的表现来看，将一个对象嵌入到另一个对象中，相当于通过一个对象对另一个对象进行包装，形成一条包装链。调用后，随着包装的链条传递给每一个对象，让每个对象都有处理的机会。

这种方式在增加删除装饰功能上都有极大的灵活性，假如你有勇气展示真实的脸，去掉瘦脸的包装即可，这对其他功能毫无影响；假如要增加磨皮，再来个功能类，继续装饰下去，对其他功能也无影响，可以并存运行。

在 javascript 中增加小功能使用类，显的有点笨重，JavaScript 的优点是灵活，可以使用对象来表示：

```typescript
let girl = {
  faceValue() {
    console.log("我原本的脸");
  },
};
function thinFace() {
  console.log("开启瘦脸");
}
function IncreasingEyes() {
  console.log("增大眼睛");
}

girl.faceValue = (function () {
  const originalFaveValue = girl.faceValue; // 原来的功能
  return function () {
    originalFaveValue.call(girl);
    thinFace.call(girl);
  };
})();
girl.faceValue = (function () {
  const originalFaveValue = girl.faceValue; // 原来的功能
  return function () {
    originalFaveValue.call(girl);
    IncreasingEyes.call(girl);
  };
})();
```

在不改变原来代码的基础上，通过先保留原来函数，重新改写，在重写的代码中调用原来保留的函数。

用一张图来表示装饰者模式的原理：
![3](../assets/decorators.png)
从图中可以看出来，通过一层层的包装，增加了原先对象的功能。

#### 3.2 Typescript 装饰器

Javascript 规范里的装饰器目前处在 建议征集的第二阶段，也就意味着不能在原生代码中直接使用，浏览器暂不支持。

可以通过 babel 或 TypeScript 工具在编译阶段，把装饰器语法转换成浏览器可执行的代码。（最后会有编译后的源码分析）

以下主要讨论 TypeScript 中装饰器的使用。

TypeScript 中的装饰器可以被附加到类声明、方法、 访问符(getter/setter)、属性和参数上。

开启对装饰器的支持，命令行 编译文件时

```typescript
tsc --target ES5 --experimentalDecorators test.ts
```

配置文件 tsconfig.json

```typescript
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

#### 3.3 装饰器的使用

装饰器实际上就是一个函数，在使用时前面加上 @ 符号，写在要装饰的声明之前，多个装饰器同时作用在一个声明时，可以写一行或换行写：

```typescript
// 换行写
@test1
@test2
declaration

//写一行
@test1 @test2 ...
declaration
```

定义 face.ts 文件：

```typescript
function thinFace() {
  console.log("开启瘦脸");
}

@thinFace
class Girl {}
```

编译成 js 代码，在运行时，会直接调用 thinFace 函数。这个装饰器作用在类上，称之为类装饰器。

如果需要附加多个功能，可以组合多个装饰器一起使用：

```typescript
function thinFace() {
  console.log("开启瘦脸");
}
function IncreasingEyes() {
  console.log("增大眼睛");
}

@thinFace
@IncreasingEyes
class Girl {}
```

多个装饰器组合在一起，在运行时，要注意，调用顺序是 从下至上 依次调用，正好和书写的顺序相反。例子中给出的运行结果是：

```typescript
"增大眼睛";
"开启瘦脸";
```

如果你要在一个装饰器中给类添加属性，在其他的装饰器中使用，那就要写在最后一个装饰器中，因为最后写的装饰器最先调用。

#### 3.4 装饰器工厂

有时需要给装饰器传递一些参数，这要借助于装饰器工厂函数。装饰器工厂函数实际上就是一个高阶函数，在调用后返回一个函数，返回的函数作为装饰器函数。

```typescript
function thinFace(value: string) {
  console.log("1-瘦脸工厂方法");
  return function () {
    console.log(`4-我是瘦脸的装饰器，要瘦脸${value}`);
  };
}
function IncreasingEyes(value: string) {
  console.log("2-增大眼睛工厂方法");
  return function () {
    console.log(`3-我是增大眼睛的装饰器，要${value}`);
  };
}

@thinFace("50%")
@IncreasingEyes("增大一倍")
class Girl {}
```

@ 符号后为调用工厂函数，依次从上到下执行，目的是求得装饰器函数。装饰器函数的运行顺序依然是从下到上依次执行。

运行的结果为：

```typescript
1-瘦脸工厂方法
2-增大眼睛工厂方法
3-我是增大眼睛的装饰器，要增大一倍
4-我是瘦脸的装饰器，要瘦脸50%
```

- 总结一下：

  - 写了工厂函数，从上到下依次执行，求得装饰器函数。
  - 装饰器函数的执行顺序是 从下到上 依次执行。

#### 3.5 类装饰器

作用在类声明上的装饰器，可以给我们改变类的机会。在执行装饰器函数时，会把类构造函数传递给装饰器函数。

类装饰器在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。 类装饰器不能用在声明文件中( .d.ts)，也不能用在任何外部上下文中（比如 declare 的类）。

类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。

如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。

注意 如果你要返回一个新的构造函数，你必须注意处理好原来的原型链。 在运行时的装饰器调用逻辑中 不会为你做这些。

下面是使用类装饰器(@sealed)的例子，应用在 Greeter 类：

```typescript
@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

我们可以这样定义@sealed 装饰器：

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
```

当@sealed 被执行的时候，它将密封此类的构造函数和原型。(注：参见 Object.seal)

下面是一个重载构造函数的例子。

```typescript
function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  };
}

@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}

console.log(new Greeter("world"));
```

```typescript
function classDecorator(value: string) {
  return function (constructor) {
    console.log("接收一个构造函数");
  };
}

function thinFace(constructor) {
  constructor.prototype.thinFaceFeature = function () {
    console.log("瘦脸功能");
  };
}

@thinFace
@classDecorator("类装饰器")
class Girl {}

let g = new Girl();

g.thinFaceFeature(); // '瘦脸功能'
```

上面的例子中，拿到传递构造函数后，就可以给构造函数原型上增加新的方法，甚至也可以继承别的类。

#### 3.6 方法装饰器

方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。 方法装饰器不能用在声明文件( .d.ts)，重载或者任何外部上下文（比如 declare 的类）中。

方法装饰器表达式会在运行时当作函数被调用，传入下列 3 个参数：

对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
成员的名字。
成员的属性描述符。
注意   如果代码输出目标版本小于 ES5，属性描述符将会是 undefined。

如果方法装饰器返回一个值，它会被用作方法的属性描述符。

注意   如果代码输出目标版本小于 ES5 返回值会被忽略。

下面是一个方法装饰器（@enumerable）的例子，应用于 Greeter 类的方法上：

```typescript
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

我们可以用下面的函数声明来定义@enumerable 装饰器：

```typescript
function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}
```

这里的@enumerable(false)是一个装饰器工厂。 当装饰器 @enumerable(false)被调用时，它会修改属性描述符的 enumerable 属性。

作用在类的方法上，有静态方法和原型方法。作用在静态方法上，装饰器函数接收的是类构造函数；作用在原型方法上，装饰器函数接收的是原型对象。
这里拿作用在原型方法上举例。

```typescript
function methodDecorator(value: string, Girl) {
  return function (prototype, key, descriptor) {
    console.log(
      "接收原型对象，装饰的属性名，属性描述符",
      Girl.prototype === prototype
    );
  };
}

function thinFace(prototype, key, descriptor) {
  // 保留原来的方法逻辑
  let originalMethod = descriptor.value;
  // 改写，增加逻辑，并执行原有逻辑
  descriptor.value = function () {
    originalMethod.call(this); // 注意修改 this 的指向
    console.log("开启瘦脸模式");
  };
}

class Girl {
  @thinFace
  @methodDecorator("方式装饰器", Girl)
  faceValue() {
    console.log("我是原本的面目");
  }
}

let g = new Girl();

g.faceValue();
```

从代码中可以看出，装饰器函数接收三个参数，原型对象、方法名、描述对象。对描述对象陌生的，可以参考 这里;

要增强功能，可以先保留原来的函数，改写描述对象的 value 为另一函数。

当使用 g.faceValue() 访问方法时，访问的就是描述对象 value 对应的值。

在改写的函数中增加逻辑，并执行原来保留的原函数。注意原函数要用 call 或 apply 将 this 指向原型对象。

#### 3.7 属性装饰器

作用在类中定义的属性上，这些属性不是原型上的属性，而是通过类实例化得到的实例对象上的属性。

装饰器同样会接受两个参数，原型对象，和属性名。而没有属性描述对象，为什么呢？这与 TypeScript 是如何初始化属性装饰器的有关。 目前没有办法在定义一个原型对象的成员时描述一个实例属性。

```typescript
function propertyDecorator(value: string, Girl) {
  return function (prototype, key) {
    console.log(
      "接收原型对象，装饰的属性名，属性描述符",
      Girl.prototype === prototype
    );
  };
}

function thinFace(prototype, key) {
  console.log(prototype, key);
}

class Girl {
  @thinFace
  @propertyDecorator("属性装饰器", Girl)
  public age: number = 18;
}

let g = new Girl();

console.log(g.age); // 18
```

#### 3.8 其他装饰器的写法

下面组合多个装饰器写在一起，出了上面提到的三种，还有 访问符装饰器、参数装饰器。这些装饰器在一起时，会有执行顺序。

```typescript
function classDecorator(value: string) {
  console.log(value);
  return function () {};
}
function propertyDecorator(value: string) {
  console.log(value);
  return function () {
    console.log("propertyDecorator");
  };
}
function methodDecorator(value: string) {
  console.log(value);
  return function () {
    console.log("methodDecorator");
  };
}
function paramDecorator(value: string) {
  console.log(value);
  return function () {
    console.log("paramDecorator");
  };
}
function AccessDecorator(value: string) {
  console.log(value);
  return function () {
    console.log("AccessDecorator");
  };
}
function thinFace() {
  console.log("瘦脸");
}
function IncreasingEyes() {
  console.log("增大眼睛");
}

@thinFace
@classDecorator("类装饰器")
class Girl {
  @propertyDecorator("属性装饰器")
  age: number = 18;

  @AccessDecorator("访问符装饰器")
  get city() {}

  @methodDecorator("方法装饰器")
  @IncreasingEyes
  faceValue() {
    console.log("原本的脸");
  }

  getAge(@paramDecorator("参数装饰器") name: string) {}
}
```

运行了这段编译后的代码，会发现这些访问器的顺序是，属性装饰器 -> 访问符装饰器 -> 方法装饰器 -> 参数装饰器 -> 类装饰器。

[更详细的用法可以参考官网文档](https://www.tslang.cn/docs/handbook/decorators.html#decorator-factories)

#### 3.9 装饰器运行时代码分析

装饰器在浏览器中不支持，没办法直接使用，需要经过工具编译成浏览器可执行的代码。

分析一下通过工具编译后的代码。

生成 face.js 文件：

```typescript


tsc --target ES5 --experimentalDecorators face.ts
```

打开 face.js 文件，会看到一段被压缩后的代码，可以格式化一下。

先看这段代码：

```typescript
**decorate([
propertyDecorator('属性装饰器')
], Girl.prototype, "age", void 0);
**decorate([
AccessDecorator('访问符装饰器')
], Girl.prototype, "city", null);
**decorate([
methodDecorator('方法装饰器'),
IncreasingEyes
], Girl.prototype, "faceValue", null);
**decorate([
__param(0, paramDecorator('参数装饰器'))
], Girl.prototype, "getAge", null);
Girl = **decorate([
thinFace,
classDecorator('类装饰器')
], Girl);
```

\*\*decorate 的作用就是执行装饰器函数，从这段代码中能够看出很多信息，印证上面得到的结论。

通过\_\_decorate 调用顺序，可以看出来，多个类型的装饰器一起使用时，顺序是，属性装饰器 -> 访问符装饰器 -> 方法装饰器 -> 参数装饰器 -> 类装饰器。

调用了 \_\_decorate 函数，根据使用的装饰器类型不同，传入的参数也不相同。

第一个参数传入的都一样，为数组，这样确保和我们书写的顺序一致，每一项是求值后的装饰器函数，如果写的是 @propertyDecorator() 则一上来就执行，得到装饰器函数，这跟上面分析的一致。

类装饰器会把类作为第二个参数，其他的装饰器，把原型对象作为第二个参数，属性名作为第三个，第四个是 null 或 void 0。void 0 的值为 undefined，也就等于没传参数

要记住传给 **decorate 函数参数的个数和值，在深入到 **decorate 源码中， 会根据这些值来决定执行装饰器函数时，传入参数的多少。

好，来看 \_\_decorate 函数实现：

// 已存在此函数，直接使用，否则自己定义

```typescript
var **decorate = (this && this.**decorate) ||
// 接收四个参数：
//decorators 存放装饰器函数的数组、target 原型对象|类，
//key 属性名、desc 描述（undefined 或 null）
function(decorators, target, key, desc) {
var c = arguments.length,
// 拿到参数的个数
r = c < 3 // 参数小于三个，说明是类装饰器，直接拿到类
? target
: desc === null // 第四个参数为 null，则需要描述对象；属性装饰器传入是 void 0，没有描述对象。
? desc = Object.getOwnPropertyDescriptor(target, key)
: desc,
d;
// 如果提供了 Reflect.decorate 方法，直接调用；否则自己实现
if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
r = Reflect.decorate(decorators, target, key, desc);
else
// 装饰器函数执行顺序和书写的顺序相反，从下至上 执行
for (var i = decorators.length - 1; i >= 0; i--)
if (d = decorators[i]) // 拿到装饰器函数
r = (c < 3 // 参数小于 3 个，说明是类装饰器，执行装饰器函数，直接传入类
? d(r)
: c > 3 // 参数大于三个，是方法装饰器、访问符装饰器、参数装饰器，则执行传入描述对象
? d(target, key, r)
: d(target, key) // 为属性装饰器，不传入描述对象
) || r;

// 给被装饰的属性，设置得到的描述对象，主要是针对，方法、属性来说的
/_\*\*
_ r 的值分两种情况，
_ 一种是通过上面的 Object.getOwnPropertyDescriptor 得到的值
_ 另一种，是装饰器函数执行后的返回值，作为描述对象。
_ 一般不给装饰器函数返回值。
_/
return c > 3 && r && Object.defineProperty(target, key, r),r;
};
```

上面的参数装饰器，调用了一个函数为 \_\_params，

````typescript
var **param = (this && this.**param) || function (paramIndex, decorator) {
return function (target, key) { decorator(target, key, paramIndex); }
};
```
目的是，要给装饰器函数传入参数的位置 paramIndex。

看了编译后的源码，相信会对装饰器的理解更深刻。

````

```

```
