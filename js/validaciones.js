function mostrargif(){
	if(document.getElementsByClassName("se-pre-con")[0].style.display !="block"){
	document.getElementsByClassName("se-pre-con")[0].style.display="block"}
}
function nomostrargif(){
	if(document.getElementsByClassName("se-pre-con")[0].style.display !="none"){
	document.getElementsByClassName("se-pre-con")[0].style.display="none"}
}
function checkNumeric(entry){	
	entry.value = entry.value.replace(/[^0-9]/g,"");
}
function checkText(entry){	
	entry.value = entry.value.replace(/[^a-zA-ZÁÉÍÓÚáéíóú ]/g,"");
}
function checkNosymbols(entry){	
	entry.value = entry.value.replace(/[^a-zA-ZÁÉÍÓÚáéíóú0-9.@  ]/g,"");
}
function isEmail(str){
	var at="@"
	var dot="."
	var lat=str.indexOf(at)
	var lstr=str.length
	var ldot=str.indexOf(dot)
	if (str.indexOf(at)==-1){
		   return false
	}

	if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   return false
	}

	if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
			return false
	}

	 if (str.indexOf(at,(lat+1))!=-1){
			return false
	 }

	 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
			return false
	 }

	 if (str.indexOf(dot,(lat+2))==-1){
			return false
	 }
		
	 if (str.indexOf(" ")!=-1){
			return false
	 }
	 if (str.indexOf(",")!=-1){
			return false
	 }
	 if (str.indexOf(";")!=-1){
			return false
	 }
	 return true					
}
function setearmembresia(membresia){
	document.getElementById("membresia").value = membresia
}
function validar(){
	mostrargif()
	envia = true
	for(i=0; i<document.getElementsByClassName("form-control").length; i++){
		if(i!=7 && i!=12){
			switch(i){
				case 2:
					if(!isEmail(document.getElementsByClassName("form-control")[i].value)){
						envia = false
						document.getElementsByClassName("form-control")[i].nextElementSibling.style.display = "block"
					}else{
						document.getElementsByClassName("form-control")[i].nextElementSibling.style.display = "none"
					}
				break;
				case 5:
					if(document.getElementsByClassName("form-control")[i].value == "" || document.getElementsByClassName("form-control")[i+1].value == ""){
						envia = false
						document.getElementsByClassName("form-control")[i].nextElementSibling.style.display = "block"
					}else{
						document.getElementsByClassName("form-control")[i].nextElementSibling.style.display = "none"
					}
					i = i+1
				break;	
				default:
					if(document.getElementsByClassName("form-control")[i].value == ""){
						envia = false
						document.getElementsByClassName("form-control")[i].nextElementSibling.style.display = "block"
					}else{
						document.getElementsByClassName("form-control")[i].nextElementSibling.style.display = "none"
					}
			}
		}
	}
	if(envia){
		$.ajax({
	        url:'https://api.apispreadsheets.com/data/10856/',
	        type:'post',
	        data:$("#contactForm").serializeArray(),
	        success: function(){
	          gtag_report_conversion();
	          document.getElementById("gracias").style.display = "block"
			  document.getElementById("formulario").style.display = "none"
	        },
	        error: function(){
	          document.getElementById("error").style.display = "block"
			  document.getElementById("formulario").style.display = "none"
	        }
	    });
	}
	nomostrargif();
}
nomostrargif();