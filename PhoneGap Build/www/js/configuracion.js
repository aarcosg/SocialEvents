/**
 * 
 */
$(document).bind("mobileinit", function(){
	$.mobile.page.prototype.options.backBtnText = "Atr�s";
	$.mobile.listview.prototype.options.filterPlaceholder="Filtrar b�squeda...";
	$.mobile.selectmenu.prototype.options.nativeMenu = false;
	$.mobile.loadingMessage="Cargando...";

});
