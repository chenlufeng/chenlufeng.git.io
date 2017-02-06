$(document).ready(function() { 
	if(loginCompanyType=="buyer"){
		$("#buyer").removeClass("hidden");
	}
	if(loginCompanyType=="supplier"){
		$("#supplier").removeClass("hidden");
		$("#menu_buyer").addClass("hidden");
	}
	if(loginCompanyType=="all"){
		$("#both").removeClass("hidden");
	}
	$("div").siblings().removeClass("sidebar-item-curr");
	$('#menu_supplier').addClass("sidebar-item-curr");
})
function tradeGuide(){
	if($("#menu_company").hasClass("hidden")){
		$('#menu_company').removeClass("hidden");
		$('#menu_buyer').removeClass("hidden");
		$('#menu_supplier').removeClass("hidden");
		if(loginCompanyType=="buyer"){
			$("#buyer").removeClass("hidden");
		}
		if(loginCompanyType=="supplier"){
			$("#supplier").removeClass("hidden");
			$("#menu_buyer").addClass("hidden");
		}
		if(loginCompanyType=="all"){
			$("#both").removeClass("hidden");
		}
		}else{
			$('#menu_company').addClass("hidden");
			$('#menu_buyer').addClass("hidden");
			$('#menu_supplier').addClass("hidden");
			$("div").siblings().removeClass("sidebar-item-curr");
			$('#menu_tradeGuide').addClass("sidebar-item-curr");
		}
}
function FAQGuide(){
	if($("#menu_FAQ1").hasClass("hidden")){
		$('#menu_FAQ1').removeClass("hidden");
		$('#menu_FAQ2').removeClass("hidden");
		}else{
			$('#menu_FAQ1').addClass("hidden");
			$('#menu_FAQ2').addClass("hidden");
			$("div").siblings().removeClass("sidebar-item-curr");
			$('#menu_FAQ').addClass("sidebar-item-curr");
		}
}
function changePc(){
	$('#pc').addClass("back-red color-white");
	$('#pc').removeClass("back-gray color-black");
	$('#wechat').addClass("back-gray color-black");
	$('#wechat').removeClass("back-red color-white");
	$('#pcImage').removeClass("hidden");
	$('#wechatImage').addClass("hidden");
}
function changeWechat(){
	$('#pc').removeClass("back-red color-white");
	$('#pc').addClass("back-gray color-black");
	$('#wechat').removeClass("back-gray color-black");
	$('#wechat').addClass("back-red color-white");
	$('#wechatImage').removeClass("hidden");
	$('#pcImage').addClass("hidden");
}