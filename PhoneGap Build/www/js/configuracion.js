/**
 * 
 */
$(document).bind("mobileinit", function(){
	$.mobile.page.prototype.options.backBtnText = "Atrás";
	$.mobile.listview.prototype.options.filterPlaceholder="Filtrar búsqueda...";
	$.mobile.selectmenu.prototype.options.nativeMenu = false;
	$.mobile.loadingMessage="Cargando...";

});
