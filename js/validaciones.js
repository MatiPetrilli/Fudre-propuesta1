
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
							if(document.getElementsByClassName('mercadopago-button')[0] != undefined){
								document.getElementsByClassName('mercadopago-button')[0].remove() 
							}
							var boton = document.createElement("script");
							boton.src= "https://www.mercadopago.com.ar/integrations/v1/web-tokenize-checkout.js"
							boton.setAttribute("data-public-key","TEST-4937d87c-f364-4c67-9190-3256dbf5bd59")
							boton.setAttribute("data-summery-product-label","FUDRE")
							boton.setAttribute("data-summery-product","FUDRE")
							document.getElementById('mail_mercadopago').value = document.getElementById('id_Email').value
							document.getElementById('descripcion_mercadopago').value = $('select')[0].value +"-"+ $('select')[1].value
							valormembresia = $("select")[0].value + " - " + $("select")[1].value
							switch(valormembresia){
								case "MEMBRESIA BROTE - 3 Botellas":
									document.getElementById('importe_mercadopago').value = 1
									boton.setAttribute("data-transaction-amount",document.getElementById('importe_mercadopago').value)
								break;
								case "MEMBRESIA BROTE - 4 Botellas":
									document.getElementById('importe_mercadopago').value = 2
									boton.setAttribute("data-transaction-amount",document.getElementById('importe_mercadopago').value)
								break;
								case "MEMBRESIA ENVERO - 3 Botellas":
									document.getElementById('importe_mercadopago').value = 3
									boton.setAttribute("data-transaction-amount",document.getElementById('importe_mercadopago').value)
								break;
								case "MEMBRESIA ENVERO - 4 Botellas":
									document.getElementById('importe_mercadopago').value = 1
									boton.setAttribute("data-transaction-amount",document.getElementById('importe_mercadopago').value)
								break;
								case "MEMBRESIA VENDIMIA - 3 Botellas":
									document.getElementById('importe_mercadopago').value = 2
									boton.setAttribute("data-transaction-amount",document.getElementById('importe_mercadopago').value)
								break;
								case "MEMBRESIA VENDIMIA - 4 Botellas":
									document.getElementById('importe_mercadopago').value = 3
									boton.setAttribute("data-transaction-amount",document.getElementById('importe_mercadopago').value)
								break;
							}
							var form = $("form")[1]
							form.appendChild(boton)
							setTimeout(function(){ document.getElementsByClassName('mercadopago-button')[0].click() }, 500);
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
	if(getParameterByName('status') != ''){
		if(getParameterByName('status') == 'approved'){
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
				},
				error:function(){
					// alert("No se grabo")
				}
			})

		}else {
			document.getElementById("error").style.display = "block"
			document.getElementById("formulario").style.display = "none"
		}	
	}
	if(getParameterByName('canal') == ''){
		document.getElementById("Canal").value = "ORGANICO"
	}else{
		document.getElementById("Canal").value = getParameterByName('canal')
	}
});
