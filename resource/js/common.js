$(document).ready(function() {
	setCurrentNav();
	getNoReadAmount();
});

// 设置当前的菜单选项
function setCurrentNav() {
	var currentUrl = getUrl();
	if (currentUrl == "/portal") {
		$("#nav_portal").addClass("color-boldred");
	} else if (currentUrl == "/payables/market") {
		$(".nav_pay").addClass("color-boldred");
		$("#nav_payables_market").addClass("back-lighterred color-white");
		$("#nav_pay_market").addClass("back-mingray color-minred");
	} else if (currentUrl == "/payables/mysupplier") {
		$(".nav_pay").addClass("color-boldred");
		$("#nav_payables_mysupplier").addClass("back-lighterred color-white");
		$("#nav_pay_mysupplier").addClass("back-mingray color-minred");
	} else if (currentUrl == "/payables/contract") {
		$(".nav_pay").addClass("color-boldred");
		$("#nav_payables_contract").addClass("back-lighterred color-white");
		$("#nav_pay_contract").addClass("back-mingray color-minred");
	} else if (currentUrl == "/contract/payables/getDetail") {
		$(".nav_pay").addClass("color-boldred");
		$("#nav_payables_contract").addClass("back-lighterred color-white");
		$("#nav_pay_contract").addClass("back-mingray color-minred");
	} else if (currentUrl == "/payables/data/trend") {
		$(".nav_pay").addClass("color-boldred");
		$("#nav_payables_analysis").addClass("back-lighterred color-white");
		$("#nav_pay_data").addClass("back-mingray color-minred");
		$("#menu_trend").addClass('sidebar-item-curr');
	} else if (currentUrl == "/payables/data/trade") {
		$(".nav_pay").addClass("color-boldred");
		$("#nav_payables_analysis").addClass("back-lighterred color-white");
		$("#menu_trade").addClass('sidebar-item-curr');
	} else if (currentUrl == "/payables/data/ratio") {
		$(".nav_pay").addClass("color-boldred");
		$("#nav_payables_analysis").addClass("back-lighterred color-white");
		$("#menu_ratio").addClass('sidebar-item-curr');
	} else if (currentUrl == "/receivables/market") {
		$("#nav_rec").addClass("color-boldred");
		$("#nav_receivables_market").addClass("back-lighterred color-white");
		$("#nav_rec_market").addClass("back-mingray color-minred");
	} else if (currentUrl == "/receivables/mybuyer") {
		$("#nav_rec").addClass("color-boldred");
		$("#nav_receivables_mybuyer").addClass("back-lighterred color-white");
		$("#nav_rec_mybuyer").addClass("back-mingray color-minred");
	} else if (currentUrl == "/receivables/contract") {
		$("#nav_rec").addClass("color-boldred");
		$("#nav_receivables_contract").addClass("back-lighterred color-white");
		$("#nav_rec_contract").addClass("back-mingray color-minred");
	} else if (currentUrl == "/contract/receivables/getDetail") {
		$("#nav_rec").addClass("color-boldred");
		$("#nav_receivables_contract").addClass("back-lighterred color-white");
		$("#nav_rec_contract").addClass("back-mingray color-minred");
	} else if (currentUrl == "/receivables/data/trend") {
		$("#nav_rec").addClass("color-boldred");
		$("#nav_receivables_analysis").addClass("back-lighterred color-white");
		$("#menu_trend").addClass('sidebar-item-curr');
		$("#nav_rec_data").addClass("back-mingray color-minred");
	} else if (currentUrl == "/receivables/data/trade") {
		$("#nav_rec").addClass("color-boldred");
		$("#nav_receivables_analysis").addClass("back-lighterred color-white");
		$("#menu_trade").addClass('sidebar-item-curr');
	} else if (currentUrl == "/receivables/data/ratio") {
		$("#nav_rec").addClass("color-boldred");
		$("#nav_receivables_analysis").addClass("back-lighterred color-white");
		$("#menu_ratio").addClass('sidebar-item-curr');
	} else if (currentUrl == "/mynetwork/company") {
		$("#nav_mynetwork").addClass("color-boldred");
		$("#menu_company").addClass('sidebar-item-curr');
	} else if (currentUrl == "/mynetwork/companyAuth") {
		$("#nav_mynetwork").addClass("color-boldred");
		$("#menu_companyAuth").addClass('sidebar-item-curr');
	} else if (currentUrl == "/mynetwork/childAccount") {
		$("#nav_mynetwork").addClass("color-boldred");
		$("#menu_childAccount").addClass('sidebar-item-curr');
	} else if (currentUrl == "/mynetwork/customer") {
		$("#nav_mynetwork").addClass("color-boldred");
		$("#menu_customer").addClass('sidebar-item-curr');
	} else if (currentUrl == "/mynetwork/fee") {
		$("#nav_mynetwork").addClass("color-boldred");
		$("#menu_fee").addClass('sidebar-item-curr');
	} else if (currentUrl == "/mynetwork/uploadHistory") {
		$("#nav_mynetwork").addClass("color-boldred");
		$("#menu_uploadHistory").addClass('sidebar-item-curr');
	} else if (currentUrl == "/mynetwork/user") {
		$("#nav_mynetwork").addClass("color-boldred");
		$("#menu_user").addClass('sidebar-item-curr');
	} else if (currentUrl == "/mynetwork/contract") {
		$("#nav_mynetwork").addClass("color-boldred");
		$("#menu_contract").addClass('sidebar-item-curr');
	} else if (currentUrl == "/contract/getDetail") {
		$("#nav_mynetwork").addClass("color-boldred");
		$("#menu_contract").addClass('sidebar-item-curr');
	} else if (currentUrl == "/mynetwork/modifyPsd") {
		$("#nav_mynetwork").addClass("color-boldred");
		$("#menu_modifyPsd").addClass('sidebar-item-curr');
	} else if (currentUrl == "/mynetwork/message") {
		$("#nav_mynetwork").addClass("color-boldred");
		$("#menu_message").addClass('sidebar-item-curr');
	} else if (currentUrl == "/payables/data/tradeDetail") {
		$(".nav_pay").addClass("color-boldred");
		$("#nav_payables_analysis").addClass("back-lighterred color-white");
		$("#menu_tradeDetail").addClass('sidebar-item-curr');
	} else if (currentUrl == "/receivables/data/tradeDetail") {
		$("#nav_rec").addClass("color-boldred");
		$("#nav_receivables_analysis").addClass("back-lighterred color-white");
		$("#menu_tradeDetail").addClass('sidebar-item-curr');
	}
}

