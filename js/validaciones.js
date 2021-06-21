window.Mercadopago.getIdentificationTypes();
window.Mercadopago.setPublishableKey("");
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
	document.getElementById("id_Membresia").value = membresia
	actbotellas()
}
function actbotellas(){
	membresia = document.getElementById("id_Membresia").value.split(" ")[1]
	switch(membresia){
		case "BROTE": 
			document.getElementById("op1").innerText = "3 Botellas - $1.965"
			document.getElementById("op2").innerText = "4 Botellas - $2.420"
		break;
		case "ENVERO":
			document.getElementById("op1").innerText = "3 Botellas - $2.430"
			document.getElementById("op2").innerText = "4 Botellas - $3.080"
		break;
		case "VENDIMIA":
			document.getElementById("op1").innerText = "3 Botellas - $3.810"
			document.getElementById("op2").innerText = "4 Botellas - $4.760"
		break;
	}
}
var plan
function validar(){
	mostrargif()
	envia = true
	for(i=0; i<14; i++){
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
			//POST al drive:
	        url:'https://api.apispreadsheets.com/data/11466/',
	        type:'post',
	        data:$("#contactForm").serializeArray(),
	        success: function(){
	          gtag_report_conversion();
			//Envio de mail:
			$.post( "sendmail.php", $( "#contactForm" ).serialize() )
				.done(function( data ) {
					if(data=='Ok'){
						//POST a MercadoPago:	
						document.getElementById("contactForm").style.display = "none"
						document.getElementById("paymentForm").style.display = "block"
						location.href = "#paymentForm";
						valormembresia = $("select")[0].value + " - " + $("select")[1].value
						switch(valormembresia){
							case "MEMBRESIA BROTE - 3 Botellas":
								plan = '2c9380847981e6c40179a930276e0db3' //2c9380847981e6c40179a930276e0db3
							break;
							case "MEMBRESIA BROTE - 4 Botellas":
								plan = '2c93808479896d720179a93ac68c0b19' // 2c93808479896d720179a93ac68c0b19
							break;
							case "MEMBRESIA ENVERO - 3 Botellas":
								plan = '2c9380847981e6b00179a93d4d800da4' //2c9380847981e6b00179a93d4d800da4
							break;
							case "MEMBRESIA ENVERO - 4 Botellas":
								plan = '2c9380847981e6c40179a93ea1810dbc' //2c9380847981e6c40179a93ea1810dbc
							break;
							case "MEMBRESIA VENDIMIA - 3 Botellas":
								plan = '2c9380847981e6c40179a942318a0dbf' //2c9380847981e6c40179a942318a0dbf
							break;
							case "MEMBRESIA VENDIMIA - 4 Botellas":
								plan = '2c93808479896d720179a943f7810b29' //2c93808479896d720179a943f7810b29
							break;
						}
						
					}      
					else{
						location.href = "#error";
					  document.getElementById("error").style.display = "block"
					  document.getElementById("formulario").style.display = "none"
					} 
					nomostrargif()  
				})
				
	        },
	        error: function(){
	        	nomostrargif()
	        	location.href = "#error";
	          document.getElementById("error").style.display = "block"
			  document.getElementById("formulario").style.display = "none"
			  
	        }
	    });
	}else{
		nomostrargif()
	}
	
}

//document.getElementsByClassName('mercadopago-button')[0].style.display='none'

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
	if(getParameterByName('canal') == ''){
		document.getElementById("Canal").value = "ORGANICO"
	}else{
		document.getElementById("Canal").value = getParameterByName('canal')
	}
	nomostrargif()
});

document.getElementById('paymentForm').addEventListener('submit', getCardToken);
function getCardToken(event){
	mostrargif()
	event.preventDefault();
   	envia = true
   	if(!isEmail(document.getElementsByClassName("form-control")[14].value)){
		envia = false
		document.getElementsByClassName("form-control")[14].nextElementSibling.style.display = "block"
		nomostrargif()
		return false;
	}else{
		document.getElementsByClassName("form-control")[14].nextElementSibling.style.display = "none"
	}
	if(document.getElementsByClassName("form-control")[15].value == ""){
		envia = false
		document.getElementsByClassName("form-control")[15].nextElementSibling.style.display = "block"
		nomostrargif()
		return false;
	}else{
		document.getElementsByClassName("form-control")[15].nextElementSibling.style.display = "none"
		
	}
	if(document.getElementsByClassName("form-control")[16].value == ""){
		envia = false
		document.getElementsByClassName("form-control")[16].nextElementSibling.style.display = "block"
		nomostrargif()
		return false;
	}else{
		document.getElementsByClassName("form-control")[16].nextElementSibling.style.display = "none"
		
	}
	if(document.getElementsByClassName("form-control")[17].value == ""){
		envia = false
		document.getElementsByClassName("form-control")[17].nextElementSibling.style.display = "block"
		nomostrargif()
		return false;
	}else{
		document.getElementsByClassName("form-control")[17].nextElementSibling.style.display = "none"
		
	}
	if(document.getElementsByClassName("form-control")[19].value == "" && document.getElementsByClassName("form-control")[18].value == ""){
		envia = false
		document.getElementsByClassName("form-control")[19].parentElement.parentElement.parentElement.children[1].style.display = "block"
		nomostrargif()
		return false;
	}else{
		document.getElementsByClassName("form-control")[19].parentElement.parentElement.parentElement.children[1].style.display = "none"
		
	}
	if(document.getElementsByClassName("form-control")[20].value == ""){
		envia = false
		document.getElementsByClassName("form-control")[20].nextElementSibling.style.display = "block"
		nomostrargif()
		return false;
	}else{
		document.getElementsByClassName("form-control")[20].nextElementSibling.style.display = "none"
		
	}
	if(document.getElementsByClassName("form-control")[21].value == ""){
		envia = false
		document.getElementsByClassName("form-control")[21].nextElementSibling.style.display = "block"
		nomostrargif()
		return false;
	}else{
		document.getElementsByClassName("form-control")[21].nextElementSibling.style.display = "none"
		
	}
	if(envia){
		let $form = document.getElementById('paymentForm');
       window.Mercadopago.createToken($form, setCardTokenAndPay);
       return false;
	}
};
function setCardTokenAndPay(status, response){
	$.post( "postMP.php", "card_token_id="+response.id+"&payer_email="+document.getElementsByClassName("form-control")[14].value+"&preapproval_plan_id="+plan )
		.done(function( data ) {
			//alert(JSON.parse(data).message)
			if(JSON.parse(data).status == 'authorized'){
				location.href = "#gracias";
			document.getElementById("gracias").style.display = "block"
			document.getElementById("formulario").style.display = "none"
			//Aca volvemos a grabar en el drive porque se aprobo el pago:
			$.ajax({
				//POST al drive
		        url:'https://api.apispreadsheets.com/data/11465/',
		        type:'post',
		        data:sessionStorage.getItem('form'),
		        success: function(){
					// alert("se grabo correctamente")
					nomostrargif()
				},
				error:function(){
					// alert("No se grabo")
				}
			})

		}else {
			location.href = "#errorMercadoPago";
			document.getElementById("errorMercadoPago").style.display = "block"
			document.getElementById("formulario").style.display = "none"
			nomostrargif()
		}	
	})
}
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today =  dd + '/' + mm + '/' + yyyy;
document.getElementById("Fecha").value = today