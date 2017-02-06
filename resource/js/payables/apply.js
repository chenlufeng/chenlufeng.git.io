//编辑框打开
function apply() {
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
		url : ctxRoot + "/apply/add",
		type : 'post',
		data : {
			"companyName" : companyName,
			"companyContactEmail" : companyContactEmail,
			"companyContact" : companyContact,
			"companyContactTel" : companyContactTel,
		},
		dataType : "json",
		success : function(data) {
			if(data.state){
				$.messager.alert("申请成功", "我们已经收到您的申请，将会在24小时之内联系您，请注意接听电话！");
			}else{
				$.messager.alert("申请失败", data.message, "error");
			}
		},
		error : function(data) {
		},
	});
};
