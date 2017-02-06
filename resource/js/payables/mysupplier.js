$(document).ready(function() {
	initFilter();
	setSupplierList();
});

var selectSupplierId;
//切换选择供应商
function changeSupplier(supplierId){
	isInitMarketList = "n";
	selectSupplierId = supplierId;
	showTradeTab();
	getAttention();
}

//初始化筛选条件
function initFilter(){
	$('#status').combobox({
		onChange: function(newValue,oldValue){
			loadMarketList();
	    }
	});	
	
	$('#originalDate').datebox({
		onChange: function(newValue,oldValue){
			loadMarketList();
	    }
	});	
}

//获取供应商下拉列表，并设置默认值
function setSupplierList(){
	$.ajax({
		url : ctxRoot + "/customer/getSupplierList?sort=name desc",
		type: 'POST',
		data : {"type":"buyer"},
		dataType: "json",
		success	: function(data){
			if(data.state){
				var list = data.extendMap.list;
				if(list == null || list.length == 0){
					loadMarketList();
					return;
				} else {
					$('#supplierList').combobox({
					    data: list,
					    valueField: 'id',
					    textField: 'name',
					    onSelect: function(row){
					    	changeSupplier(row.id);
					    }
					});
					selectSupplierId = getUrlParam("id");
					if(isNull(selectSupplierId)){
						selectSupplierId = list[0].id;
					} 
					$('#supplierList').combobox('setValue', selectSupplierId);
					changeSupplier(selectSupplierId);
				}
			}
		},
		error: function(msg){
			
		}	
	});
}

var selectTradTab = 1;
//显示今日或历史交易Tab
function showTradeTab(tabNo){
	if(tabNo != undefined){
		selectTradTab = tabNo;
	}
	if(selectTradTab == 1){
		$('#isToday').val("today");
		
		$('#selectStatus').removeClass("hidden");
		
		$('#hisTradeDiv').addClass('hidden');
		$('#todayBut').addClass('color-darkgray border-bottom-solid-lightred-2');
		$('#hisBut').addClass('color-gray-cbcbcb');
		$('#hisBut').removeClass('color-darkgray border-bottom-solid-lightred-2');
		$('#todayTradeDiv').removeClass('hidden');
		getTodayTradeReport();
	} else {
		$('#isToday').val('');
		
		$('#selectStatus').addClass("hidden");
		
		$('#todayTradeDiv').addClass('hidden');
		$('#hisBut').addClass('color-darkgray border-bottom-solid-lightred-2');
		$('#todayBut').addClass("color-gray-cbcbcb");
		$('#todayBut').removeClass('color-darkgray border-bottom-solid-lightred-2');
		$('#hisBut').removeClass('color-gray-cbcbcb');
		$('#hisTradeDiv').removeClass('hidden');
		getHistoryTradeReport();
	}
	loadMarketList();
}

//今日交易汇总查询
function getTodayTradeReport(){
	$.ajax({
		url : ctxRoot + "/invoice/getBothTodayMarketTotal",
		type: 'POST',  
		data : {"isAjax":"y", "supplierId":selectSupplierId}, 
		dataType: "json",
		success	: function(data){
			var model = data.extendMap.model;
			if(model == null){
				$('#t_availableAmount').html(0);
				$('#t_availableCount').html(0);
				//今日实报
				$('#t_quoteAmount').html(0);//金额
				$('#t_quoteAvgAPR').html(0);//平均报价利率
				$('#t_quoteCount').html(0);//交易数量
				$('#t_quoteAvgDPE').html(0);//平均提前天数
				//今日成交
				$('#t_tradeAmount').html(0);
				$('#t_tradeAvgAPR').html(0);
				$('#t_tradeCount').html(0);
				$('#t_tradeAvgDPE').html(0);
				return;
			} else {
				//今日可报
				$('#t_availableAmount').html(formatMoney(model.availableAmount, 0));
				$('#t_availableCount').html(model.availableCount);
				//今日实报
				$('#t_quoteAmount').html(formatMoney(model.quoteAmount,0));//金额
				$('#t_quoteAvgAPR').html(model.quoteAvgAPR);//平均报价利率
				$('#t_quoteCount').html(model.quoteCount);//交易数量
				$('#t_quoteAvgDPE').html(model.quoteAvgDPE);//平均提前天数
				//今日成交
				$('#t_tradeAmount').html(formatMoney(model.tradeAmount,0));
				$('#t_tradeAvgAPR').html(model.tradeAvgAPR);
				$('#t_tradeCount').html(model.tradeCount);
				$('#t_tradeAvgDPE').html(model.tradeAvgDPE);
			}
		},
		error: function(msg){
			$.messager.alert('服务超时', '请稍后再试!' , 'warning');
		}	
	});
}

