$(document).ready(function() {
	setLogo();
	if(loginCompanyType == "all"){
		$(".buyer").removeClass("hidden");
		$(".supplier").removeClass("hidden");
		$("#buyerAndSupplier").removeClass("hidden");
		if(loginCompanyIsAuth == 'y'){
			$("#noAuth1").addClass("hidden");
			$("#yesAuth1").removeClass("hidden");			
		}
		getCustomerService();
	} else if(loginCompanyType == "buyer"){
		$(".buyer").removeClass("hidden");
		$("#buyerOrSupplier").removeClass("hidden");
		if(loginCompanyIsAuth == 'y'){
			$("#noAuth").addClass("hidden");
			$("#yesAuth").removeClass("hidden");
		}
		getCustomerService();
	} else if(loginCompanyType == "supplier"){
		$(".supplier").removeClass("hidden");
		$("#buyerOrSupplier").removeClass("hidden");
		if(loginCompanyIsAuth == 'y'){
			$("#noAuth").addClass("hidden");
			$("#yesAuth").removeClass("hidden");
		}
	}
	getTotal();
	getLast30Total();
	getLast30List();
	getWeixinOpenId();
});

//设置企业logo
function setLogo(){
	var srcImg =$('#logo1').attr('src');
	if(srcImg==''){
		$("#logo1").attr('src',ctxRoot+"/resource/image/nologo.jpg"); 
	}
	
	var srcImg =$('#logo2').attr('src');
	if(srcImg==''){
		$("#logo2").attr('src',ctxRoot+"/resource/image/nologo.jpg"); 
	}
}

//获取企业概括
function getTotal(){	
	if(loginCompanyType == "buyer"){
		$.ajax({
			url : ctxRoot + "/buyerReport/getList",
			type : 'post',
			data : {"reportType": "all"}, 
			dataType: "json",
			success	: function(data){
				if(data.state && data.extendMap.list != null && data.extendMap.list != ''){
					$("#sumTradeAmount").html(formatMoney(data.extendMap.list[0].tradeAmount));
					$("#sumTradeDiscount").html(formatMoney(data.extendMap.list[0].tradeDiscount));
					$("#sumTradeAvgDPE").html(formatMoney(data.extendMap.list[0].tradeAvgDPE,2));	
				}
			},
			error: function(msg){
				return false;
			}
		});
		
		$.ajax({
			url : ctxRoot + "/customer/getSupplierListCount",
			type : 'post',
			data : {}, 
			dataType: "json",
			success	: function(data){
				if(data.state && data.extendMap.count != null && data.extendMap.count != ''){
					$("#sumCount").html(formatMoney(data.extendMap.count));
				}
			},
			error: function(msg){
				return false;
			}
		});
	} else if(loginCompanyType == "supplier"){
		$.ajax({
			url : ctxRoot + "/supplierReport/getList",
			type : 'post',
			data : {"reportType": "all"}, 
			dataType: "json",
			success	: function(data){
				if(data.state && data.extendMap.list != null && data.extendMap.list != ''){
					$("#sumTradeAmount").html(formatMoney(data.extendMap.list[0].tradeAmount));
					$("#sumTradeDiscount").html(formatMoney(data.extendMap.list[0].tradeDiscount));
					$("#sumTradeAvgDPE").html(formatMoney(data.extendMap.list[0].tradeAvgDPE,2));	
				}
			},
			error: function(msg){
				return false;
			}
		});
		
		$.ajax({
			url : ctxRoot + "/customer/getBuyerListCount",
			type : 'post',
			data : {}, 
			dataType: "json",
			success	: function(data){
				if(data.state && data.extendMap.count != null && data.extendMap.count != ''){
					$("#sumCount").html(formatMoney(data.extendMap.count));
				}
			},
			error: function(msg){
				return false;
			}
		});
	} else if(loginCompanyType == "all"){
		$.ajax({
			url : ctxRoot + "/buyerReport/getList",
			type : 'post',
			data : {"reportType": "all"}, 
			dataType: "json",
			success	: function(data){
				if(data.state && data.extendMap.list != null && data.extendMap.list != ''){
					$("#supplierTradeAmount").html(formatMoney(data.extendMap.list[0].tradeAmount));
					$("#supplierTradeDiscount").html(formatMoney(data.extendMap.list[0].tradeDiscount));
					$("#supplierTradeAvgDPE").html(formatMoney(data.extendMap.list[0].tradeAvgDPE,2));	
				}
			},
			error: function(msg){
				return false;
			}
		});
		
		$.ajax({
			url : ctxRoot + "/customer/getSupplierListCount",
			type : 'post',
			data : {}, 
			dataType: "json",
			success	: function(data){
				if(data.state && data.extendMap.count != null && data.extendMap.count != ''){
					$("#supplierCount").html(formatMoney(data.extendMap.count));
				}
			},
			error: function(msg){
				return false;
			}
		});
		
		$.ajax({
			url : ctxRoot + "/supplierReport/getList",
			type : 'post',
			data : {"reportType": "all"}, 
			dataType: "json",
			success	: function(data){
				if(data.state && data.extendMap.list != null && data.extendMap.list != ''){
					$("#buyerTradeAmount").html(formatMoney(data.extendMap.list[0].tradeAmount));
					$("#buyerTradeDiscount").html(formatMoney(data.extendMap.list[0].tradeDiscount));
					$("#buyerTradeAvgDPE").html(formatMoney(data.extendMap.list[0].tradeAvgDPE,2));	
				}
			},
			error: function(msg){
				return false;
			}
		});
		
		$.ajax({
			url : ctxRoot + "/customer/getBuyerListCount",
			type : 'post',
			data : {}, 
			dataType: "json",
			success	: function(data){
				if(data.state && data.extendMap.count != null && data.extendMap.count != ''){
					$("#buyerCount").html(formatMoney(data.extendMap.count));
				}
			},
			error: function(msg){
				return false;
			}
		});
	}	
}

