$(document).ready(function() {	
	getSuppliers();
	getContractTotal();
});

// 选择供应商
function getSuppliers(){
	$('#supplierName').combobox({
	    url: ctxRoot + "/customer/getSupplierList?isEasyUI=1&sort=name desc",
	    textField: 'name',
	    valueField: 'id',
	    onLoadSuccess:function(data){
	    	var supplierId = getUrlParam("supplierId");
	    	if(!isNull(supplierId)){
	    		$('#supplierName').combobox("setValue",supplierId);
	    	} 
	    	loadContractList();
	    }
	});
}

//获取合同汇总
function getContractTotal(){
	$.ajax({
		url : ctxRoot + "/contract/getBuyerContractTotal",
		type: 'POST',
		data : {},
		dataType: "json",
		success	: function(data){
			if(data.state && data.extendMap.model != null){
				var model = data.extendMap.model;
				$('#t_contractCount').html(model.contractCount);
				$('#t_tradeAmount').html(formatMoney(model.tradeAmount, 0));
				$('#t_tradeDiscount').html(formatMoney(model.tradeDiscount, 0));
				$('#t_contractAvgDPR').html(model.contractAvgDPR);
			} else {
				$('#t_contractCount').html("0");
				$('#t_tradeAmount').html("0");
				$('#t_tradeDiscount').html("0");
				$('#t_contractAvgDPR').html("0");
			}
		},
		error: function(msg){
			return false;
		}
	});
}

//加载合同列表
function loadContractList(){
	var params = {"isAjax":"y", "isEasyUI":"1", "type":"buyer"};
	
	var supplierId = $('#supplierName').combobox('getValue');
	if(supplierId != 0){
		params.supplierId = supplierId;
	}
	
	var contractDate = $('#contractDate').datebox('getValue');
	if(!isNull(contractDate)){
		params.contractDate = contractDate;
	}

	var contractNo = $('#contractNo').numberbox('getValue');
	if(!isNull(contractNo)){
		params.likeContractNo = contractNo;
	}
	
	var contractCode = $('#contractCode').numberbox('getValue');
	if(!isNull(contractCode)){
		params.likeCode = contractCode;
	}

	$("#icon-none").addClass("hidden");
	$("#contractListDiv").removeClass("height-50");
	$("#contractListDiv").addClass("height-450");
	
	$('#contractList').datagrid({
		url: ctxRoot + "/contract/getPage",
		loadMsg: "载入中...",
		queryParams: params,
		singleSelect: true,
		pagination: true,
		pageList: [10, 20, 30, 40, 50],
		pageSize: 10,
		fit: true,
		fitColumns : true,
		sortName: "contractNo",
		sortOrder: "desc",
		rownumbers: true,
		rownumberWidth: 40,
		columns:[[
		   {field:'contractNo', title:'合同号码',  align:'left', width:'12%', sortable:true , formatter:getContractNo},
		   {field:'contractDate', title:'合同日期', align:'center', width:'11%' , sortable:true, formatter:function(val,row){return row.contractDateStr;}},
		   {field:'supplierName', title:'供应商名称',  align:'left', width:'25%', sortable:true , formatter:getSname},
		   {field:'code', title:'交易号码', align:'center', width:'10%' , sortable:true},
		   {field:'tradeAmount', title:'成交金额', align:'right', width:'8%', sortable:true , formatter:function(val){return formatMoney(val);}},
		   {field:'tradeDiscount', title:'折扣金额', align:'right', width:'8%' , sortable:true, formatter:function(val){return formatMoney(val);}},
		   {field:'tradeDPR', title:'折扣利率', align:'right', width:'8%' , formatter:function(val,row){return calculateDpr(row.tradeAmount, row.tradeDiscount) + "%";}},
		   {field:'status', title:'状态', align:'center', width:'10%', formatter:function(val){return getContractStatus(val);}},
		   {field:'downLoadPDF', title:'操作', align:'center', width:'8%', formatter:downLoadPDF},
		]],
		onLoadSuccess: function(data){
			if (data.total == 0) {
                $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
				$("#contractListDiv").removeClass("height-450");
				$("#contractListDiv").addClass("height-50");
				$("#icon-none").removeClass("hidden");
            }
		}
	});

}

//点击合同号码跳转详情
function getContractNo(val, row){
	return "<span class='color-minblue changecolorblue link' title='"+row.contractNo+"' onclick=\"openUrl(\'/contract/payables/getDetail?id="+row.id+"\');\">"+row.contractNo+"</span>";
}

//供应商名称
function getSname(val, row){
	return "<span title='"+row.supplierName+"'>"+splitString(row.supplierName,40)+"</span>";
}

//获取状态
function getContractStatus(status){
	if(status == "match"){
		return "<span style='color:#f3b02f;'>可确认意向</span>";
	} else if(status == "confirm"){
		return "<span style='color:#da3aed;'>买方已确认</span>";
	} else if(status == "pay"){
		return "<span style='color:#da3410;'>买方已支付</span>";
	} else if(status == "failByUnconfirm"){
		return "<span style='color:#93da2d;'>过期未确认</span>";
	} else if(status == "failByUnpay"){
		return "<span style='color:#93da2d;'>过期未支付</span>";
	}
}

//下载合同
function downLoadPDF(val, row){
	var url = JSON.stringify(row.contractFile);
	var str = "";
	if(!isNull(row.contractFile)){
		str = "<div title='下载合同PDF文件' onclick='download("+url+")' class='text-center font-yahei width-50 margin-auto-w height-25 line-height-25 border-solid-orange border-radius-3 color-orange back-white changebackorange changecolorwhite link'>下载</div>";
	} 
	return str;
}

function download(fileUrl){
	index1 = fileUrl.lastIndexOf('/');
	index2 = index1-8;
	openUrl('/file/downloadContractPDF'+'?'+'url='+fileUrl.substring(index2), true);
}