$(document).ready(function () {	
	getCompanyById();
	var srcImg =$('#logo').attr('src');
	if(srcImg==''){
		$("#logo").attr('src',ctxRoot+"/resource/image/nologo.jpg"); 
	};
	modifyAuthStatus();
	isChecked();
	initUploadBut("uploadLicenseFile", "image", setUploadLicense, setUploadLicenseMsg, uploadLicensePrograss);
});

function personalEditBut() {
	$('#personalEditBut').addClass('hidden');
	$('#personalSaveBut').removeClass('hidden');
	$('#personalCancelBut').removeClass('hidden');

	$('#contact').addClass('hidden');
	$('#contactInput').removeClass('hidden');
	$('#contactEmail').addClass('hidden');
	$('#contactEmailInput').removeClass('hidden');
	$('#contactTel').addClass('hidden');
	$('#contactTelInput').removeClass('hidden');
	$('#address').addClass('hidden');
	$('#addressInput').removeClass('hidden');
	$('#website').addClass('hidden');
	$('#websiteInput').removeClass('hidden');
	$('#industry').removeClass('hidden');
	$('#industryInput').addClass('hidden');
}

function getCompanyById(){
	var id = $('#companyId').val();
	$.ajax({
		url : ctxRoot + "/company/getById",
		type : 'post',
		data : {
			"id" : id,
		}, 
		dataType: "json",
		success	: function(msg){
			$('#contact').html(msg.extendMap.model.contact);
			$('#contactInput').val(msg.extendMap.model.contact);
			$('#contactEmail').html(msg.extendMap.model.contactEmail);
			$('#contactEmailInput').val(msg.extendMap.model.contactEmail);
			$('#contactTel').html(msg.extendMap.model.contactTel);
			$('#contactTelInput').val(msg.extendMap.model.contactTel);
			$('#address').html(msg.extendMap.model.address);
			$('#addressInput').val(msg.extendMap.model.address);
			var website = msg.extendMap.model.website == null ? "":msg.extendMap.model.website;
			$('#website').html("<a href='http://"+website+"' target='_Blank' style='text-decoration:none;'>"+website+"</a>");
			$('#websiteInput').val(msg.extendMap.model.website);
			$('#industryInput').html(msg.extendMap.model.industry);
			if(isNull(msg.extendMap.model.industry)){
				$("#industry").attr("value","请选择");
				$("#industry").val("请选择");
			}else{
				$("#industry").attr("value",msg.extendMap.model.industry);
				$("#industry").val(msg.extendMap.model.industry);
			}
			$("#createTime").html(msg.extendMap.model.createTimeStr);
		},
		error: function(msg){
			return false;
		},
	});
}

//function validWebsite(){
//	var website = $("#websiteInput").val();
//	if(isNull(website)){
//		 $('#websiteMessage').html("网址不为空");
//		return false;
//	} else{
//		 $('#websiteMessage').html("");
//	}
//}
function validContact(){
	var contact = $('#contactInput').val();
	if(isNull(contact)){
		 $('#contactMessage').html("联系人不为空");
		return false;
	} else{
		 $('#contactMessage').html("");
	}
}
function validContactEmail(){
	var contactEmail = $('#contactEmailInput').val();
	if(isNull(contactEmail)){
		 $('#contactEmailMessage').html("邮箱不为空");
		return false;
	} else{
		if(!isEmail(contactEmail)){
			$('#contactEmailMessage').html("邮箱格式错误");
			return;
		} else{
			$('#contactEmailMessage').html("");
		}
	}
}
function validContactTel(){
	var contactTel = $('#contactTelInput').val();
	if(isNull(contactTel)){
		 $('#contactTelMessage').html("座机不为空");
		return false;
	} else{
		if(!isTel(contactTel)){
			 $('#contactTelMessage').html("座机号格式错误");
			return false;
		} else{
			 $('#contactTelMessage').html("");
			 
		}
	}
}
/*function validAddress(){
	var address = $('#addressInput').val();
	if(isNull(address)){
		 $('#addressInputMessage').html("地址不为空");
		return false;
	} else{
		 $('#addressInputMessage').html("");
	}
}*/

