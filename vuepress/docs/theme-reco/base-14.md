---
title: 十四、typescript4.0 特性
date: 2022/10/27
---

## 十四、typescript4.0 特性

TypeScript 4.0 带来了很多新的特性，这里我们只简单介绍其中的两个新特性。

### 14.1 构造函数的类属性推断

当 noImplicitAny 配置属性被启用之后，TypeScript 4.0 就可以使用控制流分析来确认类中的属性类型：

```typescript
class Person {
  fullName; // (property) Person.fullName: string
  firstName; // (property) Person.firstName: string
  lastName; // (property) Person.lastName: string

  constructor(fullName: string) {
    this.fullName = fullName;
    this.firstName = fullName.split(" ")[0];
    this.lastName = fullName.split(" ")[1];
  }
}
```

然而对于以上的代码，如果在 TypeScript 4.0 以前的版本，比如在 3.9.2 版本下，编译器会提示以下错误信息：

```typescript
class Person {
  // Member 'fullName' implicitly has an 'any' type.(7008)
  fullName; // Error
  firstName; // Error
  lastName; // Error

  constructor(fullName: string) {
    this.fullName = fullName;
    this.firstName = fullName.split(" ")[0];
    this.lastName = fullName.split(" ")[1];
  }
}
```

从构造函数推断类属性的类型，该特性给我们带来了便利。但在使用过程中，如果我们没法保证对成员属性都进行赋值，那么该属性可能会被认为是 undefined。

```typescript
class Person {
  fullName; // (property) Person.fullName: string
  firstName; // (property) Person.firstName: string | undefined
  lastName; // (property) Person.lastName: string | undefined

  constructor(fullName: string) {
    this.fullName = fullName;
    if (Math.random()) {
      this.firstName = fullName.split(" ")[0];
      this.lastName = fullName.split(" ")[1];
    }
  }
}
```

### 14.2 标记的元组元素

在以下的示例中，我们使用元组类型来声明剩余参数的类型：

```typescript
function addPerson(...args: [string, number]): void {
  console.log(`Person info: name: ${args[0]}, age: ${args[1]}`);
}

addPerson("lolo", 5); // Person info: name: lolo, age: 5
```

其实，对于上面的 addPerson 函数，我们也可以这样实现：

```typescript
function addPerson(name: string, age: number) {
  console.log(`Person info: name: ${name}, age: ${age}`);
}
```

这两种方式看起来没有多大的区别，但对于第一种方式，我们没法设置第一个参数和第二个参数的名称。虽然这样对类型检查没有影响，但在元组位置上缺少标签，会使得它们难于使用。为了提高开发者使用元组的体验，TypeScript 4.0 支持为元组类型设置标签：

```typescript
function addPerson(...args: [name: string, age: number]): void {
  console.log(`Person info: name: ${args[0]}, age: ${args[1]}`);
}
```

之后，当我们使用 addPerson 方法时，TypeScript 的智能提示就会变得更加友好。

```typescript
// 未使用标签的智能提示
// addPerson(args_0: string, args_1: number): void
function addPerson(...args: [string, number]): void {
  console.log(`Person info: name: ${args[0]}, age: ${args[1]}`);
}

// 已使用标签的智能提示
// addPerson(name: string, age: number): void
function addPerson(...args: [name: string, age: number]): void {
  console.log(`Person info: name: ${args[0]}, age: ${args[1]}`);
}
```
