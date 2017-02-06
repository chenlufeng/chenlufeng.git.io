$(document).ready(function() { 
	getList();
})

function showDiv() {
	 $('#div1').show();
	 $('#div2').show();
}

//打开弹出层
function showQuoteLayout(){
	var count = 0;
	$("#child tr:gt(0)").each(function(i){
	    $(this).children("td").each(function(i){
	       if($(this).text()=="正常"){
	    	   count = count+1;
	       }
	    });
	});
	if(count<6){
		var clientWidth = document.body.clientWidth;
		$("#layout-shadow").removeClass("hidden");
		$("#layout-childAccount").css("right", (clientWidth - 600) / 2);
		$("#layout-childAccount").removeClass("hidden");
	}else{
		openMsg('操作失败','账号数量已满');
	}
}

//关闭弹出层
function closeQuoteLayout() {
	$("#errorMsg").html("");
	$("#errorMsgPhone").html("");
	$("#errorMsgEmail").html("");
	$("#errorMsgPassword").html("");
	$("#errorMsgPassword2").html("");
	$("#nameDiv").removeClass("hidden");
	$("#checkboxDiv").removeClass("hidden");
	$("#radioDiv").removeClass("hidden");
	$("#phoneDiv").removeClass("hidden");
	$("#emailDiv").removeClass("hidden");
	$("#passwordDiv").removeClass("hidden");
	$("#passwordDiv2").removeClass("hidden");
	$("#btn0").removeClass("hidden");
	$("#btn1").addClass("hidden");
	$("#isAdmin").attr("checked",false);
	$("#isFavorite").attr("checked",false);
	$("#isResetPass").attr("checked",false);
	$("#email").attr("readonly",false);
	$("#name").val("");
	$("#password").val("");
	$("#confirmpassword").val("");
	$("#email").val("");
	$("#tel").val("");
	$("#layout-shadow").addClass("hidden");
	$("#layout-childAccount").addClass("hidden");
}
//打开弹出层
function showLayout2(id){
	var clientWidth = document.body.clientWidth;
	$("#layout-shadow").removeClass("hidden");
	$("#layout-childAccountPermission").css("right", (clientWidth - 600) / 2);
	$("#layout-childAccountPermission").removeClass("hidden");
	$('#userId').val(id);
	$('#tt').tree({
	    url: ctxRoot + '/user/permission/getAllowGrantList',
	    queryParams: {"isAjax":"y","id":id},
	    loadFilter: function(data){    	    
            return data;        
        }       
	});
	
}
function addPermission(){
	var userId = $("#userId").val();
	var permissionIds = '';
	var nodes = $('#tt').tree('getChecked');
	for ( var i = 0; i < nodes.length; i++) {
	   if (permissionIds != '') {
		   permissionIds += ',';
	   }
	   permissionIds += nodes[i].id;
	}
	var params ={"isAjax":"y","userId":userId,"permissionIds":permissionIds};
	$.ajax({
        type: 'POST',   
        url: ctxRoot + '/user/permission/add', 
        data: params,
		dataType: "json",
        success: function(data){
        	closeLayout2();
        	openMsg('子账号授权成功');
        }, 
        error: function(data){
            
        }
    });
}
//关闭弹出层
function closeLayout2() {
	$("#layout-shadow").addClass("hidden");
	$("#layout-childAccountPermission").addClass("hidden");
}

