$(document).ready(function() {
	search();
	getMonth();
	getYear();
	initFilter();
});

function getMonth(){
	$.ajax({
		url : ctxRoot + "/bothReport/getMyBuyerMonthList",
		type : 'post',
		data : {
		}, 
		dataType: "json",
		success	: function(data){	
			if(data.extendMap.list != null && data.extendMap.list.length>0){
				for(var i=0;i<data.extendMap.list.length;i++){	
					$("#monthDate").append("<option value='"+data.extendMap.list[i]+"'> "+data.extendMap.list[i]+"</option>");
				}
			}
			$("#monthDate").combobox({
				onChange: function (n,o) {
					monthResult();
				}
			});
		},
		error: function(msg){
			return false;
		},
	});
}

function getYear(){
	$.ajax({
		url : ctxRoot + "/bothReport/getMyBuyerYearList",
		type : 'post',
		data : {
		}, 
		dataType: "json",
		success	: function(data){	
			if(data.extendMap.list != null && data.extendMap.list.length>0){
				for(var i=0;i<data.extendMap.list.length;i++){	
					$("#yearDate").append("<option value='"+data.extendMap.list[i]+"'> "+data.extendMap.list[i]+"</option>");
				}
			}
			$("#yearDate").combobox({
				onChange: function (n,o) {
					yearResult();
				}
			});
		},
		error: function(msg){
			return false;
		},
	});
}

function search(){
	$("#table1DIv").addClass("height-550");
	$("#table1DIv").removeClass("height-50");
	$("#icon-none").addClass("hidden");
	$('#monthResult').addClass("hidden");
	$('#yearResult').addClass("hidden");
	$('#dailyResult').removeClass("hidden");
	$('#allResult').addClass("hidden");
	$('#daily').addClass("color-boldred font-bold");
	$('#month').removeClass("color-boldred font-bold");
	$('#year').removeClass("color-boldred font-bold");
	$('#all').removeClass("color-boldred font-bold");
	var reportValue=$('#reportDate').datebox('getValue');
	var buyerId=$('#companyName1').combobox('getValue');
	var params = {"isAjax":"y","buyerId" :buyerId,"isEasyUI":"1","reportType":"day"};
	if(reportValue != ''){
		params.reportValue = reportValue;
	}
	$('#table1').datagrid({
		url: ctxRoot + "/data/searchSupplierReport",
		loadMsg: "载入中...",
		queryParams: params,
		singleSelect: true,
		pagination: true,
		pageList: [10, 20, 30, 40, 50],
		pageSize: 10,
		fit: true,
		fitColumns : true,
		sortName: "createTime",
		sortOrder: "desc",
		rownumbers: true,
		rownumberWidth: 40,
		columns:[[
		   {field:'buyerName', title:'买家名称',  align:'left', width:'31%', sortable:true},
		   {field:'reportDate', title:'成交日期', align:'center', width:'15%', sortable:true,formatter:function(val, row){return row.reportValue;}},
		   {field:'tradeAmount', title:'成交金额', align:'right', width:'15%', sortable:true},
		   {field:'tradeDiscount', title:'折扣金额', align:'right', width:'15%', sortable:true},
		   {field:'tradeAvgAPR', title:'年化利率', align:'right', width:'10%', sortable:true},
		   {field:'tradeAvgDPE', title:'平均提前天数', align:'right', width:'13%', sortable:true}
		]],
		onLoadSuccess: function(data){
			if (data.total == 0) {
                $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
				$("#table1DIv").removeClass("height-550");
				$("#table1DIv").addClass("height-50");
				$("#icon-none").removeClass("hidden");
            }
		}
	});
}


function monthResult(currentPage){
	$("#table2DIv").addClass("height-550");
	$("#table2DIv").removeClass("height-50");
	$("#icon-none2").addClass("hidden");
	$('#dailyResult').addClass("hidden");
	$('#yearResult').addClass("hidden");
	$('#allResult').addClass("hidden");
	$('#monthResult').removeClass("hidden");
	$('#month').addClass("color-boldred font-bold");
	$('#daily').removeClass("color-boldred font-bold");
	$('#all').removeClass("color-boldred font-bold");
	$('#year').removeClass("color-boldred font-bold");
	var reportValue=$('#monthDate').combobox('getValue');
	var buyerId=$('#companyName2').combobox('getValue');
	var params = {"isAjax":"y","buyerId" :buyerId,"isEasyUI":"1","reportType":"month"};
	if(reportValue != ''){
		params.reportValue = reportValue;
	}
	$('#table2').datagrid({
		url: ctxRoot + "/data/searchSupplierReport",
		loadMsg: "载入中...",
		queryParams: params,
		singleSelect: true,
		pagination: true,
		pageList: [10, 20, 30, 40, 50],
		pageSize: 10,
		fit: true,
		fitColumns : true,
		sortName: "createTime",
		sortOrder: "desc",
		rownumbers: true,
		rownumberWidth: 40,
		columns:[[
		   {field:'buyerName', title:'买家名称',  align:'left', width:'31%', sortable:true},
		   {field:'reportDate', title:'成交月份', align:'center', width:'15%', sortable:true,formatter:function(val, row){return row.reportValue;}},
		   {field:'tradeAmount', title:'成交金额', align:'right', width:'15%', sortable:true},
		   {field:'tradeDiscount', title:'折扣金额', align:'right', width:'15%', sortable:true},
		   {field:'tradeAvgAPR', title:'平均收益率', align:'right', width:'10%', sortable:true},
		   {field:'tradeAvgDPE', title:'平均提前天数', align:'right', width:'13%', sortable:true}
		]],
		onLoadSuccess: function(data){
			if (data.total == 0) {
                $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
				$("#table2DIv").removeClass("height-550");
				$("#table2DIv").addClass("height-50");
				$("#icon-none2").removeClass("hidden");
            }
		}
	});
}

