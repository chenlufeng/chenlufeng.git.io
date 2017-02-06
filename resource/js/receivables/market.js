$(document).ready(function() {
	initFilter();
	getBuyerMarket();
	getMarketTotal();
	loadMarketList();
});

//初始化筛选条件
function initFilter(){
	$('#companyName').combobox({
	    url: ctxRoot + "/customer/getBuyerList?isEasyUI=1&sort=name desc",
	    textField: 'name',
	    valueField: 'id',
	    onSelect: function(row){
	    	loadMarketList();
	    }
	});

	$('#status').combobox({
		onChange: function(newValue, oldValue){
			loadMarketList();
	    }
	});
}

//查询市场行情
function getBuyerMarket(){
	$.ajax({
		url : ctxRoot + "/give/getBuyerMarket",
		type: 'POST',  
		data : {}, 
		dataType: "json",
		success	: function(data){
			var model = data.extendMap.model;
			if(model == null){
				$('#releaseTotalAmount').html(0);
				$('#availableTotalAmount').html(0);
				$('#quoteMaxAPR').html(0);
				$('#buyerCount').html(0);
				return;
			} else {
				$('#releaseTotalAmount').html(formatMoney(model.releaseTotalAmount,0));
				$('#availableTotalAmount').html(formatMoney(model.availableAmount,0));
				$('#quoteMaxAPR').html(model.quoteMaxAPR);
				$('#buyerCount').html(model.buyerCount);
			}
		},
		error: function(msg){
			return false;
		},
	});
}

//查询今日报价和今日成交
function getMarketTotal(){
	$.ajax({
		url : ctxRoot + "/invoice/getSupplierTodayMarketTotal",
		type: 'POST',  
		data : {}, 
		dataType: "json",
		success	: function(data){
			var model = data.extendMap.model;
			if(model == null){
				//今日报价
				$('#quoteAmount').html("0");
				$('#quoteAvgAPR').html("0");
				$('#quoteCount').html("0");
				//今日成交
				$('#tradeAmount').html("0");
				$('#tradeAvgAPR').html("0");
				$('#tradeCount').html("0");
				return;
			} else {
				$('#availableAmount').html(formatMoney(model.availableAmount,0));
				$('#availableCount').html(model.availableCount);
				
				$('#quoteAmount').html(formatMoney(model.quoteAmount,0));
				$('#quoteAvgAPR').html(model.quoteAvgAPR);
				$('#quoteCount').html(model.quoteCount);
				
				$('#tradeAmount').html(formatMoney(model.tradeAmount,0));
				$('#tradeAvgAPR').html(model.tradeAvgAPR);
				$('#tradeCount').html(model.tradeCount);
			}
		},
		error: function(msg){
			return false;
		}
	});
}