// 取得URL
function getUrl() {
	var fullPath = window.location.pathname;
	if (fullPath != "/") {
		return fullPath.substring(ctxRoot.length, fullPath.length);
	} else {
		return "/";
	}
}

// 取得URL上的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

//打开链接，参数:url-链接,isCurrentPage-是否在当前页面打开(true|false)
function openUrl(url, isNewWindow) {
	if (typeof (isNewWindow) != "undefined" && isNewWindow) {
		window.open(ctxRoot + url);
	} else {
		location.href = ctxRoot + url;
	}
}

//退出登录
function logout(){
	window.sessionStorage.setItem("flag","");
	openUrl('/user/logout');
}

//打开供应商界面
function openSupplier(supplierId){
	openUrl('/payables/mysupplier?id='+supplierId, true);
}

//打开买方界面
function openBuyer(buyerId){
	openUrl('/receivables/mybuyer?id='+buyerId, true);
}

// 打开提示消息框
function openMsg(msg, errormsg) {
	$('#msgLayoutDiv').removeClass("hidden");
	if (!isNull(errormsg)) {
		$('#ok').addClass("hidden");
		$('#no').removeClass("hidden");
		$('#tips2').html(msg);
		$('#errormsg').html(errormsg);
	} else {
		$('#no').addClass("hidden");
		$('#ok').removeClass("hidden");
		$('#tips1').html(msg);
		window.setTimeout("closeMsg()", 1500);
	}
}

// 关闭提示消息框
function closeMsg() {
	$('#tips1').html('');
	$('#tips2').html('');
	$('#errormsg').html('');
	$('#msgLayoutDiv').addClass("hidden");
}

//关闭提示消息框
function closeMsgToMarket() {
	$('#tips1').html('');
	$('#tips2').html('');
	$('#errormsg').html('');
	$('#msgLayoutDiv').addClass("hidden");
	location.href = ctxRoot +"/payables/market"; 
}

