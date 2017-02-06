function submitForm() {
	
	var companyEmail = $('#companyEmail').val();
	if(isNull(companyEmail)){
		$("#errorMsg").html("邮箱不能为空!");
		return;
	} 
	if(!isEmail(companyEmail)){
		$("#errorMsg").html("邮箱格式错误!");
		return;
	}
	var companyName = $('#companyName').val();
	if(isNull(companyName)){
		$("#errorMsg").html("邮箱不能为空!");
		return;
	}
	if($('#login').text()=="发送"){
		$("#errorMsg").html("发送中。。。");
		$('#login').addClass("hidden");
		$.ajax({
			url : ctxRoot + "/user/invitation",
			type : 'post',
			data : {
				"email" : email,
			}, 
			dataType: "json",
			success	: function(msg){
				if(false==msg){
					$('#errorMsg').html("您不在邀请名单中!");
					return;
				}
				$('#errorMsg').html("发送成功");
				$('#login').removeClass("hidden");
			},
			error: function(msg){
				return false;
			},
		});
		return;
	}
	var password = $('#pswInput').textbox('getText');
	if(isNull(password)){
		$("#errorMsg").html("密码不能为空!");
		return;
	}
	$('#loginForm').submit();
}

function resend() {
	if($('#resend').text()=="重新发送邀请"){
		$('#errorMsg').html('');
		$('#psw').addClass('hidden');
		$('#rembPsw').addClass('hidden');
		$('#login').html('发送');
		$('#resend').html('返回登录');
		$('#login').css("margin-top","30px");
		return;
	}
	if($('#resend').text()=="返回登录"){
		$('#errorMsg').html('');
		$('#psw').removeClass('hidden');
		$('#rembPsw').removeClass('hidden');
		$('#login').html('登录');
		$('#resend').html('重新发送邀请');
		$('#login').css("margin-top","20px");
		return;
	}
}
