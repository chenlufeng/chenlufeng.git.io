function validName(){
	var name = $("#name").textbox("getValue");
	if (isNull(name)) {
		$("#nameErrorMsg").html("姓名不能为空!");
		return false;
	} else {
		$("#nameErrorMsg").html("");
		return true;
	}
}

function validTel(){
	var tel = $("#tel").textbox("getValue");
	if (isNull(tel)) {
		$("#telErrorMsg").html("电话不能为空!");
		return false;
	} else {
		$("#telErrorMsg").html("");
		return true;
	}
}

function modify(){
	if(validName() && validTel()){
		var params = {};
		var name = $("#name").textbox("getValue");
		params.name = name;
		var tel = $("#tel").textbox("getValue");
		params.tel = tel;
		var post = $("#post").combobox("getValue");
		if(!isNull(post) && post != "-- 请选择 --"){
			params.post = post;
		}
		if($("#sex_man").attr('checked')){
			params.sex = "男";
		}
		if($("#sex_woman").attr('checked')){
			params.sex = "女";
		}
		$.ajax({
			url : ctxRoot + "/user/modify",
			type : 'post',
			dataType : "json",
			data : params,
			success : function(data) {
				if(data.state){
					openMsg("修改个人资料成功！");
				} else{
					$.messager.alert('修改个人资料失败', data.message, 'error');
				}
			},
			error : function(data) {
				return false;
			}
		});
	}
}