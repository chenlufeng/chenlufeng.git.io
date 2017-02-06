$(document).ready(function() {
	getAllMonth('month');
});

function getReportValue(date){
	if(date == "month"){
		$('#layout-chartMore').addClass("hidden");
		$('#month').addClass("color-boldred font-bold");
		$('#yearDiv').addClass("hidden");
		$('#monthDiv').removeClass("hidden");
		$('#year').removeClass("color-boldred font-bold");
		$('#all').removeClass("color-boldred font-bold");
		var reportValue = $("#monthDate").combobox("getValue");
		getChartData(reportValue);
	}else if(date == "year"){
		$('#layout-chartMore').addClass("hidden");
		$('#year').addClass("color-boldred font-bold");
		$('#monthDiv').addClass("hidden");
		$('#yearDiv').removeClass("hidden");
		$('#month').removeClass("color-boldred font-bold");
		$('#all').removeClass("color-boldred font-bold");
		var reportValue = $("#yearDate").combobox("getValue");
		getChartData(reportValue);
	}else{
		$('#yearDiv').addClass("hidden");
		$('#monthDiv').addClass("hidden");
		$('#layout-chartMore').addClass("hidden");
		$('#all').addClass("color-boldred font-bold");
		$('#month').removeClass("color-boldred font-bold");
		$('#year').removeClass("color-boldred font-bold");
		getChartData('all');
	}
}

