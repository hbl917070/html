// ==UserScript==
// @name        過濾-熱門推薦
// @namespace   過濾-熱門推薦
// @include     https://forum.gamer.com.tw/B.php?bsn=60076*
// @version     1
// @grant       none
// ==/UserScript==


/*
* 
* 說明：下面【本板熱門推薦】出現指定關鍵字的話，就過濾圖片
* 作者：hbl917070（深海異音）
* 最後修改日期：2017-626
*/



//要排除的關鍵字（包含這些文字的文章及就看不到圖片
var ar_out = new Array("寳", "宝", "polla", "月經", "戰象", "狂猴", "fbi", "吉娃", "胡屠戶");

var ar_obj = document.getElementsByClassName("FM-blist8")[0].getElementsByTagName("p");//取得【本板熱門推薦】

for (var i = 0; i < ar_obj.length; i++) {
    var s = ar_obj[i].textContent.toLowerCase();
    for (var j = 0; j < ar_out.length; j++) {
        if (s.indexOf(ar_out[j]) > -1) {
            //替換圖片
            ar_obj[i].getElementsByTagName("img")[0].src = "data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTA5Ljk1IDEwOS45NSI+PHN0eWxlPi5cMzcgOWMwYmEwY3tmaWxsOm5vbmU7c3Ryb2tlOiNlNjAwMTI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjRweDt9PC9zdHlsZT48bGluZSBjbGFzcz0iNzljMGJhMGMiIHgxPSIxLjQxIiB5MT0iMS40MSIgeDI9IjEwOC41NCIgeTI9IjEwOC41NCIvPjxsaW5lIGNsYXNzPSI3OWMwYmEwYyIgeDE9IjEuNDEiIHkxPSIxMDguNTQiIHgyPSIxMDguNTQiIHkyPSIxLjQxIi8+PC9zdmc+";
            break;
        }
    }
}