//历史交易汇总查询
function getHistoryTradeReport(){
	$.ajax({
		url : ctxRoot + "/bothReport/getMySupplierList",
		type: 'POST',  
		data : {"reportType":"all", "supplierId":selectSupplierId}, 
		dataType: "json",
		success	: function(data){
			if(data.state && data.extendMap.list != null && data.extendMap.list != ''){
				var model = data.extendMap.list[0];
				$('#h_availableAmount').html(formatMoney(model.availableAmount,0));
				$('#h_availableCount').html(model.availableCount);
				//历史实报
				$('#h_quoteAmount').html(formatMoney(model.quoteAmount,0));//金额
				$('#h_quoteAvgAPR').html(model.quoteAvgAPR);//平均报价利率
				$('#h_quoteCount').html(model.quoteCount);//交易数量
				$('#h_quoteAvgDPE').html(model.quoteAvgDPE);//平均提前天数
				//历史成交
				$('#h_tradeAmount').html(formatMoney(model.tradeAmount,0));
				$('#h_tradeAvgAPR').html(model.tradeAvgAPR);
				$('#h_tradeCount').html(model.tradeCount);
				$('#h_tradeAvgDPE ').html(model.tradeAvgDPE);
			}
		},
		error: function(msg){
			$.messager.alert('服务超时', '请稍后再试!' , 'warning');
		}	
	});
}

var isInitMarketList = "n";
//加载交易列表
function loadMarketList(){
	var params = {"isAjax":"y", "isEasyUI":"1", "supplierId":selectSupplierId};	
	var originalDate = $('#originalDate').combobox('getValue');
	if(!isNull(originalDate)){
		params.originalDate = originalDate;
	}

	var statuses = $('#status').combobox("getValue");
	if(!isNull(statuses) && statuses != 'all'){ 
		params.statuses = statuses;
	}
	
	if(!isNull($('#isToday').val())){
		params.isToday = "y";
	}
	
	var code = $('#code').textbox("getValue");
	if(!isNull(code)){
		params.likeCode = code;
	}

/*	if($("#isHiddenExpired").attr('checked')){
		params.isHiddenExpired = "y";
	}*/
	
	$("#icon-none").addClass("hidden");
	$("#marketListDiv").removeClass("height-50");
	$("#marketListDiv").addClass("height-450");
	
	if(isInitMarketList == "n"){
		var sortName = "tradeDate";
		if(isTradeDate){
			if(isTradeTime()){
				sortName +=  " desc, quoteAPR";
			} else if(isAfterTradeTime()){
				sortName +=  " desc, tradeAPR";
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
			   {field:'supplierName', title:'供应商',  align:'left', width:'20%'},
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

//查看合同
function getContractList(){
	if(selectSupplierId != undefined && selectSupplierId != 0){
		openUrl('/payables/contract?supplierId='+selectSupplierId);
	} else {
		openUrl('/payables/contract');
	}
}

//查询是否关注该企业
function getAttention(){
	var params = {"isAjax":"y", "followId":selectSupplierId}
	$.ajax({
		type: 'POST',   
	    url: ctxRoot + '/attention/getList',
	    data: params,
		dataType: "json",
	    success: function(data){
	    	if(data.state && data.extendMap.list.length != 0){
	    		$('#addAttention').addClass('hidden');
	    		$('#removeAttention').removeClass('hidden');
	    	}else{
	    		$('#removeAttention').addClass('hidden');	
	    		$('#addAttention').removeClass('hidden');
	    	}
	    }
	});
}

//添加关注
function addAttention(){
	var params = {"isAjax":"y", "followId":selectSupplierId};
	$.ajax({
      type: 'POST',   
      url: ctxRoot + '/attention/add',
      data: params,
		dataType: "json",
      success: function(data){
      	if(data.extendMap.model != null){
      		$.messager.alert('提示', '关注成功', 'info');
      		$('#addAttention').addClass('hidden');
	    	$('#removeAttention').removeClass('hidden');
      	} else {
      		$.messager.alert('关注失败', result.message , 'error');
      	}
      }, 
      error: function(result){
    	  $.messager.alert('服务超时', '请稍后再试!' , 'warning');
      }
  });
}

//取消关注
function cancelAttention(){
	var params = {"isAjax":"y", "followId":selectSupplierId};
	$.ajax({
      type: 'POST',   
      url: ctxRoot + '/attention/cancel',
      data: params,
      dataType: "json",
      success: function(data){
      	if(data.extendMap.count > 0){
      		$.messager.alert('提示', '取消关注成功', 'info');
	    	$('#removeAttention').addClass('hidden');
      		$('#addAttention').removeClass('hidden');
      	} else {
      		$.messager.alert('取消关注失败', result.message , 'error');
      	}
      }, 
      error: function(result){
    	  $.messager.alert('服务超时', '请稍后再试!' , 'warning');
      }
  });
}