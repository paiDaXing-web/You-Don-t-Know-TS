// 期望是一个 string 类型
type HelloWorld = any;
//你需要使得如下这行不会抛出异常
import type { Equal, Expect, NotAny } from "@type-challenges/utils";

type cases = [Expect<NotAny<HelloWorld>>, Expect<Equal<HelloWorld, string>>];
