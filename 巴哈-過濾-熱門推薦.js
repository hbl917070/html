// ==UserScript==
// @name        過濾-熱門推薦
// @namespace   過濾-熱門推薦
// @include     https://forum.gamer.com.tw/*
// @version     1.01
// @grant       none
// ==/UserScript==


/* 
 * 
 * 說明：下面【本板熱門推薦】出現指定關鍵字的話，就過濾圖片
 * 作者：hbl917070（深海異音）
 * 最後修改日期：2017-6-27
 * 
 */



//要排除的關鍵字（包含這些文字的文章及就看不到圖片
var ar_out = new Array("寶", "寳", "宝", "polla", "月經", "戰象", "狂猴", "fbi", "吉娃", "胡屠戶");

//被過濾的圖片會被替換成這個網址
var s_img_url = "data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTA5Ljk1IDEwOS45NSI+PHN0eWxlPi5cMzcgOWMwYmEwY3tmaWxsOm5vbmU7c3Ryb2tlOiNlNjAwMTI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjRweDt9PC9zdHlsZT48bGluZSBjbGFzcz0iNzljMGJhMGMiIHgxPSIxLjQxIiB5MT0iMS40MSIgeDI9IjEwOC41NCIgeTI9IjEwOC41NCIvPjxsaW5lIGNsYXNzPSI3OWMwYmEwYyIgeDE9IjEuNDEiIHkxPSIxMDguNTQiIHgyPSIxMDguNTQiIHkyPSIxLjQxIi8+PC9zdmc+";


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
    var obj_fm8 = document.getElementsByClassName("FM-blist8")[0];
    if (obj_fm8 === undefined) { return; }
    var ar_obj = obj_fm8.getElementsByTagName("p");//取得【本板熱門推薦】
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