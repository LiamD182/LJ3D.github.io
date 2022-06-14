const modelViewer = document.getElementsByTagName('model-viewer')[0];

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function configModelViewer(){
    var model = GetURLParameter('model');
    alert(model)
    modelViewer.setAttribute('src', model);
}
