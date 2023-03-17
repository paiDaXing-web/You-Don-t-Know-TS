---
title: 进入 YDKJS
date: 2022/05/29
hideComments: false
---

# 第三章：进入 YDKJS

这个系列丛书到底是为了什么？简单地说，它的目的是认真地学习 _JavaScript 的所有部分_，不仅是这门语言的某些人称之为“好的部分”的子集，也不仅是让你在工作中搞定任务所需的最小部分的知识。

其他语言中，认真的开发者总是希望努力学习他们主要使用的语言的大部分或全部，但是 JS 开发者由于通常不太学习这门语言而在人群中显得很扎眼。这不是一件好事，而且我们也不应当继续将之视为常态。

_你不懂 JS_（_YDKJS_）系列的立场是与学习 JS 的通常方式形成鲜明的对比，而且与你将会读到的其他 JS 书籍不同。它挑战你超越自己的舒适区，对每一个你遇到的行为问一个更深入的“为什么”。你准备好接受挑战了吗？

我将用这最后一章的篇幅来简要地总结一下这个系列其他书目的内容，和如何在 _YDKJS_ 的基础上最有效地建立学习 JS 的基础。

## 作用域与闭包

也许你需要快速接受的基础之一，就是在 JavaScript 中变量的作用域是如何工作的。关于作用域仅有传闻中的模糊 _观念_ 是不够的。

_作用域与闭包_ 从揭穿常见的误解开始：JS 是“解释型语言”因此是不被编译的。不对。

JS 引擎在你的代码执行的前一刻（有时是在执行期间！）编译它。所以我们首先深入了解编译器处理我们代码的方式，以此来理解它如何找到并处理变量和函数的声明。沿着这条道路，我们将见到 JS 变量作用域管理的特有隐喻，“提升”。

对“词法作用域”的极其重要的理解，是我们在这本书最后一章探索闭包时所需的基石。闭包也许是 JS 所有的概念中最重要的一个，但如果你没有首先牢牢把握住作用域的工作方式，那么闭包将很可能依然不在你的掌握之中。

闭包的一个重要应用是模块模式，正如我们在本书第二章中简要介绍过的那样。模块模式也许是 JavaScript 的所有代码组织模式中最流行的一种；深刻理解它应当是你的首要任务之一。

## this 与对象原型

也许关于 JavaScript 传播得最广泛和持久的谬误之一是认为`this`关键字指代它所出现的函数。可怕的错误。

`this`关键字是根据函数如何被执行而动态绑定的，而事实上有四种简单的规则可以用来理解和完全决定`this`绑定。

和`this`密切相关的是对象原型属性，它是一种属性的查询链，与查询词法作用域变量的方式相似。但是原型中包含的是另一个关于 JS 的巨大谬误：模拟（山寨）类和继承（所谓的“原型继承”）的想法。

不幸的是，渴望将类和继承的设计模式思想带入 JavaScript 只是你能做的最差劲儿的事情，因为虽然语法可能欺骗你，使你认为有类这样的东西存在，但实际上原型机制在行为上是根本相反的。

目前的问题是，是忽略这种错位并假装你实现的是“继承”更好，还是学习并接纳对象原型系统实际的工作方式更恰当。后者被称为“行为委托”更合适。

这不光是语法上的偏好问题。委托是一种完全不同的，更强大的设计模式，其中的原因之一就是它取代了使用类和继承进行设计的需要。但是对于以谈论 JavaScript 的一生为主题的几乎所有的其他博客，书籍，和论坛来说，这些断言绝对是打脸的。

我对委托和继承做出的宣言不是源于对语言和其语法的厌恶，而是来自于渴望看到这门语言的真实力量被正确地利用，渴望看到无尽的困惑与沮丧被一扫而光。

但是我举出的关于原型和委托的例子可要比我在这里乱说的东西复杂得多。如果你准备好重新思考你认为你所了解的关于 JavaScript“类”和“继承”的一切，我给你一个机会来“服用红色的药丸”，并且看一看本系列的 _this 与对象原型_ 的第四到六章。

## 类型与文法

这个系列的第三本书主要集中于解决另一个极具争议的话题：类型强制转换。也许没有什么话题能比你谈论隐含的强制转换造成的困惑更能使 JS 开发者感到沮丧了。

到目前为止，惯例的智慧说隐含强制转换是这门语言的“坏的部分”，并且应当不计一切避免它。事实上，有些人已经到了将它称为语言设计的“缺陷”的地步了。确实存在这么一些工具，它们的全部工作就是扫描你的代码，并在你进行任何强制转换，甚至是做有些像强制转换的事情时报警。

但是强制转换真的如此令人困惑，如此的坏，如此的不可信，以至于只要你使用它，你的代码从一开始就灭亡了吗？

我说不。在第一到三章中建立了对类型和值真正的工作方式的理解后，第四章参与了这个辩论，并从强制转换的角落和缝隙全面地讲解它的工作方式。我们将看到强制转换的哪一部分真的令人惊讶，而且如果花时间去学习，哪一部分实际上完全是合理的。

但我不仅仅要说强制转换是合理的和可以学习的，我断言强制转换是一种 _你应当在代码中使用的_ 极其有用而且完全被低估的工具。我要说在合理使用的情况下，强制转换不仅可以工作，而且会使你的代码更好。所有唱反调的和怀疑的人当然会嘲笑这样的立场，但我相信它是让你玩儿好 JS 游戏的主要按键之一。

