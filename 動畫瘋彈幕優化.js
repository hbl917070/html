// ==UserScript==
// @name        �u�ưʵe�Ƽu��
// @namespace   �u�ưʵe�Ƽu��
// @include     https://ani.gamer.com.tw/animeVideo.php?sn=*
// @version     1.1.5
// @grant       none
// @description         �@�̡Ghbl91707�]�`�������^
// @description:zh-tw   �@�̡Ghbl91707�]�`�������^
// ==/UserScript==


/**
*   
*   �����G1.�N�ʵe�ƪ��u�����canvasø�s�A�Ǧ����C�O����PCPU���ϥζq
*         2.�i�]�w²�����u���L�o����
*   
*   �@�̡Ghbl917070�]�`�������^
*   �p�ΡGhttps://home.gamer.com.tw/homeindex.php?owner=hbl917070
*   mail�Ghbl917070@gmail.com
*   
*   �����G1.1.5
*   �̫�s��G2017/07/17
*   
*   1.1.3�G�ץ��L�o�u���e�|�{�{��BUG
*   1.1.4�G�ץ��i<br>�j�S���ഫ��BUG
*   1.1.5�G�y�L�u��
*   
*/


//�������o�̪��]�w�i�H�ק����

var int_��s�W�v = 30; //�w�]�C30�@���s�@���u���ɭ��]�۷��1��33�V

