$(document).ready(function() {
	initFilter();
	isShowRelease();
	isShowConfirmTrade();
	isShowConfirmPay();
	getRelease();
	getMarketTotal();
	loadMarketList();
	quoteInterval = setInterval(setQuoteInterval, 1000*30);
});

//是否显示投放按钮
function isShowRelease(){
	if(isBeforeTradeTime()){
		$('#releaseBut').attr("onclick","showReleaseLayout();");
		$('#releaseBut').removeClass("back-dbdbdb color-white");
		$('#releaseBut').removeAttr("title");
	} else {
		$('#releaseBut').attr("title","请在交易日10点前进行编辑操作");
		$('#releaseBut').removeAttr("onclick");
		$('#releaseBut').removeClass("icon-editButton1");
		$('#releaseBut').addClass("icon-editButton3");
	}
}

//判断是否出现交易确认
function isShowConfirmTrade(){
	$.ajax({
		url : ctxRoot + "/invoice/getConfirmCount",
		type: 'POST',  
		data : {}, 
		dataType: "json",
		success	: function(data){
			if(data.extendMap.count > 0){
				$('#confirmTradeBut').attr("onclick","showConfirmTradeLayout();");
				$('#confirmTradeBut').removeAttr("title");
				$('#confirmTradeBut').removeClass("icon-tradeButton3");
				$('#confirmTradeBut').addClass("icon-tradeButton1");
			} else {
				$('#confirmTradeBut').attr("title","请在交易日15~17点进行交易确认！");
				$('#confirmTradeBut').removeAttr("onclick");
				$('#confirmTradeBut').removeClass("icon-tradeButton1");
				$('#confirmTradeBut').addClass("icon-tradeButton3");
			}
		},
		error: function(msg){
			return false;
		}
	});
}

//判断是否出现支付确认
function isShowConfirmPay(){
	$.ajax({
		url : ctxRoot + "/trade/getPayCount",
		type: 'POST',
		data : {},
		dataType: "json",
		success	: function(data){
			if(data.extendMap.count > 0){
				$('#confirmPayBut').attr("onclick","showPayTradeLayout();");
				$('#confirmPayBut').removeAttr("title");
				$('#confirmPayBut').removeClass("hidden");
				$('#confirmPayBut').removeClass("icon-payButton3");
				$('#confirmPayBut').addClass("icon-payButton1");
			} else {
				$('#confirmPayBut').attr("title","请在交易日16点~24点进行支付确认！");
				$('#confirmPayBut').removeAttr("onclick");
				$('#confirmPayBut').removeClass("icon-payButton1");
				$('#confirmPayBut').addClass("icon-payButton3");
			}
		},
		error: function(msg){
			return false;
		}
	});
}

