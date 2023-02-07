var fs = require("fs");
var path = require("path");
// console.log(path.resolve(__dirname, "/example"));
fs.readdir(
  path.join(__dirname, "./vuepress/docs/challenge"),
  function (err, files) {
    if (err) {
      return console.log("目录不存在");
    }
    files.forEach((item) => {
      const Arr = item.replaceAll(".", "-");
      const newTitle = insertStr(
        Rep(Arr, Arr.length - 3, "."),
        getNum(Arr) - 1,
        "实现"
      );
      fs.readFile(
        path.join(__dirname, "./.github/ISSUE_TEMPLATE/" + newTitle),
        function (err, fileitem) {
          if (err) {
            const content =
              `---
name: ${item}
about: ${newTitle}
title: ${newTitle}
labels: answer
assignees: paiDaXing-web
            
---
            
<!--
小贴士：
            
🎉 恭喜你成功解决了挑战，很高兴看到你愿意分享你的答案！
            
由于用户数量的增加，Issue 池可能会很快被答案填满。为了保证 Issue 讨论的效率，在提交 Issue 前，请利用搜索查看是否有其他人分享过类似的档案。
            
你可以为其点赞，或者在 Issue 下追加你的想法和评论。如果您认为自己有不同的解法，欢迎新开 Issue 进行讨论并分享你的解题思路！
            
谢谢！
-->
            
` +
              "```ts" +
              `
//你的答案

` +
              "```";
            console.log(content);
            fs.writeFile(
              path.join(__dirname, "./.github/ISSUE_TEMPLATE/" + newTitle),
              content,
              "utf8",
              function (error) {
                if (error) {
                  console.log(error);
                  return false;
                }
                console.log("写入成功");
              }
            );
          }
          //   console.log(fileitem?.toString());
          else {
            fs.readFile(
              path.join(__dirname, "./.github/ISSUE_TEMPLATE/" + newTitle),
              (error, data) => {
                if (error) {
                  throw new Error(error);
                } else {
                  let content = data.toString();

                  fs.writeFile(
                    path.join(
                      __dirname,
                      "./.github/ISSUE_TEMPLATE/" + newTitle
                    ),
                    content,
                    "utf8",
                    function (error) {
                      if (error) {
                        console.log(error);
                        return false;
                      }
                      console.log("写入成功");
                    }
                  );
                }
              }
            );
          }
        }
      );
    });
  }
);

function Rep(str, index, subStr) {
  return setCharAt(str, index, subStr);
}
function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}
function insertStr(str, index, insertStr) {
  const ary = str.split(""); // 转化为数组
  ary.splice(index, 0, insertStr); // 使用数组方法插入字符串
  return ary.join(""); // 拼接成字符串后输出
}
function getNum(str) {
  var pattern = new RegExp("[a-z]+");
  var num = str.indexOf(str.match(pattern));

  return num;
}
