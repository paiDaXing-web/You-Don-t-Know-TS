# 第四章：异步流程控制

如果你写过任何数量相当的 JavaScript，这就不是什么秘密：异步编程是一种必须的技能。管理异步的主要机制曾经是函数回调。

然而，ES6 增加了一种新特性：_Promise_，来帮助你解决仅使用回调来管理异步的重大缺陷。另外，我们可以重温 generator（前一章中提到的）来看看一种将两者组合的模式，它是 JavaScript 中异步流程控制编程向前迈出的重要一步。

## Promises

让我们辨明一些误解：Promise 不是回调的替代品。Promise 提供了一种可信的中介机制 —— 也就是，在你的调用代码和将要执行任务的异步代码之间 —— 来管理回调。

另一种考虑 Promise 的方式是作为一种事件监听器，你可以在它上面注册监听一个通知你任务何时完成的事件。它是一个仅被触发一次的事件，但不管怎样可以被看作是一个事件。

Promise 可以被链接在一起，它们可以是一系列顺序的、异步完成的步骤。与`all(..)`方法（用经典的术语将，叫“门”）和`race(..)`方法（用经典的术语将，叫“闩”）这样的高级抽象一起，promise 链可以提供一种异步流程控制的机制。

还有另外一种概念化 Promise 的方式是，将它看作一个 _未来值_，一个与时间无关的值的容器。无论底层的值是否是最终值，这种容器都可以被同样地推理。观测一个 Promise 的解析会在这个值准备好的时候将它抽取出来。换言之，一个 Promise 被认为是一个同步函数返回值的异步版本。

一个 Promise 只可能拥有两种解析结果：完成或拒绝，并带有一个可选的信号值。如果一个 Promise 被完成，这个最终值称为一个完成值。如果它被拒绝，这个最终值称为理由（也就是“拒绝的理由”）。Promise 只可能被解析（完成或拒绝）一次。任何其他的完成或拒绝的尝试都会被简单地忽略，一旦一个 Promise 被解析，它就成为一个不可被改变的值（immutable）。

显然，有几种不同的方式可以来考虑一个 Promise 是什么。没有一个角度就它自身来说是完全充分的，但是每一个角度都提供了整体的一个方面。这其中的要点是，它们为仅使用回调的异步提供了一个重大的改进，也就是它们提供了顺序、可预测性、以及可信性。

### 创建与使用 Promises

要构建一个 promise 实例，可以使用`Promise(..)`构造器：

```js
var p = new Promise(function pr(resolve, reject) {
  // ..
});
```

`Promise(..)`构造器接收一个单独的函数（`pr(..)`），它被立即调用并以参数值的形式收到两个控制函数，通常被命名为`resolve(..)`和`reject(..)`。它们被这样使用：

- 如果你调用`reject(..)`，promise 就会被拒绝，而且如果有任何值被传入`reject(..)`，它就会被设置为拒绝的理由。
- 如果你不使用参数值，或任何非 promise 值调用`resolve(..)`，promise 就会被完成。
- 如果你调用`resolve(..)`并传入另一个 promise，这个 promise 就会简单地采用 —— 要么立即要么最终地 —— 这个被传入的 promise 的状态（不是完成就是拒绝）。

这里是你通常如何使用一个 promise 来重构一个依赖于回调的函数调用。假定你始于使用一个`ajax(..)`工具，它期预期要调用一个错误优先风格的回调：

```js
function ajax(url, cb) {
  // 发起请求，最终调用 `cb(..)`
}

// ..

ajax("http://some.url.1", function handler(err, contents) {
  if (err) {
    // 处理ajax错误
  } else {
    // 处理成功的`contents`
  }
});
```

你可以将它转换为：

```js
function ajax(url) {
  return new Promise(function pr(resolve, reject) {
    // 发起请求，最终不是调用 `resolve(..)` 就是调用 `reject(..)`
  });
}

// ..

ajax("http://some.url.1").then(
  function fulfilled(contents) {
    // 处理成功的 `contents`
  },
  function rejected(reason) {
    // 处理ajax的错误reason
  }
);
```

Promise 拥有一个方法`then(..)`，它接收一个或两个回调函数。第一个函数（如果存在的话）被看作是 promise 被成功地完成时要调用的处理器。第二个函数（如果存在的话）被看作是 promise 被明确拒绝时，或者任何错误/异常在解析的过程中被捕捉到时要调用的处理器。