//打开确认提示消息框
function openConfirmMsg(msg, callBackFun, id) {
	$('#layout-shadow').removeClass("hidden");
	$('#confirmMsgLayout').removeClass("hidden");
	if(callBackFun == 'comfirmComplete'){
		$('#icons').addClass("hidden");
		$('#tips').addClass("width-350 ");
		$('#tips').removeClass("width-240");
	}
	
	$('#tips').html(msg);
	$('#okBut').unbind("click");
	$('#okBut').click(function(){
		if(callBackFun == 'deleteInvoice'){
			deleteInvoice(id);
			closeConfirmMsg();
		} else if(callBackFun == 'cancelQuote'){
			cancelQuote();
			closeConfirmMsg();
		} else if(callBackFun == 'isfavorite'){
			updateIsFavorite(id);
			closeConfirmMsg();
		} else if(callBackFun == 'quoteByMax'){
			$('#icons').addClass('hidden');
			$('#okBut').addClass('hidden');
			$('#icons2').removeClass('hidden');
			$('#tips').html("正在报价...");
			quoteByMax();
		} else if(callBackFun =='cancelAttention'){
			cancelAttention();
			closeConfirmMsg();
		} else if(callBackFun == 'comfirmComplete'){
			comfirmComplete();
			closeConfirmMsg();
			$('#icons').removeClass("hidden");
			$('#tips').removeClass("width-350");
			$('#tips').addClass("width-240");
		} else if(callBackFun == 'cancelRelease'){
			cancelRelease();
			closeConfirmMsg();
		}
	});
}

// 关闭确认提示消息框
function closeConfirmMsg() {
	$('#layout-shadow').addClass("hidden");
	$('#confirmMsgLayout').addClass("hidden");
}

// 初始化异步上传按钮
function initUploadBut(butId, fileType, callBackFun, callBackMsgFun, showPrograssFun) {
	$('#' + butId).live('change', function() {
		var uploadUrl;
		if (fileType == "logo") { 
			uploadUrl = ctxRoot + "/file/uploadLogo";
		} else if (fileType == "image") {
			uploadUrl = ctxRoot + "/file/uploadLicense";
		} else if (fileType == "excel") {
			uploadUrl = ctxRoot + "/invoice/upload";
			var fileName = $('#fileToUpload').val();
			var suffix = fileName.toLowerCase().substr(fileName.lastIndexOf(".")); 
			if(suffix !=".xls" && suffix !=".xlsx"){
				openMsg('提示信息', '上传交易信息文件必须EXCEL，如需要请先下载模板！');
				return false;
			}
		} else {
			return;
		}

		if (showPrograssFun != undefined) {
			showPrograssFun();
		}
		
		$.ajaxFileUpload({
			type : 'post',
			url : uploadUrl,
			secureuri : false,
			fileElementId : butId,
			dataType : 'json',
			success : function(data, status) {
				if (fileType == "excel") {
					callBackFun(data);
				} else {
					if (data.state) {
						if (callBackFun != undefined) {
							if (fileType == "logo") {
								callBackFun(data.extendMap.originalFileName, data.extendMap.path, data.extendMap.size, data.extendMap.width, data.extendMap.height);
							} else {
								callBackFun(data.extendMap.originalFileName, data.extendMap.path, data.extendMap.size);
							}
						}
					} else {
						if (callBackMsgFun != undefined) {
							callBackMsgFun(data.message);
						} else {
							openMsg(data.message);
						}
					}
				}				
			},
			error : function(data, status, e) {
				alert(e);
			}
		});
	});
}

// 计算折扣后的剩余金额(默认按年化利率)
function calculateRestAmount(amount, apr, days) {
	return amount - Math.floor(amount * apr * days / 36000);
}

//计算折扣后的剩余金额(按折扣率)
function calculateRestAmountByDpr(amount, dpr) {
	return amount - Math.floor(amount * dpr / 100);
}

// 计算折扣额
function calculateDiscount(amount, apr, days) {
	return Math.floor(amount * apr * days / 36000);
}

// 计算年化利率
function calculateApr(amount, discount, days) {
	return Math.round((discount * 36000) / (amount * days) * 100) / 100;
}

