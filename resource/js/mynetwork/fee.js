$(document).ready(function() {
	getList();
});

function getList() {
	var params = {"isAjax":"y", "isEasyUI":"1"};
	if($("#tradeFee").attr('checked') && $("#memberFee").attr('checked')){
		
	} else if($("#tradeFee").attr('checked')){
		params.type = "trade";
	} else if($("#memberFee").attr('checked')){
		params.type = "member";
	} else {
		
	}
	
	if($("#pay").attr('checked') && $("#unpay").attr('checked')){
		
	} else if($("#pay").attr('checked')){
		params.isPay = "y";
	} else if($("#unpay").attr('checked')){
		params.isPay = "n";
	} else {
		
	}
	
	$("#icon-none").addClass("hidden");
	$("#feeListDiv").removeClass("height-50");
	$("#feeListDiv").addClass("height-280");
	
	$('#feeList').datagrid({
		url: ctxRoot + "/fee/getPage",
		loadMsg: "载入中...",
		queryParams: params,
		singleSelect: true,
		pagination: true,
		pageList: [5, 10, 20, 30, 40],
		pageSize: 5,
		fit: true,
		fitColumns : true,
		sortName: "createTime",
		sortOrder: "desc",
		rownumbers: true,
		rownumberWidth: 40,
		columns:[[
		   {field:'type', title:'费用类型',  align:'center', width:'10%', sortable:true,
			   formatter:function(value, row, index){
				   if(value=='member'){
					   return operate = '会员费';
		   		   } else if(value=='trade'){
		   			   return operate = '交易费';
		   		   }
	   		}},
		   {field:'isPay', title:'是否支付', align:'center', width:'10%', sortable:true,
			   formatter:function(value, row, index){
			   	   if(value=='y'){
			   		   return operate = '是';
			   	   } else if(value=='n'){
			   		   return operate = '否';
			   	   }
		   		}
		   },
		   {field:'amount', title:'应付金额(元)',  align:'right', width:'12%', sortable:true},
		   {field:'payAmount', title:'实付金额(元)',  align:'right', width:'12%', sortable:true},
		   {field:'beginDate', title:'起始日期', align:'center', width:'14%', sortable:true, formatter:function(val, row){return row.beginDateStr;}},
		   {field:'endDate', title:'结束日期', align:'center', width:'14%', sortable:true, formatter:function(val, row){return row.endDateStr;}},
		   {field:'invoiceStatus', title:'发票状态', align:'center', width:'12%', sortable:true,  
			   formatter:function(value, row, index){
				   if(row.isPay == 'n'){
			   		   return operate = "<span class='color-red'>未缴费</span>";
			   	   }
			   	   if(value=='unopen'){
			   		   return operate = "<span class='color-orange'>未索取</span>";
			   	   }
			   	   if(value=='wait'){
			   		   return operate = "<span class='color-blue'>等待处理</span>";
			   	   }
			   	   if(value=='open'){
			   		   return operate = '已开出';
			   	   }
			   	   if(value=='post'){
			   		   return operate = '已邮寄';
			   	   }
	   			}
		   },
		   {field:'operate', title:'操作', align:'center', width:'15%', sortable:true,  
			   formatter:function(value, row, index){
				   if(row.isPay == 'n'){
			   		   return "<span class='color-gray'>付款后才能索取发票</span>";
			   	   }
			   	   if(row.invoiceStatus=='unopen'){
			   		   if(row.payAmount>0){
			   			   return "<div class='width-80 margin-auto-w back-orange color-white padding-3 link' onclick='showFeeBillLayout("+row.id+",\""+row.type+"\","+row.companyId+","+row.amount+")'>索取发票</div>";
			   		   } else {
			   			   return "<span class='color-gray'>费用为0，无法索取发票</div>";
			   		   }
			   	   } else {
			   		   return "<div class='width-80 margin-auto-w back-blue color-white padding-3 link' onclick='showFeeBillLayout("+row.id+",\""+row.type+"\","+row.companyId+","+row.payAmount+")'>查看发票</div>";
			   	   }
	   			}
		   },
		]],
		onLoadSuccess: function(data){
			if (data.total == 0) {
                $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
				$("#feeListDiv").removeClass("height-280");
				$("#feeListDiv").addClass("height-50");
				$("#icon-none").removeClass("hidden");
            }
		}
	});
}