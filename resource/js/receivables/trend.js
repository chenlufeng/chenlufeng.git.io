$(document).ready(function() {
	getAllMonth('month');
//	getMonth();
});

function getReportValue(date){
	if(date == "month"){
		$('#layout-chartMore').addClass("hidden");
		$('#month').addClass("color-boldred font-bold");
		$('#year').removeClass("color-boldred font-bold");
		$('#all').removeClass("color-boldred font-bold");
		$('#yearDiv').addClass("hidden");
		$('#monthDiv').removeClass("hidden");
		var reportValue = $("#monthDate").combobox("getValue");
		getChartData(reportValue);
	}else if(date == "year"){
		$('#layout-chartMore').addClass("hidden");
		$('#year').addClass("color-boldred font-bold");
		$('#month').removeClass("color-boldred font-bold");
		$('#all').removeClass("color-boldred font-bold");
		$('#monthDiv').addClass("hidden");
		$('#yearDiv').removeClass("hidden");
		var reportValue = $("#yearDate").combobox("getValue");
		getChartData(reportValue);
	}else{
		$('#yearDiv').addClass("hidden");
		$('#monthDiv').addClass("hidden");
		$('#layout-chartMore').addClass("hidden");
		$('#all').addClass("color-boldred font-bold");
		$('#month').removeClass("color-boldred font-bold");
		$('#year').removeClass("color-boldred font-bold");
		getChartData('all')
	}
}

function getAllMonth(date){
	$.ajax({
		url : ctxRoot + "/data/getSupplierAllMonth",
		type : 'post',
		data : {
			"reportType":"day"
		}, 
		dataType: "json",
		success	: function(data){	
			if(data != null && data.length > 0){
				var year = [];
				var month = [];
				for(var i = 0; i < data.length; i++){
					var yearValue = data[i].reportValue.substr(0,4);
					var monthValue = data[i].reportValue.substr(0,7);
					year.push(yearValue);
					month.push(monthValue);
				}
				year = year.unique();
				month = month.unique();
				for(var e = 0; e < month.length; e++){
					if(e==0){
						$("#monthDate").append("<option value='"+month[e]+"' selected='selected'> "+month[e]+"</option>");
					}else{
						$("#monthDate").append("<option value='"+month[e]+"'> "+month[e]+"</option>");
					}
				}
				for(var j = 0; j < year.length; j++){
					if(j==data.length-1){
						$("#yearDate").append("<option value='"+year[j]+"' selected='selected'> "+year[j]+"</option>");
					}else{
						$("#yearDate").append("<option value='"+year[j]+"'> "+year[j]+"</option>");
					}
				}
			}else{
				
			}
			$("#monthDate").combobox({
				onChange: function (n,o) {
				getReportValue('month');
				}
			});
			$("#yearDate").combobox({
				onChange: function (n,o) {
					getReportValue('year');
				}
			});
			getReportValue(date);
		},
		error: function(msg){
			return false;
		},
	});
}

Array.prototype.unique = function(){
	 this.sort(); //先排序
	 var res = [this[0]];
	 for(var i = 1; i < this.length; i++){
	  if(this[i] !== res[res.length - 1]){
	   res.push(this[i]);
	  }
	 }
	 return res.reverse();
	}


function showDailyTurnoverChart(data){
	var fusioncharts = new FusionCharts({
	    type: 'stackedcolumn2d',
	    renderAt: 'DailyTurnoverChart',
	    width: '700',
	    height: '300',
	    dataFormat: 'json',
	    dataSource: {
	        "chart": {
	        	"caption": "每日成交情况",
	        	"showCanvasBorder": "0",
	        	"toolTipPadding": "10",
	            "theme": "fint"
	        },
	        "categories": [{
	            "category":data.category1
	        }],
	        "dataset": [{
	            "seriesname": "成交金额",
	            "color": "008ee4",
	            "data":data.tradeAmount}
	        , {
	            "seriesname": "折扣金额",
	            "color": "f8bd19",
	            "data": data.tradeDiscount
	        }]
	    },
	    "events": {
	    	"renderComplete": function () {
	    		$('#DailyTurnoverChart tspan').each(function() {
	    			if($(this).text() == "FusionCharts XT Trial"){
	    				$(this).remove();
	    			}
	    	    });
	        }
	    }
	});
	fusioncharts.render();
}
function getChartData(reportValue){
		var reportType = 'day';
		if(reportValue.length == 4){
			reportType = 'month'
		}
		if(reportValue == 'all'){
			reportType='year';
			reportValue=null;
		}
		$.ajax({
			url : ctxRoot + "/data/supplierdaily",
			type : 'post',
			data : {
				"reportType" : reportType,
				"reportDate" : reportValue,
				"hasTradeAmount":1
			}, 
			dataType: "json",
			success	: function(data){	
				if(data.list != null && data.model != null && data.list.length>0){
					$("#tradeAmount").html(formatMoney(data.model.tradeAmount));
					$("#tradeDiscount").html(formatMoney(data.model.tradeDiscount));
					$("#tradeAvgAPR").html(data.model.tradeAvgAPR+"%");
					$("#tradeAvgDPE").html(data.model.tradeAvgDPE+" 天");
					parseDailyChart(data.list);
				}else{
					$("#tradeAmount").html("0.00");
					$("#tradeDiscount").html("0.00");
					$("#tradeAvgAPR").html("0.00");
					$("#tradeAvgDPE").html("0.00");
					$('#aprChartNone1').addClass("hidden");
					$('#dpeChartNone1').addClass("hidden");
					$('#DailyTurnoverChartNone1').addClass("hidden");
					$('#noData1').removeClass("hidden");
					return;
				}
			},
			error: function(msg){
				return false;
			},
		});
}

