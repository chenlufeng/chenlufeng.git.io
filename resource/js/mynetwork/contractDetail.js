$(document).ready(function() {
	changeTab(1);
});

//切换Tab
function changeTab(no){
	$('.currTabTitle').addClass("border-bottom-solid back-contract color-boldgray");
	$('.currTabTitle').removeClass("back-white color-black font-bold currTabTitle");
	$('#tabTitle'+no).removeClass("border-bottom-solid back-contract color-boldgray");
	$('#tabTitle'+no).addClass("back-white color-black font-bold currTabTitle");
	
	$('.currTabContent').addClass("hidden");
	$('#tabContent'+no).removeClass("hidden");
	$('#tabContent'+no).addClass("currTabContent");
	
	if(no == 1){
		getContractFile();
	} else if(no == 2) {
		
	} else if(no == 3) {
		getQuoteImgList();
	} else if(no == 4) {
		getLogList();
	}
}

//获取合同信息列表
function getContractFile(){
	var contractId = $('#contractId').val();
	
	$.ajax({
		url : ctxRoot + "/contract/getById",
		type: 'POST',
		data : {"id":contractId},
		dataType: "json",
		success	: function(data){
			if(data.extendMap.model != null && !isNull(data.extendMap.model.contractFile)){
				var model = data.extendMap.model;
				$("#icon-none1").addClass("hidden");
				var str = "<div title='下载合同PDF文件到本地' class='width-80 height-30 line-height-30 text-center font-yahei border-solid-orange border-radius-3 color-orange back-white changebackorange changecolorwhite link' style='margin:15px auto;' onclick=download('"+model.contractFile+"')>下载</div>"+
						  "<iframe src='"+model.contractFile+"' width='100%' border='0' height='1220' scroll='no'></iframe>"
				$('#contractFileDiv').html(str);
			} else {
				$("#icon-none1").removeClass("hidden");
			}
		},
		error: function(msg){
			return false;
		}
	});
}

//下载
function download(fileUrl){
	index1 = fileUrl.lastIndexOf('/');
	index2 = index1-8;
	openUrl('/file/downloadContractPDF'+'?'+'url='+fileUrl.substring(index2), true);
}