function personalSaveBut() {
	var contact = $('#contactInput').val();
	if(isNull(contact)){
		 $('#contactMessage').html("联系人不为空");
		return false;
	} else{
		 $('#contactMessage').html("");
	}
	
	var contactEmail = $('#contactEmailInput').val();
	if(isNull(contactEmail)){
		 $('#contactEmailMessage').html("邮箱不为空");
		return false;
	} else{
		if(!isEmail(contactEmail)){
			$('#contactEmailMessage').html("邮箱格式错误");
			return;
		} else{
			$('#contactEmailMessage').html("");
		}
	}
	
	var contactTel = $('#contactTelInput').val();
	if(isNull(contactTel)){
		 $('#contactTelMessage').html("号码不为空");
		return false;
	} else{
		if(!isTel(contactTel)){
			 $('#contactTelMessage').html("座机号或手机号格式错误");
			return false;
		} else{
			 $('#contactTelMessage').html("");
		}
	}
	
	var address = $('#addressInput').val();
	/*if(isNull(address)){
		 $('#addressInputMessage').html("地址不为空");
		return false;
	} else{
		 $('#addressInputMessage').html("");
	}*/
	
	var website = $("#websiteInput").val();
	/*if(isNull(website)){
		 $('#websiteMessage').html("网址不为空");
		return false;
	} else{
		 $('#websiteMessage').html("");
	}*/
	
	
	var industry = $('#industry').val();
	if(industry=="请选择"){
		industry="";
	}
	var id = $('#companyId').val();
	$.ajax({
		url : ctxRoot + "/company/modify",
		type : 'post',
		data : {
			"id" : id,
			"contact" : contact,
			"contactEmail" : contactEmail,
			"contactTel" : contactTel,
			"address" : address,
			"industry" : industry,
			"website" : website,
		}, 
		dataType: "json",
		success	: function(msg){
			if(msg.state==true){
				openMsg("修改企业基本信息成功!");
			}
			$('#contact').html(contact);
			$('#contactEmail').html(contactEmail);
			$('#contactTel').html(contactTel);
			$('#address').html(address);
			$('#industryInput').html(industry);
			$('#website').html(website);
		},
		error: function(msg){
			return false;
		},
	});
	
//	personalCancelBut() ;
}
function personalCancelBut() {
	$('#personalSaveBut').addClass('hidden');
	$('#personalCancelBut').addClass('hidden');
	$('#personalEditBut').removeClass('hidden');

	$('#contactInput').addClass('hidden');
	$('#contact').removeClass('hidden');
	$('#contactEmailInput').addClass('hidden');
	$('#contactEmail').removeClass('hidden');
	$('#contactTelInput').addClass('hidden');
	$('#contactTel').removeClass('hidden');
	$('#addressInput').addClass('hidden');
	$('#address').removeClass('hidden');
	$('#websiteInput').addClass('hidden');
	$('#website').removeClass('hidden');
	$('#industry').addClass('hidden');
	$('#industryInput').removeClass('hidden');
	//清空错误信息
	$('#contactMessage').html("");
	$('#contactEmailMessage').html("");
 	$('#contactTelMessage').html("");
	$('#addressInputMessage').html("");
	$('#websiteMessage').html("");
}

function basic(){
	$("#basicTab").addClass('border-bottom-solid-darkred-3 color-boldgray');
	$("#basicTab").removeClass('hidden');
	$("#authenticationTab").addClass('color-gray-cbcbcb');
	$("#authenticationTab").removeClass('border-bottom-solid-darkred-3 color-boldgray');
	
	$("#basic").removeClass('hidden');
	$("#authentication").addClass('hidden');
	
}
function authentication(){
	$("#authenticationTab").addClass('border-bottom-solid-darkred-3 color-boldgray');
	$("#authenticationTab").removeClass('hidden');
	$("#basicTab").addClass('color-gray-cbcbcb');
	$("#basicTab").removeClass('border-bottom-solid-darkred-3 color-boldgray');
	
	$("#authentication").removeClass('hidden');
	$("#basic").addClass('hidden');	
}

//上传认证图片
function setUploadLicense(name, url, size){
	$("#licenseUrl").val(url);
	if(!isNull(url)){
		$("#licenseMsg").html("上传成功");
	}
}

function setUploadLicenseMsg(errMsg){
	$("#licenseMsg").html(errMsg);
}

function uploadLicensePrograss(){
	
}