//获取过去30天的汇总数据
function getLast30Total(){
	if(loginCompanyType == "buyer" || loginCompanyType == "all"){
		$.ajax({
			url : ctxRoot + "/buyerReport/getList",
			type : 'post',
			data : {"reportType": "last30"}, 
			dataType: "json",
			success	: function(data){
				if(data.state && data.extendMap.list != null && data.extendMap.list != ''){
					$("#payTradeAmount").html(formatMoney(data.extendMap.list[0].tradeAmount));
					$("#payTradeDiscount").html(formatMoney(data.extendMap.list[0].tradeDiscount));
					$("#payTradeAvgDPE").html(formatMoney(data.extendMap.list[0].tradeAvgDPE,2));	
				}
			},
			error: function(msg){
				return false;
			}
		});
	}
	
	if(loginCompanyType == "supplier" || loginCompanyType == "all"){
		$.ajax({
			url : ctxRoot + "/supplierReport/getList",
			type : 'post',
			data : {"reportType": "last30"}, 
			dataType: "json",
			success	: function(data){
				if(data.state && data.extendMap.list != null && data.extendMap.list != ''){
					$("#recTradeAmount").html(formatMoney(data.extendMap.list[0].tradeAmount));
					$("#recTradeDiscount").html(formatMoney(data.extendMap.list[0].tradeDiscount));
					$("#recTradeAvgDPE").html(formatMoney(data.extendMap.list[0].tradeAvgDPE,2));	
				}
			},
			error: function(msg){
				return false;
			}
		});
	}
}

//获取过去30天的详细数据
function getLast30List(){
	/* 获取30天之前的日期 */
	var now = new Date;
    now.setDate(now.getDate() - 30);
    var year = now.getFullYear();
	var month = now.getMonth()+1;
	if(month < 10){
         month = "0" + month;
     }
	var day = now.getDate();
	if(day < 10){
		day = "0" + day;
     }
	var beginDateStr = year + "-" + month+ "-"+ day ;
	
	if(loginCompanyType == "buyer" || loginCompanyType == "all"){
		$.ajax({
			url : ctxRoot + "/buyerReport/getList",
			type : 'post',
			data : {"reportType": "day", "beginReportValue": beginDateStr, "hasTradeAmount":"y"}, 
			dataType: "json",
			success	: function(data){
				if(data.state){
					showCharts("pay", data.extendMap.list);
				}
			},
			error: function(msg){
				return false;
			}
		});
	}
	
	if(loginCompanyType == "supplier" || loginCompanyType == "all"){
		$.ajax({
			url : ctxRoot + "/supplierReport/getList",
			type : 'post',
			data : {"reportType": "day", "beginReportValue": beginDateStr, "hasTradeAmount":"y"}, 
			dataType: "json",
			success	: function(data){
				if(data.state && data.extendMap.list != null){
					showCharts("rec", data.extendMap.list);
				}
			},
			error: function(msg){
				return false;
			}
		});
	}
}