//初始化筛选条件
function initFilter(){
	$('#companyName').combobox({
	    url: ctxRoot + "/customer/getSupplierList?isEasyUI=1&sort=name desc",
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

var quoteInterval;
//设置今日报价定时器
function setQuoteInterval(){
	var failCount = $('#quoteIntervalFailCount').val();
	if(failCount < 3 && isTradeTime()){
		$.ajax({
			url : ctxRoot + "/invoice/getBuyerTodayMarketTotal",
			type: 'POST',  
			data : {}, 
			dataType: "json",
			success	: function(data){
				if(data.state){
					var model = data.extendMap.model;
					if(model != null){
						$('#quoteAmount').html(formatMoney(model.quoteAmount,0));
						$('#quoteAvgAPR').html(formatMoney(model.quoteAvgAPR,2));
						$('#quoteCount').html(model.quoteCount);
						loadMarketList();
					} else {
						$('#quoteAmount').html("0");
						$('#quoteAvgAPR').html("0");
						$('#quoteCount').html("0");
					}
					$('#quoteIntervalFailCount').val(0);
				} else {
					failCount ++;
					$('#quoteIntervalFailCount').val(failCount);
				}
			},
			error: function(msg){
				failCount ++;
				$('#quoteIntervalFailCount').val(failCount);
			}
		});
	} else {
		window.clearInterval(quoteInterval);
	}	
}

//查询今日投放
function getRelease(){
	var params = {"isAjax":"y"};
	$.ajax({
		url : ctxRoot + "/give/getRelease",
		type: 'POST',
		data : params,
		dataType: "json",
		success	: function(data){
			if(data.state && data.extendMap.list != null){
				var list = data.extendMap.list;
				var str1 = "<span class='text-center font-10 border-radius-4' style='background:#e62fac; padding:2px 7px;'>固</span>"
				var str2 = "<span class='text-center font-10 border-radius-4' style='background:#e62fac; padding:2px 7px;'>浮</span>";
				
				if(list[0].releaseType == "fixed"){
					$('#relType').html(str1);
				} else {
					$('#relType').html(str2);
				}
				
				$('#update_pay').html(formatMoney(list[0].releaseAmount,0));
				$('#update_rate').html(list[0].expectedAPR);
			} else {
				$('#update_pay').html("0");
				$('#update_rate').html("0");
				$('#relType').html('');
				return;
			}
		},
		error: function(msg){
			return false;
		}
	});
}

//切换样式
function changeReleaseType(type){
	$('.currReleaseStyle').addClass("back-white color-lightred");
	$('.currReleaseStyle').removeClass("back-lighterred color-white currReleaseStyle");
	$('#type-' + type).removeClass("back-white color-lightred");
	$('#type-' + type).addClass("back-lighterred color-white currReleaseStyle");
	$("#releaseType").val(type);
	
	$('.currReleaseTab').addClass("hidden");
	$('#text-' + type).removeClass("hidden");
	$('#text-' + type).addClass("currReleaseTab");
	$('#msg-' + type).removeClass("hidden");
	$('#msg-' + type).addClass("currReleaseTab");
}

//查询今日报价和今日成交
function getMarketTotal(){	
	var params = {};
	if($("#isHiddenInactive").attr('checked')){
		params.isHiddenInactive = "y";
	}
	
	$.ajax({
		url : ctxRoot + "/invoice/getBuyerTodayMarketTotal",
		type: 'POST',
		data : params,
		dataType: "json",
		success	: function(data){
			if(data.state && data.extendMap.model != null){
				var model = data.extendMap.model;
				//今日投放
				$('#availableAmount').html(formatMoney(model.availableAmount,0));
				$('#availableCount').html(model.availableCount);
				//今日报价
				$('#quoteAmount').html(formatMoney(model.quoteAmount,0));
				$('#quoteAvgAPR').html(model.quoteAvgAPR.toFixed(2));
				$('#quoteCount').html(model.quoteCount);
				//今日成交
				$('#tradeAmount').html(formatMoney(model.tradeAmount,0));
				$('#tradeAvgAPR').html(model.tradeAvgAPR.toFixed(2));
				$('#tradeCount').html(model.tradeCount);
			} else {
				//今日投放
				$('#availableAmount').html("0");
				$('#availableCount').html("0");
				//今日报价
				$('#quoteAmount').html("0");
				$('#quoteAvgAPR').html("0");
				$('#quoteCount').html("0");
				//今日成交
				$('#tradeAmount').html("0");
				$('#tradeAvgAPR').html("0");
				$('#tradeCount').html("0");
				return;
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
	var supplierId = $('#companyName').combobox('getValue');
	if(supplierId != 0){
		params.supplierId = supplierId;
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
	
	if($("#isHiddenInactive").attr('checked')){
		params.isHiddenInactive = "y";
	}

	getMarketTotal();
	
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
			url: ctxRoot + "/invoice/getPayMarketPage",
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
			   {field:'supplierName', title:'供应商',  align:'left', width:'20%', sortable:true, formatter:getSupplierName},
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
			   {field:'status', title:'状态',  align:'center', width:'7%', formatter:getPayInvoiceStatus},
			   {field:'operate', title:'操作', align:'left', width:'7%', formatter:getPayInvoiceOperate}
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

//修改
function modifyInvoice(index){
	$("#modify"+index).addClass('hidden');
	$('#save'+index).removeClass('hidden');
	$('#cancel'+index).removeClass('hidden');
	var rows = $('#marketList').datagrid('getRows');
	$('#marketList').datagrid('hideColumn', 'originalDate');
	$('#marketList').datagrid('showColumn', 'originalDateStr');
	$('#marketList').datagrid('beginEdit', index);
	var ed = $('#marketList').datagrid('getEditor', {index:index, field:'originalDateStr'});
	$(ed.target).datebox('setValue', rows[index].originalDateStr);
}

//取消修改
function cancelInvoice(index){
	$("#modify"+index).removeClass('hidden');
	$('#save'+index).addClass('hidden');
	$('#cancel'+index).addClass('hidden');
	$('#marketList').datagrid('cancelEdit', index);
}

//保存修改
function saveInvoice(index){
	var ed = $('#marketList').datagrid('getEditor', {index:index, field:'originalDateStr'});
	var originDate = $(ed.target).datebox('getValue');
	if(isNull(originDate)){
		$.messager.alert('操作提示', '原到日期不能为空，请设置！','error');
		return;
	}
	if(!isDate(originDate)){
		$.messager.alert('操作提示', '日期格式不正确，请重新设置！','error');
		return;
	}
	var modifyDate = new Date(originDate.replace(/-/g, "/"));
	if (new Date() >= Date.parse(modifyDate)) {
		$.messager.alert('操作提示', '原到日期应大于今天，请重新设置！','error');
		return;
	}

	$("#modify"+index).removeClass('hidden');
	$('#save'+index).addClass('hidden');
	$('#cancel'+index).addClass('hidden');

	var rows = $('#marketList').datagrid('getRows');
	var params = {"id":rows[index].id, "originalDate":originDate};
	$.ajax({
		type: 'POST',
        url: ctxRoot + '/invoice/update',
        data: params,
		dataType: "json",
        success: function(result){
        	if(result.state && result.extendMap.count > 0){
        		$('#marketList').datagrid('hideColumn', 'originalDateStr');
        		$('#marketList').datagrid('showColumn', 'originalDate');
        		$('#marketList').datagrid('endEdit', index);
        		$.messager.alert('提示', '修改交易成功!', 'info');
        	} else {
        		$.messager.alert('修改交易失败', result.message , 'error');
        	}
        },
        error: function(result){
        	$.messager.alert('服务超时', '请稍后再试!' , 'warning');
        }
	});
}

//删除
function deleteInvoice(index){
	var rows = $('#marketList').datagrid('getRows');
	$.messager.confirm('操作提示', "您确认删除 "+rows[index].code+" 交易吗？", function(r){
		if(r){
			$.ajax({
				type: 'POST',
		        url: ctxRoot + '/invoice/delete',
		        data: {"isAjax":"y", "id":rows[index].id},
				dataType: "json",
		        success: function(result){
		        	if(result.state && result.extendMap.count > 0){
		        		$.messager.alert('提示', '删除交易成功！', 'info');
		        		loadMarketList();
		        		getBuyerTodayMarketTotal();
		        	} else {
		        		$.messager.alert('删除交易失败', result.message , 'error');
		        	}
		        }, 
		        error: function(result){
		        	$.messager.alert('服务超时', '请稍后再试!' , 'warning');
		        }
			});
		}
	})
}

//获取重点关注企业的报价列表
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

//显示供应商名称是否可点击
function getSupplierName(val, row){
	if(row.supplierId != '0'){
		return "<span class='color-boldgray changecolororange link' title='"+row.supplierName+"' onclick='openSupplier("+row.supplierId+");'>"+splitString(row.supplierName,30)+"</span>";
	} else {
		return "<span class='color-gray' title='该供应商未入驻'>"+splitString(row.supplierName,30)+"</span>";
	}
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