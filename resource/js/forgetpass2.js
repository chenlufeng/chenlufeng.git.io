function validPsd(){
	var psd = $("#psd").textbox("getValue");
	if (isNull(psd)) {
		$("#psdErrorMsg").html("密码不能为空!");
		return false;
	} else {
		if(!isStrength(psd)) {
			$("#psdErrorMsg").html("密码格式错误!");
			return false;
		} else {
			$("#psdErrorMsg").html("");
			return true;
		}
	}
}

function validConfirmPsd(){
	var psd = $("#psd").textbox("getValue");
	var confirmPsd = $("#confirmPsd").textbox("getValue");
	if (isNull(confirmPsd)) {
		$("#confirmPsdErrorMsg").html("确认密码不为空!");
		return false;
	} else {
		if (psd != confirmPsd) {
			$("#confirmPsdErrorMsg").html("两次输入不一致!");
			return false;
		} else {
			$("#confirmPsdErrorMsg").html("");
			return true;
		}
	}
}

function next(){
	if(validPsd() && validConfirmPsd()){
		var psd = $("#psd").textbox("getValue");
		psd = $.md5(psd);
		$("#password").val(psd);
		$('#forgetPsdForm').submit();
	}
}