var isInitMarketList = "n";
//加载交易列表
function loadMarketList(){
	var params = {"isAjax":"y", "isEasyUI":"1", "isToday":"y"};
	var buyerId = $('#companyName').combobox('getValue');
	if(buyerId != 0){
		params.buyerId = buyerId;
	}

	var statuses = $('#status').combobox("getValue");
	if(!isNull(statuses) && statuses != 'all'){ 
		params.statuses = statuses;
	}
	
	var code = $('#code').textbox("getValue");
	if(!isNull(code)){
		params.likeCode = code;
	}
	
	var focusType = $("#focusType").val();
	if(focusType == "y"){
		params.focusType = "supplier";
	}

	$("#icon-none").addClass("hidden");
	$("#marketListDiv").removeClass("height-50");
	$("#marketListDiv").addClass("height-450");
	
	if(isInitMarketList == "n"){
		var sortName = "originalDate";
		if(isTradeDate){
			if(isTradeTime()){
				sortName =  "quoteAPR";
			} else if(isAfterTradeTime()){
				sortName =  "tradeAPR desc, quoteAPR";
			}
		}
		$('#marketList').datagrid({
			url: ctxRoot + "/invoice/getRecMarketPage",
			loadMsg: "载入中...",
			queryParams: params,
			singleSelect: true,
			pagination: true,
			pageList: [10, 20, 30, 40, 50],
			pageSize: 10,
			fit: true,
			fitColumns : true,
			sortName: sortName,
			sortOrder: "desc",
			rownumbers: true,
			rownumberWidth: 40,
			columns:[[
			   {field:'buyerName', title:'买方',  align:'left', width:'20%', sortable:true, formatter:getBuyerName},
			   {field:'code', title:'交易号码',  align:'center', width:'8%', sortable:true},
			   {field:'originalDate', title:'计划付款日', align:'center', width:'9%', sortable:true, formatter:function(val, row){return row.originalDateStr;}},
			   {field:'originalDateStr', title:'计划付款日', align:'center', width:'9%', sortable:true, editor:'datebox', hidden:true},
			   {field:'newDateStr', title:'新付款日', align:'center', width:'9%', sortable:true},
			   {field:'availableAmount', title:'最大可报',  align:'right', width:'8%', sortable:true},
			   {field:'quoteAmount', title:'报价金额',  align:'right', width:'8%', sortable:true},
			   {field:'quoteAPR', title:'报价利率',  align:'right', width:'8%', sortable:true, formatter:function(val){return val+"%";}},
			   {field:'quoteDPR', title:'报价折扣率',  align:'right', width:'8%', sortable:true, hidden:true, formatter:function(val){return val+"%";}},
			   {field:'tradeAmount', title:'成交金额',  align:'right', width:'8%', sortable:true},
			   {field:'tradeAPR', title:'成交利率',  align:'right', width:'8%', sortable:true, formatter:function(val){return val+"%";}},
			   {field:'tradeDPR', title:'成交折扣率',  align:'right', width:'8%', sortable:true, hidden:true, formatter:function(val){return val+"%";}},
			   {field:'status', title:'状态',  align:'center', width:'7%', formatter:getRecInvoiceStatus},
			   {field:'operate', title:'操作', align:'left', width:'7%', formatter:getRecInvoiceOperate}
			]],
			onLoadSuccess: function(data){
				isInitMarketList = "y";
				if (data.total == 0) {
	                $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
					$("#marketListDiv").removeClass("height-450");
					$("#marketListDiv").addClass("height-50");
					$("#icon-none").removeClass("hidden");
	            }
			}
		});
	} else {
		$('#marketList').datagrid("reload", params);
	}
}

//获取重点关注买方的交易
function loadFocusList(){
	var focusType = $("#focusType").val();
	if(focusType == "y"){
		$("#focusType").val("n");
		$("#focusBut").removeClass("back-focus-curr");
	} else {
		$("#focusType").val("y");
		$("#focusBut").addClass("back-focus-curr");
	}
	loadMarketList();
}

//显示供应商名称，并可点击
function getBuyerName(val, row){
	return "<span class='color-boldgray changecolororange link' title='"+row.supplierName+"' onclick='openBuyer("+row.buyerId+");'>"+splitString(row.buyerName,30)+"</span>";
}

//显示年化利率字段
function showAPRColumn(){
	$("#showAPRBut").removeClass("color-gray");
	$("#showAPRBut").addClass("color-orange");
	$("#showDPRBut").removeClass("color-orange");
	$("#showDPRBut").addClass("color-gray");
	$('#marketList').datagrid('hideColumn', 'quoteDPR');
	$('#marketList').datagrid('showColumn', 'quoteAPR');
	$('#marketList').datagrid('hideColumn', 'tradeDPR');
	$('#marketList').datagrid('showColumn', 'tradeAPR');
}

//显示折扣率字段
function showDPRColumn(){
	$("#showAPRBut").removeClass("color-orange");
	$("#showAPRBut").addClass("color-gray");
	$("#showDPRBut").removeClass("color-gray");
	$("#showDPRBut").addClass("color-orange");
	$('#marketList').datagrid('hideColumn', 'quoteAPR');
	$('#marketList').datagrid('showColumn', 'quoteDPR');
	$('#marketList').datagrid('hideColumn', 'tradeAPR');
	$('#marketList').datagrid('showColumn', 'tradeDPR');	
}