function yearResult(currentPage){
	$("#table3DIv").addClass("height-550");
	$("#table3DIv").removeClass("height-50");
	$("#icon-none3").addClass("hidden");
	$('#monthResult').addClass("hidden");
	$('#dailyResult').addClass("hidden");
	$('#allResult').addClass("hidden");
	$('#yearResult').removeClass("hidden");
	$('#year').addClass("color-boldred font-bold");
	$('#month').removeClass("color-boldred font-bold");
	$('#daily').removeClass("color-boldred font-bold");
	$('#all').removeClass("color-boldred font-bold");
	var buyerId=$('#companyName3').combobox('getValue');
	var reportValue= $('#yearDate').combobox('getValue');
	var params = {"isAjax":"y","buyerId" :buyerId,"isEasyUI":"1","reportType":"year"};
	if(reportValue != ''){
		params.reportValue = reportValue;
	}
	$('#table3').datagrid({
		url: ctxRoot + "/data/searchSupplierReport",
		loadMsg: "载入中...",
		queryParams: params,
		singleSelect: true,
		pagination: true,
		pageList: [10, 20, 30, 40, 50],
		pageSize: 10,
		fit: true,
		fitColumns : true,
		sortName: "createTime",
		sortOrder: "desc",
		rownumbers: true,
		rownumberWidth: 40,
		columns:[[
		   {field:'buyerName', title:'买家名称',  align:'left', width:'31%', sortable:true},
		   {field:'reportValue', title:'成交年份', align:'center', width:'15%', sortable:true,formatter:function(val, row){return row.reportValue;}},
		   {field:'tradeAmount', title:'成交金额', align:'right', width:'15%', sortable:true},
		   {field:'tradeDiscount', title:'折扣金额', align:'right', width:'15%', sortable:true},
		   {field:'tradeAvgAPR', title:'平均收益率', align:'right', width:'10%', sortable:true},
		   {field:'tradeAvgDPE', title:'平均提前天数', align:'right', width:'13%', sortable:true}
		]],
		onLoadSuccess: function(data){
			if (data.total == 0) {
                $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
				$("#table3DIv").removeClass("height-550");
				$("#table3DIv").addClass("height-50");
				$("#icon-none3").removeClass("hidden");
            }
		}
	});
}


//初始化筛选条件
function initFilter(){
	$('#companyName1').combobox({
	    url: ctxRoot + "/customer/getBuyerList?isEasyUI=1&sort=name desc",
	    textField: 'name',
	    valueField: 'id',
	    onSelect: function(row){
	    	search();
	    }
	});
	$('#companyName2').combobox({
	    url: ctxRoot + "/customer/getBuyerList?isEasyUI=1&sort=name desc",
	    textField: 'name',
	    valueField: 'id',
	    onSelect: function(row){
	    	monthResult();
	    }
	});
	$('#companyName3').combobox({
	    url: ctxRoot + "/customer/getBuyerList?isEasyUI=1&sort=name desc",
	    textField: 'name',
	    valueField: 'id',
	    onSelect: function(row){
	    	yearResult();
	    }
	});
}

