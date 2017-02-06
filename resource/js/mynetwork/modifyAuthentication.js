$(document).ready(function() { 

})

function authenticationEditBut() {
	$('#authenticationEditBut').addClass('hidden');
	$('#authenticationSaveBut').removeClass('hidden');
	$('#authenticationCancelBut').removeClass('hidden');

	$('#uniformCreditCode').addClass('hidden');
	$('#uniformCreditCodeInput').removeClass('hidden');
	$('#legalPerson').addClass('hidden');
	$('#legalPersonInput').removeClass('hidden');
	$('#registeredCapital').addClass('hidden');
	$('#registeredCapitalInput').removeClass('hidden');
	$('#registeredAddress').addClass('hidden');
	$('#registeredAddressInput').removeClass('hidden');
	$('#businessScope').addClass('hidden');
	$('#businessScopeInput').removeClass('hidden');
}

function authenticationSaveBut() {
	var uniformCreditCode = $('#uniformCreditCodeInput').val();
	if(isNull(uniformCreditCode)){
		 $('#uniformCreditCodeMessage').html("信用证代码不为空");
		return false;
	} else{
		if(uniformCreditCode.length!=18){
			 $('#uniformCreditCodeMessage').html("信用证代码为18位");
			 return;
		} else{
			$('#uniformCreditCodeMessage').html("");
		}
	}
	
	var legalPerson = $('#legalPersonInput').val();
	if(isNull(legalPerson)){
		 $('#legalPersonMessage').html("法人不为空");
		return false;
	}else{
			$('#legalPersonMessage').html("");
	}
	
	var registeredCapital = $('#registeredCapitalInput').val();
	if(isNull(registeredCapital)){
		 $('#registeredCapitalMessage').html("注册资金不为空");
		return false;
	} else{
			 $('#registeredCapitalMessage').html("");
	}
	
	var registeredAddress = $('#registeredAddressInput').val();
	if(isNull(registeredAddress)){
		 $('#registeredAddressMessage').html("注册地址不为空");
		return false;
	} else{
		 $('#registeredAddressMessage').html("");
	}
	
	var businessScope = $('#businessScopeInput').val();
	if(isNull(businessScope)){
		$('#businessScopeMessage').html("经营范围不为空");
		return false;
	} else{
		$('#businessScopeMessage').html("");
	}
	
	var id = $('#companyId').val();
	$.ajax({
		url : ctxRoot + "/user/modifyAuthentication",
		type : 'post',
		data : {
			"id" : id,
			"uniformCreditCode" : uniformCreditCode,
			"legalPerson" : legalPerson,
			"registeredCapital" : registeredCapital,
			"registeredAddress" : registeredAddress,
			"businessScope" : businessScope,
		}, 
		dataType: "json",
		success	: function(msg){
			$('#uniformCreditCode').html(uniformCreditCode);
			$('#legalPerson').html(legalPerson);
			$('#registeredCapital').html(registeredCapital);
			$('#registeredAddress').html(registeredAddress);
			$('#businessScope').html(businessScope);
		},
		error: function(msg){
			return false;
		},
	});
	
	authenticationCancelBut() ;
}
function authenticationCancelBut() {
	$('#authenticationSaveBut').addClass('hidden');
	$('#authenticationCancelBut').addClass('hidden');
	$('#authenticationEditBut').removeClass('hidden');

	$('#uniformCreditCodeInput').addClass('hidden');
	$('#uniformCreditCode').removeClass('hidden');
	$('#legalPersonInput').addClass('hidden');
	$('#legalPerson').removeClass('hidden');
	$('#registeredCapitalInput').addClass('hidden');
	$('#registeredCapital').removeClass('hidden');
	$('#registeredAddressInput').addClass('hidden');
	$('#registeredAddress').removeClass('hidden');
	$('#businessScopeInput').addClass('hidden');
	$('#businessScope').removeClass('hidden');
	//清空错误信息
	$('#uniformCreditCodeMessage').html("");
	$('#legalPersonMessage').html("");
 	$('#registeredCapitalMessage').html("");
	$('#registeredAddressMessage').html("");
	$('#businessScopeMessage').html("");
}

