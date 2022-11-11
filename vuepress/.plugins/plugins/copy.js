export default () => {
  function addCopy(e) {
    let copyTxt = "";
    e.preventDefault(); // 取消默认的复制事件
    copyTxt = window.getSelection(0).toString();
    copyTxt = `${copyTxt}\n作者：马学明\n原文：${window.location.href}\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`;
    // 将信息写入粘贴板
    const clipboardData = e.clipboardData || window.clipboardData;
    clipboardData.setData("text", copyTxt);
  }
  document.addEventListener("cut", (e) => {
    addCopy(e);
  });
  document.addEventListener("copy", (e) => {
    addCopy(e);
  });
};
