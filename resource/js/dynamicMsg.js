$(document).ready(function() {
	var dynamicMsgStatus = window.localStorage.getItem("flag");
	if(dynamicMsgStatus=="close"){
		$('#dynamicMsg').addClass('hidden');
		$('#dynamicMsgTop').removeClass('bottom-60');
		$('#dynamicMsgTop').addClass('bottom-0');
	}
	if(dynamicMsgStatus=="open"||dynamicMsgStatus==null){
		$('#dynamicMsg').removeClass('hidden');
		$('#dynamicMsgTop').removeClass('bottom-0');
		$('#dynamicMsgTop').addClass('bottom-60');
		$('#dynamicMsgTop').removeClass('dynamicMsg-up');
		$('#dynamicMsgTop').addClass('dynamicMsg-down');
	}
	if (loginCompanyType == "buyer") {
		getBuyerAll();
	}
	if (loginCompanyType == "supplier") {
		getSupplierAll();
	}
	if (loginCompanyType == "all") {
		getBuyerAll();
	}
});
var flag = true;
function hide(){
	var dynamicMsgStatus = window.localStorage.getItem("flag");
	if(dynamicMsgStatus=="close"){
		flag=true;
	}
	if(dynamicMsgStatus=="open"||dynamicMsgStatus==null){
		flag=false;
	}
	$('#dynamicMsg').fadeToggle('slow');
	if(flag){
		$('#dynamicMsgTop').removeClass('bottom-0');
		$('#dynamicMsgTop').addClass('bottom-60');
		$('#dynamicMsgTop').removeClass('dynamicMsg-up');
		$('#dynamicMsgTop').addClass('dynamicMsg-down');
		flag = false;
		window.localStorage.setItem("flag","open");
	}else{
		$('#dynamicMsgTop').removeClass('bottom-60');
		$('#dynamicMsgTop').addClass('bottom-0');
		$('#dynamicMsgTop').removeClass('dynamicMsg-down');
		$('#dynamicMsgTop').addClass('dynamicMsg-up');
		flag = true;
		window.localStorage.setItem("flag","close");
	}
}
var msgData;
var index;
function getBuyerAll() {
	$.ajax({
		url : ctxRoot + "/realDailyReport/getBuyerAll",
		type : 'post',
		data : {},
		dataType : "json",
		success : function(data) {
			msgData=data;
			if(data==""){
				$("#dynamicMsgDiv").html("暂无消息");
			}else {
				$("#dynamicMsgDiv").html(data[0]);
				$("#msg").animate({"margin-top":"-30"},1000);
				 dynamicMsg(data);
			}
		},
		error : function(msg) {
			return false;
		}
	});
}

function getSupplierAll() {
	$.ajax({
		url : ctxRoot + "/realDailyReport/getSupplierAll",
		type : 'post',
		data : {},
		dataType : "json",
		success : function(data) {
			/*if(data==""){
			}else {
				$("#dynamicMsgDiv1").html(data);
			}
			scrollDivByHorizontal("dynamicMsgDiv", 50);*/
			msgData=data;
			if(data==""){
			}else {
				$("#dynamicMsgDiv").html(data[0]);
				$("#msg").animate({"margin-top":"-30"},1000);
				 dynamicMsg(data);
			}
		},
		error : function(msg) {
			return false;
		}
	});
}
function dynamicMsg(data) {
	function jump(count) {
		window.setTimeout(function() {
			count--;
			if (count >= 0) {
				$("#dynamicMsgDiv").html(data[count]);
				$("#msg").animate({"margin-top":"-30"},1000);
				index=count;
				jump(count);
			} else {
				count=data.length;
				jump(count);
			}
		}, 4000);
	}
	jump(data.length);
}
/*function dynamicMsg(data) {
	var count = data.length;
	function jump(count) {
		count--;
		if (count >= 0) {
			$("#dynamicMsgDiv").html(data[count]);
			$("#msg").animate({"margin-top":"-30"},1000);
			index=count;
		} else {
			count=data.length;
		}
	};
	
	var MyMar = setInterval(jump(index), 3000);
	$("#msg").onmouseover = function() {
		clearInterval(MyMar)
	};
	$("#msg").onmouseout = function() {
		MyMar = setInterval(jump(index), 3000);
	};
}*/
function upMsg(){
	if(index==0){
		index=msgData.length;
	}
	$("#dynamicMsgDiv").html(msgData[index-1]);
	$("#msg").animate({"margin-top":"-30"},1000);
}
function downMsg(){
	if(index==msgData.length-1){
		index=-1;
	}
	$("#dynamicMsgDiv").html(msgData[index+1]);
	$("#msg").animate({"margin-top":"-30"},1000);
}
function getAll() {
	$.ajax({
		url : ctxRoot + "/realDailyReport/getAll",
		type : 'post',
		data : {},
		dataType : "json",
		success : function(data) {
			if(data==""){
			}else {
				$("#dynamicMsgDiv1").html(data);
			}
			scrollDivByHorizontal("dynamicMsgDiv", 50);
		},
		error : function(msg) {
			return false;
		}
	});
}