//计算折扣利率
function calculateDpr(amount, discount) {
	return Math.round((discount * 10000) / amount )  / 100;
}

// 计算天数
function calculateDays(amount, discount, apr) {
	return Math.round((discount * 36000) / (amount * apr));
}

// 计算金额
function calculateAmount(discount, apr, days) {
	return Math.round((discount * 36000) / (apr * days) * 100) / 100;
}

//按年化利率计算折扣率
function calculateDprByApr(amount, apr, days) {
	var discount = calculateDiscount(amount, apr, days);
	return Math.floor((discount / amount) * 10000) / 100;
}

//按折扣率计算年化利率
function calculateAprByDpr(amount, dpr, days) {
	var discount = amount * dpr / 100;
	return calculateApr(amount, discount, days);
}

// 数字跳动
function scrollNumber(divId, endNum){
	var oSpan=document.getElementById(divId);
	var time=1000;  //所用时间 1000毫秒（ 在1秒内 数值增加到d）;
	var outTime=0;  //所消耗的时间
	var interTime=30;
	var timer = setInterval(function(){
	    outTime+=interTime;
	    if(outTime < time){
	        oSpan.innerHTML = parseInt(endNum/time*outTime);
	    } else {
	        oSpan.innerHTML = formatMoney(d);
	    }
    },interTime);
}

// 横向跑马灯
function scrollDivByHorizontal(divId, speed) {
	var tab = document.getElementById(divId);
	var tab1 = document.getElementById(divId + "1");
	var tab2 = document.getElementById(divId + "2");
	tab2.innerHTML = tab1.innerHTML;
	function Marquee() {
		if (tab2.offsetWidth - tab.scrollLeft <= 0) {
			tab.scrollLeft -= tab1.offsetWidth;
		} else {
			tab.scrollLeft++;
		}
	}
	var MyMar = setInterval(Marquee, speed);
	tab.onmouseover = function() {
		clearInterval(MyMar)
	};
	tab.onmouseout = function() {
		MyMar = setInterval(Marquee, speed)
	};
}

// 纵向跑马灯
function scrollDivByVertical(divId, speed) {
	var tab = document.getElementById(divId);
	var tab1 = document.getElementById(divId + "1");
	var tab2 = document.getElementById(divId + "2");

	tab2.innerHTML = tab1.innerHTML;
	function Marquee() {
		if (tab2.offsetHeight - tab.scrollTop <= 0) {
			tab.scrollTop -= tab1.offsetHeight;
		} else {
			tab.scrollTop++;
		}
	}
	var MyMar = setInterval(Marquee, speed);
	tab.onmouseover = function() {
		clearInterval(MyMar)
	};
	tab.onmouseout = function() {
		MyMar = setInterval(Marquee, speed)
	};
}

//所有滚动图片的变量集合，例如：globalScrollImgs={"divId":{"currSeqno":1, "imgs":[{"seqno":1, "imgSrc":"", "imgLink":""}]}}
var globalScrollImgs = {};

//滚动切换图片
function scrollChangeImg(divId, imgs, speed){
	globalScrollImgs[divId] = {"currSeqno":1, "imgs":imgs};
	
	var imageCount = imgs.length;
	var tab = document.getElementById(divId);
	var clientWidth = $("#"+divId).width();
	var scrollButWidth = imageCount*25;
	var scrollButMarginLeft = (clientWidth-scrollButWidth)/2;
	var str = "<div style='width:"+scrollButWidth+"px; margin-left:"+scrollButMarginLeft+"px;' class='height-20 position-absolute bottom-20'>";
	for(var i=0; i<imageCount; i++){
		if(i == 0){
			str += "<div id='"+divId+i+"' class='float-left margin-w-5 circle-banner circle-banner-curr link' onclick=\"changeImg('"+divId+"',"+i+");\" />";
			$("#"+divId).css("background", "url("+imgs[i].imgSrc+")");
			if(!isNull(imgs[i].imgLink)){
				$("#"+divId).attr("onclick", "openUrl('"+imgs[i].imgLink+"')");
			}
		} else {
			str += "<div id='"+divId+i+"' class='float-left margin-w-5 circle-banner link' onclick=\"changeImg('"+divId+"',"+i+");\" />";
		}
	}
	str += "<div class='clear'></div></div>";
	var parent = $(tab).parent();
	$(tab).append(str);
	
	function Marquee() {
		if(globalScrollImgs[divId].currSeqno > (imageCount-1)){
			globalScrollImgs[divId].currSeqno = 0;
		}
		changeImg(divId, globalScrollImgs[divId].currSeqno);
	}
	var MyMar=setInterval(Marquee, speed);
	tab.onmouseover=function() {clearInterval(MyMar)};
	tab.onmouseout=function() {MyMar=setInterval(Marquee, speed)};
}

