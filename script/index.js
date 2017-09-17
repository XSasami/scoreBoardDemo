  // ------------------拖动计分板------------------
  // 获取相关DOM元素
  var scB = document.querySelector(".scoreBoard"); // 计分板
  var addG = document.querySelector(".addGroup"); // 添加分组按钮
  var scB_close = document.querySelector(".scoreBoard >.content >.close");

  // 声明全局对象
  var globalVar = {
    flag: null,
    mouseX: null,
    mouseY: null,
    moveX: null,
    moveY: null
  };
  // 注册事件
  scB.addEventListener("mousedown", catchScb);
  document.addEventListener("mousemove", moveScb);
  document.addEventListener("mouseup", reset);
  scB_close.addEventListener("click", close);
  // 获取目标元素
  function catchScb(e) {
    if (e.target) {
      globalVar.flag = true;
      // 获取鼠标在计分板内的位置
      globalVar.mouseX = e.pageX - scB.offsetLeft;
      globalVar.mouseY = e.pageY - scB.offsetTop;
    }
  }
  // 移动计分板
  function moveScb(e) {
    if (globalVar.flag) {
      e.preventDefault();
      // 计算计分板移动的距离
      globalVar.moveX = e.pageX - globalVar.mouseX;
      globalVar.moveY = e.pageY - globalVar.mouseY;
      // 赋值
      scB.style.left = globalVar.moveX + "px";
      scB.style.top = globalVar.moveY + "px";
    }
  }
  // 初始化变量
  function reset() {
    for (var k in globalVar) {
      globalVar[k] = null;
    }
  }

  // ------------------添加分组------------------
  // 获取相关DOM元素
  var mask = document.querySelector(".mask"); // 遮罩层
  var mask_close = document.querySelector(".mask >.grouping >.close"); // 遮罩层关闭按钮
  var group_add = document.querySelector(".set >.add"); // 增加分组按钮
  var group_sub = document.querySelector(".set >.sub"); // 减少分组按钮
  var count_group_show = document.querySelector(".set >.count"); // 组数显示器

  var count_group = parseInt(count_group_show.innerHTML); // 获取组数

  // 注册事件
  addG.addEventListener("click", grouping);
  mask_close.addEventListener("click", close);
  group_add.addEventListener("click", addGroup);
  group_sub.addEventListener("click", subGroup);

  // 增加组数
  function addGroup() {
    if (count_group >= 15) {
      this.style.color = "gray";
      return;
    } else {
      group_sub.style.color = "#40A58C";
    }
    count_group++;
    count_group_show.innerHTML = count_group;
  }
  // 删减组数
  function subGroup() {
    if (count_group <= 1) {
      this.style.color = "gray";
      return;
    } else {
      group_add.style.color = "#40A58C";
    }
    count_group--;
    count_group_show.innerHTML = count_group;
  }
  // 显示遮罩层进行分组操作
  function grouping() {
    mask.style.display = "block";
  }
  // 关闭窗口
  function close() {
    this.parentNode.parentNode.style.display = "none";
  }

  // ------------------生成分组------------------
  // 获取相关DOM元素
  var begin_grouping = document.querySelector(".grouping >.content >.begin"); // 开始分组按钮
  var groups = document.querySelector(".groups"); // 分组容器

  // 注册事件
  begin_grouping.addEventListener("click", beginGrouping);
  // 开始分组
  function beginGrouping() {
    createGroup(count_group);
    mask.style.display = "none";
    addG.style.display = "none";
    groups.style.display = "block";
  }

  // 生成分组
  function createGroup(num) {
    if (num <= 1) {
      return;
    } else if (num > 5) {
      scB.children[0].style.width = num * 100 + "px";
    }
    var groupNum = [
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
      "十",
      "十一",
      "十二",
      "十三",
      "十四",
      "十五"
    ];
    var group = groups.children[0];
    var newGroup = null;
    for (var i = 1; i < num; i++) {
      newGroup = group.cloneNode(true);
      newGroup.children[0].innerHTML = "第" + groupNum[i] + "组";
      groups.appendChild(newGroup);
    }
  }

  // ------------------得分------------------

  // 加分
  function addScore(e) {
    var tarEle = e.target.previousSibling.previousSibling;
    var flagContain = tarEle.previousSibling.previousSibling;
    var temp = parseInt(tarEle.innerHTML);
    temp++;
    tarEle.innerHTML = temp;
    flagContain.appendChild(document.createElement('span'));
  }
  // 扣分
  function subScore(e) {
    var tarEle = e.target.nextSibling.nextSibling.nextSibling.nextSibling;
    var flagContain = e.target.nextSibling.nextSibling;
    var flags = flagContain.children;
    var temp = parseInt(tarEle.innerHTML);
    if(temp == 0){
      return
    }
    temp--;
    tarEle.innerHTML = temp;
    flagContain.removeChild(flags[flags.length - 1]);
  }