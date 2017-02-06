//判断输入内容是否为空    
function isNull(str) {
	if (str != undefined && str.length != 0 && str != 'null' && str != 'NULL' && str != "") {
		if(str.replace(/\s/g,"") == ""){
			return true;
		} else {
			return false;
		}		
	} else {
		return true;
	}
}

// 判断日期类型是否为YYYY-MM-DD格式的类型
function isDate(str) {
	if (str.length != 0) {
		var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
		var r = str.match(reg);
		if (r == null) {
			return false;
		} else {
			return true;
		}
	}
}

// 判断日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型
function isDateTime(str) {
	if (str.length != 0) {
		var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
		var r = str.match(reg);
		if (r == null) {
			return false;
		} else {
			return true;
		}
	}
}

// 判断日期类型是否为hh:mm:ss格式的类型
function isTime(str) {
	if (str.length != 0) {
		var reg = /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/;
		if (!reg.test(str)) {
			return false;
		} else {
			return true;
		}
	}
}

// 判断输入的字符是否为英文字母
function isLetter(str) {
	if (str.length != 0) {
		var reg = /^[a-zA-Z]+$/;
		if (!reg.test(str)) {
			return false;
		} else {
			return true;
		}
	}
}

// 判断输入的字符是否为整数
function isInteger(str) {
	if (str.length != 0) {
		var reg = /^[-+]?\d*$/;
		if (!reg.test(str)) {
			return false;
		} else {
			return true;
		}
	}
}

// 判断输入的字符是否为双精度
function isDouble(str) {
	if (str.length != 0) {
		var reg = /^[-\+]?\d+(\.\d+)?$/;
		if (!reg.test(str)) {
			return false;
		} else {
			return true;
		}
	}
}

// 判断输入的字符是否为:a-z,A-Z,0-9
function isString(str) {
	if (str.length != 0) {
		var reg = /^[a-zA-Z0-9_]+$/;
		if (!reg.test(str)) {
			return false;
		} else {
			return true;
		}
	}
}

//判断输入的密码强度
function isStrength(str) {
	if (str.length != 0) {
		var reg = /^(?!\D+$)(?=.*[A-Z])(?=.*[a-z])[0-9A-Za-z]{6,20}$/;
		if (!reg.test(str)) {
			return false;
		} else {
			return true;
		}
	}
}

// 判断输入的字符是否为中文
function isChinese(str) {
	if (str.length != 0) {
		var reg = /^[\u0391-\uFFE5]+$/;
		if (!reg.test(str)) {
			return false;
		} else {
			return true;
		}
	}
}

// 判断输入的EMAIL格式是否正确
function isEmail(str) {
	if (str.length != 0) {
		var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		if (!reg.test(str)) {
			return false;
		} else {
			return true;
		}
	}
}

// 判断输入的邮编(只能为六位)是否正确
function isZip(str) {
	if (str.length != 0) {
		var reg = /^\d{6}$/;
		if (!reg.test(str)) {
			return false;
		} else {
			return true;
		}
	}
}

// 判断输入的数字不大于某个特定的数字
function maxValue(str, maxValue) {
	if (str.length != 0) {
		var reg = /^[-+]?\d*$/;
		if (!reg.test(str)) {// 判断是否为数字类型
			if (val > parseInt(maxValue)) {
				return true;
			} else {
				return false;
			}
		}
	}
}

// 判断输入的数字不小于某个特定的数字
function minValue(str, minValue) {
	if (str.length != 0) {
		var reg = /^[-+]?\d*$/;
		if (!reg.test(str)) {// 判断是否为数字类型
			if (val < parseInt(minValue)) {
				return true;
			} else {
				return false;
			}
		}
	}
}

// 判断是否是固定电话
function isTel(str) {
	if (str.length != 0) {
		var reg = /(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})|(1[0-9]{10})/;
		if (reg.test(str)) {
			return true;
		} else {
			return false;
		}
	}
}

// 判断是否是手机号码
function isPhone(str) {
	if (str.length != 0) {
		var reg = /^1[0-9][0-9]\d{8}$/;
		if ((reg.test(str))) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

// 判断是否是邮箱
function isEmail(str) {
	if (str.length != 0) {
		var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
		if ((reg.test(str))) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	} 
}

// 判断是否是中国邮政编码(6位)
function isZipCode(str) {
	if (str.length != 0) {
		var reg = /^[1-9][0-9]{5}$/;
		if (!reg.test(str)) {
			return false;
		} else {
			return true;
		}
	}
}

// 匹配腾讯QQ号
function isQQ(str) {
	if (str.length != 0) {
		var reg = /[1-9][0-9]{4,}/;
		if (str.match(reg) == null) {
			return false;
		} else {
			return true;
		}
	}
}

// 匹配身份证(15位或18位)
function isIdcard(str) {
	if (str.length != 0) {
		var reg = /\d{15}|\d{18}/;
		if (str.match(reg) == null) {
			return false;
		} else {
			return true;
		}
	}
}

// 校验中英文的长度
function lenString(str) {
	var l = 0;
	var a = str.split("");
	for (var i=0; i<a.length; i++) {
		if (a[i].charCodeAt(0)<299) {
			l++;
		} else {
			l+=2;
		}
	 }
	 return l;
}

//截取含中文的字符串(先去掉html标签，只保留文本)
function splitString(str, len, flag) {
	if(lenString(str)>len){
		var l = 0;
		var splitLen = 0;
		str = str.replace(/<[^>].*?>/g,"");
		if(lenString(str)<=len){
			return str;
		}
		var a = str.split("");
		for (var i=0; i<a.length; i++) {
			if (a[i].charCodeAt(0)<299) {
				l++;
			} else {
				l+=2;
			}
			if(l>=len){
				splitLen = i;
				break;
			}
		}
		if(flag){
			return str.substring(0,splitLen+1);
		} else {
			return str.substring(0,splitLen+1)+"...";
		}
	} else {
		return str;
	}
}

//校验输入框是否为空
function validNull(obj, msgId, msgContent){
	var str = $(obj).val();
	if(isNull(str)){
		if(msgContent!=undefined){
			$("#"+msgId).html(msgContent);
		} else {
			$("#"+msgId).html("不能为空!");
		}
	} else {
		$("#"+msgId).html("");
	}
}

//校验输入框剩余长度
function validStringLen(obj, maxLen, msgId){
	var str = $(obj).val();
	var len = lenString(str);
	if(len==0){
		$("#"+msgId).html("");
	} else if(len<=maxLen){
		$("#"+msgId).html("还能录入"+parseInt((maxLen-len)/2)+"个汉字或"+parseInt(maxLen-len)+"个字符");
		$("#"+msgId).addClass("color-green");
		$("#"+msgId).removeClass("color-red");
	} else {
		$("#"+msgId).html("最多录入"+parseInt(maxLen/2)+"个汉字或"+maxLen+"个字符");
		$("#"+msgId).addClass("color-red");
		$("#"+msgId).removeClass("color-green");
	}
}

//格式化金额
function formatMoney(s, n){
   n = n > 0 && n <= 20 ? n : 0;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse();
   var r = s.split(".")[1];   
   var t = "";   
   for(i = 0; i < l.length; i ++ ){   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }
   if(n > 0){
	   return t.split("").reverse().join("") + "." + r;
   } else {
	   return t.split("").reverse().join("");
   }     
} 