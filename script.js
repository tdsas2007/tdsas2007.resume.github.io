// 所有導覽列中的連結nav-link
// document.querySelectorAll('CSS選擇器')
const navLinkList = document.querySelectorAll(".navbar a.nav-link"),
  // 導覽列
  navbar = document.getElementById("navbar"),
  // 滑動資訊報告元件
  scrollReport = document.getElementById("scrollReport");

// TODO: 建立章節資訊查詢表
/*
 * {
 *    section1: {section: sectionDOM, navLink: navLinkDOM},
 *    section2: {...}, ...
 * }
 */
// 查詢表
const nav = {};
// 把navLinkList裡面的資料透過迴圈逐一取出
navLinkList.forEach(function (link) {
  // 迴圈在每圈會執行的程序
  // console.log("超連結:", link);
  // console.dir(link);
  // 取得sectionID
  // dataset.target => data-target="xxx"
  // dataset.product => data-product="ooo"
  const sid = link.dataset.target;
  // nav["section4"] = {}
  nav[sid] = {
    // 超連結
    navLink: link,
    // 章節
    section: document.getElementById(sid),
  };
});

console.log("查詢表:", nav);

// 綁定視窗(window)的滾動事件(scroll)
// https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
window.addEventListener("scroll", function () {
  // TODO: 取得視窗的直向滑動偵測點(scrollY)
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
  // 取得視窗的滑動座標 + 導覽列高度 => 作為偵測滾動座標的依據
  const y = window.scrollY + navbar.offsetHeight;
  console.log("滑動座標:", y);
  // 把目前的滑動座標呈現到scrollReport元素上
  //scrollReport.innerText = `滑動座標: ${y}`;
  // 透過迴圈把nav所有的屬性一次取出
  for (let sid in nav) {
    // 取得超連結與章節的DOM
    const navLink = nav[sid].navLink;
    const section = nav[sid].section;
    // 取得章節頂邊與底邊座標
    const top = section.offsetTop,
      bottom = section.offsetTop + section.offsetHeight;
    // console.log(top, bottom);
    // 判定目前滑動座標(y)是否介於top, bottom之間
    if (y > top && y < bottom) {
      //const positionReport = "現在我在" + sid;
      //scrollReport.innerText += positionReport;
      // 目前對應要強調的超連結加上.text-warning
      navLink.classList.add("text-warning");
      section.classList.add("active");
    } else {
      // 如果目前滑動座標不在此章節內
      navLink.classList.remove("text-warning");
      section.classList.remove("active");
    }
  }
  // TODO: 取得每個章節的所在位置頂邊座標(offsetTop)、底邊座標(offsetTop + offsetHeight)
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
});

var title = document.querySelectorAll(".animationtitle");

var str = title[0].innerHTML;

var content = "";

title[0].innerHTML = str
  .split("")
  .map((s, i) => {
    return `<span class="a" style="animation-delay: ${i * 0.9}s">${s}</span>`;
  })
  .join("");