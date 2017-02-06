function loadInvoiceList(currentPage){
	var params = {
			"isAjax":"y",
			"isEasyUI":"1",
			"currentPage":currentPage,
			"pageSize":5,
			"likeCode":$('#codeCondition').val(),
			"payerName":$('#payerCondition').val(),
			"payeeName":$('#payeeCondition').val(),
			"likeStatus":$('#stateCondition').combobox('getValue'),
			}; 
	$('#dl-invoice').datalist({ 
	url : ctxRoot + "/invoice/getPage", 
	queryParams : params, 
	singleSelect : true, 
	sortName : "name", 
	sortOrder : "asc", 
	title: "发票号", 
	lines: true, 
	columns :[[ {field:'code', title:'企业名称', align:'center', width:178} ]], 
	onLoadSuccess: function(data){ 
	$("#dl-invoice-buts").html(""); 
	var butStr = ""; 
	if(data.isNextPage){ 
	butStr += "<div onclick='loadInvoiceList("+data.nextPage+");' class='float-right width-50 height-25 line-height-25 back-gray changebackboldgray color-white text-center link'>下一页</div>"; 
	} 
	if(data.isPriviousPage){ 
	butStr += "<div onclick='loadInvoiceList("+data.priviousPage+");' class='float-right width-50 height-25 line-height-25 margin-right-10 back-gray changebackboldgray color-white text-center link'>上一页</div>"; 
	} 
	if(butStr != ""){ 
	$("#dl-invoice-buts").html(butStr); 
	} 
	},
	onDblClickRow:function(index,row){
		loadInvoice(row.id);
	},
	})
}
 function loadInvoice(id){
		$.ajax({
			url : ctxRoot + "/invoice/getById",
			type : 'post',
			data : {
				"id" : id,
			}, 
			dataType: "json",
			success	: function(msg){
				$('#code').html(msg.code);
				$('#status').html(msg.status);
				$('#payerName').html(msg.payerName);
				$('#payeeName').html(msg.payeeName);
				$('#originalAmount').html(msg.originalAmount);
				$('#payAmount').html(msg.payAmount);
				$('#originalDate').html(msg.originalDate);
				
			},
			error: function(msg){
				return false;
			},
		});
		loadQuote(id);
 }
 function loadQuote(id){
	 alert(id);
	 $.ajax({
			url : ctxRoot + "/quote/getById",
			type : 'post',
			data : {
				"invoiceId" : id,
			}, 
			dataType: "json",
			success	: function(msg){
				$('#invoiceId').html(msg.invoiceId);
				$('#quoteAmount').html(msg.quoteAmount);
				$('#quoteYieldRate').html(msg.quoteYieldRate);
				$('#quoteTime').html(msg.quoteTime);
				$('#tradeAmount').html(msg.tradeAmount);
				$('#tradeYieldRate').html(msg.tradeYieldRate);
				$('#tradeTime').html(msg.tradeTime);
			},
			error: function(msg){
				return false;
			},
		});
 }