// 显示应付账款的图形报表
function showCharts(type, list){
	var data = {"apr":{"category":[], "avg":[]}, "amount":{"category":[], "amount":[], "discount":[]}, "dpe":{"category":[], "avg":[], "max":[], "min":[]}};
	for(var i=0; i<list.length; i++){
		var label = list[i].reportValue.substring(5);
		data.apr.category.push({"label":label});
		data.apr.avg.push({"value":list[i].tradeAvgAPR});
		
		data.amount.category.push({"label":label});
		data.amount.amount.push({"value":list[i].tradeAmount});
		data.amount.discount.push({"value":list[i].tradeDiscount});

		data.dpe.category.push({"label":label});
		data.dpe.avg.push({"value":list[i].tradeAvgDPE});
		data.dpe.max.push({"value":list[i].tradeMaxDPE});
		data.dpe.min.push({"value":list[i].tradeMinDPE});		
	}
	showAPRChart(type, data.apr);
	showAmountChart(type, data.amount);
	showDPEChart(type, data.dpe);
}

//显示年化利率趋势
function showAPRChart(type, data){
	var seriesname = "";
	if(type == "pay"){
		seriesname = "我的收益利率(年化)";
	} else {
		seriesname = "我的折扣利率(年化)";
	}
	var fusioncharts = new FusionCharts({
	    type: 'msspline',
	    renderAt: type + 'APRChart',
	    width: '380',
	    height: '300',
	    dataFormat: 'json',
	    dataSource: {
	        "chart": {	        	
	            "bgcolor": "#ffffff",
	            "paletteColors": "#ce1f05,#f8bd19",
	            "lineThickness": "1",
	            "pixelsPerPoint": "0",
	            "showBorder": "0",
	            "showCanvasBorder": "0",
	            "legendBorderAlpha": "0",
	            "legendShadow": "0",
	            "divLineIsDashed": "1",
	            "divLineDashLen": "1",
	            "showValues": "0",
	            "theme": "fint"
	        },
	        "categories": [{
	            "category": data.category
	        }],
	        "dataset": [{
	            "seriesname": seriesname,
	            "data": data.avg
	        }]
	    },
	    "events": {
	    	"renderComplete": function () {
	    		$('#'+type+'APRChart tspan').each(function() {
	    			if($(this).text() == "FusionCharts XT Trial"){
	    				$(this).remove();
	    			}
	    	    });
	        }
	    }
	});
	fusioncharts.render();
}

//显示交易金额趋势
function showAmountChart(type, data){
	var seriesname = "";
	if(type == "pay"){
		seriesname = "收益金额";
	} else {
		seriesname = "折扣金额";
	}
	var fusioncharts = new FusionCharts({
	    type: 'stackedcolumn2d',
	    renderAt: type + 'AmountChart',
	    width: '380',
	    height: '300',
	    showNames : 'false',
	    dataFormat: 'json',
	    dataSource: {
	        "chart": {	        	
	        	"showCanvasBorder": "0",
	        	"toolTipPadding": "10",
	            "theme": "fint"
	        },
	        "categories": [{
	            "category":data.category
	        }],
	        "dataset": [{
	            "seriesname": "成交金额",
	            "color": "008ee4",
	            "data":data.amount}
	        , {
	            "seriesname": seriesname,
	            "color": "f8bd19",
	            "data": data.discount
	        }]
	    },
	    "events": {
	    	"renderComplete": function () {
	    		$('#'+type+'AmountChart tspan').each(function() {
	    			if($(this).text() == "FusionCharts XT Trial"){
	    				$(this).remove();
	    			}
	    	    });
	        }
	    }
	});
	fusioncharts.render();
}

//显示提前天数趋势
function showDPEChart(type, data){
	var fusioncharts = new FusionCharts({
	    type: 'msspline',
	    renderAt: type + 'DPEChart',
	    width: '380',
	    height: '300',
	    rotateNames:'0',
	    dataFormat: 'json',
	    dataSource: {
	        "chart": {	        		
        	 	"bgcolor": "#ffffff",
	            "paletteColors": "#ce1f05,#f8bd19",
	            "lineThickness": "1",
	            "pixelsPerPoint": "0",
	            "showBorder": "0",
	            "showCanvasBorder": "0",
	            "legendBorderAlpha": "0",
	            "legendShadow": "0",
	            "divLineIsDashed": "1",
	            "divLineDashLen": "1",
	            "showValues": "0",
	            "theme": "fint"            
	        },
	        "categories": [{
	            "category":data.category
	        }],
	        "dataset": [{
	            "seriesname": "平均",
	            "color": "ce1f05",
	            "data":data.avg
	        },  {
	            "seriesname": "最高",
	            "color": "008ee4",
	            "parentYAxis": "S",
	            "data":data.max
	        },  {
	            "seriesname": "最低",
	            "color": "f8bd19",
	            "parentYAxis": "S",
	            "data":data.min
	        }]
	    },
	    "events": {
	    	"renderComplete": function () {
	    		$('#'+type+'DPEChart tspan').each(function() {
	    			if($(this).text() == "FusionCharts XT Trial"){
	    				$(this).remove();
	    			}
	    	    });
	    		$('#'+type+'DPEChart .raphael-group-365-buttons').each(function() {
	    			$(this).remove();
	    	    });
	        }
	    }
	});
	fusioncharts.render();
}

