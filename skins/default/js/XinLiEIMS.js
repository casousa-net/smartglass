function killErrors() {return true;}
//window.onerror = killErrors;
var Ajax_msg="获取失败";
function DrawImage(ImgD,w,h){
  //var flag=false;
  var image=new Image();
  var iwidth = w; 
  var iheight = h;
  image.src=ImgD.src;
  if(image.width>0 && image.height>0){
    //flag=true;
    if(image.width/image.height>= iwidth/iheight){
      if(image.width>iwidth){ 
        ImgD.width=iwidth;
        ImgD.height=(image.height*iwidth)/image.width;
      }else{
        ImgD.width=image.width; 
        ImgD.height=image.height;
      }
    }
    else{
      if(image.height>iheight){ 
          ImgD.height=iheight;
          ImgD.width=(image.width*iheight)/image.height; 
      }else{
          ImgD.width=image.width; 
          ImgD.height=image.height;
      }
    }
  }
} 

//JS版的Server.UrlEncode编码函数
function urlEncode(str) 
{ 
    str = str.replace(/./g,function(sHex) 
    { 
        window.EnCodeStr = ""; 
        window.sHex = sHex; 
        window.execScript('window.EnCodeStr=Hex(Asc(window.sHex))',"vbscript"); 
        return window.EnCodeStr.replace(/../g,"%$&"); 
    }); 
    return str; 
} 

function trim(s){return  s.replace(/(^\s*)|(\s*$)/g,  "");} 

function load_menu(t0,t1,t2)
{
	var t3=location.href;
	//alert(t3);
	if(t3.indexOf(t0)!="-1"){$("#"+t2).addClass(t1);}
}

function gourl(t0,t1,t2,t3)
{
	var t4=$("#gopage")[0].value;
	t4=parseInt(t4);
	if (isNaN(t4)){t4=1;}
	if (t4<=1){t4=1;}
	if (t4>=t0){t4=t0;}
	if (t3==1)
	{
		if (t4<=1){t5=t1+t2;}else{t4=t4-1;t5=t1+"_"+t4+t2;}
	}
	else{
		if (t4<=1){t5=t1+t2;}else{t5=t1+t4+t2;}
		}
	location.href=t5;
}


function checkbook(theform)
{
	if (trim(theform.tel.value)=='' || trim(theform.tel.value)=='手机号')
	{
		alert('请填写您的手机号!');
		theform.tel.focus();
		theform.tel.value='';
		return false;
	}
	var temp="";
	temp="公司名称："+trim(theform.gsmc.value);
	temp+=" 留言内容："+trim(theform.content.value);
	var soap='<?xml version="1.0" encoding="utf-8"?>' +
			 '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
			 '  <soap:Body>' +
			 '    <AddBook xmlns="http://xinlisoft.com/">' +
			 '      <title>'+encodeURI("姓名："+trim(theform.name.value))+'</title>' +
			 '      <contact>'+encodeURI(trim(theform.tel.value))+'</contact>' +
			 '      <content>'+encodeURI(temp)+'</content>' +
			 '      <CustomValue></CustomValue>' +
			 '    </AddBook>' +
			 '  </soap:Body>' +
			 '</soap:Envelope>';
	var url=webdir+"API/FormSubmit.asmx";
	$('#showmsg').html("<img src="+webdir+"skins/default/images/loading.gif>");
	$.ajax({
		   url:url,
		   async:true,
		   beforeSend: function(xhr) {
			   xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			   xhr.setRequestHeader("SOAPAction", "http://xinlisoft.com/AddBook"); 
		   },
		   type: "POST",
		   dataType: "xml",
		   data: soap,
		   contentType: "text/xml; charset=\"utf-8\"",
		   error:function(XMLHttpRequest, textStatus, errorThrown){
			   $('#showmsg').html(Ajax_msg);
		   },
		   complete:function(xmlData,textStatus){
			   var result=$(xmlData.responseXML).find("AddBookResult").eq(0).text();
			   $('#showmsg').html("<img src="+webdir+"skins/default/images/loading.gif>"+result.substring(1));
			   if(result.substring(0,1)==0)
			   {
			   		//theform.title.value='';theform.contact.value='';theform.content.value='';
					alert("恭喜，提交成功！");
					setTimeout("window.location.href='?';","1000");
			   }
		   }
	});
	return false;
}

function checkbook2(theform)
{
	if ((trim(theform.tel.value)=='' || trim(theform.tel.value)=='电话') && (trim(theform.email.value)=='' || trim(theform.email.value)=='邮箱'))
	{
		alert('电话和邮箱必须填写其中一个！');
		theform.tel.focus();
		theform.tel.value='';
		return false;
	}
	var temp="";
	temp="邮箱："+trim(theform.email.value)+" 公司名称："+trim(theform.gsmc.value);
	temp+=" 留言内容："+trim(theform.content.value);
	var soap='<?xml version="1.0" encoding="utf-8"?>' +
			 '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
			 '  <soap:Body>' +
			 '    <AddBook xmlns="http://xinlisoft.com/">' +
			 '      <title>'+encodeURI("姓名："+trim(theform.name.value))+'</title>' +
			 '      <contact>'+encodeURI(trim(theform.tel.value))+'</contact>' +
			 '      <content>'+encodeURI(temp)+'</content>' +
			 '      <CustomValue></CustomValue>' +
			 '    </AddBook>' +
			 '  </soap:Body>' +
			 '</soap:Envelope>';
	var url=webdir+"API/FormSubmit.asmx";
	$('#showmsg').html("<img src="+webdir+"skins/default/images/loading.gif>");
	$.ajax({
		   url:url,
		   async:true,
		   beforeSend: function(xhr) {
			   xhr.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			   xhr.setRequestHeader("SOAPAction", "http://xinlisoft.com/AddBook"); 
		   },
		   type: "POST",
		   dataType: "xml",
		   data: soap,
		   contentType: "text/xml; charset=\"utf-8\"",
		   error:function(XMLHttpRequest, textStatus, errorThrown){
			   $('#showmsg').html(Ajax_msg);
		   },
		   complete:function(xmlData,textStatus){
			   var result=$(xmlData.responseXML).find("AddBookResult").eq(0).text();
			   $('#showmsg').html("<img src="+webdir+"skins/default/images/loading.gif>"+result.substring(1));
			   if(result.substring(0,1)==0)
			   {
			   		//theform.title.value='';theform.contact.value='';theform.content.value='';
					alert("恭喜，提交成功！");
					setTimeout("window.location.href='?';","1000");
			   }
		   }
	});
	return false;
}

