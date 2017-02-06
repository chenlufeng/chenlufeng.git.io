function validOldPsd(){
	var oldPsd = $("#oldPsd").textbox("getValue");
	if (isNull(oldPsd)) {
		$("#oldPsdErrorMsg").html("原密码不能为空!");
		return false;
	} else {
		if(!isStrength(oldPsd)) {
			$("#oldPsdErrorMsg").html("原密码格式错误!");
			return false;
		} else {
			$("#oldPsdErrorMsg").html("");
			return true;
		}
	}
}

function validNewPsd(){
	var newPsd = $("#newPsd").textbox("getValue");
	if (isNull(newPsd)) {
		$("#newPsdErrorMsg").html("新密码不能为空!");
		return false;
	} else {
		if(!isStrength(newPsd)) {
			$("#newPsdErrorMsg").html("新密码格式错误!");
			return false;
		} else {
			$("#newPsdErrorMsg").html("");
			return true;
		}
	}
}

function validConfirmPsd(){
	var newPsd = $("#newPsd").textbox("getValue");
	var confirmPsd = $("#confirmPsd").textbox("getValue");
	if (isNull(confirmPsd)) {
		$("#confirmPsdErrorMsg").html("确认密码不为空!");
		return false;
	} else {
		if (newPsd != confirmPsd) {
			$("#confirmPsdErrorMsg").html("两次输入不一致!");
			return false;
		} else {
			$("#confirmPsdErrorMsg").html("");
			return true;
		}
	}
}

function modifyPsd(){
	if(validOldPsd() && validNewPsd() && validConfirmPsd()){
		var oldPsd = $("#oldPsd").textbox("getValue");
		oldPsd = $.md5(oldPsd);
		var newPsd = $("#newPsd").textbox("getValue");
		newPsd = $.md5(newPsd);
		$.ajax({
			url : ctxRoot + "/user/modifyPsd",
			type : 'post',
			dataType : "json",
			data : {"oldPsd":oldPsd, "newPsd":newPsd},
			success : function(data) {
				if(data.state){
					openMsg("修改密码成功！");
				} else{
					$.messager.alert('修改密码失败', data.message, 'error');
				}
			},
			error : function(data) {
				return false;
			}
		});
	}
}