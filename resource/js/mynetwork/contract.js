$(document).ready(function() {	
	if(loginCompanyType == "all"){
		getSuppliers();
		getBuyers();
		var supplierId = getUrlParam("supplierId");
		var buyerId = getUrlParam("buyerId");
		if(isNull(supplierId) && isNull(buyerId)){
			changeType();
		}
	} else if(loginCompanyType == "buyer"){
		$("#supplierDiv").removeClass("hidden");
		getSuppliers();
	} else {
		$("#buyerDiv").removeClass("hidden");
		getBuyers();	
	}
});

// 切换当前的身份
function changeType(){
	if($("#selectBuyer").attr('checked')){
		$("#buyerDiv").addClass("hidden");
		$("#supplierDiv").removeClass("hidden");
	} else {
		$("#supplierDiv").addClass("hidden");
		$("#buyerDiv").removeClass("hidden");
	}
	loadContractList();
}

// 选择供应商
function getSuppliers(){
	$('#supplierName').combobox({
	    url: ctxRoot + "/customer/getSupplierList?isEasyUI=1&sort=name desc",
	    textField: 'name',
	    valueField: 'id',
	    onLoadSuccess:function(data){
	    	var supplierId = getUrlParam("supplierId");
	    	if(!isNull(supplierId)){
	    		$("#buyerDiv").addClass("hidden");
	    		$("#supplierDiv").removeClass("hidden");
	    		$('#supplierName').combobox("setValue",supplierId);
	    		if(loginCompanyType == "all"){
		    		$('#selectBuyer').attr("checked", true);
		    		changeType();
	    		}
	    	}
	    	if(loginCompanyType == "buyer"){
	    		loadContractList();
	    	}    		
	    }
	});
}

// 选择买方
function getBuyers(){
	$('#buyerName').combobox({
	    url: ctxRoot + "/customer/getBuyerList?isEasyUI=1&sort=name desc",
	    textField: 'name',
	    valueField: 'id',
	    onLoadSuccess:function(data){
	    	var buyerId = getUrlParam("buyerId");
	    	if(!isNull(buyerId)){
	    		$("#supplierDiv").addClass("hidden");
	    		$("#buyerDiv").removeClass("hidden");
	    		$('#buyerName').combobox("setValue",buyerId);
	    		if(loginCompanyType == "all"){
		    		$('#selectSuppier').attr("checked",true);
		    		changeType();
	    		}
	    	}
    		loadContractList();
	    }
	});
}

//加载交易列表
function loadContractList(){
	var params = {"isAjax":"y", "isEasyUI":"1"};
	var selectType;
	
	if(loginCompanyType == "all"){
		if($("#selectBuyer").attr('checked')){
			selectType = "buyer";
		} else {
			selectType = "supplier";
		}
	} else if(loginCompanyType == "buyer"){
		selectType = "buyer";		
	} else {
		selectType = "supplier";		
	}
	
	if(selectType == "buyer"){
		params.type = "buyer";
		var supplierId = $('#supplierName').combobox('getValue');
		if(supplierId != 0){
			params.supplierId = supplierId;
		}
	} else {
		params.type = "supplier";
		var buyerId = $('#buyerName').combobox('getValue');
		if(buyerId != 0){
			params.buyerId = buyerId;
		}
	}
	
	var contractDate = $('#contractDate').datebox('getValue');
	if(!isNull(contractDate)){
		params.contractDate = contractDate;
	}

	var contractNo = $('#contractNo').numberbox('getValue');
	if(!isNull(contractNo)){
		params.likeContractNo = contractNo;
	}

	$("#icon-none").addClass("hidden");
	$("#contractListDiv").removeClass("height-50");
	$("#contractListDiv").addClass("height-450");
	
	if(selectType == "buyer"){
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
			   {field:'contractNo', title:'合同号码',  align:'left', width:'15%', sortable:true , formatter:getContractNo},
			   {field:'supplierName', title:'供应商名称',  align:'left', width:'23%', sortable:true , formatter:getSname},
			   {field:'contractDate', title:'合同日期', align:'center', width:'10%' , sortable:true, formatter:function(val,row){return row.contractDateStr;}},
			   {field:'tradeAmount', title:'成交金额', align:'right', width:'13%', sortable:true , formatter:function(val){return formatMoney(val);}},
			   {field:'tradeDiscount', title:'折扣金额', align:'right', width:'10%' , sortable:true, formatter:function(val){return formatMoney(val);}},
			   {field:'tradeDPR', title:'折扣利率', align:'right', width:'10%' , formatter:function(val,row){return calculateDpr(row.tradeAmount, row.tradeDiscount) + "%";}},
			   {field:'status', title:'状态', align:'center', width:'10%', formatter:function(val){return getContractStatus(val);}},
			   {field:'downLoadPDF', title:'操作',  align:'center', width:'8%', formatter:downLoadPDF},
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
	} else if (selectType == "supplier"){
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
			   {field:'contractNo', title:'合同号码',  align:'left', width:'15%', sortable:true, formatter:getContractNo},
			   {field:'contractDate', title:'合同日期', align:'center', width:'10%', sortable:true, formatter:function(val,row){return row.contractDateStr;}},
			   {field:'code', title:'交易号码', align:'center', width:'8%', sortable:true, formatter:function(val,row){return row.contractDateStr;}},
			   {field:'buyerName', title:'买方名称',  align:'left', width:'20%', sortable:true, formatter:getBname},
			   
			   {field:'tradeAmount', title:'成交金额', align:'right', width:'10%', sortable:true, formatter:function(val){return formatMoney(val);}},
			   {field:'tradeDiscount', title:'折扣金额', align:'right', width:'10%', sortable:true, formatter:function(val){return formatMoney(val);}},
			   {field:'tradeDPR', title:'折扣利率', align:'right', width:'8%' , formatter:function(val,row){return calculateDpr(row.tradeAmount, row.tradeDiscount) + "%";}},
			   {field:'status', title:'状态',  align:'center', width:'10%', formatter:function(val){return getContractStatus(val);}},
			   {field:'downLoadPDF', title:'操作',  align:'center', width:'8%', formatter:downLoadPDF},
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
}

//点击合同号码跳转详情
function getContractNo(val, row){
	return "<span class='color-minblue changecolorblue link' title='"+row.contractNo+"' onclick=\"openUrl(\'/contract/getDetail?id="+row.id+"\');\">"+row.contractNo+"</span>";
}

//供应商名称
function getSname(val, row){
	return "<span title='"+row.supplierName+"'>"+splitString(row.supplierName,40)+"</span>";
}

//买方名称
function getBname(val, row){
	return "<span title='"+row.buyerName+"'>"+splitString(row.buyerName,40)+"</span>";
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