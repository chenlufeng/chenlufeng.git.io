function validPassword(){
	var password = $.trim($('#password').val());
	if (isNull(password)) {
		$('#passwordMsg').html(' 密码不为空');
		return;
	} else {
		if (isStrength(password)) {
			$("#passwordMsg").html("");
		} else {
			$("#passwordMsg").html(" 密码至少六位，且包含大小写字母、数字!");
			return;
		}
	}
}
function validConfirm(){
	var password = $.trim($('#password').val());
	var confirm = $.trim($('#confirm').val());
	if (isNull(confirm)) {
		$('#confirmMsg').html(' 密码不为空');
		return;
	} else {
		if(confirm != password){
			$('#confirmMsg').html(' 两次密码不一致');
			return;
		}else{
			$('#confirmMsg').html('');
		}
	}
}
function resetPass(){
	var password = $.trim($('#password').val());
	if (isNull(password)) {
		$('#passwordMsg').html(' 密码不为空');
		return;
	} else {
		if (isStrength(password)) {
			$("#passwordMsg").html("");
		} else {
			$("#passwordMsg").html(" 密码至少六位，且包含大小写字母、数字!");
			return;
		}
	}
	
	var confirm = $.trim($('#confirm').val());
	if (isNull(confirm)) {
		$('#confirmMsg').html(' 密码不为空');
		return;
	} else {
		if(confirm != password){
			$('#confirmMsg').html(' 两次密码不一致');
			return;
		}
	}
	password = $.md5(password);
	$.ajax({
		url : ctxRoot + "/user/resetPsd",
		type : 'post',
		data : {
			"password" : password,
		}, 
		dataType: "json",
		success	: function(data){
			if(data.state==true){
				$("#reset").addClass("hidden");
				$("#success").removeClass("hidden");
				login();
			}else{
				$('#passwordMsg').html(data.message);
			}
		},
		error: function(data){
			return false;
		},
	});
}

function login() {
	function jump(count) {
		window.setTimeout(function() {
			count--;
			if (count > 0) {
				$('#num').html(count);
				jump(count);
			} else {
				location.href = ctxRoot + "/portal";
			}
		}, 1000);
	}
	jump(3);
}
