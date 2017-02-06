function openAcount() {
	var psw = $('#psw').textbox('getText');
	if(isNull(psw)){
		$("#errorMsg").html("请输入初始密码！");
		return;
	}else{
		if(isStrength(psw)){
		}else{
			$("#errorMsg").html("密码至少六位，且应包含大小写字母、数字!");
			return;
		}
	}
	var password = $('#confirmPsw').textbox('getText');
	if(isNull(password)){
		$("#errorMsg").html("请输入确认密码!");
		return;
	}else{
		if(password!=psw){
			$("#errorMsg").html("两次密码不一致！");
			return;
		}
	}
	var name = $('#name').textbox('getText');
	if(isNull(name)){
		$("#errorMsg").html("请输入您的姓名！");
		return;
	}
	var tel = $('#tel').textbox('getText');
	if(isNull(tel)){
		$("#errorMsg").html("请输入您的电话！");
		return;
	}
	var confirm = $("#confirm").attr("checked");
	if(confirm != "checked"){
		$("#errorMsg").html("请阅读并确认服务协议！")
		return;
	}
	password = $.md5(password);
	$("#errorMsg").html("");
	$.ajax({
		url : ctxRoot + "/user/openAcount",
		type : 'post',
		data : {
			"tel" : tel,
			"name" : name,
			"password" : password
		}, 
		dataType: "json",
		success	: function(result){
			if(result.state){
				login();
			} else {
				$('#errorMsg').html(result.message);				
			}
		},
		error: function(msg){
			$('#errorMsg').html(result.message);
			return false;
		},
	});
}
function login(){
	$('#success').removeClass("hidden");
	$('#info').addClass("hidden");
	function jump(count){
        window.setTimeout(function(){ 
            count--;    
            if(count > 0) {    
                $('#num').html(count);    
                jump(count);    
            } else {    
                location.href=ctxRoot+"/login";    
            }    
        }, 1000);    
    }    
jump(5);   
}
