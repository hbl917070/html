// ==UserScript==
// @name        優化動畫瘋彈幕
// @namespace   優化動畫瘋彈幕
// @include     https://ani.gamer.com.tw/animeVideo.php?sn=*
// @version     1.0.0
// @grant       none
// ==/UserScript==


/**
*   
*   說明：將動畫瘋的彈幕改由canvas繪製，藉此降低記憶體與CPU的使用量
*   
*   作者：hbl917070（深海異音）
*   小屋：https://home.gamer.com.tw/homeindex.php?owner=hbl917070
*   mail：hbl917070@gmail.com
*   
*   版本：1.0.0
*   最後編輯：2017/07/14
*   
*/


//---------------------------------

//這裡的設定可以修改

var s_文字字體 = "微軟正黑體";
var int_刷新頻率 = 30;//預設每30毫秒刷新一次彈幕界面


//----------------------------------

var obj_can;
var ctx;

fun_creat_canvas();



///
///產生canvas
///
function fun_creat_canvas() {

    let vjs = document.getElementsByClassName("vjs-danmu")[0];

    //直到物件存在才開始執行
    if (vjs === undefined) {
        setTimeout(function () {
            fun_creat_canvas();
        }, 1000);
        return;
    }

    //產生canvas
    obj_can = document.createElement("canvas");
    obj_can.width = vjs.clientWidth;
    obj_can.height = vjs.clientHeight;
    ctx = obj_can.getContext("2d");//取得繪圖物件
    //obj_can.style.backgroundColor = "rgba(0,0,0,0.4)";
    obj_can.style.pointerEvents = "none";//禁止點擊
    obj_can.style.position = "absolute";//設定位置
    obj_can.style.left = "0px";
    obj_can.style.top = "0px";

    //產生style（避免原本的彈幕消耗記憶體，所以隱藏起來
    let obj_style = document.createElement("style");
    obj_style.innerHTML = ".cmt{position:static !important; display:inline!important; opacity:0!important;} .cmt_none{display:none!important;} ";

    //插入
    var ani_video = document.getElementById("ani_video");
    //var ani_video = document.getElementsByClassName("player")[0];
    ani_video.appendChild(obj_can);
    ani_video.appendChild(obj_style);

    fun_div_to_canvas();
    fun_auto_size();
}




///
///定時調整canvas的大小與透明度
///
function fun_auto_size() {

    let vjs = document.getElementsByClassName("vjs-danmu")[0];

    if (obj_can.width != vjs.clientWidth) {
        obj_can.width = vjs.clientWidth;
        obj_can.height = vjs.clientHeight;
    }

    //根據動畫瘋本身的設定來調整透明度
    if (document.getElementById("DanmuOpacityNum") === undefined) {
        obj_can.style.opacity = 1;
    } else {
        obj_can.style.opacity = Number(document.getElementById("DanmuOpacityNum").innerHTML.replace("%", "")) / 100;
    }

    setTimeout(function () {//1500毫秒後重新執行
        fun_auto_size();
    }, 1500);
}





///
///將DIV彈幕轉成canvas來繪製
///
function fun_div_to_canvas() {


    ctx.clearRect(0, 0, obj_can.width, obj_can.height);//清除上次的繪圖結果

    var ar_tt = document.getElementsByClassName("cmt");//取得所有彈幕

    for (var i = 0; i < ar_tt.length; i++) {
        //document.getElementById().getAttribute("style")

        ar_tt[i].className = "cmt_none cmt";//隱藏

        if (ar_tt[i].getAttribute("style").indexOf("opacity") > -1) {//如果opacity是0，就是在動畫瘋屬於隱藏的彈幕
            if (Number(ar_tt[i].style.opacity) === 0)
                continue;
        }

        var cmt_t = ar_tt[i].innerHTML.replace("&gt;", ">").replace("&lt;", "<");//文字內容
        var cmt_color = ar_tt[i].style.color;//文字顏色      
        var cmt_fontSize = Number(ar_tt[i].style.fontSize.replace("px", ""));//文字size
        var cmt_x = Number(ar_tt[i].style.left.replace("px", ""));//left

        var cmt_y = 0;//top
        if (ar_tt[i].style.bottom.length > 1) {//【朝下】
            var cmt_bottom = Number(ar_tt[i].style.bottom.replace("px", ""));
            cmt_y = obj_can.height - cmt_bottom - 5;
        } else {//【滾動】或【靠上】
            cmt_y = Number(ar_tt[i].style.top.replace("px", "")) + cmt_fontSize;
        }

        ctx.font = "bold " + cmt_fontSize + "px " + s_文字字體;
    
        ctx.fillStyle = "#000000";//先繪製陰影
        ctx.fillText(cmt_t, cmt_x + 1, cmt_y + 1);

        ctx.fillStyle = cmt_color;//繪製文字
        ctx.fillText(cmt_t, cmt_x, cmt_y);

    }



    setTimeout(function () {//30毫秒後重新執行
        fun_div_to_canvas();
    }, int_刷新頻率);

}
