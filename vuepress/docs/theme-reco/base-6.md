---
title: 六、交叉类型
date: 2022/10/27
---

## 六、交叉类型

在 TypeScript 中交叉类型是将多个类型合并为一个类型。通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

```typescript
type PartialPointX = { x: number };
type Point = PartialPointX & { y: number };

let point: Point = {
  x: 1,
  y: 1,
};
```

在上面代码中我们先定义了 PartialPointX 类型，接着使用 & 运算符创建一个新的 Point 类型，表示一个含有 x 和 y 坐标的点，然后定义了一个 Point 类型的变量并初始化。

### 6.1 同名基础类型属性的合并

那么现在问题来了，假设在合并多个类型的过程中，刚好出现某些类型存在相同的成员，但对应的类型又不一致，比如：

```typescript
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string;
}

type XY = X & Y;
type YX = Y & X;

let p: XY;
let q: YX;
```

在上面的代码中，接口 X 和接口 Y 都含有一个相同的成员 c，但它们的类型不一致。对于这种情况，此时 XY 类型或 YX 类型中成员 c 的类型是不是可以是 string 或 number 类型呢？比如下面的例子：

```typescript
p = { c: 6, d: "d", e: "e" };
```

![1](../assets/4.5.jpeg)

```typescript
q = { c: "c", d: "d", e: "e" };
```

![1](../assets/4.5.1.jpeg)
为什么接口 X 和接口 Y 混入后，成员 c 的类型会变成 never 呢？这是因为混入后成员 c 的类型为 string & number，即成员 c 的类型既可以是 string 类型又可以是 number 类型。很明显这种类型是不存在的，所以混入后成员 c 的类型为 never。

### 6.2 同名非基础类型属性的合并

在上面示例中，刚好接口 X 和接口 Y 中内部成员 c 的类型都是基本数据类型，那么如果是非基本数据类型的话，又会是什么情形。我们来看个具体的例子：

```typescript
interface D {
  d: boolean;
}
interface E {
  e: string;
}
interface F {
  f: number;
}

interface A {
  x: D;
}
interface B {
  x: E;
}
interface C {
  x: F;
}

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: "semlinker",
    f: 666,
  },
};

console.log("abc:", abc);
```

以上代码成功运行后，控制台会输出以下结果：

![1](../assets/4.5.2.jpeg)

由上图可知，在混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并。
