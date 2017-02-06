$(document).ready(function() {
	initFilter();
	setBuyerList();
});

var selectBuyerId;
//切换选择买方
function changeBuyer(buyerId){
	isInitMarketList = "n";
	selectBuyerId = buyerId;
	showTradeTab(1);
	getAttention();
	getBuyerMaxQuote();
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

//获取买方下拉列表，并设置默认值
function setBuyerList(){
	$.ajax({
		url : ctxRoot + "/customer/getBuyerList?sort=name desc",
		type: 'POST',  
		data : {"type":"supplier"}, 
		dataType: "json",
		success	: function(data){
			if(data.state){
				var list = data.extendMap.list;
				if(list != null && list.length > 0){
					$('#buyerList').combobox({
					    data: list,
					    valueField: 'id',
					    textField: 'name',
					    onSelect: function(row){
					    	changeBuyer(row.id);
					    }
					});
					selectBuyerId = getUrlParam("id");
					if(isNull(selectBuyerId)){
						selectBuyerId = list[0].id;
					}
					$('#buyerList').combobox('setValue', selectBuyerId);
					changeBuyer(selectBuyerId);
				} else {
					loadMarketList();
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
		getTodayTradeReport(selectBuyerId);
	} else {
		$('#isToday').val("");
		
		$('#selectStatus').addClass("hidden");
		
		$('#todayTradeDiv').addClass('hidden');
		$('#hisBut').addClass('color-darkgray border-bottom-solid-lightred-2');
		$('#todayBut').addClass("color-gray-cbcbcb");
		$('#todayBut').removeClass('color-darkgray border-bottom-solid-lightred-2');
		$('#hisBut').removeClass('color-gray-cbcbcb');
		$('#hisTradeDiv').removeClass('hidden');
		getHistoryTradeReport(selectBuyerId);
	}
	loadMarketList();
}

//今日交易汇总查询
function getTodayTradeReport(selectBuyerId){
	$.ajax({
		url : ctxRoot + "/invoice/getBothTodayMarketTotal",
		type: 'POST',  
		data : {"isAjax":"y", "buyerId":selectBuyerId}, 
		dataType: "json",
		success	: function(data){
			var model = data.extendMap.model;
			if(model == null || model.length == 0){
				//今日可报
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
				$('#t_availableAmount').html(formatMoney(model.availableAmount,0));
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
function getHistoryTradeReport(selectBuyerId){
	$.ajax({
		url : ctxRoot + "/bothReport/getMyBuyerList",
		type: 'POST',  
		data : {"reportType":"all", "buyerId":selectBuyerId}, 
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

//获取投放金额和最高报价
function getBuyerMaxQuote(){
	$.ajax({
		url : ctxRoot + "/give/getBuyerMaxQuote",
		type: 'POST',  
		data : {"isAjax":"y", "buyerId":selectBuyerId}, 
		dataType: "json",
		success	: function(data){
			var model = data.extendMap.model;
			if(model == null){
				//今日共投放
				$('#releaseAmount').html(0);
				//最高报价
				$('#quoteMaxAPR').html(0);
				$('#t_quoteMaxAPR').numberspinner({
					min: 0,
				    max: 100,
				    suffix: '%',
				    precision: 2,
				    increment: 0.1,
				    value: 0
				})
			} else {
				//今日共投放
				$('#releaseAmount').html(formatMoney(model.releaseTotalAmount,0));
				//最高报价
				$('#quoteMaxAPR').html(model.quoteMaxAPR);
				var isDisabled = false;
				if(model.releaseType == "fixed"){
					isDisabled = true;
				}
				$('#t_quoteMaxAPR').numberspinner({
					min: 0,
				    max: 100,
				    suffix: '%',
				    precision: 2,
				    increment: 0.1,
				    disabled: isDisabled,
				    value: model.quoteMaxAPR
				})
			}
			setMaxQuoteBut();
		},
		error: function(msg){
			$.messager.alert('服务超时', '请稍后再试!' , 'warning');
		}	
	});
}

//设置按最高报价按钮
function setMaxQuoteBut(){
	var releaseAmount = parseInt($('#releaseAmount').html());
	if(isTradeTime() && releaseAmount > 0){
		$('#icon-quote').removeAttr("title");
		$('#icon-quote').attr("onclick","getInputQuote();");
		$('#icon-quote').removeClass("back-dbdbdb color-white");
		$('#icon-quote').addClass("back-minblue color-white changebackblue");
	} else if(!isTradeTime()) {
		$('#icon-quote').attr("title","请在交易时间进行报价！");
		$('#icon-quote').removeAttr("onclick");
		$('#icon-quote').removeClass("back-minblue color-white changebackblue");
		$('#icon-quote').addClass("back-dbdbdb color-white");
	} else if(releaseAmount == 0){
		$('#icon-quote').attr("title","今日买方未投放金额！");
		$('#icon-quote').removeAttr("onclick");
		$('#icon-quote').removeClass("back-minblue color-white changebackblue");
		$('#icon-quote').addClass("back-dbdbdb color-white");
	}
}

//获取当前的报价
function getInputQuote(){
	var myQuote = $('#t_quoteMaxAPR').numberspinner('getValue');
	if(myQuote > 0 && myQuote != ''){
		var quoteStr = "<span class='color-red margin-w-5'>"+myQuote+"%</span>";
		openConfirmMsg("您确定按照"+quoteStr+"的利率<br/>提交所有未报价的交易吗？",'quoteByMax','');
	} else {
		openMsg("操作失败！", "报价利率不能为0，请输入！");
	}
}

//按最高报价进行报价
function quoteByMax(){
	var maxQuote = $('#t_quoteMaxAPR').numberspinner('getValue');
	if(maxQuote > 0 && maxQuote != ''){
		$.ajax({
			url : ctxRoot + "/invoice/batchQuoteByMax",
			type: 'POST',  
			data : {"isAjax":"y", "quoteAPR":maxQuote, "buyerId":selectBuyerId}, 
			dataType: "json",
			success	: function(data){
				var count = data.extendMap.count;
				if(data.state && count > 0){
					closeConfirmMsg();
					openMsg('报价成功！');
					loadMarketList();
					getTodayTradeReport(selectBuyerId);
					getBuyerMaxQuote();
				} else {
					closeConfirmMsg();
					openMsg('报价失败！', data.message);	
				}
				$('#icons').removeClass("hidden");
				$('#okBut').removeClass("hidden");
				$('#icons2').addClass("hidden");
			},
			error: function(msg){
				$.messager.alert('服务超时', '请稍后再试!' , 'warning');
			}	
		});
	} else {
		openMsg("操作失败！", "请输入报价利率！");
	}
}

//查看合同
function getContractList(){
	if(selectBuyerId != undefined && selectBuyerId != 0){
		openUrl('/receivables/contract?buyerId='+selectBuyerId);
	} else {
		openUrl('/receivables/contract');
	}
	
}

//查询是否关注该企业
function getAttention(){
	var params = {"isAjax":"y","followId":selectBuyerId}
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
	var params = {"isAjax":"y","followId":selectBuyerId};
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
        	}else{
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
	var params = {"isAjax":"y","followId":selectBuyerId};
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
        	}else{
        		$.messager.alert('取消关注失败', result.message , 'error');
        	}
        }, 
        error: function(result){
        	$.messager.alert('服务超时', '请稍后再试!' , 'warning');
        }
    });
}

var isInitMarketList = "n";
//加载交易列表
function loadMarketList(){
	var params = {"isAjax":"y", "isEasyUI":"1", "buyerId":selectBuyerId};	
	var originalDate = $('#originalDate').combobox('getValue');
	if(!isNull(originalDate)){
		params.originalDate = originalDate;
	}

	var statuses = $('#status').combobox("getValue");
	if(!isNull(statuses) && statuses != 'all'){ 
		params.statuses = statuses;
	}
	
	var code = $('#code').textbox("getValue");
	if(!isNull(code)){
		params.likeCode = code;
	}

	if(!isNull($('#isToday').val())){
		params.isToday = "y";
	}
	
	/*if($("#isHiddenExpired").attr('checked')){
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
			   {field:'buyerName', title:'买方',  align:'left', width:'20%'},
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
			   {field:'operate', title:'操作', align:'left', width:'7%', formatter:getRecHisInvoiceOperate}
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

//显示应收账款的交易操作
function getRecHisInvoiceOperate(val, row, index){
	var str = "";
	if(isTradeDate){
		var releaseAmount = parseInt($('#releaseAmount').html());
		if(releaseAmount > 0){
			if(row.status == 'expired'){
				str += "<div class='float-left margin-top-5 icon-quote-gray link' title='该交易已过期，无法报价'></div>";
			} else {
				if(isBeforeTradeTime()){
					str +=  "<div id='quote-gray"+row.id+"' class='float-left margin-top-5 icon-quote-gray link' title='未到报价时间，无法报价'></div>";
				} else if(isTradeTime()){
					str +=  "<div id='quote"+row.id+"' class='float-left margin-top-5 icon-quote link' onclick='quoteInvoice("+row.id+")' title='报价'></div>";
				} else {
					str +=  "<div id='quote-gray"+row.id+"' class='float-left margin-top-5 icon-quote-gray link' title='今日报价时间已结束，无法报价'></div>";
				}			
			}
		} else {
			str += "<div class='float-left margin-top-5 icon-quote-gray link' title='今日买方未投放金额，无法报价'></div>";
		}		
	} else {
		if(row.status == 'expired'){
			str += "<div class='float-left margin-top-5 icon-quote-gray link' title='该交易已过期且今日未开市，无法报价'></div>";
		} else {
			str +=  "<div id='quote-gray"+row.id+"' class='float-left margin-top-5 icon-quote-gray link' title='今日未开市，无法报价'></div>";
		}
	}
	if(row.hisQuoteCount > 0){
		str += "<div id='showTradeHis"+row.id+"' class='float-left margin-top-5 margin-left-5 icon-show-down link' onclick='showTradeHis(\"supplier\","+row.id+")' title='展开历史详情'></div>"+
			   "<div id='closeTradeHis"+row.id+"' class='float-left margin-top-5 margin-left-5 icon-show-up link hidden' onclick='closeTradeHis()' title='收起历史详情'></div>";
	}
	str += "<div class='clear'></div>";
	return str;
}