//获取买家的专属客服
function getCustomerService(){
	$.ajax({
		url : ctxRoot + "/user/getService",
		type : 'post',
		data : {}, 
		dataType: "json",
		success	: function(data){
			if(data.extendMap.model != null){
				var strName = data.extendMap.model.name;
				var strEmail = data.extendMap.model.email;
				var strPhone = data.extendMap.model.phone;
				var strQQ = data.extendMap.model.qq;
				var strTel = data.extendMap.model.tel;
				if(isNull(strQQ)){
					strQQ="暂无";
				}
				if(isNull(strPhone)){
					strPhone="暂无";
				}
				if(isNull(strTel)){
					strTel="暂无";
				}
				if(data.extendMap.model.wechat != null && data.extendMap.model.wechat != '微信'){
					var strWechat = "<img class='margin-top-5 width-70 height-70' src='"+data.extendMap.model.wechat+"'/>"
				}else{
					var strWechat = "<div class='icon-customerService1'></div>"
				}
				if(loginCompanyType == "buyer"){
					$("#customerService").removeClass("hidden");
					$('#customerService').tooltip({
					    position: 'bottom',
					    content: '<div class="width-350 min-height-150 padding-15">'+
							    	'<div class="float-left width-80 height-all">'+strWechat+'<div class="width-all margin-top-10 text-center">专属客服</div></div>'+
							    	'<div class="float-right width-250 height-all line-height-30 color-gray">'+
							    		'<div class="font-bold color-minblack">'+strName+'</div>'+
							    		'<div>邮箱：&nbsp;&nbsp;'+strEmail+'</div>'+
							    		'<div>电话：&nbsp;&nbsp;'+strTel+'</div>'+
							    		'<div>手机：&nbsp;&nbsp;'+strPhone+'</div>'+
							    		'<div>Q&nbsp;&nbsp;Q：&nbsp;&nbsp;'+strQQ+'</div>'+
							    	'</div>'+
							    	'<div class="clear"></div>'+
						    	 '</div>',			    	
					    onShow: function(){
							$(this).tooltip('tip').css({
								backgroundColor: '#ffffff',
								borderColor: '#f3f3f3'
							});
					    }
					});
				} else if(loginCompanyType == "all"){
					$("#customerService1").removeClass("hidden");
					$('#customerService1').tooltip({
					    position: 'bottom',
					    content: '<div class="width-350 min-height-150 padding-15">'+
							    	'<div class="float-left width-80 height-all">'+strWechat+'<div class="width-all margin-top-10 text-center">专属客服</div></div>'+
							    	'<div class="float-right width-250 height-all line-height-30 color-gray">'+
							    		'<div class="font-bold color-minblack">'+strName+'</div>'+
							    		'<div>邮箱：&nbsp;&nbsp;'+strEmail+'</div>'+
							    		'<div>电话：&nbsp;&nbsp;'+strTel+'</div>'+
							    		'<div>手机：&nbsp;&nbsp;'+strPhone+'</div>'+
							    		'<div>Q&nbsp;&nbsp;Q：&nbsp;&nbsp;'+strQQ+'</div>'+
							    	'</div>'+
							    	'<div class="clear"></div>'+
						    	 '</div>',
					    onShow: function(){
							$(this).tooltip('tip').css({
								backgroundColor: '#ffffff',
								borderColor: '#f3f3f3'
							});
					    }
					});
				}
			}
		},
		error: function(msg){
			return false;
		}
		
	});
}

//判断当前企业是否关注公众号
function getWeixinOpenId(){
	var flag = window.sessionStorage.getItem("flag");
    if(isNull(weixinOpenId) && isNull(flag)){
    	showFocusWechatLayout();
    	window.sessionStorage.setItem("flag","true");
    }
}
