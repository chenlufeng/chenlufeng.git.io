$(document).ready(function() {
	getList(10);
	if(loginCompanyType != "supplier"){
		$("#addMessage").removeClass("hidden");
	}
	
})

function showMessageList(divId, list,page){
	var str = "<tr class='back-minred color-white height-30 line-height-30'>" +
 "</tr>";
	$('#message tr:gt(0)').remove();// 删除之前的数据
	if(list == null || list.length <= 0){
		var str2 = "<div class='icon-none margin-auto-w'></div>"
			$("#nodata").html(str2);
			return;
		return;
	}
	$("#"+divId).html(str);
	for(var i = 0;i < list.length; i++){
		if(list[i].isRead=="n"){
			var str2 =  "<tr class='border-bottom-solid changebackmingray height-30 line-height-30 back-gray color-black font-bold font-black font-12 link' onclick='updateIsRead("+list[i].id+",this)'>"+
			"<input type='hidden' value='"+list[i].id+"'>"+
			"<td class='width-150 text-center padding-10 border-right-solid'>"+list[i].createTimeStr+"</div></td>"+
			"<td class='width-740 padding-10'>"+list[i].content+"</td>"+
			"</tr><tr class='height-20'></tr>";
		}else{
			var str2 =  "<tr class='border-bottom-solid changebackmingray height-30 line-height-30 back-gray font-12 color-gray link'>"+
			"<input type='hidden' value='"+list[i].id+"'>"+
			"<td class='width-150 text-center padding-10 border-right-solid'>"+list[i].createTimeStr+"</div></td>"+
			"<td class='width-740 padding-10'>"+list[i].content+"</td>"+
			"</tr><tr class='height-20'></tr>";
		}

		$("#"+divId).append(str2);
	}
}
function getList(pageSize) {
	$.ajax({
		url : ctxRoot + "/message/getPage",
		type : 'post',
		data : {
			"isAjax":"y", 
			"currentPage":1, 
			"pageSize" : pageSize,
		}, 
		dataType: "json",
		success	: function(data){
			if(data.state){
				showMessageList("messageList", data.extendMap.page.list,data.extendMap.page);
        		$("#pageDiv").html(createMore(data.extendMap.page, "getList"));
        		if(pageSize>data.extendMap.page.count){
        			$("#load").addClass("hidden");
        		}
        	}else{
        	}
		},
		error: function(msg){	
		},
	});
}

function createMore(pager,callbackFun){
	var str = "<table class='height-30 line-height-30 margin-auto-w padding-h-10 text-center font-12 color-lightblack background-white'>"
		+  "<tr>"
		+  "<td>"
		+  "<div id='load' class='width-120 height-30 back-darkred color-white text-center line-height-30 link'" +
				" onclick='"+callbackFun+"("+(pager.pageSize+10)+")'>加载更多</div>"
		+  "</td></tr></table>"
		return str;
}

function openAddMessage() {
	$('#layout-addMessage').removeClass("hidden");
	$('#layout-shadow').removeClass("hidden");

	$('#supplierList').datagrid({
		url: ctxRoot + "/customer/getList",
		loadMsg: "载入中...",
		queryParams: {"isAjax":"y", "isEasyUI":"1","type":"buyer"},
		selectOnCheck: true,
		fit: true,
		fitColumns : true,
		sortName: "name",
		sortOrder: "asc",
		remoteSort : true,
		columns:[[
		   {field:'ck', checkbox:true},
		   {field:'id', hidden:true},
		   {field:'name', title:'供应商列表',  align:'left', width:'80%'},
		]],
		onLoadSuccess: function(data){
			$('#supplierList').datagrid('checkAll');
		}
	});
}
function sendMessage(){
	 var checkedItems = $('#supplierList').datagrid('getChecked');
	 var ids = [];
	 $.each(checkedItems, function(index, item){
		 ids.push(item.id);
	 });
	 var idsStr = ids.join(",");
	 var supplierMessage = $("#supplierMessage").val();
	 if(isNull(supplierMessage)){
		 $("#errorMsg").html("消息不为空");
		 return;
	 }
	 if(ids.length > 0 && idsStr !=''){
		 $.ajax({
			 url : ctxRoot + "/message/insert",
				type: 'POST',  
				data : {"supplierIds": idsStr,"content":supplierMessage}, 
				dataType: "json",
				success	: function(data){
					closeAddMessage();
					openMsg("操作成功");
				},
				error: function(msg){
					return false;
				} 
		 });
	 }
}
function closeAddMessage() {
	$('#layout-addMessage').addClass("hidden");
	$('#layout-shadow').addClass("hidden");
	 $("#errorMsg").html(" ");
}
function updateIsRead(id,Obj){
	 $.ajax({
		 url : ctxRoot + "/message/update",
			type: 'POST',  
			data : {"id": id}, 
			dataType: "json",
			success	: function(data){
				if(data.state){
					$(Obj).addClass("color-gray");
					$(Obj).removeClass("color-black font-bold font-black");
					getNoReadAmount();
				}
			},
			error: function(msg){
				return false;
			} 
	 });
}