function saveLicense(){
	var licenseUrl = $("#licenseUrl").val();
	if(isNull(licenseUrl)){
		$("#licenseMsg").html("请选择上传图片!");
		return;
	}
	var bankName =$("#bankName").val();
	if(isNull(bankName)){
		$("#bankNameMsg").html("开户行不为空！");
		return;
	}
	var bankNo =$("#bankNo").val();
	if(isNull(bankNo)){
		$("#bankNoMsg").html("开户行账号不为空！");
		return;
	}
	$.ajax({
		type : "POST",
		url : ctxRoot + "/companyAuth/insert",
		data : {
			"isAjax" : "y",
			"bankName" : bankName,
			"bankNo" : bankNo,
			"licenseUrl" : licenseUrl,
		},
		dataType : "json",
		success : function(data) {
			if (data.state){
				openMsg("操作成功");
				$("#check").addClass("width-30 height-30 back-boldred color-white")
				$("#check").removeClass("width-26 height-26 color-red border-solid-boldred-2")
				$("#write").removeClass("width-30 height-30 back-boldred color-white")
				$("#write").addClass("width-26 height-26 color-red border-solid-boldred-2")
				$("#result").removeClass("width-30 height-30 back-boldred color-white")
				$("#result").addClass("width-26 height-26 color-red border-solid-boldred-2")
				
				$("#checkText").addClass("color-boldred");
				$("#writeText").removeClass("color-boldred");
				$("#resultText").removeClass("color-boldred");
				$("#licenseMsg").html("");
				readOnly();
			} else {
				alert(data.message);
			}
		}
	});
}
//同步修改认证状态界面样式
function modifyAuthStatus(){
	if(loginCompanyIsAuth=="y"&&companyAuthStatus=="pass"){
		$("#isAuthText").html("");
		$("#isAuthText").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
		$("#isAuthText").addClass("icon-isAuth margin-left-5");
		$("#left").html("");
		$("#right").html("");
		readOnly();
	}else{
		$("#isAuthText").removeClass("icon-isAuth");
	}
	if(companyAuthStatus=="create"){
		$("#check").addClass("width-30 height-30 back-boldred color-white")
		$("#check").removeClass("width-26 height-26 color-red border-solid-boldred-2")
		$("#write").removeClass("width-30 height-30 back-boldred color-white")
		$("#write").addClass("width-26 height-26 color-red border-solid-boldred-2")
		$("#result").removeClass("width-30 height-30 back-boldred color-white")
		$("#result").addClass("width-26 height-26 color-red border-solid-boldred-2")
		
		$("#checkText").addClass("color-boldred");
		$("#writeText").removeClass("color-boldred");
		$("#resultText").removeClass("color-boldred");
		$("#isAuthText").removeClass("icon-isAuth")
		$("#isAuthText").html("待审核");
		readOnly();
	}
	if(companyAuthStatus=="pass"||companyAuthStatus=="reject"){
		$("#result").addClass("width-30 height-30 back-boldred color-white")
		$("#result").removeClass("width-26 height-26 color-red border-solid-boldred-2")
		$("#check").removeClass("width-30 height-30 back-boldred color-white")
		$("#check").addClass("width-26 height-26 color-red border-solid-boldred-2")
		$("#write").removeClass("width-30 height-30 back-boldred color-white")
		$("#write").addClass("width-26 height-26 color-red border-solid-boldred-2")
		
		$("#resultText").addClass("color-boldred");
		$("#writeText").removeClass("color-boldred");
		$("#checkText").removeClass("color-boldred");
		$("#save").html("重新认证");
		$("#save").addClass("width-80")
		$("#bankName").removeAttr("readonly");
		$("#bankNo").removeAttr("readonly");
		$("#save").removeClass("hidden");
		$("#uploadLicenseFile").removeClass("hidden");
		if(companyAuthStatus=="reject"){
			$("#isAuthText").html("未通过！");
		}
	}
}
//提交认证信息后 设为只读 
function readOnly(){
	$("#save").addClass("hidden");
	$("#bankName").attr("readonly","true");
	$("#bankNo").attr("readonly","true");
	$("#uploadLicenseFile").addClass("hidden");
}
/*function isAuth(){
	
}*/
//提交认证信息后 session设置
function isChecked(){
	$.ajax({
		type : "POST",
		url : ctxRoot + "/companyAuth/getList",
		data : {
		},
		dataType : "json",
		success : function(data) {
			if (data.state){
				if(data.extendMap.list.length!=0){
						$("#bankName").val(data.extendMap.list[0].bankName);
						$("#bankNo").val(data.extendMap.list[0].bankNo);
					if(data.extendMap.list[0].status=="create"){
						$("#check").addClass("width-30 height-30 back-boldred color-white")
						$("#check").removeClass("width-26 height-26 color-red border-solid-boldred-2")
						$("#write").removeClass("width-30 height-30 back-boldred color-white")
						$("#write").addClass("width-26 height-26 color-red border-solid-boldred-2")
						$("#result").removeClass("width-30 height-30 back-boldred color-white")
						$("#result").addClass("width-26 height-26 color-red border-solid-boldred-2")
						
						$("#checkText").addClass("color-boldred");
						$("#writeText").removeClass("color-boldred");
						$("#resultText").removeClass("color-boldred");
						$("#isAuthText").removeClass("icon-isAuth");
						$("#isAuthText").html("待审核");
						readOnly();
					}
					if(data.extendMap.list[0].status=="pass"||data.extendMap.list[0].status=="reject"){
						$("#result").addClass("width-30 height-30 back-boldred color-white")
						$("#result").removeClass("width-26 height-26 color-red border-solid-boldred-2")
						$("#check").removeClass("width-30 height-30 back-boldred color-white")
						$("#check").addClass("width-26 height-26 color-red border-solid-boldred-2")
						$("#write").removeClass("width-30 height-30 back-boldred color-white")
						$("#write").addClass("width-26 height-26 color-red border-solid-boldred-2")
						
						$("#resultText").addClass("color-boldred");
						$("#writeText").removeClass("color-boldred");
						$("#checkText").removeClass("color-boldred");
						$("#save").html("重新认证");
						$("#save").addClass("width-80")
						$("#save").removeClass("hidden");
						if(data.extendMap.list[0].status=="reject"){
							$("#isAuthText").html("未通过！");
							$("#isAuthText").removeClass("icon-isAuth");
						}
					}
				}
			} else {
			}
		}
	});
}