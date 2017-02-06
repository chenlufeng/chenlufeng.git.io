$(document).ready(function() {	
	initUploadBut("uploadLogoFile", "logo", setUploadLogo, setUploadLogoMsg, uploadLogoPrograss);
});

//打开上传图片,默认是用户LOGO
function showLogoLayout(uploadType){
	$(".layout").addClass("hidden");
	$("#layout-shadow").removeClass("hidden");
	$("#layout-logo").removeClass("hidden");
	initLogo();
}

//关闭LOGO弹出层
function closeLogoLayout() {
	$("#logoMsg").html("");
	$('#logoDiv1').imgAreaSelect({remove:true});
	$("#logoDiv1").html("");
	$("#logoDiv2").html("");
	$("#logoDiv3").html("");
	$("#logoDiv4").html("");
	$("#layout-shadow").addClass("hidden");
	$("#layout-logo").addClass("hidden");
	cancelLogo();
}

//保存LOGO
function saveLogo(){
	var logoUrl = $("#logoUrl").val();
	if(isNull(logoUrl)){
		$("#logoMsg").html("请选择图片!");
		return;
	}
	$.ajax({
		type : "POST",
		url : ctxRoot + "/file/saveLogo",
		data : {
			"isAjax" : "y",
			"x1" : $("#x1").val(),
			"y1" : $("#y1").val(),
			"x2" : $("#x2").val(),
			"y2" : $("#y2").val(),
			"imageScale" : $("#imageScale").val(),
			"logoUrl" : logoUrl
		},
		dataType : "json",
		success : function(data) {
			if (data.state){
				closeLogoLayout();
				//openMsg('保存LOGO成功!');
				//setTimeout(closeMessageLayout, 1500);
				$("#logo").attr("src", data.extendMap.logo);
			} else {
				alert(data.message);
			}
		}
	});
}

//取消LOGO
function cancelLogo(){
	var logoUrl = $("#logoUrl").val();
	if(isNull(logoUrl)){
		return;
	}
	$.ajax({
		type : "POST",
		url : ctxRoot + "/file/removeTempFile",
		data : {
			"isAjax" : "y",
			"fullPathName" : logoUrl
		},
		dataType : "json",
		success : function(data) {
			
		}
	});
}

//上传LOGO前显示进度条
function uploadLogoPrograss(){
	if($("#uploadPrograssBar").css("display")=="none"){
		$("#uploadPrograssBar").progressbar("setValue", 0);
		$("#uploadPrograssBar").css("display","block");
	}
	var value = $("#uploadPrograssBar").progressbar("getValue");
	if(value < 100){
		value += Math.floor(Math.random() * 10);
		$("#uploadPrograssBar").progressbar("setValue", value);
		setTimeout(arguments.callee, 200);
	}else{
		$("#uploadPrograssBar").progressbar("setValue", 0);
		$("#uploadPrograssBar").css("display", "none");
	}
}

//上传LOGO的回调函数
var imgWidth, imgHeight;
function setUploadLogo(name, url, size, w, h){
	$("#uploadPrograssBar").progressbar("setValue", 100);
	imgWidth = parseInt(w);
	imgHeight = parseInt(h);
	$("#logoUrl").val(url);
	$("#logoDiv1").html("<img id='logo1' src='"+url+"' class='max-width-400 max-height-400' />");
	$("#logoDiv2").html("<img id='logo2' src='"+url+"' />");
	$("#logoDiv3").html("<img id='logo3' src='"+url+"' />");
	$("#logoDiv4").html("<img id='logo4' src='"+url+"' />");
	$("#logoDiv1").imgAreaSelect({x1:10, y1:10, x2:140, y2:140});
	$("#logoMsg").html("");
	
	$("#imageScale").val(130/imgWidth);
}

//上传LOGO错误时的回调函数
function setUploadLogoMsg(errMsg){
	$("#logoMsg").html(errMsg);
}

//初始化上传函数
function initLogo(){
	$("#x1").val("10");
	$("#y1").val("10");
	$("#x2").val("140");
	$("#y2").val("140");
	$("#logoUrl").val("");
	$('#logoDiv1').imgAreaSelect({
		aspectRatio: '1:1', 
		resizable: true,
		handles: false,
		persistent: true,
		onSelectChange: previewLogo,
		onSelectEnd: function (img, selection) {
            $('#x1').val(selection.x1);
            $('#y1').val(selection.y1);
            $('#x2').val(selection.x2);
            $('#y2').val(selection.y2);
        }
	});
}

//移动图片选择区触发的函数
function previewLogo(img, selection) {
	var imgShowWidth = $("#logo1").width();
	var imageScale = imgShowWidth / imgWidth;
	$("#imageScale").val(imageScale);
	
	var scaleX = 130 / (selection.width || 1);
    var scaleY = 130 / (selection.height || 1);
    $('#logo2').css({
        width: Math.round(scaleX * imgWidth * imageScale) + 'px',
        height: Math.round(scaleY * imgHeight * imageScale) + 'px',
        marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
        marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
    });

    scaleX = 80 / (selection.width || 1);
    scaleY = 80 / (selection.height || 1);
    $('#logo3').css({ 
        width: Math.round(scaleX * imgWidth * imageScale), 
        height: Math.round(scaleY * imgHeight * imageScale), 
        marginLeft: -Math.round(scaleX * selection.x1), 
        marginTop: -Math.round(scaleY * selection.y1) 
    });

    scaleX = 50 / (selection.width || 1);
    scaleY = 50 / (selection.height || 1);
    $('#logo4').css({ 
        width: Math.round(scaleX * imgWidth * imageScale), 
        height: Math.round(scaleY * imgHeight * imageScale), 
        marginLeft: -Math.round(scaleX * selection.x1), 
        marginTop: -Math.round(scaleY * selection.y1) 
    });
}