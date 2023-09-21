<!--
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-08-16 17:22:20
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-21 17:05:09
 * @FilePath: /You-Don-t-Know-TS/vuepress/docs/theme-reco/article-1.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# TypeScript 中“declare”关键字的用途

详细介绍了 TypeScript ‘declare’ 的作用，让你对 `*.d.ts` 文件不再陌生。

![1](../assets/article/9-0.webp)

Welcome to the Mastering TypeScript series. This series will introduce the core knowledge and techniques of TypeScript in the form of animations. Let’s learn together! Previous articles are as follows:

[简体中文](./article-7.md)

- [What Are K, T, and V in TypeScript Generics?](article-1-en.md)
- [Using TypeScript Mapped Types Like a Pro](article-1-en.md)
- [Using TypeScript Conditional Types Like a Pro](article-1-en.md)
- [Using TypeScript Intersection Types Like a Pro](article-1-en.md)
- [Using TypeScript infer Like a Prov](article-1-en.md)
- [Using TypeScript Template Literal Types Like a Prov](article-1-en.md)
- [TypeScript Visualized: 15 Most Used Utility Types](./Advanced-2.md)
- [10 Things You Need To Know About TypeScript Classes](article-1-en.md)
- [The Purpose of ‘declare’ Keyword in TypeScript](article-1-en.md)
- [How To Define Objects Type With Unknown Structures in TypeScript](article-1-en.md)

当您在 TypeScript 项目中打开 `*.d.ts` 声明文件时，您可能会看到声明。你知道声明的作用是什么吗？如果你不知道，看完这篇文章，也许你就会知道了。

在 TypeScript 项目中，您可以通过脚本标签的形式导入第三方 JS-SDK，例如导入 Google 地图平台的 JS-SDK。

```typescript
<script
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly"
  defer
></script>
```

初始化后，您将在 TypeScript 文件中调用 JS-SDK 公开的 API。

![1](../assets/article/9-1.webp)

虽然你按照 Google Maps 开发文档使用了 JS-SDK 提供的 API，但是 TypeScript 编译器仍然会针对上述代码提示相应的错误信息。这是因为 TypeScript 编译器无法识别全局变量 google。

那么如何解决这个问题呢？答案是使用 declare 关键字来声明 google 全局变量，以便 TypeScript 编译器能够识别该全局变量。

declare var google: any;

![1](../assets/article/9-2.webp)

看到这里，你是不是一头雾水？为什么在 TypeScript 项目中可以正常使用 JSON、Math 或 Object 等全局变量？这是因为 TypeScript 在内部为我们做了声明，前面提到的全局变量是在 lib.es5.d.ts 声明文件中声明的。

```typescript
// typescript/lib/lib.es5.d.ts
declare var JSON: JSON;
declare var Math: Math;
declare var Object: ObjectConstructor;
```

事实上，declare 关键字除了声明全局变量之外，还可以用来声明全局函数、全局类或者全局枚举类型。您在工作中可能使用过的 eval、isNaN、encodeURI 和 parseInt 等函数也在 lib.es5.d.ts 声明文件中声明：

```typescript
declare function eval(x: string): any;
declare function isNaN(number: number): boolean;
declare function encodeURI(uri: string): string;
declare function parseInt(string: string, radix?: number): number;
```

需要注意的是，在声明全局函数时，我们不包括该函数的具体实现。通过声明文件，TypeScript 编译器可以识别上述全局 JavaScript 函数。

之前找不到“google”这个名字的问题的解决方法比较暴力。更好的解决方案是使用 TypeScript 网站或 DefinitelyTyped 项目提供的类型声明文件搜索功能，也许能够找到更高质量的第三方库的 TypeScript 类型声明文件。

![1](../assets/article/9-0.webp)

DefinelyTyped 项目是一个开源项目，它维护许多包的类型声明文件。

找到后，您可以通过 npm 安装具有所需类型声明文件的模块。如果您已阅读有关使用 TypeScript 和 Google 地图的指南。可以找到 Google Maps 对应的类型声明文件。之后，您可以使用 npm 来安装它：

```typescript
npm i -D @types/google.maps
```

对于 npm 包“foo”，它的类型将位于“@types/foo”。例如，更熟悉的 jquery 库的包名称是@types/jquery。

接下来，我们将介绍“declare”的其他用法。当你打开 Vite 项目中的 client.d.ts 声明文件时，你会看到很多声明该模块的代码。

![1](../assets/article/9-0.webp)

在上面的代码中，我们声明了 css、jpg 和 ttf 模块。为什么需要声明这些模块？因为如果不声明它们，TypeScript 编译器将无法识别这些模块，并会提示相应的错误消息。

![1](../assets/article/9-0.webp)

在声明模块时，为了避免将每个资源都声明为对应的模块，TypeScript 2.0 开始支持通配符 (\*) 形式来声明模块的名称。

![1](../assets/article/9-0.webp)

此外，TypeScript 允许您通过声明模块语法来扩展现有模块中定义的类型。例如，如果您想将 $axios 属性添加到每个 Vue 组件实例，您可以这样做：

```typescript
import { AxiosInstance } from "axios";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
```

然后，使用 config 对象的 globalProperties 属性，您可以有效地将 $axiosproperty 添加到每个组件实例：

```typescript
import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";
const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.mount("#app");
```

最后，在组件中，可以通过组件内部实例的 proxy.$axios 属性来访问 axios 对象：

```typescript
import { getCurrentInstance, ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
proxy!.$axios
  .get("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.data)
  .then((json) => console.log(json));
```

读完这篇文章，相信您已经了解了 declare 关键字的作用以及一些常见的应用场景。如果你想学习 TypeScript，那么不要错过掌握 TypeScript 系列。