/*常用JS，必须先引用jquery.js*/

//JS版的Server.UrlEncode编码函数
function urlEncode(str) 
{ 
    str = str.replace(/./g,function(sHex) 
    { 
        window.EnCodeStr = ""; 
        window.sHex = sHex; 
        window.execScript('window.EnCodeStr=Hex(Asc(window.sHex))',"vbscript"); 
        return window.EnCodeStr.replace(/../g,"%$&"); 
    }); 
    return str; 
} 

function trim(s){return  s.replace(/(^\s*)|(\s*$)/g,  "");} 
	
function IndexBanner(){
	var mySwiper = new Swiper('.swiper',{
				preventLinks : true,
				autoplay : 5000,
				loop : true,
				watchActiveIndex : true,
				paginationClickable :true,
				freeMode : false,
				autoplayDisableOnInteraction : false,
				pagination : '.swiper-pagination'
		});
}

var Ajax_msg="获取失败";
/*通用表单提交
<form onsubmit="return initbook(this);" data-title="问题反馈" url="{siteconfig.SiteRoot}handler/ajax.ashx?action=save_book">
<input type="text" name="txtName" data-require="true" nullmsg="请填写您的名字！" data-title="名字：" data-inp="true" data-type="text">
<input type="text" name="txtMobile" title="手机号码：" data-inp="true" data-type="text">
</form>
说明：
<form onsubmit="return initbook(this);" data-title="问题反馈" url="{siteconfig.SiteRoot}handler/ajax.ashx?action=save_book">  data-title--必填,表单的标题，方便后台查看是属于哪个表单
<input type="text" name="txtName" data-require="true" nullmsg="请填写您的名字！" data-title="名字：" data-inp="true" data-type="text">
title、data-inp、data-type三个属性必不可少
data-require="true" 是否必填项
nullmsg="请填写您的名字" 必填项为空时的提示文字
data-title="名字："  输入项的标题，方便后台查看此项内容的意义
data-inp="true" 是否将此项内容提交到后台
data-type="text" 可选：text、select、radio、checkbox
*/
function initbook(theform){  
	try{
		var cansubmit = true;
		$(theform).find('[data-require="true"]').each(function(index, element) {
			var value="",data_type=$(this).attr('data-type'),name=$(this).prop('name');
			if(data_type=='text'||data_type=='select'){
				value = $(this).val();
			}else if(data_type=='radio'){
				$('input[name="'+name+'"]:checked').val();
			}else if(data_type=='checkbox'){
				$('input[name="'+name+'"]:checked').each(function(index, element) {
					value+=$(this).val();
				});
			}
			if(value==''){
				alert($(this).attr('nullmsg'));
				$(this).focus();
				cansubmit = false;
				return false;
			}
		});
		if(cansubmit){
			var title=$(theform).attr('data-title');
			var url = $(theform).attr('url');
			var content="";
			$(theform).find('[data-inp="true"]').each(function(index, element) {
				var _title=$(this).attr('data-title'),value="",data_type=$(this).attr('data-type'),name=$(this).prop('name');
				if(data_type=='text'||data_type=='select'){
					value = $(this).val();
				}else if(data_type=='radio'){
					$('input[name="'+name+'"]:checked').val();
				}else if(data_type=='checkbox'){
					$('input[name="'+name+'"]:checked').each(function(index, element) {
						value+=$(this).val();
					});
				}
				if(_title==undefined){
					content+='<p>'+value+'</p>';
				}else{
					content+='<p>'+_title+' '+value+'</p>';
				}
			});
			$.post(url,"txttitle="+title+'&txtcontent='+content,function(data){
				alert(data.msg);
				if(data.status==1){
					window.location.href = '/submission-success/';
				}
			},"json");
		}
		return false;
	}catch(e){
		console.log(e.message);
		return false;
	}
}

/*搜索*/    
function CheckSearch(theform){
	var key = $(theform).find('[name="key"]').val();
	if(key==''){
		return false;
	}
	var url = $(theform).attr('url');
	if(url.indexOf('?')!=-1){
		url += '&';
	}else{
		url += '?';
	}
	url += 'keyword='+key;
	window.location.href = url;
	return false;
}

function IndexCase(){
	$('.indexcase_con li').each(function(m) {
		$(this).hover(function() {
			$(this).find('a').slideDown(200);
		}, function() {
			$(this).find('a').slideUp(200);
		});
	});
}

function ChangeCaseImg(){
	var img = $("#spic").val();
	if(!$(img).attr("src"))
	{
		img=$(img).find("img").attr("src");
	}
	else
	{
		img=$(img).attr("src");
	}
	$("#spicdiv").css("background-image","url("+img+")");
}

