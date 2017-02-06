$(document).ready(function() {
	loadMarketList();
});

//数据显示
function showList(divId, list,page){
	if(list == null || list.length <= 0){
		$('#invoiceDownload tr:gt(0)').remove();//删除之前的数据
		 var str2 = "<tr class='border-bottom-solid height-150'>"
				+"<td class='icon-none'colspan='7' rowspan='5'></td></tr>";
		$("#"+divId).append(str2);
		return;
	}
	$('#invoiceDownload tr:gt(0)').remove();//删除之前的数据
	for(var i = 0;i < list.length; i++){
		url = JSON.stringify(list[i].fileUrl);
		var str2 = "<tr class='border-bottom-solid changebackmingray height-30 line-height-30'>"+
						"<input type='hidden' value='"+list[i].id+"'>"+
						"<td class='width-100 padding-5 text-center font-12'>"+eval((page.currentPage-1)*15+i+1)+"</td>"+
						"<td class='width-300 padding-5 text-center font-12'>"+list[i].createName+"</td>"+
						"<td class='width-300 padding-5 text-center font-12'>"+list[i].createTimeStr+"</td>"+
						"<td class='width-100 padding-5 text-center font-12'>"+
						"<div onClick='download("+url+")' class='float-left border-none width-50 height-25 margin-left-20 font-yahei line-height-25 border-solid-orange border-radius-3 color-orange back-white changebackorange changecolorwhite text-center link'>下载</div>"+
						"</td>"+
					"</tr>";
		$("#"+divId).append(str2);
	}
}
function getList(currentPage) {
	var date=$('#date').datebox('getValue');
	var likecreateName=$('#likecreateName').textbox('getValue');
	var params = {"isAjax":"y", "currentPage":currentPage, "pageSize" : 15,"date" : date,"likecreateName" : likecreateName,"sort":"createTime desc"}
	$.ajax({
		url : ctxRoot + "/invoiceDownload/getPage",
		type : 'post',
		data : params, 
		dataType: "json",
		success	: function(data){
			if(data.state){
				showList("invoiceDownload", data.extendMap.page.list,data.extendMap.page);
        		$("#pageDiv").html(createPage(data.extendMap.page, "getList"));
        	}else{
        		alert(data.message);
        	}
		},
		error: function(msg){
		},
	});
}
function download(fileUrl){
	index1 = fileUrl.lastIndexOf('/');
	index2 = index1-8;
	openUrl('/file/downloadExcelHistory'+'?'+'url='+fileUrl.substring(index2), true);
}

function loadMarketList(){
	$("#invoiceDownloadDiv").addClass("height-550");
	$("#invoiceDownloadDiv").removeClass("height-50");
	$("#icon-none").addClass("hidden");
	var date=$('#date').datebox('getValue');
	var likecreateName=$('#likecreateName').textbox('getValue');
	var params = {"isAjax":"y","date" : date,"likecreateName" : likecreateName,"isEasyUI":"1"}	
		$('#invoiceDownload').datagrid({
			url: ctxRoot + "/invoiceDownload/getPage",
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
			   {field:'createName', title:'上传人姓名',  align:'center', width:'35%', sortable:true},
			   {field:'createTime', title:'上传时间', align:'center', width:'35%', sortable:true,formatter:function(val, row){return row.createTimeStr;}},
			   {field:'operate', title:'操作', align:'center', width:'29%', formatter:getOperate}
			]],
			onLoadSuccess: function(data){
				if (data.total == 0) {
	                $(this).closest('div.datagrid-wrap').find('div.datagrid-pager').hide();
					$("#invoiceDownloadDiv").removeClass("height-550");
					$("#invoiceDownloadDiv").addClass("height-50");
					$("#icon-none").removeClass("hidden");
	            }
			}
		});	
	}
function getOperate(val, row, index){
	url = JSON.stringify(row.fileUrl);
	var str = "<div onClick='download("+url+")' class='float-left border-none width-50 height-25 margin-left-105 font-yahei line-height-25 border-solid-orange border-radius-3 color-orange back-white changebackorange changecolorwhite text-center link'>下载</div>"
	return str;
}