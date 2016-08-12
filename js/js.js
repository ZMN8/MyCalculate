/**
 * Created by Administrator on 2016/8/11.
 */

var screen=document.querySelector(".screen");
var beforeNum;//运算符前的数字
var afterNum;//运算符后的数字
var flag;//运算符号
var clearBool=false;//是否清屏
var flagBool=false;//是否开始保存afterNumber的值
var afterNumBool=false;//是否保存了afterNumber值

function inputKey(val) {
    if(clearBool){//按过符号了，要清空了
        screen.value="";//清空屏幕
        clearBool=false;//清屏后抹去清屏标记
    }
    if((screen.value=="0")&&(val!=".")){//如果屏幕首字母为0，且按下的不是“.”
        screen.value=val;
    }else{
        if((screen.value.indexOf(".")==-1)&&(val==".")||(val!=".")){//如果屏幕上数字没有小数点，且当前按下的是小数点or0~9的数字
            screen.value+=val;
        }
    }
    if(flagBool){//开始保存afterNumber
        afterNum=Number(screen.value);//当前屏幕值为afterNum
        afterNumBool=true;//保存了afterNumber值
    }
    console.log(beforeNum,afterNum);
}

function operatFun(sign){//按下运算符触发
    console.log("sign_qian:"+beforeNum,afterNum);
    if(!flagBool){//当前不保存afterNum，但保存beforeNum
        beforeNum=Number(screen.value);//记录第一次的before
        flagBool=true;//按过符号键啦！要保存afterNum啦！
    }

    if(afterNumBool){//当afterNumber值获取到以后再进入计算，否则不进入计算，可以任意更改运算符号而不改变值
            beforeNum=rel(flag,beforeNum,afterNum);//将上一次的计算结果赋值给before，参与下一次的连续计算；
            screen.value=beforeNum;//按下符号键显示上一次计算的结果
            afterNumBool=false;//按下符号键啦！要参与运算我还要afterNumber值，没有afterNumber值不给进！
    }

    console.log("sign_hou:"+beforeNum,afterNum,sign);
    flag=sign;//就算不给进，也要记录运算符
    clearBool=true;//按过符号键了，下次如果按数字就要清屏啦！
}

function  rel(Flag,Bnum,Anum) {//rel函数用来计算上一次beforeNum,afterNum的计算值，将其保存到beforeNum用于下一次计算。
    switch (Flag){
        case "+": return Bnum+Anum;break;
        case "-": return Bnum-Anum;break;
        case "*": return Bnum*Anum;break;
        case "/": return Bnum/Anum;break;
        case "%": return Bnum%Anum;break;
    }
}
function result(){
    console.log("=qian"+""+beforeNum,afterNum,flag);
    switch (flag){
        case "+":screen.value=beforeNum+afterNum;break;
        case "-":screen.value=beforeNum-afterNum;break;
        case "*":screen.value=beforeNum*afterNum;break;
        case "/":screen.value=beforeNum/afterNum;break;
        case "%":screen.value=beforeNum%afterNum;break;
    }
    flag=null;//按下等于符号后将之前存储的flag清空
    clearBool=true;//按下=键后，如果下次按下数字键则清屏
    flagBool=false;//按下=键，我要重新储存beforeNUm值，即当前屏幕值
    afterNumBool=false;//按下=符号以后afterNumBool要重新取值，不能在按下符号键后进入计算，故为false
    console.log("=hou"+""+beforeNum,afterNum,flag);
}
function clearFunction(){//初始化一切
    beforeNum=null;
    afterNum=null;
    flag=null;
    screen.value="";
    console.log(beforeNum,afterNum);
    clearBool=false;
    flagBool=false;
    afterNumBool=false
}
function del(){//倒减函数
    var math_str=screen.value;
    screen.value=math_str.substr(0,math_str.length-1);
    if(screen.value==""){//如果屏幕清空，则afterNum=0
        afterNum=0;
    }
}

function sqrt(){    //根号的问题
    screen.value=Math.sqrt(screen.value);
    if(afterNumBool){   //保存了afterNum值，则将根号结果给afterNum
        afterNum=Number(screen.value);
    }else{//没有保存afterNum值，则将根号结果给beforeNum；
        beforeNum=Number(screen.value);
    }
    console.log("sqrt: "+beforeNum,afterNum);
}