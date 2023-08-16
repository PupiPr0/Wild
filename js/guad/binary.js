//Say No Mo

function getUrlVar(){
    var urlVar = window.location.search; 
    var arrayVar = [];
    var valueAndKey = []; 
    var resultArray = []; 
    arrayVar = (urlVar.substr(1)).split('&'); 
    if(arrayVar[0]=="") return false; 
    for (i = 0; i < arrayVar.length; i ++) { 
        valueAndKey = arrayVar[i].split('='); 
        resultArray[valueAndKey[0]] = valueAndKey[1]; 
    }
    return resultArray; 
}

var result = getUrlVar();
