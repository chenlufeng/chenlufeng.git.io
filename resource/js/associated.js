function associated() {
	var confirm = $("#confirm").attr("checked");
	if(confirm != "checked"){
		$("#errorMsg").html("请阅读并确认服务协议！")
		return;
	}
	var invitationId = $('#invitationId').val();
	$.ajax({
		url : ctxRoot + "/user/openAcountByAssociated",
		type : 'post',
		data : {}, 
		dataType: "json",
		success	: function(data){
			if(data.state){
				login();
			} else {
				$('#errorMsg').html(result.message);
			}
		},
		error: function(data){
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
