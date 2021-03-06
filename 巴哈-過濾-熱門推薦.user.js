﻿// ==UserScript==
// @name        過濾-熱門推薦
// @namespace   過濾-熱門推薦
// @include     https://forum.gamer.com.tw/*
// @version     1.03
// @grant       none
// ==/UserScript==


/* 
 * 
 * 說明：下面【本板熱門推薦】出現指定關鍵字的話，就過濾圖片
 * 注意：僅適用於新版界面
 * 作者：hbl917070（深海異音）
 * 最後修改日期：2017-08-14
 * 
 */



//要排除的關鍵字（包含這些文字的文章及就看不到圖片
var ar_out = new Array("寶", "寳", "宝", "polla", "月經", "戰象","瓦瓦","聖潔石",
                       "狂猴", "fbi", "吉娃", "胡屠戶","知名瑜伽老","台女必學！",
                      "冰冰","夜深了 該來點好康犒賞大家","Lolita, light of",
                      "7年級生歲月中","【女優x吃冰淇淋","感嘆現代年輕族群不注重",
                      "夏日風情 素人正妹戴","夏日高溫難耐？","等一個人咖啡",
                      "灣新出道歌手","台灣版 瀧澤蘿拉","夏日炎炎腸病毒疫",
                      "岡山台灣獼猴猖狂","商場遇國際巨星","聖結石","bang",
                      "splay米妮","少女初試身手","聖石","大家快來看看這是",
                      "你們男生看到這","超高校級的南部","聖粉","知名網紅尿急求助",
                      "一人一個部位讓","(po","青春動感美少女","左邊這個貓我不要了",
                      "原po拉不下臉","台灣版的Twice","我的原則很簡單",
                      "中隔壁班資料科女同學","知名女模毫無明星架子","媽媽的原味腋下");

//被過濾的圖片會被替換成這個網址
var s_img_url = "data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTA5Ljk1IDEwOS45NSI+PHN0eWxlPi5cMzcgOWMwYmEwY3tmaWxsOm5vbmU7c3Ryb2tlOiNlNjAwMTI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjRweDt9PC9zdHlsZT48bGluZSBjbGFzcz0iNzljMGJhMGMiIHgxPSIxLjQxIiB5MT0iMS40MSIgeDI9IjEwOC41NCIgeTI9IjEwOC41NCIvPjxsaW5lIGNsYXNzPSI3OWMwYmEwYyIgeDE9IjEuNDEiIHkxPSIxMDguNTQiIHgyPSIxMDguNTQiIHkyPSIxLjQxIi8+PC9zdmc+";


//全部轉換成小寫在進行判斷
for(var i = 0 ; i < ar_out.length ; i++){
   ar_out[i] = ar_out[i].toLowerCase()    
}


try {
    fun_下面的熱門推薦();
} catch (e) { }

try {
    fun_右邊的熱門推薦();
} catch (e) { }


///
///
///
function fun_下面的熱門推薦() {
    var obj_fm8 = document.getElementsByClassName("popular")[0];
    if (obj_fm8 === undefined) { return; }
    var ar_obj = obj_fm8.getElementsByTagName("div");//取得【本板熱門推薦】
    if (ar_obj.length === 0) { return; }

    for (var i = 0; i < ar_obj.length; i++) {
        var s = ar_obj[i].textContent.toLowerCase();
        for (var j = 0; j < ar_out.length; j++) {
            if (s.indexOf(ar_out[j]) > -1) {
                var obj_img = ar_obj[i].getElementsByTagName("img")[0];
                if (obj_img != undefined) {
                    obj_img.src = s_img_url; //替換圖片
                } break;
            }
        }
    }

}


///
///
///
function fun_右邊的熱門推薦() {

    var obj_fnm7 = document.getElementsByClassName("FM-rbox7")[0];
    if (obj_fnm7 === undefined) { return; }
    var ar_obj = obj_fnm7.getElementsByClassName("FM-rbox7A");//取得【本板熱門推薦】
    if (ar_obj.length === 0) { return; }

    for (var i = 0; i < ar_obj.length; i++) {
        var s = ar_obj[i].textContent.toLowerCase();
        for (var j = 0; j < ar_out.length; j++) {
            if (s.indexOf(ar_out[j]) > -1) {
                var obj_img = ar_obj[i].getElementsByTagName("img")[0];
                if (obj_img != undefined) {
                    obj_img.src = s_img_url; //替換圖片
                }
                break;
            }
        }
    }

}