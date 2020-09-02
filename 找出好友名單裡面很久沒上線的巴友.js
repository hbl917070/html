
/**

作者：
hbl917070(深海異音)

用途：
找出好友名單裡面很久沒上線的巴友(也能用於待確認、追蹤、追蹤者、黑名單)

使用方法：
1、進入 https://home.gamer.com.tw/friendList.php?user=自己的帳號
2、在瀏覽器按下「F12」開啟「DevTools(開發者工具)」
3、切換到「Console(主控台)」
4、把這下面程式碼複製貼入到 Console，然後按下 Enter 執行

*/

(async () => {

    var ar_img = document.querySelectorAll('.gamercard')//取得每一張大頭貼

    for (let i = 0; i < ar_img.length; i++) {
        let item = ar_img[i];
        await getTime(
            item.parentNode.href, //小屋網址
            item.parentNode.parentNode.parentNode //list 的 item
        )
        await sleep(300)
    }
})()



/**
 * 等待
 * @param ms 毫秒
 */
async function sleep(ms) {
    await new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();//繼續往下執行
        }, ms);
    })
}

/**
 * 取得最後上線日期，並且插入到列表當中
 * @param url 小屋網址
 * @param dom list 的 item 元素
 */
async function getTime(url, dom) {

    await fetch(url, {})
        .then((response) => {
            return response.text();
        }).then((html) => {
            //console.log(html);
            try {

                //小屋已查封
                if (html.indexOf('因違反站規，此勇者小屋已遭查封') > 0) {
                    let s3 = `<div style="position:absolute; left:220px; top:20px">小屋已遭查封</div>`
                    dom.innerHTML += s3
                    return
                }

                //最後上站日期
                let s1 = html.indexOf('上站日期：')
                if (s1 > 0) {
                    let s2 = html.substr(s1 + 5, 10)
                    let s3 = `<div style="position:absolute; left:220px; top:20px">${s2}</div>`
                    dom.innerHTML += s3
                    return
                }

                //最後一筆創作日期 (如果有設定「頂置文章」就會會不準)
                let t1 = html.indexOf('│贊助：')
                if (t1 > 0) {
                    let s2 = html.substr(t1 - 19, 10)
                    let s3 = `<div style="position:absolute; left:220px; top:20px">${s2}(最後創作)</div>`
                    dom.innerHTML += s3
                    return
                }

                //都抓不到
                let s3 = `<div style="position:absolute; left:220px; top:20px">？？？</div>`
                dom.innerHTML += s3


            } catch (e) {
                let s3 = `<div style="position:absolute; left:220px; top:20px">？？？</div>`
                dom.innerHTML += s3
            }
        }).catch((err) => {
            let s3 = `<div style="position:absolute; left:220px; top:20px">Error</div>`
            dom.innerHTML += s3
            console.log('錯誤:', err);
        });

}