function getSupplierChartData(list,reportValue){
	var reportDates=""; 
	for(var i=0;i<list.length;i++){
		var createTime = list[i].createTimeStr.substring(0, 10);
		reportDates=reportDates+","+createTime;
		}
	if (reportDates.substr(0,1)==','){
		reportDates=reportDates.substr(1);
	}
	$.ajax({
		url : ctxRoot + "/data/supplierReport",
		type : 'post',
		data : {
			"reportType" : "day",
			"reportDate" : reportValue,
			"reportDates": reportDates
		}, 
		dataType: "json",
		success	: function(data){	
			if(data != null){
				parseDailyChart(data,list);
			}
		},
		error: function(msg){
			return false;
		},
	});
}

function parseDailyChart(list){
	if(list.length<1){
		$("#tradeAmount").html("0.00");
		$("#tradeDiscount").html("0.00");
		$("#tradeAvgAPR").html("0.00");
		$("#tradeAvgDPE").html("0.00");
		$('#aprChartNone1').addClass("hidden");
		$('#dpeChartNone1').addClass("hidden");
		$('#DailyTurnoverChartNone1').addClass("hidden");
		$('#noData1').removeClass("hidden");
		return;
	}
	$('#noData1').addClass("hidden");
	$('#DailyTurnoverChartNone1').removeClass("hidden");
	$('#dpeChartNone1').removeClass("hidden");
	$('#aprChartNone1').removeClass("hidden");
	var myAPR=[];
	var category1=[];
	var category2=[];
	var category3="";
	var marketAPR=[];
	var tradeAvgDPE=[];
	var tradeMaxDPE=[];
	var tradeMinDPE=[];
	var tradeDiscount=[];
	var tradeAmount=[];
	var result = {"incomeData":{"category1":category1, "tradeAmount":tradeAmount,"tradeDiscount":tradeDiscount}, "aprData":{"category2":category2, "myAPR":myAPR,"marketAPR":marketAPR},
			"dpeData":{"category3":category3, "tradeAvgDPE":tradeAvgDPE,"tradeMaxDPE":tradeMaxDPE,"tradeMinDPE":tradeMinDPE}};
	for(var i=0; i<list.length; i++){
		var aprValue = {"value":list[i].tradeAvgAPR};
		myAPR.push(aprValue);
		var Label = {"label":list[i].reportValue}
		category1.push(Label);
		category2.push(Label);
		if(i==0){
			category3=list[i].reportValue;
		}else{
			category3=category3+"|"+list[i].reportValue;
		}
		var tradeAmountValue =  {"value":list[i].tradeAmount};
		tradeAmount.push(tradeAmountValue);
		var tradeDiscountValue =  {"value":list[i].tradeDiscount};
		tradeDiscount.push(tradeDiscountValue);
		var tradeAvgDPEValue= {"value":list[i].tradeAvgDPE};
		tradeAvgDPE.push(tradeAvgDPEValue);
		var	tradeMaxDPEValue= {"value":list[i].tradeMaxDPE};
		tradeMaxDPE.push(tradeMaxDPEValue);
		var	tradeMinDPEValue= {"value":list[i].tradeMinDPE};
		tradeMinDPE.push(tradeMinDPEValue);
	}
	result.dpeData.category3 = category2;
	result.dpeData.tradeAvgDPE = tradeAvgDPE;
	result.dpeData.tradeMaxDPE = tradeMaxDPE;
	result.dpeData.tradeMinDPE = tradeMinDPE;
	showAPRChart(result.aprData);
	showDailyTurnoverChart(result.incomeData);
	showDPEChart(result.dpeData);
}

