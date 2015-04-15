//Limpiar formulario
$('#pageMap').live('pageshow', function() {
	$("#insertar_evento_form").trigger( "reset" );	
});

$("#pageDetalles").live("pageshow", function(){
	var id_evento=$(location).attr("search").split("=")[1];
	var datos_evento=JSON.parse(localStorage.getItem("evento"+id_evento));
	var html="<div align=\"center\">"+
		"<h2>"+datos_evento.nombre+"</h2></div>"+
		"<p><strong>Lugar:</strong>"+datos_evento.lugar+"</p>"+
		"<p><strong>Tem&aacute;tica:</strong>"+datos_evento.tematica+"</p>"+
		"<p><strong>D&iacute;a:</strong>"+datos_evento.dia+"</p>"+
		"<p><strong>Hora:</strong>"+datos_evento.hora+"</p>"+
		"<p><strong>Detalles:</strong>"+datos_evento.detalles+"</p>";
	$("#div_detalles").html(html);
});

$(function() {
	var string_eventos;
	$("#submit").click(function(evento) {
        if(localStorage.id){
        	localStorage.id=Number(localStorage.id)+1;
        }else{
        	localStorage.id=0;
        }
		string_eventos='{';
		string_eventos+="\"id\"" + ":" + "\"" + localStorage.id +"\""+",";
        $("#insertar_evento_form").find(':input').each(function() {
        	var elemento= this;
            if(elemento.id!="submit"){ 
            	string_eventos+= "\"" + elemento.id + "\"" + ":" + "\"" + elemento.value +"\""+",";
            }

           });
        string_eventos = string_eventos.slice(0, -1);
        string_eventos+='}';
        console.log(string_eventos);
        var clave_evento= "evento"+localStorage.id;
        localStorage.setItem(clave_evento,string_eventos);
        
	});
	

	
});