如果这两个参数值之一被省略或者不是一个合法的函数 —— 通常你会用`null`来代替 —— 那么一个占位用的默认等价物就会被使用。默认的成功回调将传递它的完成值，而默认的错误回调将传播它的拒绝理由。

调用`then(null,handleRejection)`的缩写是`catch(handleRejection)`。

`then(..)`和`catch(..)`两者都自动地构建并返回另一个 promise 实例，它被链接在原本的 promise 上，接收原本的 promise 的解析结果 —— （实际被调用的）完成或拒绝处理器返回的任何值。考虑如下代码：

```js
ajax("http://some.url.1")
  .then(
    function fulfilled(contents) {
      return contents.toUpperCase();
    },
    function rejected(reason) {
      return "DEFAULT VALUE";
    }
  )
  .then(function fulfilled(data) {
    // 处理来自于原本的promise的处理器中的数据
  });
```

在这个代码段中，我们要么从`fulfilled(..)`返回一个立即值，要么从`rejected(..)`返回一个立即值，然后在下一个事件周期中这个立即值被第二个`then(..)`的`fulfilled(..)`接收。如果我们返回一个新的 promise，那么这个新 promise 就会作为解析结果被纳入与采用：

```js
ajax("http://some.url.1")
  .then(
    function fulfilled(contents) {
      return ajax("http://some.url.2?v=" + contents);
    },
    function rejected(reason) {
      return ajax("http://backup.url.3?err=" + reason);
    }
  )
  .then(function fulfilled(contents) {
    // `contents` 来自于任意一个后续的 `ajax(..)` 调用
  });
```

要注意的是，在第一个`fulfilled(..)`中的一个异常（或者 promise 拒绝）将 _不会_ 导致第一个`rejected(..)`被调用，因为这个处理仅会应答第一个原始的 promise 的解析。取代它的是，第二个`then(..)`调用所针对的第二个 promise，将会收到这个拒绝。

在上面的代码段中，我们没有监听这个拒绝，这意味着它会为了未来的观察而被静静地保持下来。如果你永远不通过调用`then(..)`或`catch(..)`来观察它，那么它将会成为未处理的。有些浏览器的开发者控制台可能会探测到这些未处理的拒绝并报告它们，但是这不是有可靠保证的；你应当总是观察 promise 拒绝。

**注意：** 这只是 Promise 理论和行为的简要概览。要进行更加深入的探索，参见本系列的 _异步与性能_ 的第三章。

### Thenables

Promise 是`Promise(..)`构造器的纯粹实例。然而，还存在称为 _thenable_ 的类 promise 对象，它通常可以与 Promise 机制协作。

任何带有`then(..)`函数的对象（或函数）都被认为是一个 thenable。任何 Promise 机制可以接受与采用一个纯粹的 promise 的状态的地方，都可以处理一个 thenable。

Thenable 基本上是一个一般化的标签，标识着任何由除了`Promise(..)`构造器之外的其他系统创建的类 promise 值。从这个角度上讲，一个 thenable 没有一个纯粹的 Promise 那么可信。例如，考虑这个行为异常的 thenable：

```js
var th = {
  then: function thener(fulfilled) {
    // 永远会每100ms调用一次`fulfilled(..)`
    setInterval(fulfilled, 100);
  },
};
```

如果你收到这个 thenable 并使用`th.then(..)`将它链接，你可能会惊讶地发现你的完成处理器被反复地调用，而普通的 Promise 本应该仅仅被解析一次。

一般来说，如果你从某些其他系统收到一个声称是 promise 或 thenable 的东西，你不应当盲目地相信它。在下一节中，我们将会看到一个 ES6 Promise 的工具，它可以帮助解决信任的问题。

但是为了进一步理解这个问题的危险，让我们考虑一下，在 _任何_ 一段代码中的 _任何_ 对象，只要曾经被定义为拥有一个称为`then(..)`的方法就都潜在地会被误认为是一个 thenable —— 当然，如果和 Promise 一起使用的话 —— 无论这个东西是否有意与 Promise 风格的异步编码有一丝关联。

在 ES6 之前，对于称为`then(..)`的方法从来没有任何特别的保留措施，正如你能想象的那样，在 Promise 出现在雷达屏幕上之前就至少有那么几种情况，它已经被选择为方法的名称了。最有可能用错 thenable 的情况就是使用`then(..)`的异步库不是严格兼容 Promise 的 —— 在市面上有好几种。

