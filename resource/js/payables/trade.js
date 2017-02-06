$(document).ready(function() {

	search();
	getMonth();
	getYear();
	initFilter();
});

//初始化筛选条件
function initFilter(){
	$('#companyName1').combobox({
	    url: ctxRoot + "/customer/getSupplierList?isEasyUI=1&sort=name desc",
	    textField: 'name',
	    valueField: 'id',
	    onSelect: function(row){
	    	search();
	    }
	});
	$('#companyName2').combobox({
	    url: ctxRoot + "/customer/getSupplierList?isEasyUI=1&sort=name desc",
	    textField: 'name',
	    valueField: 'id',
	    onSelect: function(row){
	    	monthResult();
	    }
	});
	$('#companyName3').combobox({
	    url: ctxRoot + "/customer/getSupplierList?isEasyUI=1&sort=name desc",
	    textField: 'name',
	    valueField: 'id',
	    onSelect: function(row){
	    	yearResult();
	    }
	});
//	$('#monthDate').combobox({
//	    url:ctxRoot + "/bothReport/getMySupplierMonthList",
//	    textField: 'text',
//	    valueField: 'text',
//	    onSelect: function(row){
//	    	yearResult();
//	    }
//	});
//	$('#yearDate').combobox({
//	    url: ctxRoot + "/bothReport/getMySupplierYearList",
//	    textField: 'text',
//	    valueField: 'text',
//	    onSelect: function(row){
//	    	yearResult();
//	    }
//	});
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
	var supplierId=$('#companyName1').combobox('getValue');
	var params = {"isAjax":"y","supplierId" :supplierId,"isEasyUI":"1","reportType":"day"}
	if(reportValue != ''){
		params.reportValue = reportValue;
	}
	$('#table1').datagrid({
		url: ctxRoot + "/data/searchReport",
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
		   {field:'supplierName', title:'供应商名称',  align:'left', width:'31%', sortable:true},
		   {field:'reportValue', title:'成交日期', align:'center', width:'15%', sortable:true,formatter:function(val, row){return row.reportValue;}},
		   {field:'tradeAmount', title:'成交金额', align:'right', width:'15%', sortable:true},
		   {field:'tradeDiscount', title:'收益金额', align:'right', width:'15%', sortable:true},
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

function getMonth(){
	$.ajax({
		url : ctxRoot + "/bothReport/getMySupplierMonthList",
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
		url : ctxRoot + "/bothReport/getMySupplierYearList",
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
	var supplierId=$('#companyName2').combobox('getValue');
	var params = {"isAjax":"y","supplierId" :supplierId,"isEasyUI":"1","reportType":"month"};
	if(reportValue != ''){
		params.reportValue = reportValue;
	}
	$('#table2').datagrid({
		url: ctxRoot + "/data/searchReport",
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
		   {field:'supplierName', title:'供应商名称',  align:'left', width:'31%', sortable:true},
		   {field:'reportDate', title:'成交月份', align:'center', width:'15%', sortable:true,formatter:function(val, row){return row.reportValue;}},
		   {field:'tradeAmount', title:'成交金额', align:'right', width:'15%', sortable:true},
		   {field:'tradeDiscount', title:'收益金额', align:'right', width:'15%', sortable:true},
		   {field:'tradeAvgAPR', title:'年化利率', align:'right', width:'10%', sortable:true},
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
	var supplierId=$('#companyName3').combobox('getValue');
	var reportValue= $('#yearDate').combobox('getValue');
	var params = {"isAjax":"y","supplierId" :supplierId,"isEasyUI":"1","reportType":"year"}
	if(reportValue != ''){
		params.reportValue = reportValue;
	}
	$('#table3').datagrid({
		url: ctxRoot + "/data/searchReport",
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
		   {field:'supplierName', title:'供应商名称',  align:'left', width:'31%', sortable:true},
		   {field:'reportDate', title:'成交年份', align:'center', width:'15%', sortable:true,formatter:function(val, row){return row.reportValue;}},
		   {field:'tradeAmount', title:'成交金额', align:'right', width:'15%', sortable:true},
		   {field:'tradeDiscount', title:'收益金额', align:'right', width:'15%', sortable:true},
		   {field:'tradeAvgAPR', title:'年化利率', align:'right', width:'10%', sortable:true},
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


/*$(function() {      
    $('#monthbeginTime').datebox({    
          onShowPanel : function() {// 显示日趋选择对象后再触发弹出月份层的事件，初始化时没有生成月份层    
              span.trigger('click'); // 触发click事件弹出月份层    
              if (!tds)    
                  setTimeout(function() {// 延时触发获取月份对象，因为上面的事件触发和对象生成有时间间隔    
                      tds = p.find('div.calendar-menu-month-inner td');    
                      tds.click(function(e) {    
                          e.stopPropagation(); // 禁止冒泡执行easyui给月份绑定的事件    
                          var year = /\d{4}/.exec(span.html())[0]// 得到年份    
                          , month = parseInt($(this).attr('abbr'), 10) + 1; // 月份    
                          $('#monthbeginTime').datebox('hidePanel')// 隐藏日期对象    
                          .datebox('setValue', year + '-' + month); // 设置日期的值    
                      });    
                  }, 0);    
          },    
          parser : function(s) {// 配置parser，返回选择的日期    
              if (!s)    
                  return new Date();    
              var arr = s.split('-');    
              return new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, 1);    
          },    
          formatter : function(d) {    
              var month = d.getMonth();  
              if(month<10){  
                  month = "0"+month;  
              }  
              if (d.getMonth() == 0) {    
                  return d.getFullYear()-1 + '-' + 12;    
              } else {    
                  return d.getFullYear() + '-' + month;    
              }    
          }// 配置formatter，只返回年月    
      });    
      var p = $('#monthbeginTime').datebox('panel'), // 日期选择对象    
      tds = false, // 日期选择对象中月份    
      span = p.find('span.calendar-text'); // 显示月份层的触发控件    
      
  }); */   
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
    	if (isNull(list[i].supplierName)) {
			var supplierName = "";
		} else {
			var supplierName = list[i].supplierName.length > 17 ? list[i].supplierName.substring(0, 17)
					+ "..." : list[i].supplierName;
		}
  	   s += '<tr class="border-bottom-solid"><td class="width-50 padding-5 text-center">' +no+ '</td><td class="width-250 padding-5 text-center"><a class="easyui-tooltip font-12 link" title="'+ list[i].supplierName+ '">' +supplierName + '</td><td class="width-100 padding-5 text-center">' + list[i].reportDateStr + '</td><td class="width-150 padding-5 text-center">' + list[i].tradeAmount + '</td>'
         + '<td class="width-150 padding-5 text-center">' + list[i].tradeDiscount + '</td><td class="width-50 padding-5 text-center">' + list[i].tradeAvgAPR + '</td><td class="width-50 padding-5 text-center">' + list[i].tradeAvgDPE + '</td></tr>';
     }
     $('#table1').append(s);
     var tablename = document.getElementById("table1");
     if($('#table1 tr').length<2){
    	 var str2 = "<tr class='border-bottom-solid height-30 line-height-30'>"
    			+"<td class='icon-none margin-top-100'colspan='7' rowspan='3'></td></tr>";
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
    	  	if (isNull(list[i].supplierName)) {
    			var supplierName = "";
    		} else {
    			var supplierName = list[i].supplierName.length > 17 ? list[i].supplierName.substring(0, 17)
    					+ "..." : list[i].supplierName;
    		}
      	   s += '<tr class="border-bottom-solid"><td class="width-50 padding-5 text-center">' +no+ '</td><td class="width-250 padding-5 text-center"><a class="easyui-tooltip font-12 link" title="'+ list[i].supplierName+ '">' +supplierName + '</td><td class="width-100 padding-5 text-center">' + list[i].reportDateStr + '</td><td class="width-150 padding-5 text-center">' + list[i].tradeAmount + '</td>'
             + '<td class="width-150 padding-5 text-center">' + list[i].tradeDiscount + '</td><td class="width-50 padding-5 text-center">' + list[i].tradeAvgAPR + '</td><td class="width-50 padding-5 text-center">' + list[i].tradeAvgDPE + '</td></tr>';
         }
     $('#table2').append(s);
     var tablename = document.getElementById("table2");
     if($('#table2 tr').length<2){
    	 var str2 = "<tr class='border-bottom-solid height-30 line-height-30'>"
    			+"<td class='icon-none margin-top-100'colspan='7' rowspan='3'></td></tr>";
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
    	  if (isNull(list[i].supplierName)) {
    			var supplierName = "";
    		} else {
    			var supplierName = list[i].supplierName.length > 17 ? list[i].supplierName.substring(0, 17)
    					+ "..." : list[i].supplierName;
    		}
      	   s += '<tr class="border-bottom-solid"><td class="width-50 padding-5 text-center">' +no+ '</td><td class="width-250 padding-5 text-center"><a class="easyui-tooltip font-12 link" title="'+ list[i].supplierName+ '">' +supplierName + '</td><td class="width-100 padding-5 text-center">' + list[i].reportDateStr + '</td><td class="width-150 padding-5 text-center">' + list[i].tradeAmount + '</td>'
             + '<td class="width-150 padding-5 text-center">' + list[i].tradeDiscount + '</td><td class="width-50 padding-5 text-center">' + list[i].tradeAvgAPR + '</td><td class="width-50 padding-5 text-center">' + list[i].tradeAvgDPE + '</td></tr>';
     		}
     $('#table3').append(s);
     var tablename = document.getElementById("table3");
     if($('#table3 tr').length<2){
    	 var str2 = "<tr class='border-bottom-solid height-30 line-height-30'>"
    			+"<td class='icon-none margin-top-100'colspan='7' rowspan='3'></td></tr>";
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