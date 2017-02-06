//用户获取验证码
function send() {
	if(!validEmail()){
		return;
	}
	var email = $("#email").textbox("getValue");
	$("#emailErrorMsg").html("");
	$("#codeErrorMsg").html("");
	$.ajax({
		url : ctxRoot + "/verification/forgetPass",
		type : 'post',
		data : {"email" : email},
		dataType : "json",
		success : function(data) {
			if (data.state == true) {
				$("#get").addClass("hidden")
				$("#disable").removeClass("hidden");
				cansle();
			} else {
				$("#codeErrorMsg").html(data.message);
			}
		},
		error : function(data) {
			return false;
		},
	});
}

function cansle() {
	function jump(count) {
		window.setTimeout(function() {
			count--;
			if (count > 0) {
				$('#num').html(count);
				jump(count);
			} else {
				$("#get").removeClass("hidden")
				$("#disable").addClass("hidden");
			}
		}, 1000);
	}
	jump(70);
}

function validEmail(){
	var email = $("#email").textbox("getValue");
	if (isNull(email)) {
		$("#emailErrorMsg").html("邮箱不能为空!");
		return false;
	} else {
		if(!isEmail(email)) {
			$("#emailErrorMsg").html("邮箱格式错误!");
			return false;
		} else {
			$("#emailErrorMsg").html("");
			return true;
		}
	}
}

function validCode(){
	var code = $("#code").textbox("getValue");
	if (isNull(code)) {
		$("#codeErrorMsg").html("验证码不能为空!");
		return false;
	} else {
		if (code.length != 6) {
			$("#codeErrorMsg").html("验证码为六位!");
			return false;
		} else {
			$("#codeErrorMsg").html("");
			return true;
		}
	}
}

function next(){
	if(validEmail() && validCode()){
		$('#forgetPsdForm').submit();
	}
}