//数据显示
function showList(divId, list,page){

	if(divId == "table1"){
		if(list == null || list.length <= 0){
			 $('#table1 tr:gt(0)').remove();//删除之前的数据
			 var str2 = "<tr class='border-bottom-solid height-150'>"
					+"<td class='icon-none'colspan='7' rowspan='5'></td></tr>";
		  		$('#table1').append(str2);
			return;
		}
	 $('#table1 tr:gt(0)').remove();//删除之前的数据
     var s = '';
     for (var i = 0; i < list.length; i++) {
    	var no = i+1;
    	if (isNull(list[i].buyerName)) {
			var buyerName = "";
		} else {
			var buyerName = list[i].buyerName.length > 17 ? list[i].buyerName.substring(0, 17)
					+ "..." : list[i].buyerName;
		}
  	   s += '<tr class="border-bottom-solid"><td class="width-50 padding-5 text-center">' +no+ '</td><td class="width-250 padding-5 text-center"><a class="easyui-tooltip font-12 link" title="'+ list[i].buyerName+ '">' +buyerName + '</td><td class="width-100 padding-5 text-center">' + list[i].reportDateStr + '</td><td class="width-150 padding-5 text-center">' + list[i].tradeAmount + '</td>'
         + '<td class="width-150 padding-5 text-center">' + list[i].tradeDiscount + '</td><td class="width-50 padding-5 text-center">' + list[i].tradeAvgAPR + '</td><td class="width-50 padding-5 text-center">' + list[i].tradeAvgDPE + '</td></tr>';
     }
     $('#table1').append(s);
     var tablename = document.getElementById("table1");
     if($('#table1 tr').length<2){
    	 var str2 = "<tr class='border-bottom-solid height-150'>"
				+"<td class='icon-none'colspan='7' rowspan='5'></td></tr>";
  		$('#table1').append(str2);
  	}
	}	
	if(divId == "table2"){
		if(list == null || list.length <= 0){
			 $('#table2 tr:gt(0)').remove();//删除之前的数据
			 var str2 = "<tr class='border-bottom-solid height-150'>"
					+"<td class='icon-none'colspan='7' rowspan='5'></td></tr>";
		  		$('#table2').append(str2);
			return;
		}
     $('#table2 tr:gt(0)').remove();//删除之前的数据
     var s = '';
     for (var i = 0; i < list.length; i++) {
    	 var no = i+1;
    	 if (isNull(list[i].buyerName)) {
 			var buyerName = "";
 		} else {
 			var buyerName = list[i].buyerName.length > 17 ? list[i].buyerName.substring(0, 17)
 					+ "..." : list[i].buyerName;
 		}
   	   s += '<tr class="border-bottom-solid"><td class="width-50 padding-5 text-center">' +no+ '</td><td class="width-250 padding-5 text-center"><a class="easyui-tooltip font-12 link" title="'+ list[i].buyerName+ '">' +buyerName + '</td><td class="width-100 padding-5 text-center">' + list[i].reportDateStr + '</td><td class="width-150 padding-5 text-center">' + list[i].tradeAmount + '</td>'
          + '<td class="width-150 padding-5 text-center">' + list[i].tradeDiscount + '</td><td class="width-50 padding-5 text-center">' + list[i].tradeAvgAPR + '</td><td class="width-50 padding-5 text-center">' + list[i].tradeAvgDPE + '</td></tr>';
      }
     $('#table2').append(s);
     var tablename = document.getElementById("table2");
     if($('#table2 tr').length<2){
    	 var str2 = "<tr class='border-bottom-solid height-150'>"
				+"<td class='icon-none'colspan='7' rowspan='5'></td></tr>";
  		$('#table2').append(str2);
  	}
	}
	
	 if(divId == "table3"){ 
		 if(list == null || list.length <= 0){
			 $('#table3 tr:gt(0)').remove();//删除之前的数据
			 var str2 = "<tr class='border-bottom-solid height-150'>"
					+"<td class='icon-none'colspan='7' rowspan='5'></td></tr>";
		  		$('#table3').append(str2);
			return;
		}
     $('#table3 tr:gt(0)').remove();//删除之前的数据
     var s = '';
     for (var i = 0; i < list.length; i++) {
    	 var no = i+1;
    	 if (isNull(list[i].buyerName)) {
 			var buyerName = "";
 		} else {
 			var buyerName = list[i].buyerName.length > 17 ? list[i].buyerName.substring(0, 17)
 					+ "..." : list[i].buyerName;
 		}
   	   s += '<tr class="border-bottom-solid"><td class="width-50 padding-5 text-center">' +no+ '</td><td class="width-250 padding-5 text-center"><a class="easyui-tooltip font-12 link" title="'+ list[i].buyerName+ '">' +buyerName + '</td><td class="width-100 padding-5 text-center">' + list[i].reportDateStr + '</td><td class="width-150 padding-5 text-center">' + list[i].tradeAmount + '</td>'
          + '<td class="width-150 padding-5 text-center">' + list[i].tradeDiscount + '</td><td class="width-50 padding-5 text-center">' + list[i].tradeAvgAPR + '</td><td class="width-50 padding-5 text-center">' + list[i].tradeAvgDPE + '</td></tr>';
      }
     $('#table3').append(s);
     var tablename = document.getElementById("table3");
     if($('#table3 tr').length<2){
    	 var str2 = "<tr class='border-bottom-solid height-150'>"
				+"<td class='icon-none'colspan='7' rowspan='5'></td></tr>";
  		$('#table3').append(str2);
  	}
	 }
	 
	var li = tablename.getElementsByTagName("tr");
	for (var i = 1;i < li.length; i ++){
	if (i % 2 == 0){
		li[i].style.backgroundColor="#f8f8f8";
		}else{
			li[i].style.backgroundColor="#FFFFFF";
		}
	}
}