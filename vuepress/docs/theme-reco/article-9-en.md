<!--
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-08-16 17:22:20
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-21 17:00:44
 * @FilePath: /You-Don-t-Know-TS/vuepress/docs/theme-reco/article-1.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# The Purpose of ‘declare’ Keyword in TypeScript

A detailed introduction to the role of TypeScript ‘declare’, so you are not a stranger to `*.d.ts` files.

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

When you open the `*.d.ts` declaration file in your TypeScript project, you may see `declare`. Do you know what `declare` does? If you don’t know, after reading this article, maybe you will.

In TypeScript projects, you may import third-party JS-SDK in the form of script tags, such as importing the JS-SDK of the Google Maps platform.

```typescript
<script
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly"
  defer
></script>
```

After initialization, you will call the API exposed by the JS-SDK in a TypeScript file.

![1](../assets/article/9-1.webp)

Although you are using the API provided by JS-SDK according to the Google Maps development documentation, the TypeScript compiler will still prompt the corresponding error message for the above code. This is because the TypeScript compiler does not recognize the global variable google.

So how to solve this problem? The answer is to use the declare keyword to declare the google global variable so that the TypeScript compiler can recognize the global variable.

declare var google: any;

![1](../assets/article/9-2.webp)

Seeing this, do you get confused? Why can you use global variables like JSON, Math, or Objectin TypeScript projects normally? This is because TypeScript does the declarations for us internally, and the global variables mentioned earlier are declared in the lib.es5.d.ts declaration file.

```typescript
// typescript/lib/lib.es5.d.ts
declare var JSON: JSON;
declare var Math: Math;
declare var Object: ObjectConstructor;
```

In fact, in addition to declaring global variables, the declare keyword can also be used to declare global functions, global classes, or global enum types. Functions such as eval, isNaN, encodeURI, and parseIntthat you may have used at work are also declared in the lib.es5.d.ts declaration file:

```typescript
declare function eval(x: string): any;
declare function isNaN(number: number): boolean;
declare function encodeURI(uri: string): string;
declare function parseInt(string: string, radix?: number): number;
```

It should be noted that when declaring a global function, we do not include the specific implementation of the function. With the declaration file, the TypeScript compiler can recognize the above global JavaScript functions.

The solution to the previous problem of not finding the name “google” is relatively violent. A better solution is to use the type declaration file search function provided on the TypeScript website or the DefinitelyTyped project, and you may be able to find a TypeScript type declaration file for a higher-quality third-party library.

![1](../assets/article/9-0.webp)

The DefinitelyTyped project is an open-source project that maintains type declaration files for many packages.

Once found, you can install the module with the required type declaration file via npm. If you have read the guide on using TypeScript and Google Maps. You can find the type declaration file corresponding to Google Maps. After that, you can use npm to install it:

```typescript
npm i -D @types/google.maps
```

For an npm package “foo”, typings for it will be at “@types/foo”. For example, the more familiar jquery library has the package name — @types/jquery.

Next, we’ll cover other uses of ‘declare’. When you open the client.d.ts declaration file in the Vite project, you will see a lot of code that declares the module.

![1](../assets/article/9-0.webp)

In the above code, we have declared the css, jpgand ttfmodules. Why do you need to declare these modules? Because if you don’t declare them, the TypeScript compiler will not recognize these modules and will prompt the corresponding error message.

![1](../assets/article/9-0.webp)

When declaring modules, in order to avoid declaring each resource with its corresponding module, TypeScript 2.0 starts to support the wildcard (\*) form to declare the name of the module.

![1](../assets/article/9-0.webp)

Additionally, TypeScript allows you to extend types defined in existing modules through the declare module syntax. For example, if you wanted to add the $axios property to every Vue component instance, you could do this:

```typescript
import { AxiosInstance } from "axios";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
```

Then, using the globalProperties property of the config object, you can efficiently add the $axiosproperty to each component instance:

```typescript
import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";
const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.mount("#app");
```

Finally, in the component, you can access the axios object through the proxy.$axios property of the component’s internal instance:

```typescript
import { getCurrentInstance, ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
proxy!.$axios
  .get("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.data)
  .then((json) => console.log(json));
```

After reading this article, I believe you already understand the role of declare keyword and some common application scenarios. If you want to learn TypeScript, then don’t miss the Mastering TypeScript series.
