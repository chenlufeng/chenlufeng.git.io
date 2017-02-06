$(document).ready(function() {
	initFilter();
	search();
});

function initFilter(){
	$('#buyerName').combobox({
	    url: ctxRoot + "/customer/getBuyerList?isEasyUI=1&sort=name desc",
	    textField: 'name',
	    valueField: 'id',
	    onSelect: function(row){
	    	search();
	    }
	});
}

function search(){
	$("#table1DIv").addClass("height-550");
	$("#table1DIv").removeClass("height-50");
	$("#icon-none").addClass("hidden");
	$('#monthResult').addClass("hidden");
	$('#yearResult').addClass("hidden");
	$('#dailyResult').removeClass("hidden");
	$('#daily').addClass("color-boldred font-bold");
	$('#month').removeClass("color-boldred font-bold");
	$('#year').removeClass("color-boldred font-bold");
	var tradeDate=$('#tradeDate').datebox('getValue');
	var buyerId=$('#buyerName').combobox('getValue');
	var params = {"isAjax":"y","buyerId" :buyerId,"tradeDate":tradeDate,"isEasyUI":"1","status":"success"}
	$('#table1').datagrid({
		url: ctxRoot + "/data/searchSupplierTradeDetail",
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
		   {field:'buyerName', title:'买家名称',  align:'left', width:'29%', sortable:true},
		   {field:'tradeDate', title:'交易日期', align:'center', width:'13%', sortable:true,formatter:function(val, row){return row.tradeDateStr;}},
		   {field:'code', title:'交易号码', align:'center', width:'13%', sortable:true},
		   {field:'tradeAmount', title:'交易金额', align:'center', width:'13%', sortable:true},
		   {field:'tradeDiscount', title:'折扣金额', align:'center', width:'11%', sortable:true},
		   {field:'tradeAPR', title:'折扣利率', align:'center', width:'10%', sortable:true},
		   {field:'tradeDPE', title:'提前天数', align:'center', width:'10%', sortable:true}
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
	$('#dailyResult').addClass("hidden");
	$('#yearResult').addClass("hidden");
	$('#monthResult').removeClass("hidden");
	$('#month').addClass("color-boldred font-bold");
	$('#daily').removeClass("color-boldred font-bold");
	$('#year').removeClass("color-boldred font-bold");
	var tradeDateMonth=$('#monthbeginTime').datebox('getValue');
	var likeBuyerName=$('#monthbuyerName').textbox('getValue');
	var params = {"isAjax":"y", "currentPage":currentPage, "pageSize" : 10,"likeBuyerName" :likeBuyerName,"tradeDateMonth":tradeDateMonth,"sort":"tradeDate desc"}
	$.ajax({
		url : ctxRoot + "/data/searchSupplierTradeDetail",
		type : 'post',
		data : params, 
		dataType: "json",
		success	: function(data){	
               showList("table2", data.extendMap.page.list,data.extendMap.page);
       		   $("#pageDiv2").html(createPage(data.extendMap.page, "monthResult"));
		},
		error: function(msg){
			return false;
		},
	});
}

function yearResult(currentPage){
	$('#monthResult').addClass("hidden");
	$('#dailyResult').addClass("hidden");
	$('#yearResult').removeClass("hidden");
	$('#year').addClass("color-boldred font-bold");
	$('#month').removeClass("color-boldred font-bold");
	$('#daily').removeClass("color-boldred font-bold");
	var likeBuyerName=$('#yearbuyerName').textbox('getValue');
	var tradeDateYear= $('#yearReportDate').combobox('getValue');
	var params = {"isAjax":"y", "currentPage":currentPage, "pageSize" : 10,"likeBuyerName" :likeBuyerName,"tradeDateYear":tradeDateYear,"sort":"tradeDate desc"}
	$.ajax({
		url : ctxRoot + "/data/searchSupplierTradeDetail",
		type : 'post',
		data : params, 
		dataType: "json",
		success	: function(data){
			   showList("table3", data.extendMap.page.list,data.extendMap.page);
      		   $("#pageDiv3").html(createPage(data.extendMap.page, "yearResult"));
		},
		error: function(msg){
			return false;
		},
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
    	if(list[i].status == "success"){
    		list[i].status="交易成功";
    	}
    	if(list[i].status == "fail"){
    		list[i].status="交易失败";
    	}
    	if(list[i].status == "match"){
    		list[i].status="待撮合";
    	}
    	if(list[i].status == "confirm"){
    		list[i].status="待确认";
    	}
    	if(list[i].status == "pay"){
    		list[i].status="待支付";
    	}
    	 s += '<tr class="border-bottom-solid"><td class="width-50 padding-5 text-center">' +no+ '</td><td class="width-250 padding-5 text-center"><a class="easyui-tooltip font-12 link" title="'+ list[i].buyerName+ '">' +buyerName + '</td><td class="width-100 padding-5 text-center">' + list[i].tradeDateStr + '</td><td class="width-150 padding-5 text-center">' + list[i].code + '</td>'
         + '<td class="width-150 padding-5 text-center">' + list[i].tradeAmount + '</td><td class="width-50 padding-5 text-center">' + list[i].status + '</td><td class="width-50 padding-5 text-center">' + list[i].availableAmount + '</td></tr>';
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
    	  	if(list[i].status == "success"){
        		list[i].status="交易成功";
        	}
        	if(list[i].status == "fail"){
        		list[i].status="交易失败";
        	}
        	if(list[i].status == "match"){
        		list[i].status="待撮合";
        	}
        	if(list[i].status == "confirm"){
        		list[i].status="待确认";
        	}
        	if(list[i].status == "pay"){
        		list[i].status="待支付";
        	}
      	   s += '<tr class="border-bottom-solid"><td class="width-50 padding-5 text-center">' +no+ '</td><td class="width-250 padding-5 text-center"><a class="easyui-tooltip font-12 link" title="'+ list[i].supplierName+ '">' +supplierName + '</td><td class="width-100 padding-5 text-center">' + list[i].tradeDateStr + '</td><td class="width-150 padding-5 text-center">' + list[i].code + '</td>'
             + '<td class="width-150 padding-5 text-center">' + list[i].tradeAmount + '</td><td class="width-50 padding-5 text-center">' + list[i].status + '</td><td class="width-50 padding-5 text-center">' + list[i].availableAmount + '</td></tr>';
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
    	  if(list[i].status == "success"){
      		list[i].status="交易成功";
      	}
      	if(list[i].status == "fail"){
      		list[i].status="交易失败";
      	}
      	if(list[i].status == "match"){
      		list[i].status="待撮合";
      	}
      	if(list[i].status == "confirm"){
      		list[i].status="待确认";
      	}
      	if(list[i].status == "pay"){
      		list[i].status="待支付";
      	}
    	  s += '<tr class="border-bottom-solid"><td class="width-50 padding-5 text-center">' +no+ '</td><td class="width-250 padding-5 text-center"><a class="easyui-tooltip font-12 link" title="'+ list[i].supplierName+ '">' +supplierName + '</td><td class="width-100 padding-5 text-center">' + list[i].tradeDateStr + '</td><td class="width-150 padding-5 text-center">' + list[i].code + '</td>'
          + '<td class="width-150 padding-5 text-center">' + list[i].tradeAmount + '</td><td class="width-50 padding-5 text-center">' + list[i].status + '</td><td class="width-50 padding-5 text-center">' + list[i].availableAmount + '</td></tr>';
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