这份重担将由你来肩负：防止那些将被误认为一个 thenable 的值被直接用于 Promise 机制。

### `Promise` API

`Promise`API 还为处理 Promise 提供了一些静态方法。

`Promise.resolve(..)`创建一个被解析为传入的值的 promise。让我们将它的工作方式与更手动的方法比较一下：

```js
var p1 = Promise.resolve(42);

var p2 = new Promise(function pr(resolve) {
  resolve(42);
});
```

`p1`和`p2`将拥有完全相同的行为。使用一个 promise 进行解析也一样：

```js
var theP = ajax( .. );

var p1 = Promise.resolve( theP );

var p2 = new Promise( function pr(resolve){
	resolve( theP );
} );
```

**提示：** `Promise.resolve(..)`就是前一节提出的 thenable 信任问题的解决方案。任何你还不确定是一个可信 promise 的值 —— 它甚至可能是一个立即值 —— 都可以通过传入`Promise.resolve(..)`来进行规范化。如果这个值已经是一个可识别的 promise 或 thenable，它的状态/解析结果将简单地被采用，将错误行为与你隔绝开。如果相反它是一个立即值，那么它将会被“包装”进一个纯粹的 promise，以此将它的行为规范化为异步的。

`Promise.reject(..)`创建一个立即被拒绝的 promise，与它的`Promise(..)`构造器对等品一样：

```js
var p1 = Promise.reject("Oops");

var p2 = new Promise(function pr(resolve, reject) {
  reject("Oops");
});
```

虽然`resolve(..)`和`Promise.resolve(..)`可以接收一个 promise 并采用它的状态/解析结果，但是`reject(..)`和`Promise.reject(..)`不会区分它们收到什么样的值。所以，如果你使用一个 promise 或 thenable 进行拒绝，这个 promise/thenable 本身将会被设置为拒绝的理由，而不是它底层的值。

`Promise.all([ .. ])`接收一个或多个值（例如，立即值，promise，thenable）的数组。它返回一个 promise，这个 promise 会在所有的值完成时完成，或者在这些值中第一个被拒绝的值出现时被立即拒绝。

使用这些值/promises：

```js
var p1 = Promise.resolve(42);
var p2 = new Promise(function pr(resolve) {
  setTimeout(function () {
    resolve(43);
  }, 100);
});
var v3 = 44;
var p4 = new Promise(function pr(resolve, reject) {
  setTimeout(function () {
    reject("Oops");
  }, 10);
});
```

让我们考虑一下使用这些值的组合，`Promise.all([ .. ])`如何工作：

```js
Promise.all([p1, p2, v3]).then(function fulfilled(vals) {
  console.log(vals); // [42,43,44]
});

Promise.all([p1, p2, v3, p4]).then(
  function fulfilled(vals) {
    // 永远不会跑到这里
  },
  function rejected(reason) {
    console.log(reason); // Oops
  }
);
```

`Promise.all([ .. ])`等待所有的值完成（或第一个拒绝），而`Promise.race([ .. ])`仅会等待第一个完成或拒绝。考虑如下代码：

```js
// 注意：为了避免时间的问题误导你，
// 重建所有的测试值！

Promise.race([p2, p1, v3]).then(function fulfilled(val) {
  console.log(val); // 42
});

Promise.race([p2, p4]).then(
  function fulfilled(val) {
    // 永远不会跑到这里
  },
  function rejected(reason) {
    console.log(reason); // Oops
  }
);
```

**警告：** 虽然 `Promise.all([])`将会立即完成（没有任何值），但是 `Promise.race([])`将会被永远挂起。这是一个奇怪的不一致，我建议你应当永远不要使用空数组调用这些方法。

## Generators + Promises

将一系列 promise 在一个链条中表达来代表你程序的异步流程控制是 _可能_ 的。考虑如如下代码：

```js
step1()
  .then(step2, step1Failed)
  .then(function step3(msg) {
    return Promise.all([step3a(msg), step3b(msg), step3c(msg)]);
  })
  .then(step4);
```

但是对于表达异步流程控制来说有更好的选项，而且在代码风格上可能比长长的 promise 链更理想。我们可以使用在第三章中学到的 generator 来表达我们的异步流程控制。

