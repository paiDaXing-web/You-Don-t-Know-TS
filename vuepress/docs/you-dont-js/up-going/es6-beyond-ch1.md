# 第一章：ES？现在与未来

在你一头扎进这本书之前，你应当可以熟练地使用（在本书写作时）最近版本的 JavaScript，也就是通常所说的 _ES5_（技术上讲是 ES 5.1）。这里，我们打算好好谈谈即将到来的 _ES6_，同时放眼未来去看看 JS 将会如何继续进化。

如果你还在 JavaScript 上寻找信心，我强烈推荐你首先读一读本系列的其他书目：

- _入门与进阶_：你是编程和 JS 的新手吗？这就是你在开启学习的旅程前需要查看的路线图。
- _作用域与闭包_：你知道 JS 的词法作用域是基于编译器（不是解释器！）语义的吗？你能解释闭包是如何成为词法作用域和函数作为值的直接结果的吗？
- _this 与对象原型_：你能复述`this`绑定的四个简单规则吗？你有没有曾经在 JS 中对付着去山寨“类”，而不是采取更简单的“行为委托”设计模式？你听说过 _链接到其他对象的对象_ （OOLO）吗？
- _类型与文法_：你知道 JS 中的内建类型吗？更重要的是，你知道如何在类型之间正确且安全地使用强制转换吗？你对 JS 文法/语法的微妙之处感到有多习惯？
- _异步与性能_：你还在使用回调管理你的异步处理吗？你能解释 promise 是为什么/如何解决了“回调地狱”的吗？你知道如何使用 generator 来改进异步代码的易读性吗？到底是什么构成了 JS 程序和独立操作的成熟优化？

如果你已经读过了这些书目而且对它们涵盖的内容感到十分轻松，那么现在是时候让我们深入 JS 的进化过程来探索所有即将到来的以及未来会发生的改变了。

与 ES5 不同，ES6 不仅仅是向语言添加的一组不算太多的新 API。它包含大量的新的语法形式，其中的一些你可能会花上相当一段时间才能适应。还有几种新的组织形式和为各种数据类型添加的新 API。

对这门语言来说 ES6 十分激进。就算你认为你懂得 ES5 的 JS，ES6 也满是 _你还不懂的_ 新东西，所以做好准备！这本书探索所有你需要迅速掌握的 ES6 主要主题，并且窥见一下那些你应当注意的正在步入正轨的未来特性。

**警告：** 这本书中的所有代码都假定运行在 ES6+的环境中。在写作本书时，浏览器和 JS 环境（比如 Node.js）对 ES6 的支持相当不同，因此你的感觉可能将会不同。

## 版本

JavaScript 标准在官方上被称为“ECMAScript”（缩写为“ES”），而且直到最近才刚刚完全采用顺序数字来标记版本（例如，“5”代表“第五版”）。

最早的版本，ES1 和 ES2，并不广为人知也没有大范围地被实现。ES3 是 JavaScript 第一次广泛传播的基准线，并且构成了像 IE6-8 和更早的 Android 2.x 移动浏览器的 JavaScript 标准。由于一些超出我们讨论范围的政治原因，命运多舛的 ES4 从未问世。

在 2009 年，ES5 正式定稿（在 2011 年出现了 ES5.1），它在浏览器的现代革新和爆发性增长（比如 Firefox，Chrome，Opera，Safari，和其他许多）中广泛传播，并作为 JS 标准稳定下来。

预计下一个版本的 JS（从 2013 年到 2014 年和之后的 2015 年中的内容），在人们的讨论中显然地经常被称为 ES6。

然而，在 ES6 规范的晚些时候，有建议提及未来的版本号也许会切换到编年制，比如用 ES2016（也叫 ES7）来指代在 2016 年末之前被定稿的任何版本。有些人对此持否定意见，但是相对于后来的 ES2015 来说，ES6 将很可能继续维持它占统治地位的影响力。可是，ES2016 事实上可能标志了新的编年制。

还可以看到，JS 进化的频度即使与一年一度的定版相比都要快得多。只要一个想法开始标准化讨论的进程，浏览器就开始为这种特性建造原型，而且早期的采用者就开始在代码中进行实验。

通常在一个特性被盖上官方承认的印章以前，由于这些早期的引擎/工具的原型它实际上已经被标准化了。所以也可以认为未来的 JS 版本将是一个特性一个特性的更新，而非一组主要特性的随意集合的更新（就像现在），也不是一年一年的更新（就像可能将变成的那样）。

简而言之，版本号不再那么重要了，JavaScript 开始变得更像一个常青的，活的标准。应对它的最佳方法是，举例来说，不再将你的代码库认为是“基于 ES6”的，而是考虑它支持的一个个特性。