function getAllMonth(date){
	$.ajax({
		url : ctxRoot + "/data/getBuyerReportValueList",
		type : 'post',
		data : {
			"reportType":"day",
		}, 
		dataType: "json",
		success	: function(data){	
			if(data != null && data.length > 0){
				var year = [];
				var month = [];
				for(var i = 0; i < data.length; i++){
					var yearValue = data[i].substr(0,4);
					var monthValue = data[i].substr(0,7);
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

function putRatioChart(data){
	var fusioncharts = new FusionCharts({
	    type: 'pie3d',
	    renderAt: 'putRatioChart',
	    width: '400',
	    height: '280',
	    dataFormat: 'json',
	    dataSource: {
	    	"chart": {
	            "startingangle": "120",
	            "showlabels": "0",
	            "showlegend": "1",
	            "enablemultislicing": "0",
	            "slicingdistance": "15",
	            "showpercentvalues": "1",
	            "showpercentintooltip": "0",
	            "plottooltext": "",
	            "theme": "fint"
	        },
	        "data": [     
	                 data.putRatioValue  
	        ]
	    },
	    "events": {
	    	"renderComplete": function () {
	    		$('#putRatioChart tspan').each(function() {
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
		reportType='all';
		reportValue=null;
	}
	$.ajax({
		url : ctxRoot + "/data/buyerdailyAnalysis",
		type : 'post',
		data : {
			"reportType" : reportType,
			"reportDate" : reportValue,
			"sort":"modeType",
			"hasTradeAmount":"1"
		}, 
		dataType: "json",
		success	: function(data){	
			parseDailyChart(data);
		},
		error: function(msg){
			return false;
		},
	});
}


function parseDailyChart(list){
	if(list.length<1){
		$('#putRatio').addClass("hidden");
		$('#quoteRatio').addClass("hidden");
		$('#tradeRatio').addClass("hidden");
		$('#incomeRatio').addClass("hidden");
		$('#quoteAPR').addClass("hidden");
		$('#tradeAPR').addClass("hidden");
		$('#incomeAPR').addClass("hidden");
		$('#noData3').removeClass("hidden");
		return;
	}
	$('#putRatio').removeClass("hidden");
	$('#quoteRatio').removeClass("hidden");
	$('#tradeRatio').removeClass("hidden");
	$('#incomeRatio').removeClass("hidden");
	$('#noData3').addClass("hidden");
	var tradeValue=[];
	var label=[];
	var putRatioValue=[];
	var quoteValue=[];
	var incomeValue=[];
	var quoteAPRValue=[];
	var tradeAPRValue=[];
	var incomeAPRValue=[];
	var putAmount10;
	var putAmount20;
	var putAmount30;
	var putAmount40;
	var putAmount50;
	var putAmount60;
	var putAmount70;
	var putAmount80;
	var putAmount90;
	var putAmount120;
	var putAmount150;
	var putAmount180;
	var putAmountMore;
	var quoteAmount10;
	var quoteAmount20;
	var quoteAmount30;
	var quoteAmount40;
	var quoteAmount50;
	var quoteAmount60;
	var quoteAmount70;
	var quoteAmount80;
	var quoteAmount90;
	var quoteAmount120;
	var quoteAmount150;
	var quoteAmount180;
	var quoteAmountMore;
	var tradeAmount10;
	var tradeAmount20;
	var tradeAmount30;
	var tradeAmount40;
	var tradeAmount50;
	var tradeAmount60;
	var tradeAmount70;
	var tradeAmount80;
	var tradeAmount90;
	var tradeAmount120;
	var tradeAmount150;
	var tradeAmount180;
	var tradeAmountMore;
	var incomeAmount10;
	var incomeAmount20;
	var incomeAmount30;
	var incomeAmount40;
	var incomeAmount50;
	var incomeAmount60;
	var incomeAmount70;
	var incomeAmount80;
	var incomeAmount90;
	var incomeAmount120;
	var incomeAmount150;
	var incomeAmount180;
	var incomeAmountMore;
	var quoteAPRAmount10;
	var quoteAPRAmount15;
	var quoteAPRAmount20;
	var quoteAPRAmount5;
	var quoteAPRAmountMore;
	var tradeAPRAmount10;
	var tradeAPRAmount15;
	var tradeAPRAmount20;
	var tradeAPRAmount5;
	var tradeAPRAmountMore;
	var result = {"putRatioData":{"putRatioValue":putRatioValue}, "tradeData":{"tradeValue":tradeValue},
			"quoteData":{"quoteValue":quoteValue},"incomeData":{"incomeValue":incomeValue}};
	for(var i=0; i<list.length; i++){
		if(list[i].modeType == "DPE"){
			if(list[i].availableAmount != 0){
			var	put = {"label":list[i].modeValueStr,"value":list[i].availableAmount};
			putRatioValue.push(put);
			}
			if(list[i].tradeAmount != 0 ){
			var	trade = {"label":list[i].modeValueStr,"value":list[i].tradeAmount};
			tradeValue.push(trade);
			}
			if(list[i].tradeAmount != 0){
			var	quote = {"label":list[i].modeValueStr,"value":list[i].quoteAmount};
			quoteValue.push(quote);
			}
			if(list[i].tradeAmount != 0){
			var	income = {"label":list[i].modeValueStr,"value":list[i].tradeDiscount};
			incomeValue.push(income);
			}
			if(list[i].modeValue == '10'){
				putAmount10 = list[i].availableAmount;
				quoteAmount10 = list[i].quoteAmount;
				tradeAmount10 = list[i].tradeAmount;
				incomeAmount10 = list[i].tradeDiscount;
			}else if(list[i].modeValue == '20'){
				putAmount20 = list[i].availableAmount;
				quoteAmount20 = list[i].quoteAmount;
				tradeAmount20 = list[i].tradeAmount;
				incomeAmount20 = list[i].tradeDiscount;
			}else if(list[i].modeValue == '30'){
				putAmount30 = list[i].availableAmount;
				quoteAmount30 = list[i].quoteAmount;
				tradeAmount30 = list[i].tradeAmount;
				incomeAmount30 = list[i].tradeDiscount;
			}else if(list[i].modeValue == '40'){
				putAmount40 = list[i].availableAmount;
				quoteAmount40 = list[i].quoteAmount;
				tradeAmount40 = list[i].tradeAmount;
				incomeAmount40 = list[i].tradeDiscount;
			}else if(list[i].modeValue == '50'){
				putAmount50 = list[i].availableAmount;
				quoteAmount50 = list[i].quoteAmount;
				tradeAmount50 = list[i].tradeAmount;
				incomeAmount50 = list[i].tradeDiscount;
			}else if(list[i].modeValue == '60'){
				putAmount60 = list[i].availableAmount;
				quoteAmount60 = list[i].quoteAmount;
				tradeAmount60 = list[i].tradeAmount;
				incomeAmount60 = list[i].tradeDiscount;
			}else if(list[i].modeValue == '70'){
				putAmount70 = list[i].availableAmount;
				quoteAmount70 = list[i].quoteAmount;
				tradeAmount70 = list[i].tradeAmount;
				incomeAmount70 = list[i].tradeDiscount;
			}else if(list[i].modeValue == '80'){
				putAmount80 = list[i].availableAmount;
				quoteAmount80 = list[i].quoteAmount;
				tradeAmount80 = list[i].tradeAmount;
				incomeAmount80 = list[i].tradeDiscount;
			}else if(list[i].modeValue == '90'){
				putAmount90 = list[i].availableAmount;
				quoteAmount90 = list[i].quoteAmount;
				tradeAmount90 = list[i].tradeAmount;
				incomeAmount90 = list[i].tradeDiscount;
			}else if(list[i].modeValue == '120'){
				putAmount120 = list[i].availableAmount;
				quoteAmount120 = list[i].quoteAmount;
				tradeAmount120 = list[i].tradeAmount;
				incomeAmount120 = list[i].tradeDiscount;
			}else if(list[i].modeValue == '150'){
				putAmount150 = list[i].availableAmount;
				quoteAmount150 = list[i].quoteAmount;
				tradeAmount150 = list[i].tradeAmount;
				incomeAmount150 = list[i].tradeDiscount;
			}else if(list[i].modeValue == '180'){
				putAmount180 = list[i].availableAmount;
				quoteAmount180 = list[i].quoteAmount;
				tradeAmount180 = list[i].tradeAmount;
				incomeAmount180 = list[i].tradeDiscount;
			}else if(list[i].modeValueStr == '其他'){
				putAmountMore = list[i].availableAmount;
				quoteAmountMore = list[i].quoteAmount;
				tradeAmountMore = list[i].tradeAmount;
				incomeAmountMore = list[i].tradeDiscount;
			}
		}
	
		if(list[i].modeType == "QuoteAPR"){
			if(list[i].quoteAvgAPR != 0){
			var	quoteAPR = {"label":list[i].modeValueStr,"value":list[i].quoteAvgAPR};
			quoteAPRValue.push(quoteAPR);
			if(list[i].modeValue == "5"){
				quoteAPRAmount5 = list[i].quoteAmount;
			}
			if(list[i].modeValue == "10"){
				quoteAPRAmount10 = list[i].quoteAmount;
			}
			if(list[i].modeValue == "15"){
				quoteAPRAmount15 = list[i].quoteAmount;
			}
			if(list[i].modeValue == "20"){
				quoteAPRAmount20 = list[i].quoteAmount;
			}
			if(list[i].modeValueStr == "其他"){
				quoteAmountMore = list[i].quoteAmount;
			}
			}
			}
		if(list[i].modeType == "TradeAPR"){
			if(list[i].tradeAvgAPR != 0){
			var	tradeAPR = {"label":list[i].modeValueStr,"value":list[i].tradeAvgAPR};
			tradeAPRValue.push(tradeAPR);
			if(list[i].modeValue == "5"){
				tradeAPRAmount5 = list[i].tradeAmount;
			}
			if(list[i].modeValue == "10"){
				tradeAPRAmount10 = list[i].tradeAmount;
			}
			if(list[i].modeValue == "15"){
				tradeAPRAmount15 = list[i].tradeAmount;
			}
			if(list[i].modeValue == "20"){
				tradeAPRAmount20 = list[i].tradeAmount;
			}
			if(list[i].modeValueStr == "其他"){
				tradeAmountMore = list[i].tradeAmount;
			}
			}
			}
	}
	if(putRatioValue.length<1){
		$('#putRatio').addClass("hidden");
	}
	if(quoteValue.length<1){
		$('#quoteRatio').addClass("hidden");
	}
	if(incomeValue.length<1){
		$('#incomeRatio').addClass("hidden");
	}
	if(tradeValue.length<1){
		$('#tradeRatio').addClass("hidden");
	}
	if(quoteAPRValue.length<1){
		$('#quoteAPR').addClass("hidden");
	}
	if(tradeAPRValue.length<1){
		$('#tradeAPR').addClass("hidden");
	}
	$('#10putAmount').html(putAmount10);
	$('#20putAmount').html(putAmount20);
	$('#30putAmount').html(putAmount30);
	$('#40putAmount').html(putAmount40);
	$('#50putAmount').html(putAmount50);
	$('#60putAmount').html(putAmount60);
	$('#70putAmount').html(putAmount70);
	$('#80putAmount').html(putAmount80);
	$('#90putAmount').html(putAmount90);
	$('#120putAmount').html(putAmount120);
	$('#150putAmount').html(putAmount150);
	$('#180putAmount').html(putAmount180);
	$('#moreputAmount').html(putAmountMore);
	$('#10quoteAmount').html(quoteAmount10);
	$('#20quoteAmount').html(quoteAmount20);
	$('#30quoteAmount').html(quoteAmount30);
	$('#40quoteAmount').html(quoteAmount40);
	$('#50quoteAmount').html(quoteAmount50);
	$('#60quoteAmount').html(quoteAmount60);
	$('#70quoteAmount').html(quoteAmount70);
	$('#80quoteAmount').html(quoteAmount80);
	$('#90quoteAmount').html(quoteAmount90);
	$('#120quoteAmount').html(quoteAmount120);
	$('#150quoteAmount').html(quoteAmount150);
	$('#180quoteAmount').html(quoteAmount180);
	$('#morequoteAmount').html(quoteAmountMore);
	$('#10tradeAmount').html(tradeAmount10);
	$('#20tradeAmount').html(tradeAmount20);
	$('#30tradeAmount').html(tradeAmount30);
	$('#40tradeAmount').html(tradeAmount40);
	$('#50tradeAmount').html(tradeAmount50);
	$('#60tradeAmount').html(tradeAmount60);
	$('#70tradeAmount').html(tradeAmount70);
	$('#80tradeAmount').html(tradeAmount80);
	$('#90tradeAmount').html(tradeAmount90);
	$('#120tradeAmount').html(tradeAmount120);
	$('#150tradeAmount').html(tradeAmount150);
	$('#180tradeAmount').html(tradeAmount180);
	$('#moretradeAmount').html(tradeAmountMore);
	$('#10incomeAmount').html(incomeAmount10);
	$('#20incomeAmount').html(incomeAmount20);
	$('#30incomeAmount').html(incomeAmount30);
	$('#40incomeAmount').html(incomeAmount40);
	$('#50incomeAmount').html(incomeAmount50);
	$('#60incomeAmount').html(incomeAmount60);
	$('#70incomeAmount').html(incomeAmount70);
	$('#80incomeAmount').html(incomeAmount80);
	$('#90incomeAmount').html(incomeAmount90);
	$('#120incomeAmount').html(incomeAmount120);
	$('#150incomeAmount').html(incomeAmount150);
	$('#180incomeAmount').html(incomeAmount180);
	$('#moreincomeAmount').html(incomeAmountMore);
	$('#5quoteAPRAmount').html(quoteAPRAmount5);
	$('#10quoteAPRAmount').html(quoteAPRAmount10);
	$('#15quoteAPRAmount').html(quoteAPRAmount15);
	$('#20quoteAPRAmount').html(quoteAPRAmount20);
	$('#morequoteAPRAmount').html(quoteAPRAmountMore);
	$('#5tradeAPRAmount').html(tradeAPRAmount5);
	$('#10tradeAPRAmount').html(tradeAPRAmount10);
	$('#15tradeAPRAmount').html(tradeAPRAmount15);
	$('#20tradeAPRAmount').html(tradeAPRAmount20);
	$('#moretradeAPRAmount').html(tradeAPRAmountMore);
	more(result.putRatioData.putRatioValue);
	more(result.incomeData.incomeValue);
	more(result.quoteData.quoteValue);
	more(result.tradeData.tradeValue);
	more(quoteAPRValue);
	more(tradeAPRValue);
	putRatioChart(result.putRatioData);
	incomeRatio(result.incomeData);
	quoteRatio(result.quoteData);
	tradeRatio(result.tradeData);
	quoteAPR1(quoteAPRValue);
	tradeAPR1(tradeAPRValue);
}
function quoteRatio(data){
	var fusioncharts = new FusionCharts({
	    type: 'pie3d',
	    renderAt: 'quoteRatioChart',
	    width: '400',
	    height: '280',
	    dataFormat: 'json',
	    dataSource: {
	    	"chart": {
	            "startingangle": "120",
	            "showlabels": "0",
	            "showlegend": "1",
	            "enablemultislicing": "0",
	            "slicingdistance": "15",
	            "showpercentvalues": "1",
	            "showpercentintooltip": "0",
	            "theme": "fint"
	        },
	        "data": 
	                 data.quoteValue
	        
	    },
	    "events": {
	    	"renderComplete": function () {
	    		$('#quoteRatio tspan').each(function() {
	    			if($(this).text() == "FusionCharts XT Trial"){
	    				$(this).remove();
	    			}
	    	    });
	        }
	    }
	});
	fusioncharts.render();
}

function more(list){
	var more;
	for(var i=0;i<list.length;i++){
		if(list[i].label == "更多"){
			more ={"label":"更多","value":list[i].value};
		}
	}
	if(typeof(more) != "undefined"){
		list.shift();
		list.push(more);
	}
}
function tradeRatio(data){
	var fusioncharts = new FusionCharts({
	    type: 'pie3d',
	    renderAt: 'tradeRatioChart',
	    width: '400',
	    height: '280',
	    dataFormat: 'json',
	    dataSource: {
	    	"chart": {
	            "startingangle": "120",
	            "showlabels": "0",
	            "showlegend": "1",
	            "enablemultislicing": "0",
	            "slicingdistance": "15",
	            "showpercentvalues": "1",
	            "showpercentintooltip": "0",
	            "theme": "fint"
	        },
	        "data": 
	                data.tradeValue
	        
	    },
	    "events": {
	    	"renderComplete": function () {
	    		$('#tradeRatio tspan').each(function() {
	    			if($(this).text() == "FusionCharts XT Trial"){
	    				$(this).remove();
	    			}
	    	    });
	        }
	    }
	});
	fusioncharts.render();
}

function incomeRatio(data){
	var fusioncharts = new FusionCharts({
	    type: 'pie3d',
	    renderAt: 'incomeRatioChart',
	    width: '400',
	    height: '280',
	    dataFormat: 'json',
	    dataSource: {
	    	"chart": {
	            "startingangle": "120",
	            "showlabels": "0",
	            "showlegend": "1",
	            "enablemultislicing": "0",
	            "slicingdistance": "15",
	            "showpercentvalues": "1",
	            "showpercentintooltip": "0",
	            "plottooltext": "Age group : $label Total visit : $datavalue",
	            "theme": "fint"
	        },
	        "data": [
	                 data.incomeValue
	        ]
	    },
	    "events": {
	    	"renderComplete": function () {
	    		$('#incomeRatioChart tspan').each(function() {
	    			if($(this).text() == "FusionCharts XT Trial"){
	    				$(this).remove();
	    			}
	    	    });
	        }
	    }
	});
	fusioncharts.render();
}


function tradeAPR1(data){
	var fusioncharts = new FusionCharts({
	    type: 'pie3d',
	    renderAt: 'tradeAPRChart',
	    width: '400',
	    height: '280',
	    dataFormat: 'json',
	    dataSource: {
	    	"chart": {
	            "startingangle": "120",
	            "showlabels": "0",
	            "showlegend": "1",
	            "enablemultislicing": "0",
	            "slicingdistance": "15",
	            "showpercentvalues": "1",
	            "showpercentintooltip": "0",
	            "theme": "fint"
	        },
	        "data": 
	                 data
	   
	    },
	    "events": {
	    	"renderComplete": function () {
	    		$('#tradeAPRChart tspan').each(function() {
	    			if($(this).text() == "FusionCharts XT Trial"){
	    				$(this).remove();
	    			}
	    	    });
	        }
	    }
	});
	fusioncharts.render();
}

function quoteAPR1(data){
	var fusioncharts = new FusionCharts({
	    type: 'pie3d',
	    renderAt: 'quoteAPRChart',
	    width: '400',
	    height: '280',
	    dataFormat: 'json',
	    dataSource: {
	    	"chart": {
	            "startingangle": "120",
	            "showlabels": "0",
	            "showlegend": "1",
	            "enablemultislicing": "0",
	            "slicingdistance": "15",
	            "showpercentvalues": "1",
	            "showpercentintooltip": "0",
	            "theme": "fint"
	        },
	        "data": 
	                 data
	       
	    },
	    "events": {
	    	"renderComplete": function () {
	    		$('#quoteAPRChart tspan').each(function() {
	    			if($(this).text() == "FusionCharts XT Trial"){
	    				$(this).remove();
	    			}
	    	    });
	        }
	    }
	});
	fusioncharts.render();
}

function ARPchange(){
	$("#amount").css("border-bottom","1px solid #e2e2e2");
	$("#amount").addClass("back-gray-e2e2e2");
	$("#ARP").addClass("font-bold");
	$("#ARP").css("border-bottom","0px solid");
	$("#ARP").removeClass("back-gray-e2e2e2");
	$("#amount").removeClass("font-bold");
	$("#putRatio").addClass("hidden");
	$("#quoteRatio").addClass("hidden");
	$("#tradeRatio").addClass("hidden");
	$("#incomeRatio").addClass("hidden");
	$("#incomeAPR").removeClass("hidden");
	$("#tradeAPR").removeClass("hidden");
	$("#quoteAPR").removeClass("hidden");
}
function amountchange(){
	$("#ARP").css("border-bottom","1px solid #e2e2e2");
	$("#ARP").addClass("back-gray-e2e2e2");
	$("#amount").addClass("font-bold");
	$("#amount").css("border-bottom","0px solid");
	$("#amount").removeClass("back-gray-e2e2e2");
	$("#ARP").removeClass("font-bold");
	$("#incomeAPR").addClass("hidden");
	$("#tradeAPR").addClass("hidden");
	$("#quoteAPR").addClass("hidden");
	$("#putRatio").removeClass("hidden");
	$("#quoteRatio").removeClass("hidden");
	$("#tradeRatio").removeClass("hidden");
	$("#incomeRatio").removeClass("hidden");
}