function insertUser(){	
	var name = $("#name").val();
	if(!isNull(name)){
		$("#errorMsgName").html("");
	}else{
		$("#errorMsgName").html("用户姓名不能为空!");
		return;
	}

	var tel = $("#tel").val();	
	if (!isNull(tel)) {
		$("#errorMsgTel").html("");
	} else{
		$("#errorMsgTel").html("联系电话不能为空!");
		return;
	}

	var email = $("#email").val();
	if(!isNull(email)){
		if(isEmail(email)){
			$("#errorMsgEmail").html("");
		} else{
			$("#errorMsgEmail").html("邮箱格式不正确!");
			return;
		}
	} else{
		$("#errorMsgEmail").html("登录邮箱不能为空!");
		return;
	}
	
	var password = $("#password").val();
	if (!isNull(password)) {
		if (isStrength(password)) {
			$("#errorMsgPassword1").html("");
		} else {
			$("#errorMsgPassword1").html("至少六位且包含大小写字母数字!");
			return;
		}
	} else {
		$('#errorMsgPassword1').html('登录密码不能为空!');
		return;
	}
	
	var confirmpassword = $("#confirmpassword").val();	
	if(!isNull(confirmpassword)){
		if(password == confirmpassword){
			$('#errorMsgPassword2').html('');
		} else {
			$('#errorMsgPassword2').html('两次密码不一致');
			return;
		}
	}else{
		$('#errorMsgPassword2').html('确认密码不为能为空!');
	}
	
	password = $.md5(password);

	var isAdmin = $("input[name='isAdmin']:checked").val();
	var isFavorite = "n";
	if ($('#isFavorite').prop('checked')) {
		isFavorite="y";
	}
	var isResetPass = "n";
	if ($('#isResetPass').prop('checked')) {
		isResetPass="y";
	}
	
	$.ajax({
        type: 'POST',   
        url: ctxRoot + '/user/addChildAcount',
        data: {"isAjax":"y", "name":name, "password":password, "email":email, "tel":tel,"isAdmin":isAdmin, "isFavorite":isFavorite, "isResetPass":isResetPass},
		dataType: "json",
        success: function(data){
            if(data.state==true){
            	if(data.message=='邮箱已存在'){
            		$.messager.confirm("添加子账号","该用户已存在，是否添加为新企业员工?",function(r){
						if(r){
							associatedChild();
						}
					})
            		return false;
            	}
            	openMsg('添加子账号成功');
            	closeQuoteLayout();
            	getList();
            }
            if(data.state==false){
            	openMsg('操作失败','服务异常');
            	closeQuoteLayout();
            	getList();
            }
        }, 
        error: function(data){
            
        }
    });
}

function associatedChild(){
	var email = $("#email").val();
	var isAdmin = $("input[name='isAdmin']:checked").val();
	var isFavorite = "n";
	if ($('#isFavorite').prop('checked')) {
		isFavorite="y";
	}
	$.ajax({
		url : ctxRoot + "/user/associatedChildAcount",
		type : 'post',
		data : {
			"email" : email,"isAdmin":isAdmin,"isFavorite":isFavorite
		},
		dataType : "json",
		success : function(data) {
			if(data.state){
				$.messager.alert("添加子账号","操作成功");
				closeQuoteLayout();
            	getList();
			}
		},
		error : function(data) {
		},
	});
}

function updateUser(){
	var name = $("#name").val();
	if(!isNull(name)){
		$("#errorMsgName").html("");
	}else{
		$("#errorMsgName").html("用户姓名不能为空!");
		return;
	}

	var tel = $("#tel").val();	
	if (!isNull(tel)) {
		$("#errorMsgTel").html("");
	} else{
		$("#errorMsgTel").html("联系电话不能为空!");
		return;
	}
	
	var isAdmin = $("input[name='isAdmin']:checked").val();
	var isFavorite = "n";
	if ($('#isFavorite').prop('checked')) {
		isFavorite="y";
	}
	var isResetPass = "n";
	if ($('#isResetPass').prop('checked')) {
		isResetPass="y";
	}
	
	$.ajax({
        type: 'POST',   
        url: ctxRoot + '/user/modifyChildAcount',
        data: {"isAjax":"y", "id":$("#id").val(), "name":name, "tel":tel, "isAdmin":isAdmin, "isFavorite":isFavorite, "isResetPass":isResetPass},
		dataType: "json",
        success: function(data){
        	openMsg('编辑子账号成功!');
        	closeQuoteLayout();
        	getList();
        }, 
        error: function(data){
            
        }
    });
}

