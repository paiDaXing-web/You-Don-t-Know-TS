---
title: 八、typescript 数组
date: 2022/10/27
---

## 八、typescript 数组

### 8.1 数组解构

```typescript
let x: number;
let y: number;
let z: number;
let five_array = [0, 1, 2, 3, 4];
[x, y, z] = five_array;
```

### 8.2 数组展开运算符

```typescript
let two_array = [0, 1];
let five_array = [...two_array, 2, 3, 4];
```

### 8.3 数组遍历

```typescript
let colors: string[] = ["red", "green", "blue"];
for (let i of colors) {
  console.log(i);
}
```