function showAPRChart(data){
	var fusioncharts = new FusionCharts({
	    type: 'msspline',
	    renderAt: 'aprChart',
	    width: '700',
	    height: '300',
	    dataFormat: 'json',
	    dataSource: {
	        "chart": {
		        	"caption": "每日收益率趋势",
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
	            "category": data.category2
	        }],
	        "dataset": [{
	            "seriesname": "我的交易利率",
	            "data": data.myAPR
	        }]
	    },
	    "events": {
	    	"renderComplete": function () {
	    		$('#aprChart tspan').each(function() {
	    			if($(this).text() == "FusionCharts XT Trial"){
	    				$(this).remove();
	    			}
	    	    });
	        }
	    }
	});
	fusioncharts.render();
}
function showDPEChart(data){
	var fusioncharts = new FusionCharts({
	    type: 'msspline',
	    renderAt: 'dpeChart',
	    width: '700',
	    height: '300',
	    dataFormat: 'json',
	    dataSource: {
	        "chart": {
	        		"caption": "提前付款天数趋势",
	        	    "compactDataMode": "1",
		            "lineThickness": "1",
		            "pixelsPerPoint": "0",
		            "pixelsPerLabel": "1",
		            "numVisibleLabels": "70",
		            "labelHeight": "30",
		            "theme": "fint"                
	        },
	        "categories": [{
	            "category":data.category3
	        }],
	        "dataset": [{
	            "seriesname": "平均",
	            "color": "ce1f05",
	            "data":data.tradeAvgDPE
	        },  {
	            "seriesname": "最高",
	            "color": "008ee4",
	            "parentYAxis": "S",
	            "data":data.tradeMaxDPE
	        },  {
	            "seriesname": "最低",
	            "color": "f8bd19",
	            "parentYAxis": "S",
	            "data":data.tradeMinDPE
	        }]
	    },
	    "events": {
	    	"renderComplete": function () {
	    		$('#dpeChart tspan').each(function() {
	    			if($(this).text() == "FusionCharts XT Trial"){
	    				$(this).remove();
	    			}
	    	    });
	    		$('#dpeChart .raphael-group-246-buttons').each(function() {
	    			$(this).remove();
	    	    });
	        }
	    }
	});
	fusioncharts.render();
}

function showMore(){
	$('#layout-chartMore').removeClass("hidden");
	$('#moremonth').addClass("color-boldred font-bold");
	$('#lastmonth').removeClass("color-boldred font-bold");
	$('#nowmonth').removeClass("color-boldred font-bold");
}
function getMoreChart(reportValue){
	$("#month"+reportValue).addClass("color-boldred");
	getChartData(reportValue);
}
function getMonth(){
	$.ajax({
		url : ctxRoot + "/data/supplierdaily",
		type : 'post',
		data : {
			"reportType":"month"
		}, 
		dataType: "json",
		success	: function(data){	
			var data = data.list;
			if(data != null){
			for(var i=0;i<data.length;i++){
				var month = data[i].reportValue.split("-");
				if(month[1]==01){
					$('#month2016-01').removeClass("color-gray");
					$('#month2016-01').addClass("link font-bold");
				}
				if(month[1]==02){
					$('#month2016-02').removeClass("color-gray");
					$('#month2016-02').addClass("link font-bold");
				}
				if(month[1]==03){
					$('#month2016-03').removeClass("color-gray");
					$('#month2016-03').addClass("link font-bold");
				}
				if(month[1]==04){
					$('#month2016-04').removeClass("color-gray");
					$('#month2016-04').addClass("link font-bold");
				}
				if(month[1]==05){
					$('#month2016-05').removeClass("color-gray");
					$('#month2016-05').addClass("link font-bold");
				}
				if(month[1]==06){
					$('#month2016-06').removeClass("color-gray");
					$('#month2016-06').addClass("link font-bold");
				}
				if(month[1]==07){
					$('#month2016-07').removeClass("color-gray");
					$('#month2016-07').addClass("link font-bold");
				}
				if(month[1]==08){
					$('#month2016-08').removeClass("color-gray");
					$('#month2016-08').addClass("link font-bold");
				}
				if(month[1]==09){
					$('#month2016-09').removeClass("color-gray");
					$('#month2016-09').addClass("link font-bold");
				}
				if(month[1]==10){
					$('#month2016-10').removeClass("color-gray");
					$('#month2016-10').addClass("link font-bold");
				}
				if(month[1]==11){
					$('#month2016-11').removeClass("color-gray");
					$('#month2016-11').addClass("link font-bold");
				}
				if(month[1]==12){
					$('#month2016-12').removeClass("color-gray");
					$('#month2016-12').addClass("link font-bold");
				}
			}
			}
		},
		error: function(msg){
			return false;
		},
	});
}

function formatDate(v){   
	  if(typeof v == 'string') v = parseDate(v);   
	  if(v instanceof Date){   
	    var y = v.getFullYear();   
	    var m = v.getMonth() + 1;   
	    var d = v.getDate();   
	    var h = v.getHours();   
	    var i = v.getMinutes();   
	    var s = v.getSeconds();   
	    var ms = v.getMilliseconds();      
	    if(ms>0) return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s + '.' + ms;   
	    if(h>0 || i>0 || s>0) return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;   
	    return y + '-' + m + '-' + d;   
	  }   
	  return '';   
	} 
function parseDate(str){   
	  if(typeof str == 'string'){   
	    var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);   
	    if(results && results.length>3)   
	      return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]));    
	    results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);   
	    if(results && results.length>6)   
	      return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]));    
	    results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);   
	    if(results && results.length>7)   
	      return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]),parseInt(results[7]));    
	  }   
	  return null;   
	}