function editUser(userId){
	var clientWidth = document.body.clientWidth;
	$("#layout-shadow").removeClass("hidden");
	$("#layout-childAccount").css("right", (clientWidth - 600) / 2);
	$("#layout-childAccount").removeClass("hidden");
	$.ajax({
        type: 'POST',   
        url: ctxRoot + '/user/getChildAcountDetail',
        data: {"isAjax":"y", "userId":userId},
		dataType: "json",
        success: function(data){
        	//缺少赋值给输入框
        	$("#id").val(data.extendMap.model.id);
        	$("#name").val(data.extendMap.model.name);
        	$("#email").val(data.extendMap.model.email);
        	$("#email").attr("readonly","readonly");
        	$("#tel").val(data.extendMap.model.tel);
        	if(data.extendMap.model.isFavorite=="y"){
        		$("#isFavorite").attr("checked",true);
        	}
        	if(data.extendMap.model.isAdmin=="n"){
        		$("#isAdmin2").attr("checked","checked");
        	}
        	if(data.extendMap.model.isResetPass=="y"){
        		$("#isResetPass").attr("checked",true);
        	}
        	$("#passwordDiv2").addClass("hidden");
        	$("#passwordDiv").addClass("hidden");
        	$("#btn0").addClass("hidden");
        	$("#btn1").removeClass("hidden");
        }, 
        error: function(data){
            
        }
    });	
}
function getList() {
	var params={"isAjax":"y"}
	$.ajax({
		url : ctxRoot + "/user/getChildAcountList",
		type : 'post',
		data : params, 
		dataType: "json",
		success	: function(data){
			if(data.state){
				showList(data.extendMap.list);
        	}else{
        		openMsg('操作失败！', data.message);
        	}
		},
		error: function(msg){
		},
	});
}

function showList(list){
	$('#child tr:gt(0)').remove();//删除之前的数据
	if(list == null || list.length <= 0){
		var str2 = "<tr class='border-bottom-solid changebackmingray height-30 line-height-30'>"+
		"<td class='padding-5 text-center'colspan='7'>暂无数据</td></tr>";
		$('#child').html(str2);
		return;
	}
	for(var i = 0;i < list.length; i++){
		var str5 = "<div onClick='reezeUser("+list[i].id+")' class='float-left margin-w-5 height-15 font-yahei line-height-15 color-blue text-center link'>冻结</div>"
		if(list[i].status == "reeze"){
			str5 ="<div onClick='activeUser("+list[i].id+")' class='float-left margin-w-5 height-15 font-yahei line-height-15 color-blue text-center link'>激活</div>"
		}
		var str4 = "一般用户";
		if(list[i].isAdmin=='n'){
			var str4 = "一般用户"
			var	str="<div onClick='editUser("+list[i].id+")' class='float-left margin-w-5 height-15 font-yahei line-height-15 color-blue text-center link'>编辑</div>" +
				str5+"<div onClick='showLayout2("+list[i].id+")' class='float-left margin-w-5 height-15 font-yahei line-height-15 color-blue text-center link'>权限</div>";
			if(list[i].isFavorite == "n"){
				var	str3="<div id="+list[i].id+" onClick='isfavoritefuntion("+list[i].id+")' class='float-left border-none width-60 height-15 margin-left-10 font-yahei line-height-25 color-blue text-center link'>常用联系人</div>";
			}else{
				str4 =str4+",常用联系人";
			}
		} else{
			var str = "";
			var	str4="管理员";
			if(list[i].isFavorite == 'n'){
			
			}else{
				var	str4=str4+",常用联系人";
			}
		}
		if(list[i].status == "active"){
			list[i].status = "正常";
		} else if(list[i].status == "reeze"){
			list[i].status = "冻结";
		}
		
		var str2 = "<tr class='border-bottom-solid changebackmingray height-30 line-height-30'>"+
				"<input type='hidden' value='"+list[i].id+"'>"+
				"<td class='width-20 padding-5 text-left'>"+(i+1)+"</td>"+
				"<td class='width-80 padding-5 text-left'>"+list[i].name+"</td>"+
				"<td class='width-240 padding-5 text-left'> <a class='easyui-tooltip link font-12' title='"+list[i].email+ "'>" +splitString(list[i].email,28)+"</td>"+
				"<td class='width-180 padding-5 text-left'>"+str4+"</td>"+
				"<td class='width-50 padding-5 text-left'>"+list[i].status+"</td>"+
				"<td class='width-120 padding-5 text-left'>"+list[i].tel+"</td>"+
				"<td class='width-170 padding-5 text-left'>"+list[i].createTimeStr+"</td>"+
				"<td class='width-180 padding-5 text-center font-10'>"+
					str
				"</td>"+
			"</tr>";
		$('#child').append(str2);
	}
	if($('#child tr').length<2){
		var str2 = "<tr class='border-bottom-solid changebackmingray height-30 line-height-30'>"+
		"<td class='padding-5 text-center'colspan='7'>暂无数据</td></tr>";
		$('#child').append(str2);
	}
}

