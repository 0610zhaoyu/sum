function log(n){
	console.log(n);
}

function getStyle(ele,attr){
	if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return window.getComputedStyle(ele,null)[attr];
	}
}

function getClassName(classname) {
	if (!document.getElementsByClassName) {
		var list = document.getElementsByTagName("*");
		var arr = new Array;
		for (var i = 0; i < list.length; i++) {
			if (list[i].className == classname) {
				arr.push(list[i]);
			}
		}
		return arr;
	} else {
		return document.getElementsByClassName(classname);
	}

}

function Ajax(url,fnFucc,fnFail){
	var req = null;
	if (window.XMLHttpRequest) {
		 req = new XMLHttpRequest;
	} else{
		 req = new ActiveXObject('Microsoft.XMLHTTP');
	}
	req.open('GET',url,true);
	req.onreadystatechange = function(){
		if (req.readyState == 4) {
			if (req.status == 200) {
				fnFucc(req.responseText)
			}
			if (fnFail) {
				fnFail(req.status)
			}	
		}
	}
	req.send();
}

function getByClass(obj,sName){
	if (document.getElementsByClassName) {
		return obj.getElementsByClassName(sName);
	}else{
		var aElem = obj.getElementsByTagName('*');
		var arr = [];
		var aResu = [];
		for (var i = 0; i < aElem.length; i ++) {
			aResu = aElem[i].className.split(' ');
			for (var j = 0; j < aResu.length; j ++) {
				if (aResu[j] == sName) {
					arr.push(aElem[i]);
				}
			}
		}
		return arr;
	}
}
//三级菜单
function show(arr1,arr2,index){
	for (var j = 0; j < arr1.length; j ++) {
		arr2[j].style.display = 'none';
	}
	arr2[index].style.display = 'block';
}

//获取验证码
function getCode(){
	var arr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];
	var str = '';
	for (var i = 0; i < 4; i ++) {
		var iNum = parseInt(Math.random()*100);
		while (iNum>35){
			iNum = parseInt(Math.random()*100);
		}
		str += arr[iNum];
	}
	return str;
}

function getChildElementNodes(parentNode){
	var list = parentNode.childNodes;
	var newList = [];
	for (var i = 0; i < list.length; i ++) {
		if (list[i].nodeType == 1) {
			newList.push(list[i]);
		}
	}
	return newList;
}

function getTarget(e){
	if (e.target) {
		return e.target;
	} else{
		return e.srcElement;
	}
}

function addEventListener(obj,type,func){
	if (obj.addEventListener) {
		obj.addEventListener(type,func,false);
	} else{
		obj.attachEvent("on"+type,func);
	}
}

function removeEvent(obj,type,func){
	if (obj.removeEventListener) {
		obj.removeEventListener(type,func,false);
	} else{
		obj.detachEvent('on'+type,func);
	}
}

function setCookie(name,type,iDay){
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+iDay);
	document.cookie = name +"="+type+";expires="+oDate;
}

function getCookie(key){
	var arr = document.cookie.split("; ");
	for (var i = 0; i < arr.length; i ++) {
		var kv = arr[i].split("=");
		if (kv[0] == key) {
			return kv[1];
		}	
	}
}

function removeCookid(name){
	setCookie(name,"11111",-1);
}

/** 
把目标对象的指定的CSS属性，过渡到相应的值
1 目标对象， 2 指定CSS属性和目标值   3 回调函数
*/

function startMove(obj, json, fn) {
	clearInterval(obj.timer); //清理定时器
	obj.timer = setInterval(function() {
		for (attr in json) {
			//获取当前属性值
			if (attr == 'opacity') {
				var iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				var iCur = parseInt(getStyle(obj, attr));
			}
			document.title = iCur;
			//计算速度  
			var iSpeed = (json[attr] - iCur) / 8;
			iSpeed > 0 ? iSpeed = Math.ceil(iSpeed) : iSpeed = Math.floor(iSpeed);

			//判断停止
			if (iCur == json[attr]) {
				clearInterval(obj.timer);
				if (fn) { //逻辑表达式, true false
					fn();
				}
			} else {
				if (attr == 'opacity') {
					obj.style.filter = 'alpha(opacity:' + parseInt(iCur + iSpeed) + ')';
					obj.style.opacity = (iCur + iSpeed) / 100;
				} else {
					obj.style[attr] = (iCur + iSpeed) + 'px';
				}
			}
		}
	}, 30);
}

//原理，每次执行一轮属性

//年、月、日
function date2String(date, sb ,sp) {
	var x = date.getFullYear();
	var y = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0'+(date.getMonth() + 1);
	var z = (date.getDate() + 1) > 9 ? (date.getData() + 1) : '0'+(date.getData() + 1);
	var a = (date.getHours() + 1) > 9 ? (date.getHours() + 1) : '0'+(date.getHours() + 1);
	var b = (date.getMinutes() + 1) > 9 ? (date.getMinutes() + 1) : '0'+(date.getMinutes() + 1);
	var c = (date.getSeconds() + 1) > 9 ? (date.getSeconds() + 1) : '0'+(date.getSeconds() + 1);
	return x + sb + y + sb + z + ' ' + a + sp + b + sp + c;
}

/**  获取子节点，过滤空白节点  */
function getchild() {
	var nodelist = node.childNodes;
	var reslist = [];
	for (var i = 0; i < nodelist.length; i++) {
		if (nodelist[i].nodeType == 1) {
			reslist.push(nodelist[i]);
		}
	}
	return reslist;
}

/**  AJAX兼容 */
function getrequest() {
	var request = null;
	if (window.ActiveXObject) {
		request = new ActiveXObject('Msxml2.HTTPXML')
		return request;
	} else {
		request = new XMLHttpRequest();
		return request;
	}
}


//随机改变颜色
function GetRandomColor() {
	return Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16);
}

//封装函数 只适用于透明度切换图片；					
function pictureTurn(obj,nm,speed){
	setInterval(function(){
		if(nm == obj.length){
			nm=0;
		}
		for(var i=0;i<obj.length;i++){
			obj[i].style.opacity=0;
		}
		startMove(obj[nm++], {opacity:100})
	},speed)
}


//从右向左方向的轮播，需要一个ul和一个div
	function pictureDirection(ele1,ele2,currentIndex){
			setInterval(function(){
			if(currentIndex==ele1.children.length){
				currentIndex=0;
			}
			if(ele1.offsetLeft==0){
				startMove(ele1, {left:-currentIndex*ele2.offsetWidth})
			}
			currentIndex++;
		},3000)	
	}
//		pictureDirection(oUL,oDiv,1)
//原理，每次执行一轮属性


//返回每个月有多少天
function days(mon){
	switch(mon){
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:return 31;
		case 2: return 28;
		case 4:
		case 6:
		case 9:
		case 11:return 30;
	}
	
}
//将字符串转换成日期
function parse(str,s){
	var arr = str.split(s);
	var dstr = arr.join('-');
	var time = Date.parse(dstr);
	d = new Date(time);
	return d;

}

//是否为闰年
function leapYear(y){
	if(y%4==0 && y%100!=100 || y%400==0){
			
		return true;
	}else{
		
		return false;
	}
}
		
//计算两个日期相差的天数
function getDiff(date1,date2){
	var time1 = date1.getTime();
	var time2 = date2.getTime();
	return Math.floor(Math.abs(time1 - time2) / (1000*60*60*24) );
}

//计算n天之后的日期,n可负可正
function getSday(n){
	var oDate = new Date();
	var oTime = oDate.getTime();
	oTime += n*24*60*60*1000;
	
	return new Date(oTime);	
}