//获取证明材料(认证资料)
function getQuoteImgList(){
	var contractDate = $('#contractDate').val();
	var contractId = $('#contractId').val();
	$.ajax({
		url : ctxRoot + "/trade/getQuoteImgList",
		type : 'post',
		data : {"contractId": contractId, "tradeDate": contractDate},
		dataType : "json",
		success : function(result) {
			$('#quoteDiv').empty();
			var str = "";
			if(result.state && result.extendMap.list != null && result.extendMap.list.length > 0 && !isNull(result.extendMap.list[0])){
				var list = result.extendMap.list;
				str = "<div class='width-all height-300 changebackf1f1f1 border-solid'>"+
						  "<a href='"+list[0]+"' target='_blank'><img src='"+list[0]+"' title='点击查看大图' class='width-260 height-280' style='padding:10px 20px;'/></a>"+
					  "</div>";
				
				/*for(var i = 0; i < list.length; i++){
					if(list.length > 1){
						$('#quoteDiv').empty();
						$('#q_1').addClass("hidden");
						
						if((list.length) % 2 != 0){
							var str2 = "<div class='width-700 min-height-400 margin-auto-w'>"+
											"<div class='float-left width-300 height-380 changecolororange'>"+
												"<div class='width-all height-300 changebackf1f1f1 border-solid'>"+
													"<a href='"+list[list.length-1]+"' target='_blank'><img src='"+list[list.length-1]+"' title='点击查看大图' class='width-260 height-280' style='padding:10px 20px;'/></a>"+
												"</div>"+
												"<div class='width-all height-50 line-height-50 font-12 text-center'>供应商报价截图"+eval(list.length)+"</div>"+
											"</div>" +
										"</div>";
							for(var i = 0;i < list.length-1; i = i+2){
								str="<div class='width-700 min-height-400 margin-auto-w'>"+
										"<div class='float-left width-300 height-380 changecolororange'>"+
											"<div class='width-all height-300 changebackf1f1f1 border-solid'>"+
												"<a href='"+list[i]+"' target='_blank'><img src='"+list[i]+"' title='点击查看大图' class='width-260 height-280' style='padding:10px 20px;'/></a>"+
											"</div>"+
											"<div class='width-all height-50 line-height-50 font-12 text-center'>供应商报价截图"+eval(i+1)+"</div>"+
										"</div>"+
										"<div class='float-right width-300 height-380 changecolororange'>"+
											"<div class='width-all height-300 changebackf1f1f1 border-solid'>"+
												"<a href='"+list[i+1]+"' target='_blank'><img src='"+list[i+1]+"' title='点击查看大图' class='width-260 height-280' style='padding:10px 20px;'/></a>"+
											"</div>"+
											"<div class='width-all height-50 line-height-50 font-12 text-center'>供应商报价截图"+eval(i+2)+"</div>"+
										"</div>"+
									"</div>";
								$('#quoteDiv').append(str);
							}
							$('#quoteDiv').append(str2);
						} else {
							for(var i = 0;i < list.length; i = i+2){
								str="<div class='width-700 min-height-400 margin-auto-w'>"+
										"<div class='float-left width-300 height-380 changecolororange'>"+
											"<div class='width-all height-300 changebackf1f1f1 border-solid'>"+
												"<a href='"+list[i]+"' target='_blank'><img src='"+list[i]+"' title='点击查看大图' class='width-260 height-280' style='padding:10px 20px;'/></a>"+
											"</div>"+
											"<div class='width-all height-50 line-height-50 font-12 text-center'>供应商报价截图"+eval(i+1)+"</div>"+
										"</div>"+
										"<div class='float-right width-300 height-380 changecolororange'>"+
											"<div class='width-all height-300 changebackf1f1f1 border-solid'>"+
												"<a href='"+list[i+1]+"' target='_blank'><img src='"+list[i+1]+"' title='点击查看大图' class='width-260 height-280' style='padding:10px 20px;'/></a>"+
											"</div>"+
											"<div class='width-all height-50 line-height-50 font-12 text-center'>供应商报价截图"+eval(i+2)+"</div>"+
										"</div>"+
									"</div>";
								$('#quoteDiv').append(str);
							}
						}
					} else {
						$('#q_1').removeClass("hidden");
						var str_1 = "<div class='width-all height-300 changebackf1f1f1 border-solid'>"+
										"<a target='_blank' href='"+list[0]+"'><img src='"+list[0]+"' title='点击查看大图' class='width-260 height-280' style='padding:10px 20px;'/></a>"+
									"</div>"
						$('#imgDiv').html(str_1);
					}
					
				}*/
				
			} else {
				var noAuth = ctxRoot + "/resource/image/icon-noauth.png";
				str = "<div title='暂未上传，无法查看' class='width-300 height-300 border-solid' style='margin:0 auto;'>"+
							"<img src='"+noAuth+"' style='width:117px; height:113px; padding:94px 92px;'/>"+
					  "</div>";
			}
			$('#quoteDiv').html(str);
		},
		error : function(msg) {
			
		},
	});
}

//获取处理记录
function getLogList(){
	var contractId = $('#contractId').val();
	var params = {"isAjax": "y","isEasyUI": "1","contractId": contractId};
	var url = getUrl();
	if(url == "/contract/receivables/getDetail" || url == "/contract/getDetail"){
		params.type = "supplier";
	} else {
		params.type = "buyer";
	}
	$("#logListDiv").addClass("height-470");
	$("#logListDiv").removeClass("height-50");
	$("#icon-none4").addClass("hidden");
	$('#logList').datagrid({
		url: ctxRoot + "/contract/getContractLog",
		loadMsg: "载入中...",
		queryParams: params,
		singleSelect: true,
		pagination: true,
		pageList: [10, 20, 30, 40, 50],
		pageSize: 10,
		fit: true,
		fitColumns : true,
		rownumbers: true,
		rownumberWidth: 40,
		sortName: "logTime",
		sortOrder: "asc",
		columns:[[
		   {field:'logTime', title:'处理时间',  align:'left', width:'20%', sortable:true, formatter:function(val,row){return row.logTimeStr;}},
		   {field:'logName', title:'处理人',  align:'left', width:'15%', sortable:true},
		   {field:'logMsg', title:'处理信息', align:'left', width:'64%', sortable:true},
		]],
		onLoadSuccess: function(data){
			if (data.total == 0) {
                $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
				$("#logListDiv").removeClass("height-470");
				$("#logListDiv").addClass("height-50");
				$("#icon-none4").removeClass("hidden");
            }
		}
	});
}