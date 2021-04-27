
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
	document.getElementById("id_Membresia").value = membresia
}
function validar(){
	envia = true
	for(i=0; i<document.getElementsByClassName("form-control").length; i++){
		if(i!=7 && i!=13){
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
		sessionStorage.setItem('form', $( "#contactForm" ).serialize())
		$.ajax({
			//post al drive
	        url:'https://api.apispreadsheets.com/data/11466/',
	        type:'post',
	        data:$("#contactForm").serializeArray(),
	        success: function(){
	          gtag_report_conversion();
	          //document.getElementById("gracias").style.display = "block"
			  //document.getElementById("formulario").style.display = "none"
			//   window.location = "https://www.mercadopago.com/mla/debits/new?preapproval_plan_id=2c93808477ddcf340177dee284d902ea"
			// document.getElementById("subbtn").click()

			//Envio de mail
			$.post( "sendmail.php", $( "#contactForm" ).serialize() )
					.done(function( data ) {
						if(data=='Ok'){
							//post a mercadopago
							// document.getElementById('mercadopagopost')
							//$('#mercadopagopost').attr('data-transaction-amount', $('select')[1].value.split("$")[1]);
							if($('select')[1].value == "3 Botellas"){
								//Paga tres botellas
								document.getElementsByClassName('mercadopago-button')[0].click()
							}else{
								//Paga cuatro botellas
								document.getElementsByClassName('mercadopago-button')[1].click()
							}
							
						}      
						else{
						  document.getElementById("error").style.display = "block"
						  document.getElementById("formulario").style.display = "none"
						}   
				})
			
	        },
	        error: function(){
	          document.getElementById("error").style.display = "block"
			  document.getElementById("formulario").style.display = "none"
	        }
	    });
	}
}

// // Agrega credenciales de SDK 
window.Mercadopago.setPublishableKey("TEST-4937d87c-f364-4c67-9190-3256dbf5bd59");
document.getElementsByClassName('mercadopago-button')[0].style.display='none'
document.getElementsByClassName('mercadopago-button')[1].style.display='none'


function getParameterByName(name){
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results == null)
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}

$( document ).ready(function() {
	if(getParameterByName('status') != ''){
	if(getParameterByName('status') == 'approved'){
		document.getElementById("gracias").style.display = "block"
		document.getElementById("formulario").style.display = "none"
		//Aca volvemos a grabar en el drive porque se aprobo el pago.
		$.ajax({
			//post al drive
	        url:'https://api.apispreadsheets.com/data/11465/',
	        type:'post',
	        data:sessionStorage.getItem('form'),
	        success: function(){
				// alert("se grabo correctamente")
			},
			error:function(){
				// alert("No se grabo")
			}
		})

	}
	else {
		document.getElementById("error").style.display = "block"
		document.getElementById("formulario").style.display = "none"
	}	
}
});