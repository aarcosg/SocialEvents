var localizacion;
var mapa;
var ventana;

$('#pageMap').live('pageshow', function() {
			var geolocalizado=false;
			if (navigator.geolocation) {
							navigator.geolocation.getCurrentPosition(function(position){
							localizacion = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
							geolocalizado=true;
							inicializar(localizacion);
				});
			}
			if (!geolocalizado){
				localizacion = new google.maps.LatLng(37.38264, -5.9962951); // Sevilla
				inicializar(localizacion);
			}	
			
});

function inicializar(localizacion) {
	var opcionesMapa = {
			zoom : 13,
			center : localizacion,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		mapa = new google.maps.Map(document.getElementById("map_canvas"),opcionesMapa);
		ventana = new google.maps.InfoWindow();
		

		for(var i=0;i<=localStorage.id;i++){
		var datos=JSON.parse(localStorage.getItem("evento"+i));
		creaMarcadorEvento(mapa,datos);
		}
		getUbicacion(mapa);
		
		
		var marcador_posicion=new google.maps.Marker({
			map:mapa,
			position:localizacion,
			icon: "icons/you-are-here-2.png"
		});
		
		google.maps.event.addListener(marcador_posicion, 'click', function() {
			var html_ini_pos="<div align=\"center\">Usted est&aacute; aqu&iacute;</div>";
		      ventana.setContent(html_ini_pos);
		      ventana.open(mapa, marcador_posicion);
		    
		});
		
		$("#popupExplicacion").popup("open");
		$("#cerrarExplicacion").click(function(){
			$("#popupExplicacion").remove();
		});
		
		
}


function getUbicacion(mapa){
	google.maps.event.addListenerOnce(mapa,'click',function(evento){
		var punto = new google.maps.LatLng(evento.latLng.lat(),evento.latLng.lng());
		setCoordenadasFormulario(punto);
		creaMarcador(mapa,punto);
		});

}

function creaMarcador(mapa,punto){
	  var marcador = new google.maps.Marker({
		    map: mapa,
		    position: punto,
		    draggable: true
	  });
	  google.maps.event.addListener(marcador,'dragend',function(evento){
			var punto_marcador_dragend = new google.maps.LatLng(evento.latLng.lat(),evento.latLng.lng());
			setCoordenadasFormulario(punto_marcador_dragend);
		  
	  });	
}

function creaMarcadorEvento(mapa,datos){
	var tematica = datos.tematica;
	var icono="";
	if(tematica=="deportes"){
		icono="icons/soccer.png";
	} else if (tematica=="musical"){
		icono="icons/music.png";
	} else if (tematica=="educacion"){
		icono="icons/university.png";
	} else if (tematica=="compras") {
		icono="icons/mall.png";
	}else{
		icono="icons/symbol_inter.png";
	}
	var punto = new google.maps.LatLng(datos.latitud, datos.longitud);
	  var marcador = new google.maps.Marker({
		    map: mapa,
		    position: punto,
		    draggable: false,
		    icon : icono
	  });
	  
	  google.maps.event.addListener(marcador, 'click', function() {
	     var html = "<div align=\"center\">" +
	      		"<b>"+datos.nombre+"</b><br>" +
	      		datos.lugar+"<br>" +
	      		datos.dia+" "+ datos.hora +"<br>"+
	      		"<a href=\"\detalles_evento.html?id="+datos.id+"\" rel=\"external\" >Detalles</a>"+
	      		"</div>";
	      ventana.setContent(html);
	      ventana.open(mapa, marcador);
	    });
}

function setCoordenadasFormulario(punto){
	$("#latitud").val(punto.lat());
	$("#longitud").val(punto.lng());
}
