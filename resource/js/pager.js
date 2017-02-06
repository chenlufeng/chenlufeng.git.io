//创建分页
function createPage(pager, callbackFun){
	if(pager.pageCount < 1){
		return "";
	}
	var showButSize = 7;
	var str="";
	str += "<table class='height-30 line-height-30 margin-auto-w padding-h-10 text-center font-12 color-lightblack background-white'>"
		+  "<tr>"
		+  "<td>";
	
	//上一页
	if(pager.isPriviousPage){
		str += "<div onclick='"+callbackFun+"("+(pager.currentPage-1)+");' class='float-left width-70 height-30 margin-w-5 border-solid changecolorboldred changeborderboldred link'>< 上一页</div>";
	} else {
		str += "<div class='float-left width-70 height-30 margin-w-5 border-solid color-gray'><上一页</div>";
	}
	if(pager.currentPage<=showButSize-2){
		if(pager.pageCount<=showButSize){
			for(var i=1;i<=pager.pageCount;i++){
				if(i==pager.currentPage){
					str += "<div onclick='"+callbackFun+"("+i+");' class='float-left width-30 height-30 margin-w-5 color-white back-boldred link'>"+i+"</div>";
				} else {
					str += "<div onclick='"+callbackFun+"("+i+");' class='float-left width-30 height-30 margin-w-5 border-solid changecolorboldred changeborderboldred link'>"+i+"</div>";		
				}
			}
		} else {
			for(var i=1;i<=showButSize;i++){
				if(i==pager.currentPage){
					str += "<div onclick='"+callbackFun+"("+i+");' class='float-left width-30 height-30 margin-w-5 color-white back-boldred link'>"+i+"</div>";									
				} else {
					str += "<div onclick='"+callbackFun+"("+i+");' class='float-left width-30 height-30 margin-w-5 border-solid changecolorboldred changeborderboldred link'>"+i+"</div>";
				}
			}
			str += "<div class='float-left width-30 height-30'>...</div>";
		}
	} else {
		if(pager.pageCount<=showButSize){
			for(var i=1;i<=pager.pageCount;i++){
				if(i==pager.currentPage){
					str += "<div onclick='"+callbackFun+"("+i+");' class='float-left width-30 height-30 margin-w-5 color-white back-boldred link'>"+i+"</div>";
				} else {
					str += "<div onclick='"+callbackFun+"("+i+");' class='float-left width-30 height-30 margin-w-5 border-solid changecolorboldred changeborderboldred link'>"+i+"</div>";
				}
			}
		} else {
			str += "<div class='float-left width-30 height-30'>...</div>";
			if(pager.pageCount<=(pager.currentPage+2)){
				for(var i=pager.pageCount-4;i<=pager.pageCount;i++){
					if(i==pager.currentPage){
						str += "<div onclick='"+callbackFun+"("+i+");' class='float-left width-30 height-30 margin-w-5 color-white back-boldred link'>"+i+"</div>";
					} else {
						str += "<div onclick='"+callbackFun+"("+i+");' class='float-left width-30 height-30 margin-w-5 border-solid changecolorboldred changeborderboldred link'>"+i+"</div>";
					}
				}
			} else {
				for(var i=pager.currentPage-2;i<=pager.currentPage+2;i++){
					if(i==pager.currentPage){
						str += "<div onclick='"+callbackFun+"("+i+");' class='float-left width-30 height-30 margin-w-5 color-white back-boldred link'>"+i+"</div>";
					} else {
						str += "<div onclick='"+callbackFun+"("+i+");' class='float-left width-30 height-30 margin-w-5 border-solid changecolorboldred changeborderboldred link'>"+i+"</div>";
					}
				}
				str += "<div class='float-left width-30 height-30'>...</div>";
			}
		}
	}
	
	//下一页
	if(pager.isNextPage){
		str += "<div onclick='"+callbackFun+"("+(pager.currentPage+1)+");' class='float-left width-70 height-30 margin-w-5 border-solid changecolorboldred changeborderboldred link'>下一页 ></div>";
	} else {
		str += "<div class='float-left width-70 height-30 margin-w-5 border-solid color-gray'>下一页 ></div>";
	}
		
	str += "<div class='clear'></div>"
		+  "</td>"
		+  "<td>"
		+  "<div class='padding-left-20 color-gray'>";
	
	//到第几页
	if(pager.isNextPage){
		str += "共"+pager.pageCount+"页,到<input type='text' id='gotoPageId_"+callbackFun+"' value='"+(parseInt(pager.currentPage)+1)+"' class='width-20 height-20 line-height-20 margin-w-3 padding-w-5 border-solid' />页";
	} else {
		str += "共"+pager.pageCount+"页,到<input type='text' id='gotoPageId_"+callbackFun+"' value='"+pager.currentPage+"' class='width-30 height-20 line-height-20 margin-w-3 padding-w-5 border-solid' />页";
	}
	str += "<input type='button' value='确定' onclick='gotoPage("+pager.pageCount+",\""+callbackFun+"\");' class='height-25 line-height-25 padding-w-5 margin-w-3 border-solid changecolorboldred changeborderboldred link' />"
		+  "</div>"
		+  "</td>"
		+  "</tr>"
		+  "</table>";
	
	return str;
}

//点击分页的"确定"按钮事件
function gotoPage(pageCount, callbackFun){
	var gotoPageNo = $("#gotoPageId_"+callbackFun).val();
	if(!isNull(gotoPageNo) && isInteger(gotoPageNo) && gotoPageNo>=1 && gotoPageNo<=pageCount){
		 var gotoPageFunc=eval(callbackFun);
		 gotoPageFunc(gotoPageNo);
	} else {
		$("#gotoPageId_"+callbackFun).focus().select();
	}
}