你是想继续人云亦云，还是想将所有的臆测放在一边，用一个全新的视角观察强制转换？这个系列的 _类型与文法_ 将会强制转换你的想法。

## 异步与性能

这个系列的前三本书聚焦于这门语言的核心技术，但是第四本书稍稍开出一个分支来探讨在这门语言技术之上的管理异步编程的模式。异步不仅对于性能和我们的应用程序很关键，而且它日渐成为改进可写性和可维护性的关键因素。

这本书从搞清楚许多令人困惑的术语和概念开始，比如“异步”，“并行”和“并发”。而且深入讲解了这些东西如何适用和不适用于 JS。

然后我们继续检视作为开启异步的主要方法：回调。但我们很快就会看到，对于现代异步编程的需求来说，单靠回调自身是远远不够的。我们将找出仅使用回调编码的两种主要的不足之处：_控制反转_（IoC）信任丢失和缺乏线性的可推理性。

为了解决这两种主要的不足，ES6 引入了两种新的机制（实际上也是模式）：promise 和 generator。

Prmise 是一个“未来值”的一种与时间无关的包装，它让你推理并组合这些未来值而不必关心它们是否已经准备好。另外，它们通过将回调沿着一个可信赖和可组装的 promise 机制传递，有效地解决了 IoC 信任问题。

Generator 给 JS 函数引入了一种新的执行模式，generator 可以在`yield`点被暂停而稍后异步地被继续。这种“暂停-继续”的能力让 generator 在幕后异步地被处理，使看起来同步，顺序执行的代码成为可能。如此，我们就解决了回调的非线性，非本地跳转的困惑，并因此使我们的异步代码看起来是更容易推理的同步代码。

但是，是 promise 与 generator 的组合给了我们 JavaScript 中最有效的异步代码模式。事实上，在即将到来的 ES7 与之后的版本中，大多数精巧的异步性肯定会建立在这个基础之上。为了认真地在一个异步的世界中高效地编程，你将需要对 promise 与 generator 的组合十分适应。

如果 promise 和 generator 是关于表达一些模式，这些模式让你的程序更加并发地运行，而因此在更短的时间内完成更多的处理，那么 JS 在性能优化上就拥有许多其他的方面值得探索。

第五章钻研的话题是使用 Web Worker 的程序并行性和使用 SIMD 的数据并行性，以及像 ASM.js 这样的底层优化技术。第六章从正确的基准分析技术的角度来观察性能优化，包括什么样的性能值得关心而什么应当忽略。

高效地编写 JavaScript 意味着编写的代码可以突破这种限制壁垒：在范围广泛的浏览器和其他环境中动态运行。这需要我们进行更多复杂的详细计划与努力，才能使一个程序从“可以工作”到“工作得很好”。

给你编写合理且高效的 JavaScript 代码所需的全部工具与技能，_异步与性能_ 就是为此而设计的。

## ES6 与未来

至此，无论你感觉自己已经将 JavaScript 掌握的多么好，现实是 JavaScript 从来没有停止过进化，而且进化的频率正在飞快地增长。这个事实几乎就是本系列精神的含义，拥抱我们永远不会完全 _懂得_ 的 JS 的所有部分，因为只要你掌握了它的全部，就会有你需要学习的新的东西到来。

这本书专注于这门语言在中短期的发展前景，不仅是像 ES6 这样 _已知的_ 东西，还包括在未来 _可能的_ 东西。

虽然这个系列的所有书目采纳的是在编写它们时 JavaScript 的状态，也就是 ES6 正在被接纳的半途中，但是这个系列更主要地集中于 ES5。现在我们想要将注意力转移到 ES6，ES7，和……

因为在编写本书时 ES6 已经近于完成，_ES6 与未来_ 首先将 ES6 中确定的东西分割为几个关键的范畴，包括新的语法，新的数据结构（集合），和新的处理能力以及 API。我们将在各种细节的层面讲解这些新的 ES6 特性中的每一个，包括复习我们在本系列的其他书目中遇到过的细节。

这是一些值得一读的激动人心的 ES6 特性：解构，参数默认值，symbol，简洁方法，计算属性，箭头函数，块儿作用域，promise，generator，iterator，模块，代理，weakmap，以及很多，很多别的东西！呼，ES6 真是不容小觑！

这本书的第一部分是一张路线图，为了对你将要在以后几年中编写和探索的新改进的 JavaScript 做好准备，它指明了你需要学习的所有东西。

这本书稍后的部分将注意力转向简要地介绍一些我们将在近未来可能看到的 JavaScript 的新东西。在这里最重要的是，要理解在后 ES6 时代，JS 很可能将会一个特性一个特性地进化，而不是一个版本一个版本地进化，这意味着我们将在比你想象的早得多的时候，看到这些近未来的到来。

JavaScript 的未来是光明的。这不正是我们开始学习它好时机吗！？

## 复习

_YDKJS_ 系列投身于这样的命题：所有的 JS 开发者都可以，也应该学习这门伟大语言的每一部分。没有任何个人意见，没有任何框架的设想，没有任何项目的期限可以作为你从没有学习和深入理解 JavaScript 的借口。

我们聚焦这门语言中的每一个重要领域，为之专著一本很短但是内容非常稠密的书，来全面地探索它的 —— 你也许认为自己知道但可能并不全面 —— 所有部分。

“你不懂 JS”不是一种批评或羞辱。它是我们所有人，包括我自己，都必须正视的一种现实。学习 JavaScript 不是一个最终目标，而是一个过程。我们还不懂 JavaScript。但是我们会的！