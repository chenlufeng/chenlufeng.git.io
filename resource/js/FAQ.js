$(document).ready(function() { 
	if(loginCompanyType=="buyer"){
		$("#buyer").removeClass("hidden");
	}
	if(loginCompanyType=="supplier"){
		$("#supplier").removeClass("hidden");
		$("#menu_buyer").addClass("hidden");
		$("#buyerMoney").addClass("hidden");
	}
	if(loginCompanyType=="all"){
		$("#both").removeClass("hidden");
	}
	if(GetQueryString("number")==1){
		$("div").siblings().removeClass("sidebar-item-curr");
		$('#menu_FAQ1').addClass("sidebar-item-curr");
	}
	if(GetQueryString("number")==2){
		$("div").siblings().removeClass("sidebar-item-curr");
		$('#menu_FAQ2').addClass("sidebar-item-curr");
	}
})

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
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