function checkPassword(){
	var newPsw = $("#password").val();
	if (isNull(newPsw)) {
		$('#errorMsgPassword1').html('密码不能为空');
		return;
	} else {
		if (isStrength(newPsw)) {
			$("#errorMsgPassword1").html("");
		} else {
			$("#errorMsgPassword1").html("至少六位且包含大小写字母数字!");
			return;
		}
	}
}
function checkPsw(){
	var newPsw2 = $("#password").val();
	var newPsw =  $("#confirmpassword").val();
	if (isNull(newPsw)) {
		$('#errorMsgPassword2').html('密码不能为空');
		return;
	} else if (!isStrength(newPsw)) {
		$("#errorMsgPassword2").html("至少六位且包含大小写字母数字!");
		return;
	} else  if (newPsw!=newPsw2) {
		$("#errorMsgPassword2").html("两次次密码不一致!");
		return;
	}
	$("#errorMsgPassword2").html("");
}

function reezeUser(userId){
	$.ajax({
        type: 'POST',   
        url: ctxRoot + '/user/reezeChildAcount',
        data: {"isAjax":"y","userId":userId},
		dataType: "json",
        success: function(data){
            if(data.state){
            	getList();
            	openMsg('子账号冻结成功');
            } else {
            	
            }
        }, 
        error: function(data){
            
        }
    });
}

function activeUser(userId){
	var count = 0;
	$("#child tr:gt(0)").each(function(i){
	    $(this).children("td").each(function(i){
	       if($(this).text()=="正常"){
	    	   count = count+1;
	       }
	    });
	});
	if(count<6){
		$.ajax({
	        type: 'POST',   
	        url: ctxRoot + '/user/activeChildAcount',
	        data: {"isAjax":"y","userId":userId},
			dataType: "json",
	        success: function(data){
	            if(data.state){
	            	getList();
	            	openMsg('子账号激活成功!');
	            } else {
	            	
	            }
	        }, 
	        error: function(data){
	            
	        }
	    });
	}else{
		openMsg('操作失败','账号数量已满');
	}
}

function edit(){
	$("#nameDiv").removeClass("hidden");
	$("#radioDiv").removeClass("hidden");
	$("#checkboxDiv").removeClass("hidden");
	$("#phoneDiv").removeClass("hidden");
	$("#emailDiv").removeClass("hidden");
	$("#passwordDiv").addClass("hidden");
	$("#passwordDiv2").addClass("hidden");
	$("#btn1").removeClass("hidden");
	$("#btn2").removeClass("hidden");
	$("#btn3").addClass("hidden");
	$("#btn4").addClass("hidden");
}