// 切换图片
function changeImg(divId, seqno){
	$("#"+divId).css("background", "url("+globalScrollImgs[divId].imgs[seqno].imgSrc+")");
	if(!isNull(globalScrollImgs[divId].imgs[seqno].imgLink)){
		$("#"+divId).attr("onclick", "openUrl('"+globalScrollImgs[divId].imgs[seqno].imgLink+"')");
	}
	$(".circle-banner-curr").removeClass("circle-banner-curr");
	$("#"+divId+seqno).addClass("circle-banner-curr");
	globalScrollImgs[divId].currSeqno = ++seqno;
}

// 获取今日
function getToday(){
	var now = new Date();
	return now.getDate();
}

// 是否为交易时间
function isTradeTime() {
	if (!isTradeDate) {
		return false;
	}
	var now = new Date();
	if (now.getTime() >= beginTradeTime && now.getTime() <= endTradeTime) {
		return true;
	}
	return false;
}

// 是否在交易时间之前
function isBeforeTradeTime() {
	if (!isTradeDate) {
		return false;
	}
	var now = new Date();
	if (now.getTime() < beginTradeTime) {
		return true;
	}
	return false;
}

// 是否在交易时间之后
function isAfterTradeTime() {
	var now = new Date();
	if (now.getTime() > endTradeTime) {
		return true;
	}
	return false;
}

// 是否在撮合时间
function isMatchTime(){
	if (!isTradeDate) {
		return false;
	}
	var now = new Date();
	if (now.getTime() >= beginMatchTime && now.getTime() <= endMatchTime) {
		return true;
	}
	return false;
}

//显示应收的交易状态
function getPayInvoiceStatus(val, row){
	if(val == 'inactive'){
		return "<span class='color-gray' title='供应商入驻后，该交易会自动激活'>未激活</span>";
	} else if(val == 'active'){
		if(isTradeDate){
			if(isBeforeTradeTime()){
				return "<span class='color-gray' title='交易日10:00~14:00期间开市'>未开市</span>";
			} else if(isTradeTime()){
				return "<span style='color:#3c9bfd;'>待报价</span>";
			} else {
				return "<span class='color-gray' title='今日未报价'>未报价</span>";
			}
		} else {
			return "<span class='color-gray' title=''今日未开市'>未开市</span>";
		}
	} else if(val == 'match'){
		return "<span style='color:#ED2C9C;'>待成交</span>";
	} else if(val == 'confirm'){
		return "<span style='color:#f3b02f;'>待确认</span>"; 
	} else if(val == 'pay'){
		return "<span style='color:#da3aed;'>待支付</span>";
	} else if(val == 'success'){
		return "<span style='color:#da3410;'>交易成功</span>";
	} else if(val == 'fail'){
		return "<span style='color:#93da2d;'>交易失败<span>";
	} else if(val == 'expired'){
		return "<span class='color-gray'>已过期</span>";
	} else if(val == 'reeze'){
		return "<span class='color-gray'>已冻结</span>";
	} else {
		return "状态错误";
	}
}

//显示应付的交易状态
function getRecInvoiceStatus(val, row){
	if(val == 'inactive'){
		return "<span class='color-gray' title='供应商入驻后，该交易会自动激活'>未激活</span>";
	} else if(val == 'active'){
		if(isTradeDate){
			if(isBeforeTradeTime()){
				return "<span class='color-gray' title='交易日10:00~14:00期间开市'>未开市</span>";
			} else if(isTradeTime()){
				return "<span style='color:#3c9bfd;'>待报价</span>";
			} else {
				return "<span class='color-gray' title='今日未报价'>未报价</span>";
			}
		} else {
			return "<span class='color-gray' title=''今日未开市'>未开市</span>";
		}
	} else if(val == 'match'){
		return "<span style='color:#ED2C9C;'>待成交</span>";
	} else if(val == 'confirm'){
		return "<span style='color:#f3b02f;'>待确认</span>"; 
	} else if(val == 'pay'){
		return "<span style='color:#da3aed;'>待支付</span>";
	} else if(val == 'success'){
		return "<span style='color:#da3410;'>交易成功</span>";
	} else if(val == 'fail'){
		return "<span style='color:#93da2d;'>交易失败<span>";
	} else if(val == 'expired'){
		return "<span class='color-gray'>已过期</span>";
	} else {
		return "状态错误";
	}
}

