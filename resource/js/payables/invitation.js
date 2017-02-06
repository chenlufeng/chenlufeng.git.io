//编辑框打开
function invitation() {
	$("#companyNameMsg").html("");
	$("#companyContactEmailMsg").html("");
	$("#companyContactMsg").html("");
	$("#companyContactTelMsg").html("");
	
	var companyName = $("#companyName").val();
	if (isNull(companyName)) {
		$("#companyNameMsg").html("公司名称不为空");
		return;
	}
	
	var companyContactEmail = $("#companyContactEmail").val();
	if (isNull(companyContactEmail)) {
		$("#companyContactEmailMsg").html("公司邮箱不为空");
		return;
	} else {
		if (isEmail(companyContactEmail)) {
		} else {
			$("#companyContactEmailMsg").html("公司邮箱格式错误");
			return;
		}
	}
	
	var companyContact = $("#companyContact").val();
	if (isNull(companyContact)) {
		$("#companyContactMsg").html("联系人不为空");
		return;
	}
	
	var companyContactTel = $("#companyContactTel").val();
	if (isNull(companyContactTel)) {
		$("#companyContactTelMsg").html("联系电话不为空");
		return;
	} else {
		$("#companyContactTelMsg").html("");
	}
	
	$.ajax({
		url : ctxRoot + "/invitation/checkIsInvitation",
		type : 'post',
		data : {
			"toCompanyName" : companyName,
			"toCompanyEmail" : companyContactEmail
		},
		dataType : "json",
		success : function(data) {
			if(data.state){
				if(data.extendMap.count>0){
					$.messager.confirm("邀请买方","您已邀请过该买方，是否重新发送邀请?",function(r){
						if(r){
								reinvitationToBuyer();
							}
						})
				}else{
					invitationToBuyer();
				}
			}
		},
		error : function(data) {
		},
	});
};

function invitationToBuyer(){
	$("#companyNameMsg").html("");
	$("#companyContactEmailMsg").html("");
	$("#companyContactMsg").html("");
	$("#companyContactTelMsg").html("");
	
	var companyName = $("#companyName").val();
	if (isNull(companyName)) {
		$("#companyNameMsg").html("公司名称不为空");
		return;
	}
	
	var companyContactEmail = $("#companyContactEmail").val();
	if (isNull(companyContactEmail)) {
		$("#companyContactEmailMsg").html("公司邮箱不为空");
		return;
	} else {
		if (isEmail(companyContactEmail)) {
		} else {
			$("#companyContactEmailMsg").html("公司邮箱格式错误");
			return;
		}
	}
	
	var companyContact = $("#companyContact").val();
	if (isNull(companyContact)) {
		$("#companyContactMsg").html("联系人不为空");
		return;
	}
	
	var companyContactTel = $("#companyContactTel").val();
	if (isNull(companyContactTel)) {
		$("#companyContactTelMsg").html("联系电话不为空");
		return;
	} else {
		$("#companyContactTelMsg").html("");
	}
	
	$.ajax({
		url : ctxRoot + "/invitation/invitationToBuyer",
		type : 'post',
		data : {
			"toCompanyName" : companyName,
			"toCompanyEmail" : companyContactEmail,
			"toCompanyContact" : companyContact,
			"toCompanyTel" : companyContactTel
		},
		dataType : "json",
		success : function(data) {
			if(data.state){
				$.messager.alert("邀请买方","发送邀请成功！", 'info');
			}else{
				$("#companyNameMsg").html(data.message);
			}
		},
		error : function(data) {
		},
	});
}
function reinvitationToBuyer(){
	var companyName = $("#companyName").val();
	if (isNull(companyName)) {
		$("#companyNameMsg").html("公司名称不为空");
		return;
	}
	
	var companyContactEmail = $("#companyContactEmail").val();
	if (isNull(companyContactEmail)) {
		$("#companyContactEmailMsg").html("公司邮箱不为空");
		return;
	} else {
		if (isEmail(companyContactEmail)) {
		} else {
			$("#companyContactEmailMsg").html("公司邮箱格式错误");
			return;
		}
	}
	$.ajax({
		url : ctxRoot + "/invitation/reinvitationToBuyer",
		type : 'post',
		data : {
			"toCompanyName" : companyName,
			"toCompanyEmail" : companyContactEmail
		},
		dataType : "json",
		success : function(data) {
			if(data.state){
				$.messager.alert("邀请买方","发送邀请成功！", 'info');
			}else{
				$("#companyNameMsg").html(data.message);
			}
		},
		error : function(data) {
		},
	});
}