$(document).ready(function() { 
	login();
}); 
// 定时
function login() {
	function jump(count) {
		window.setTimeout(function() {
			count--;
			if (count > 0) {
				$('#num').html(count);
				jump(count);
			} else {
				location.href = ctxRoot + "/login";
			}
		}, 1000);
	}
	jump(3);
}