//显示交易状态
function getInvoiceStatus(val){
	if(val == 'inactive'){
		return "<span class='color-gray'>未激活</span>";
	} else if(val == 'active'){
		return "<span class='color-orange'>待报价</span>";
	} else if(val == 'match'){
		return "<span class='color-blue'>待成交</span>";
	} else if(val == 'confirm'){
		return "<span class='color-minred'>待确认</span>";
	} else if(val == 'pay'){
		return "<span class='color-minred'>待支付</span>";
	} else if(val == 'success'){
		return "<span class='color-red'>交易成功</span>";
	} else if(val == 'fail'){
		return "<span class='color-green'>交易失败<span>";
	} else if(val == 'expired'){
		return "<span class='color-gray'>已过期</span>";
	} else {
		return "状态错误";
	}
}

//显示应付账款的交易操作
function getPayInvoiceOperate(val, row, index){
	var str = "";
	if(row.status == "inactive"){
		str += "<div id='modify"+index+"' class='float-left margin-top-5 icon-modify link' onclick='modifyInvoice("+index+")' title='修改原到期日'></div>"+
	       	   "<div id='save"+index+"' class='float-left margin-top-5 icon-save link hidden' onclick='saveInvoice("+index+")' title='保存修改'></div>"+
	       	   "<div id='cancel"+index+"' class='float-left margin-top-5 margin-left-5 icon-cancel link hidden' onclick='cancelInvoice("+index+")' title='取消修改'></div>"+
	   	   	   "<div id='delete"+index+"' class='float-left margin-top-5 margin-left-5 icon-delete link' onclick='deleteInvoice("+index+")' title='删除无报价的交易'></div>";
	} else if(row.status == "active"){
		str += "<div id='modify"+index+"' class='float-left margin-top-5 icon-modify link' onclick='modifyInvoice("+index+")' title='修改原到期日'></div>"+
    	   	   "<div id='save"+index+"' class='float-left margin-top-5 icon-save link hidden' onclick='saveInvoice("+index+")' title='保存修改'></div>"+
    	       "<div id='cancel"+index+"' class='float-left margin-top-5 margin-left-5 icon-cancel link hidden' onclick='cancelInvoice("+index+")' title='取消修改'></div>";
		if(row.hisQuoteCount > 0){
			str += "<div id='showTradeHis"+row.id+"' class='float-left margin-top-5 margin-left-5 icon-show-down link' onclick='showTradeHis(\"buyer\","+row.id+")' title='展开历史详情'></div>"+
				   "<div id='closeTradeHis"+row.id+"' class='float-left margin-top-5 margin-left-5 icon-show-up link hidden' onclick='closeTradeHis()' title='收起历史详情'></div>";
		} else {
			str += "<div id='delete"+index+"' class='float-left margin-top-5 margin-left-5 icon-delete link' onclick='deleteInvoice("+index+")' title='删除无报价的交易'></div>";
		}
	} else if(row.status == "match" || row.status == "confirm" || row.status == "pay" || row.status == "success"){
		str += "<div class='float-left margin-top-5 icon-modify-gray link' title='该交易已报价，无法修改'></div>";
		if(row.hisQuoteCount > 0){
			str += "<div id='showTradeHis"+row.id+"' class='float-left margin-top-5 margin-left-5 icon-show-down link' onclick='showTradeHis(\"buyer\","+row.id+")' title='展开历史详情'></div>"+
				   "<div id='closeTradeHis"+row.id+"' class='float-left margin-top-5 margin-left-5 icon-show-up link hidden' onclick='closeTradeHis()' title='收起历史详情'></div>";
		} else {
			str += "<div id='delete"+index+"' class='float-left margin-top-5 margin-left-5 icon-delete-gray link' title='该交易已报价，无法删除'></div>";
		}
	} else if(row.status == "fail"){
		str += "<div id='modify"+index+"' class='float-left margin-top-5 icon-modify link' onclick='modifyInvoice("+index+")' title='修改原到期日'></div>"+
    	   	   "<div id='save"+index+"' class='float-left margin-top-5 icon-save link hidden' onclick='saveInvoice("+index+")' title='保存修改'></div>"+
    	       "<div id='cancel"+index+"' class='float-left margin-top-5 margin-left-5 icon-cancel link hidden' onclick='cancelInvoice("+index+")' title='取消修改'></div>"+
    	       "<div class='float-left margin-top-5 margin-left-5 icon-delete-gray link' title='该交易已报价，无法删除'></div>";    
	} else if(row.status == 'expired'){
		str += "<div class='float-left margin-top-5 icon-modify-gray link' title='该交易已过期，无法报价'></div>";
		if(row.hisQuoteCount > 0){
			str += "<div id='showTradeHis"+row.id+"' class='float-left margin-top-5 margin-left-5 icon-show-down link' onclick='showTradeHis(\"buyer\","+row.id+")' title='展开历史详情'></div>"+
				   "<div id='closeTradeHis"+row.id+"' class='float-left margin-top-5 margin-left-5 icon-show-up link hidden' onclick='closeTradeHis()' title='收起历史详情'></div>";
		} else {
			str += "<div class='float-left margin-top-5 margin-left-5 icon-delete-gray link' title='该交易已报价，无法删除'></div>";
		}
	}
	str += "<div class='clear'></div>";
	return str;
}

