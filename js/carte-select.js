$(function() {
    $(".carte-select").click(function() {
        $(".carte-select").attr("selected", false);
        $(this).attr("selected", true);
        localStorage["carte"] = $(this).attr("mapid");
    });
    
    var mapid = localStorage["carte"] || 11;
    $('.carte-select[mapid='+mapid+']').attr("selected", true);
});