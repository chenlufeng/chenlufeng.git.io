$(document).ready(function() {
	if(loginCompanyType == "all"){
		$("#mySupplierRadio").attr("checked", "checked");
	}
	loadCustomerList();
});
function loadCustomerList(likeName){
	var selectType = "";
	if(loginCompanyType == "buyer"){
		selectType = "supplier";
	} else if(loginCompanyType == "supplier"){
		selectType = "buyer";
	} else {
		if($("#myBuyerRadio").attr('checked')){
			selectType = "buyer";
		} else {
			selectType = "supplier";
		}
	}

	var url = "";
	if(selectType == "buyer"){
		url = ctxRoot + "/customer/getBuyerPage";
	} else {
		url = ctxRoot + "/customer/getSupplierPage";
	}
	
	var params = {"isAjax":"y", "isEasyUI":"1", "pageSize":10};
	if(!isNull(likeName)){
		params.likeName = likeName;
	}
	if ($("#attention").text() == "所有伙伴") {
		params.isAttention = "y";
	}

	$("#icon-none").addClass("hidden");
	$("#customerListDiv").removeClass("height-50");
	$("#customerListDiv").addClass("height-450");
	$('#customerList').datagrid({
		url: url,
		loadMsg: "载入中...",
		queryParams: params,
		singleSelect: true,
		pagination: true,
		pageList: [10, 20, 30, 40, 50],
		pageSize: 10,
		fit: true,
		fitColumns : true,
		sortName: "id",
		sortOrder: "asc",
		rownumbers: true,
		rownumberWidth: 40,
		columns:[[
		   {field:'name', title:'企业名称',  align:'left', width:'30%', sortable:true},
		   {field:'contact', title:'联系人',  align:'left', width:'15%', sortable:true},
		   {field:'contactTel', title:'联系电话', align:'left', width:'15%', sortable:true},
		   {field:'contactEmail', title:'联系邮箱', align:'left', width:'24%', sortable:true},
		   {field:'operate', title:'操作', align:'center', width:'15.8%', formatter:function(value, row, index){
			   var operate = "";			   
			   if(selectType == "supplier"){
				   if (row.isAttention == "y") {
					   	operate = "<div id='addAtten" + row.id + "' onclick='cancelAttention(" + row.id + ")' class='float-left margin-w-5 color-orange link' title='取消关注'>取消关注</div>"
							    + "<div id='cancelAtten" + row.id + "' onclick='addAttention(" + row.id + ")' class='float-left margin-w-5 color-blue link hidden' title='添加关注'>添加关注</div>";
				   } else {
						operate = "<div id='addAtten" + row.id + "' onclick='cancelAttention(" + row.id + ")' class='float-left margin-w-5 color-orange link hidden' title='取消关注'>取消关注</div>"
						   		+ "<div id='cancelAtten" + row.id + "' onclick='addAttention(" + row.id + ")' class='float-left margin-w-5 color-blue link' title='添加关注'>添加关注</div>";						
				   }
				   if (row.status == "active") {
					   operate += "<div id='addAtten" + row.id + "' onclick='reezeCustomer("+row.id+")' class='link color-blue float-left margin-left-5'>冻结</div>"
					   		   +  "<div id='addAtten" + row.id + "' onclick='activeCustomer("+row.id+")' class='link color-red float-left margin-left-5 hidden'>激活</div>";
				   } else {
					   operate += "<div id='addAtten" + row.id + "' onclick='reezeCustomer("+row.id+")' class='link color-blue float-left margin-left-5 hidden'>冻结</div>"
			   		   		   +  "<div id='addAtten" + row.id + "' onclick='activeCustomer("+row.id+")' class='link color-red float-left margin-left-5'>激活</div>";						   
				   }
			   } else {
				   if (row.isAttention == "y") {
					   	operate = "<div id='addAtten" + row.id + "' onclick='cancelAttention(" + row.id + ")' class='float-left margin-w-40 color-orange link' title='取消关注'>取消关注</div>"
							    + "<div id='cancelAtten" + row.id + "' onclick='addAttention(" + row.id + ")' class='float-left margin-w-40 color-blue link hidden' title='添加关注'>添加关注</div>";
				   } else {
						operate = "<div id='addAtten" + row.id + "' onclick='cancelAttention(" + row.id + ")' class='float-left margin-w-40 color-orange link hidden' title='取消关注'>取消关注</div>"
						   		+ "<div id='cancelAtten" + row.id + "' onclick='addAttention(" + row.id + ")' class='float-left margin-w-40 color-blue link' title='添加关注'>添加关注</div>";						
				   }
			   }
			   return operate;
		   }}
		]],
		onLoadSuccess: function(data){
			if (data.total == 0) {
                $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
				$("#customerListDiv").removeClass("height-450");
				$("#customerListDiv").addClass("height-50");
				$("#icon-none").removeClass("hidden");
            }
		}
	});
}


function attention() {
	var attention = $("#attention").text();
	if (attention == "重点关注") {
		$("#attention").html("所有伙伴");
	} else {
		$("#attention").html("重点关注");
	}
	loadCustomerList();
}

function addAttention(followId) {
	$.ajax({
		url : ctxRoot + "/attention/add",
		type : 'post',
		data : {
			followId : followId,
		},
		dataType : "json",
		success : function(data) {
			loadCustomerList();
		},
		error : function(msg) {
		},
	});
}

function cancelAttention(followId) {
	$.ajax({
		url : ctxRoot + "/attention/cancel",
		type : 'post',
		data : {
			followId : followId,
		},
		dataType : "json",
		success : function(data) {
			loadCustomerList();
		},
		error : function(msg) {
		},
	});
}

function reezeCustomer(id){
	$.ajax({
		url : ctxRoot + "/customer/reezeSupplier",
		type : 'post',
		data : {"supplierId":id},
		dataType : "json",
		success : function(data) {
			loadCustomerList();
			openMsg('公司冻结成功!');
		},
		error : function(msg) {
		},
	});
}

function activeCustomer(id){
	$.ajax({
		url : ctxRoot + "/customer/activeSupplier",
		type : 'post',
		data : {"supplierId":id},
		dataType : "json",
		success : function(data) {
			loadCustomerList();
			openMsg('公司激活成功!');
		},
		error : function(msg) {
		},
	});
}