//显示应收账款的交易操作
function getRecInvoiceOperate(val, row, index){
	var str = "";
	if(isTradeDate){
		if(row.status == 'expired'){
			str += "<div class='float-left margin-top-5 icon-quote-gray link' title='该交易已过期，无法报价'></div>";
		} else {
			if(isBeforeTradeTime()){
				str +=  "<div id='quote-gray"+row.id+"' class='float-left margin-top-5 icon-quote-gray link' title='未到报价时间，无法报价'></div>";
			} else if(isTradeTime()){
				str +=  "<div id='quote"+row.id+"' class='float-left margin-top-5 icon-quote link' onclick='quoteInvoice("+row.id+")' title='报价'></div>";
			} else {
				str +=  "<div id='quote-gray"+row.id+"' class='float-left margin-top-5 icon-quote-gray link' title='今日报价时间已结束，无法报价'></div>";
			}			
		}
	} else {
		if(row.status == 'expired'){
			str += "<div class='float-left margin-top-5 icon-quote-gray link' title='该交易已过期且今日未开市，无法报价'></div>";
		} else {
			str +=  "<div id='quote-gray"+row.id+"' class='float-left margin-top-5 icon-quote-gray link' title='今日未开市，无法报价'></div>";
		}
	}
	if(row.hisQuoteCount > 0){
		str += "<div id='showTradeHis"+row.id+"' class='float-left margin-top-5 margin-left-5 icon-show-down link' onclick='showTradeHis(\"supplier\","+row.id+")' title='展开历史详情'></div>"+
			   "<div id='closeTradeHis"+row.id+"' class='float-left margin-top-5 margin-left-5 icon-show-up link hidden' onclick='closeTradeHis()' title='收起历史详情'></div>";
	}
	str += "<div class='clear'></div>";
	return str;
}

//未读消息数量
function getNoReadAmount(){
	$.ajax({
		url : ctxRoot + "/message/getCount",
		type : 'post',
		data : {
		}, 
		dataType: "json",
		success	: function(data){
			if(data.state){
				if(data.extendMap.count > 0){
					$("#noRead").removeClass("hidden");
					if(data.extendMap.count<10){
						$("#noReadCount").html(data.extendMap.count);
					}else{
						$("#noReadCount").html("+9");
						$("#noReadCount").removeClass("margin-left-7");
						$("#noReadCount").addClass("margin-left-3");
					}
				}else{
					$("#noRead").addClass("hidden");
				}
      	}else{
      	}
		},
		error: function(msg){	
		},
	});
}