var int_�u�����v�{�� = 4; //0~4�C0=�����S���v�B4=���v���}�]�i����Ӥ@�I�ICPU�B��^

var s_��r�r�� = "�L�n������"; //��r���r��

var bool_�L�o��@�Ÿ����u�� = 1; //1=�ҰʡB0=�����C�Ҧp�i%%%%%�j�B�i�I�I�I�j�B�i�N�N�N�j�N�|�Q�L�o

var int_�L�o�L�u���u�� = 1; //�i�r�ơj�p�󵥩� �o�ӼƦr���u���N�|�Q�L�o�C���Q�Ϊ��ܴN�令�i0�j

var ar_filter = new Array(); //�L�o�X�{�o�Ǥ�r���u���A�n�s�W�N�b�U���h�@��iar_filter.push("�A�n����r");�j
ar_filter.push("ñ");
ar_filter.push("�@�z"); //�ҡG�i�H���n����@�z��
ar_filter.push("�ڳz");
ar_filter.push("�q"); //�ҡG�q���@�U***�|��
ar_filter.push("���|"); //�ҡG�i�H���|***��
ar_filter.push("�¸t");
ar_filter.push("�C��");
ar_filter.push("����");
ar_filter.push("��");
ar_filter.push("�i��");
ar_filter.push("�u��"); //�ҡG���Q�u���צ�F
ar_filter.push("�d��");
ar_filter.push("GY"); //�ҡG���n�ݴN���n�ݡA���n����GGYY
ar_filter.push("���n��");
ar_filter.push("���Q��");
ar_filter.push("�N���@"); //�ҡG�b�o�̺L�U�h�N���@�F
ar_filter.push("��");
ar_filter.push("�p");
ar_filter.push("�ѱC");
ar_filter.push("�ڱC");
ar_filter.push("�F�F");
ar_filter.push("����");
ar_filter.push("���");
ar_filter.push("�u����ı�o");
ar_filter.push("�e��");
ar_filter.push("����");


//�������o�̪��]�w�i�H�ק����



//----------------------------------

var obj_can;
var ctx;

fun_creat_canvas();


///
///�P�_�r��O�_�C�@�Ӧr���ۦP
///
function fun_allSame(str) {
    if (str.length <= 1) {
        return false;
    }
    let ar_str = str.split("");//���Φr��
    for (let i = 1; i < ar_str.length; i++) {
        if (ar_str[i] != ar_str[0]) {
            return false;
        }
    }
    return true;
}


///
///����canvas
///
function fun_creat_canvas() {

    let vjs = document.getElementsByClassName("vjs-danmu")[0];

    //���쪫��s�b�~�}�l����
    if (vjs === undefined) {
        setTimeout(function () {
            fun_creat_canvas();
        }, 1000);
        return;
    }

    //����canvas
    obj_can = document.createElement("canvas");
    obj_can.width = vjs.clientWidth;
    obj_can.height = vjs.clientHeight;
    ctx = obj_can.getContext("2d");//���oø�Ϫ���
    //obj_can.style.backgroundColor = "rgba(0,0,0,0.4)";
    obj_can.style.pointerEvents = "none";//�T���I��
    obj_can.style.position = "absolute";//�]�w��m
    obj_can.style.left = "0px";
    obj_can.style.top = "0px";

    //����style�]�קK�쥻���u�����ӰO����A�ҥH���ð_��
    let obj_style = document.createElement("style");
    obj_style.innerHTML = ".cmt{position:static !important; display:inline!important; opacity:0!important;} .cmt_none{display:none!important;} ";

    //���J
    var ani_video = document.getElementById("ani_video");
    //var ani_video = document.getElementsByClassName("player")[0];
    ani_video.appendChild(obj_can);
    ani_video.appendChild(obj_style);

    fun_div_to_canvas();
    fun_auto_size();
}




///
///�w�ɽվ�canvas���j�p�P�z����
///
function fun_auto_size() {

    let vjs = document.getElementsByClassName("vjs-danmu")[0];

    if (obj_can.width != vjs.clientWidth) {
        obj_can.width = vjs.clientWidth;
        obj_can.height = vjs.clientHeight;
    }

    //�ھڰʵe�ƥ������]�w�ӽվ�z����
    if (document.getElementById("DanmuOpacityNum") === undefined) {
        obj_can.style.opacity = 1;
    } else {
        obj_can.style.opacity = Number(document.getElementById("DanmuOpacityNum").innerHTML.replace("%", "")) / 100;
    }

    setTimeout(function () {//1500�@��᭫�s����
        fun_auto_size();
    }, 1500);
}





///
///�NDIV�u���নcanvas��ø�s
///
function fun_div_to_canvas() {

    //document.getElementById().getAttribute()

    ctx.clearRect(0, 0, obj_can.width, obj_can.height);//�M���W����ø�ϵ��G

    let ar_tt = document.getElementsByClassName("cmt");//���o�Ҧ��u��

    for (let i = 0; i < ar_tt.length; i++) {


        ar_tt[i].className = "cmt_none cmt";//����


        if (ar_tt[i].getAttribute("style").indexOf("opacity") > -1) {//�p�Gopacity�O0�A�N�O�b�ʵe���ݩ����ê��u��
            if (Number(ar_tt[i].style.opacity) === 0)
                continue;
        }

        let cmt_t = ar_tt[i].innerHTML.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/<br>/g, " ");//��r���e

        if (ar_tt[i].getAttribute("text_allow") != "true") {//�P�_�L���y�l�N���A�P�_�ĤG��

            //�L�o�ۦP�Ÿ����d���]�Ҧp�i�I�I�I�j�B�i%%%�j
            if (bool_�L�o��@�Ÿ����u�� > 0) {
                if (fun_allSame(cmt_t)) {
                    ar_tt[i].style.opacity = "0";//����
                    ar_tt[i].innerHTML = "";
                    continue;
                }
            }

            //�u���p�󵥩�o�Ӫ��״N�|�Q�L�o
            if (cmt_t.length <= int_�L�o�L�u���u��) {
                ar_tt[i].style.opacity = "0";//����
                ar_tt[i].innerHTML = "";
                continue;
            }

            //�L�o�]�t�S�w����r���u��
            let bool_delete = false;//�קK�{�{
            for (let j = 0; j < ar_filter.length; j++) {
                if (cmt_t.indexOf(ar_filter[j]) > -1) {
                    ar_tt[i].style.opacity = "0";//����
                    ar_tt[i].innerHTML = "";
                    bool_delete = true;
                    break;
                }
            }
            if (bool_delete) {
                continue;
            }
            ar_tt[i].setAttribute("text_allow", "true");

        }//if



        let cmt_color = ar_tt[i].style.color;//��r�C��      
        let cmt_fontSize = Number(ar_tt[i].style.fontSize.replace("px", ""));//��rsize
        let cmt_x = Number(ar_tt[i].style.left.replace("px", ""));//left

        let cmt_y = 0;//top
        if (ar_tt[i].style.bottom.length > 1) {//�i�a�U�j
            let cmt_bottom = Number(ar_tt[i].style.bottom.replace("px", ""));
            cmt_y = obj_can.height - cmt_bottom - 5;
        } else {//�i�u�ʡj�Ρi�a�W�j
            cmt_y = Number(ar_tt[i].style.top.replace("px", "")) + cmt_fontSize;
        }

        ctx.font = "bold " + cmt_fontSize + "px " + s_��r�r��;

        ctx.fillStyle = "#000000";//���v�C��
        if (int_�u�����v�{�� >= 1) {
            ctx.fillText(cmt_t, cmt_x + 1, cmt_y + 1);//��ø�s���v(�k�U)
        }
        if (int_�u�����v�{�� >= 2) {
            ctx.fillText(cmt_t, cmt_x - 1, cmt_y - 1);//��ø�s���v�]���W�^
        }
        if (int_�u�����v�{�� >= 3) {
            ctx.fillText(cmt_t, cmt_x + 1, cmt_y - 1);//��ø�s���v(�k�W)
        }
        if (int_�u�����v�{�� >= 4) {
            ctx.fillText(cmt_t, cmt_x - 1, cmt_y + 1);//��ø�s���v�]���U�^
        }

        ctx.fillStyle = cmt_color;//��r�C��
        ctx.fillText(cmt_t, cmt_x, cmt_y);//ø�s��r

    }



    setTimeout(function () {//30�@��᭫�s����
        fun_div_to_canvas();
    }, int_��s�W�v);

}
