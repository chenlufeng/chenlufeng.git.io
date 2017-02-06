$(document).ready(function () {
	getInfo();
});

//获取列表
function getInfo() {
	$("#logo").attr("src",$('#companyLogo').val() == '' ? ctxRoot+"/resource/image/nologo.jpg" : $('#companyLogo').val());
	
	$('#invoiceList').datagrid({
		url: ctxRoot + "/invoice/getPreviewList",
		loadMsg: "载入中...",
		queryParams: {"isEasyUI":"1"},
		singleSelect: true,
		pagination: true,
		pageList: [10, 20, 30, 40, 50],
		pageSize: 10,
		fit: true,
		fitColumns : true,
		sortName: "originalDate",
		sortOrder: "asc",
		rownumbers: true,
		rownumberWidth: 40,
		columns:[[
		   {field:'supplierName', title:'供应商',  align:'center', width:'25%', sortable:true, formatter:getSupplierName},
		   {field:'code', title:'交易号码',  align:'center', width:'25%', sortable:true},
		   {field:'originalDate', title:'原到期日', align:'center', width:'24%', sortable:true, formatter:function(val, row){return row.originalDateStr;}},
		   {field:'originalAmount', title:'金额',  align:'center', width:'25%', sortable:true}
		]],
		onLoadSuccess: function(data){
			var rows = $('#invoiceList').datagrid('getRows')//获取当前的数据行
			$('#invoiceCount').html(data.total);
	        getAmountCount();
		}
	});
}

//查询金额和交易数量
function getAmountCount(){
	$.ajax({
		type : "POST",
		url : ctxRoot + "/invoice/getAmountCount",
		data : {},
		dataType : "json",
		success : function(data) {
			var list = data.extendMap.list;
			var amount = 0;
			if(data.state && list != null){
				for(var i = 0; i< list.length; i++){
					amount += list[i].originalAmount;
				}
				$('#invoiceAmount').html(amount);
			} else {
				$('#invoiceAmount').html(0);
			}
		}
	});
}

//显示供应商名称
function getSupplierName(val, row){
	return "<span class='color-gray' title='"+row.supplierName+"'>"+splitString(row.supplierName,30)+"</span>";
}

//注册
function toRegist(){
	var id = getUrlParam("id");
	var code = getUrlParam("verificationCode");
	var url="/user/regist?id="+id+"&verificationCode="+code+"";
	openUrl(url);
}