要识别一个重要的模式：一个 generator 可以 yield 出一个 promise，然后这个 promise 可以使用它的完成值来推进 generator。

考虑前一个代码段，使用 generator 来表达：

```js
function* main() {
  try {
    var ret = yield step1();
  } catch (err) {
    ret = yield step1Failed(err);
  }

  ret = yield step2(ret);

  // step 3
  ret = yield Promise.all([step3a(ret), step3b(ret), step3c(ret)]);

  yield step4(ret);
}
```

从表面上看，这个代码段要比前一个 promise 链等价物要更繁冗。但是它提供了更加吸引人的 —— 而且重要的是，更加容易理解和阅读的 —— 看起来同步的代码风格（“return”值的`=`赋值操作，等等），对于`try..catch`错误处理可以跨越那些隐藏的异步边界使用来说就更是这样。

为什么我们要与 generator 一起使用 Promise？不用 Promise 进行异步 generator 编码当然是可能的。

Promise 是一个可信的系统，它将普通的回调和 thunk 中发生的控制倒转（参见本系列的 _异步与性能_）反转回来。所以组合 Promise 的可信性与 generator 中代码的同步性有效地解决了回调的主要缺陷。另外，像`Promise.all([ .. ])`这样的工具是一个非常美好、干净的方式 —— 在一个 generator 的一个`yield`步骤中表达并发。

那么这种魔法是如何工作的？我们需要一个可以运行我们 generator 的 _运行器（runner）_，接收一个被`yield`出来的 promise 并连接它，让它要么使用成功的完成推进 generator，要么使用拒绝的理由向 generator 抛出异常。

许多具备异步能力的工具/库都有这样的“运行器”；例如，`Q.spawn(..)`和我的 asynquence 中的`runner(..)`插件。这里有一个独立的运行器来展示这种处理如何工作：

```js
function run(gen) {
  var args = [].slice.call(arguments, 1),
    it;

  it = gen.apply(this, args);

  return Promise.resolve().then(function handleNext(value) {
    var next = it.next(value);

    return (function handleResult(next) {
      if (next.done) {
        return next.value;
      } else {
        return Promise.resolve(next.value).then(
          handleNext,
          function handleErr(err) {
            return Promise.resolve(it.throw(err)).then(handleResult);
          }
        );
      }
    })(next);
  });
}
```

**注意：** 这个工具的更丰富注释的版本，参见本系列的 _异步与性能_。另外，由各种异步库提供的这种运行工具通常要比我们在这里展示的东西更强大。例如，asynquence 的`runner(..)`可以处理被`yield`的 promise、序列、thunk、以及（非 promise 的）间接值，给你终极的灵活性。

于是现在运行早先代码段中的`*main()`就像这样容易：

```js
run(main).then(
  function fulfilled() {
    // `*main()` 成功地完成了
  },
  function rejected(reason) {
    // 噢，什么东西搞错了
  }
);
```

实质上，在你程序中的任何拥有多于两个异步步骤的流程控制逻辑的地方，你就可以 _而且应当_ 使用一个由运行工具驱动的 promise-yielding generator 来以一种同步的风格表达流程控制。这样做将产生更易于理解和维护的代码。

这种“让出一个 promise 推进 generator”的模式将会如此常见和如此强大，以至于 ES6 之后的下一个版本的 JavaScript 几乎可以确定将会引入一中新的函数类型，它无需运行工具就可以自动地执行。我们将在第八章中讲解`async function`（正如它们期望被称呼的那样）。

## 复习

随着 JavaScript 在它被广泛采用过程中的日益成熟与成长，异步编程越发地成为关注的中心。对于这些异步任务来说回调并不完全够用，而且在更精巧的需求面前全面崩塌了。

可喜的是，ES6 增加了 Promise 来解决回调的主要缺陷之一：在可预测的行为上缺乏可信性。Promise 代表一个潜在异步任务的未来完成值，跨越同步和异步的边界将行为进行了规范化。

但是，Promise 与 generator 的组合才完全揭示了这样做的好处：将我们的异步流程控制代码重新安排，将难看的回调浆糊（也叫“地狱”）弱化并抽象出去。

目前，我们可以在各种异步库的运行器的帮助下管理这些交互，但是 JavaScript 最终将会使用一种专门的独立语法来支持这种交互模式！
