$(document).ready(function() {
	$('#emailInput').textbox('textbox').focus();
});

$(document).keyup(function(event) {
	if (event.which==13 || event.keyCode==13) {
    	submitForm();
    }
});

var currChangeType = "login";
function submitForm() {
	var email = $('#emailInput').textbox('getText');
	if (isNull(email)) {
		$("#errorMsg").html("邮箱不能为空!");
		return;
	}
	if (!isEmail(email)) {
		$("#errorMsg").html("邮箱格式错误!");
		return;
	}
	if(currChangeType == "login"){
		var loginErrorCount = $('#loginErrorCount').val();
		if (loginErrorCount>3) {
			var verification = $('#verificationInput').textbox('getText');
			if (isNull(verification)) {
				$("#errorMsg").html("验证码不能为空!");
				return;
			}
		}
		var confirm = $("#confirm").attr("checked");
		if(confirm != "checked"){
			$("#errorMsg").html("请阅读并确认服务协议！")
			return;
		}
		var password = $('#pswInput').textbox('getText');
		if (isNull(password)) {
			$("#errorMsg").html("密码不能为空!");
			return;
		} else {
			password = $.md5(password);
			$('#pswHidden').val(password);
		}
		$('#loginForm').submit();
	} else {
		$.ajax({
			url : ctxRoot + "/invitation/resend",
			type : 'post',
			data : {"email" : email},
			dataType : "json",
			success : function(data) {
				if (data.state) {
					$('#errorMsg').html("重新发送邀请成功!");
				} else {
					$('#errorMsg').html(data.message);
				}
			},
			error : function(msg) {
				return false;
			},
		});
	}
}

function changeToResend() {
	currChangeType = "resend";
	$('#errorMsg').html('');
	$('#psw').addClass('hidden');
	$('#rembPsw').addClass('hidden');
	$('#login').html('发送');
	$('#login').addClass("margin-top-30");
	$('#toResendDiv').addClass('hidden');
	$('#toLoginDiv').removeClass('hidden');
}

function changeToLogin() {
	currChangeType = "login";
	$('#errorMsg').html('');
	$('#psw').removeClass('hidden');
	$('#rembPsw').removeClass('hidden');
	$('#login').html('登录');
	$('#login').removeClass("margin-top-30");
	$('#toLoginDiv').addClass('hidden');
	$('#toResendDiv').removeClass('hidden');
}