## 转译

由于特性的快速进化，给开发者们造成了一个糟糕的问题，他们强烈地渴望立即使用新特性，而同时被被现实打脸 —— 他们的网站/app 需要支持那些不支持这些特性的老版本浏览器。

在整个行业中 ES5 的方式似乎已经无力回天了，它典型的思维模式是，代码库等待几乎所有的前 ES5 环境从它们的支持谱系中除名之后才开始采用 ES5。结果呢，许多人最近（在本书写作时）才开始采用`strict`模式这样的东西，而它早在五年前就在 ES5 中定稿了。

对于 JS 生态系统的未来来说，等待和落后于语言规范那么多年被广泛地认为是一种有害的方式。所有负责推动语言演进的人都渴望这样的事情；只要新的特性和模式以规范的形式稳定下来，并且浏览器有机会实现它们，开发者就开始基于这些新的特性和模式进行编码。

那么我们如何解决这个看起来似乎矛盾的问题？答案是工具，特别是一种称为 _转译（transpiling）_ 的技术（转换+编译）。大致上，它的想法是使用一种特殊的工具将你的 ES6 代码转换为可以在 ES5 环境中工作的等价物（或近似物！）。

例如，考虑属性定义缩写（见第二章的“对象字面扩展”）。这是 ES6 的形式：

```js
var foo = [1, 2, 3];

var obj = {
  foo, // 意思是 `foo: foo`
};

obj.foo; // [1,2,3]
```

这（大致）是它如何被转译：

```js
var foo = [1, 2, 3];

var obj = {
  foo: foo,
};

obj.foo; // [1,2,3]
```

这是一个微小但令人高兴的转换，它让我们在一个对象字面声明中将`foo: foo`缩写为`foo`，如果名称相同的话。

转译器为你实施这些变形，这个过程通常是构建工作流的一个步骤 —— 与你进行 linting，压缩，和其他类似操作相似。

### 填补（Shims/Polyfills）

不是所有的 ES6 新特性都需要转译器。填补（也叫 shims）是一种模式，在可能的情况下，它为一个新环境的行为定义一个可以在旧环境中运行的等价行为。语法是不能填补的，但是 API 经常是可以的。

例如，`Object.is(..)`是一个用来检查两个值严格等价性的新工具，它不带有`===`对于`NaN`和`-0`值的那种微妙的例外。`Object.is(..)`的填补相当简单：

```js
if (!Object.is) {
  Object.is = function (v1, v2) {
    // 测试 `-0`
    if (v1 === 0 && v2 === 0) {
      return 1 / v1 === 1 / v2;
    }
    // 测试 `NaN`
    if (v1 !== v1) {
      return v2 !== v2;
    }
    // 其他的一切情况
    return v1 === v2;
  };
}
```

**提示**：注意外部的`if`语句守护性地包围着填补的内容。这是一个重要的细节，它意味着这个代码段仅仅是为这个 API 还未定义的老环境而定义的后备行为；你想要覆盖既存 API 的情况是非常少见的。

有一个被称为“ES6 Shim”（ https://github.com/paulmillr/es6-shim/ ）的了不起的 ES6 填补集合，你绝对应该将它采纳为任何新 JS 项目的标准组成部分！

看起来 JS 将会继续一往无前的进化下去，同时浏览器也会持续地小步迭代以支持新特性，而不是大块大块地更新。所以跟上时代的最佳策略就是在你的代码库中引入填补，并在你的构建流程中引入一个转译器步骤，现在就开始习惯新的现实。

如果你决定维持现状，等待不支持新特性的所有浏览器都消失才开始使用新特性，那么你将总是落后于时代。你将可悲地错过所有新发明的设计 —— 而它们使编写 JavaScript 更有效，更高效，而且更健壮。

## 复习

ES6（有些人可能会称它为 ES2015）在本书写作时刚刚定稿，它包含许多你需要学习的新东西！

但更重要的是，它将你的思维模式与 JavaScript 新的进化方式相接轨。不是仅仅为了等待某些官方文档投票通过而耗上许多年，就像以前许多人做的那样。

现在，JavaScript 特性一准备好就会在浏览器中实现，由你来决定是否现在就搭上早班车，还是去玩儿代价不菲的追车游戏。

不管未来的 JavaScript 采用什么样的标签，它都将会以比以前快得多的速度前进。为了使你位于在这门语言前进方向上的最前列，转译和填补是不可或缺的工具。

如果说对于 JavaScript 的新现实有什么重要的事情需要理解，那就是所有的 JS 开发者都被强烈地恳求从落后的一端移动到领先的一段。而学习 ES6 就是这一切的开端！
