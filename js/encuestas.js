function enviar(){
  envia = true
  
  if($("textarea")[0].value == ""){
    $("#errorComentario")[0].style.display = "block"
    envia = false
  }else{
    $("#errorComentario")[0].style.display = "none"
  }
  if(!isEmail($("input[name=Email]")[0].value)){
    $("#errormail")[0].style.display = "block"
    envia = false
  }else{
    $("#errormail")[0].style.display = "none"
  }
  if(envia){
    $.ajax({
        //POST al drive
            url:'https://api.apispreadsheets.com/data/14772/',
            type:'post',
            data:$("#contactForm").serializeArray(),
            success: function(){
          // alert("se grabo correctamente")
         document.getElementById("gracias").style.display = "block"
      document.getElementById("formulario").style.display = "none"
        },
        error:function(){
           document.getElementById("error").style.display = "block"
      document.getElementById("formulario").style.display = "none"
        }
      })
  }
  
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