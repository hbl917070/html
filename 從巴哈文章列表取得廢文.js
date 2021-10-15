// 使用方法：
// 1、開啟到巴哈文章列表的網頁
// 2、按「F12」開啟瀏覽器的DevTools，然後貼上語法執行

/**
 * 用巴哈的文章列表標題，組合出廢文
 * @param {number} maxLen 文字上限字數，預設100字
 * @returns {{ar:string[], txt: string}} ar=句子陣列、txt=廢文
 */
function getFeiwen(maxLen = 100) {

    var arTxt = [];
    var arDom = document.querySelectorAll(".b-list__row");//每一筆文章

    if (arDom.length === 0) { return { ar: [], txt: "取得資料失敗" }; }

    //隨機排序
    function shuffleArray(inputArray) {
        inputArray.sort(() => Math.random() - 0.5);
    }

    for (let i = 0; i < arDom.length; i++) {

        let dom = arDom[i];

        //排除置頂文章
        if (dom.classList.contains("b-list__row--sticky")) { continue; }

        //排除廣告
        if (dom.querySelector(".b-list__main__title") === null) { continue; }

        //排除頁數大於20的文章(避免大樓)
        if (dom.querySelector(".b-list__page") !== null) {
            if (Math.floor(dom.querySelector(".b-list__page").innerHTML) > 20) { continue; }
        }

        let title = dom.querySelector(".b-list__main__title").innerHTML;//取得文章標題

        title = title.replace(/【.*】/g, "");//移除屬性框

        title = title.replace(/[　]/g, "\n");//重新切割成句子
        title = title.replace(/[ ]/g, "\n");
        title = title.replace(/[，]/g, "\n");
        title = title.replace(/[,]/g, "\n");
        title = title.replace(/[？]/g, "\n");
        title = title.replace(/[?]/g, "\n");
        title = title.replace(/[！]/g, "\n");
        title = title.replace(/[!]/g, "\n");
        title = title.replace(/[（]/g, "\n");
        title = title.replace(/[(]/g, "\n");
        title = title.replace(/[）]/g, "\n");
        title = title.replace(/[)]/g, "\n");
        title = title.replace(/[「]/g, "\n");
        title = title.replace(/[」]/g, "\n");
        title = title.replace(/[：]/g, "\n");
        title = title.replace(/[:]/g, "\n");
        title = title.replace(/[／]/g, "\n");

        var arT = title.split("\n");

        for (let j = 0; j < arT.length; j++) {
            let txt = arT[j];

            //去除英文數字前後空白後，大於5個字才通過
            if (txt.trim().replace(/[0-9a-z.=]/gi, "").length < 5) { continue; }

            //排除包含這些文字的句子
            if (txt.indexOf("串") != -1 || txt.indexOf("大樓") != -1) { continue; }

            if (arTxt.indexOf(txt) == -1) {//不存在才加入
                arTxt.push(txt);
            }
        }

    }

    var arTxtNew = Object.assign([], arTxt);//複製到新陣列，避免順序改變
    shuffleArray(arTxtNew);//打亂

    let output = "";
    for (let i = 0; i < arTxtNew.length; i++) {
        output += arTxtNew[i];

        //超過字數上限就結束
        if (output.length > maxLen) { break; }

        //隨機在結尾加上「，」或「換行」
        if (Math.random() > 0.3) {
            output += "，";
        } else {
            output += "\n";
        }
    }

    return { ar: arTxt, txt: output };
}

//產生10筆
for (let i = 0; i < 10; i++) {
    console.log(getFeiwen().txt);
    console.log("---------");
}
