/* 
 * areaUI 0.1 
 * Copyright (c) 2009 Kevin 
 * Date: 2013-11-15 
 * 使用areaUI可以方便地选择省市区 
 */
function createAreaDiv(areaId){
	var dropDown = $("<i onclick='showTab(\"" + areaId + "\");'></i>").addClass("i-7").insertAfter($("#" + areaId));
	var tabDiv = $("<div id='tab_" + areaId + "'></div>").addClass("area-tab").css("display", "none").insertAfter($(dropDown)); 
	var headItems = $("<ul></ul>").addClass("h").appendTo($(tabDiv)); 
	var tabNames = ["省","市","区县"];
	for(var i=0; i<tabNames.length; i++){		
		/** 新增tab head**/
		var headItem = $("<li class='s-tab-t' id='headItem_"+areaId+i+"' onclick='changeHeadItem(\"" + areaId + "\","+i+");'></li>").appendTo($(headItems));
		$("<span></span>").addClass("inner").html(tabNames[i]).appendTo($(headItem));
		
		/** 新增tab content **/
		var contentDiv = $("<div id='content_"+areaId+i+"'></div>").css("display", "none").addClass("s-tab-b").attr("index", i).appendTo($(headItems).parent());		
		var contentItems = $("<ul id='contentItem_" + areaId+i + "'></ul>").appendTo($(contentDiv)); 
	}
	/** 新增tab关闭按钮**/
	var headItem = $("<li class='s-tab-t' onclick='closeTab(\"" + areaId + "\");'></li>").appendTo($(headItems));
	$("<span></span>").addClass("inner").html("关闭").appendTo($(headItem));
}

function closeTab(areaId){
	$("#tab_" + areaId).css("display", "none");
}

function showTab(areaId){
	$("#tab_" + areaId).css("display", "block");
	changeHeadItem(areaId, 0);
	$("#contentItem_"+areaId+"0").html("");
	$("#contentItem_"+areaId+"1").html("");
	$("#contentItem_"+areaId+"2").html("");
	var provinces = areaJson[0].children;
	for(var i=0; i<provinces.length; i++) {
		$("<li class='panel-item'><a onclick='changeProvince(\"" + areaId + "\"," + i + ");'>"+ provinces[i].name+"</a></li>").appendTo($("#contentItem_"+areaId+"0"));
	}
}

function changeHeadItem(areaId, seqno){
	if(seqno == 0){
		$("#content_" + areaId + "0").css("display", "block");
		$("#headItem_" + areaId + "0").addClass("current");
		$("#content_" + areaId + "1").css("display", "none");
		$("#headItem_" + areaId + "1").removeClass("current");
		$("#content_" + areaId + "2").css("display", "none");
		$("#headItem_" + areaId + "2").removeClass("current");
	} else if(seqno == 1){
		$("#content_" + areaId + "0").css("display", "none");
		$("#headItem_" + areaId + "0").removeClass("current");
		$("#content_" + areaId + "1").css("display", "block");
		$("#headItem_" + areaId + "1").addClass("current");
		$("#content_" + areaId + "2").css("display", "none");
		$("#headItem_" + areaId + "2").removeClass("current");
	} else if(seqno == 2){
		$("#content_" + areaId + "0").css("display", "none");
		$("#headItem_" + areaId + "0").removeClass("current");
		$("#content_" + areaId + "1").css("display", "none");
		$("#headItem_" + areaId + "1").removeClass("current");
		$("#content_" + areaId + "2").css("display", "block");
		$("#headItem_" + areaId + "2").addClass("current");
	}
}

function changeProvince(areaId, provinceId){
	changeHeadItem(areaId, 1);
	$("#"+areaId).val(areaJson[0].children[provinceId].name);
	$("#contentItem_"+areaId+"1").html("");
	$("#contentItem_"+areaId+"2").html("");
	var citys = areaJson[0].children[provinceId].children;
	for(var i=0; i<citys.length; i++) {
		$("<li class='panel-item' onclick='changeCity(\"" + areaId + "\"," + provinceId + "," + i + ");'>"+ citys[i].name + "</li>").appendTo($("#contentItem_"+areaId+"1"));
	}
}

function changeCity(areaId, provinceId, cityId){
	changeHeadItem(areaId, 2);
	$("#"+areaId).val(areaJson[0].children[provinceId].name+"-"+areaJson[0].children[provinceId].children[cityId].name);
	$("#contentItem_"+areaId+"2").html("");
	var districts = areaJson[0].children[provinceId].children[cityId].children;
	for(var i=0; i<districts.length; i++) {
		$("<li class='panel-item' onclick='changeDistrict(\""+ areaId + "\"," + provinceId + "," + cityId + "," + i + ");'>"+ districts[i].name + "</li>").appendTo($("#contentItem_"+areaId+"2"));
	}
}

function changeDistrict(areaId, provinceId, cityId, districtId){
	$("#"+areaId).val(areaJson[0].children[provinceId].name+"-"+areaJson[0].children[provinceId].children[cityId].name+"-"+areaJson[0].children[provinceId].children[cityId].children[districtId].name);
	$("#tab_" + areaId).css("display", "none");
}