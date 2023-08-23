//Say No MO
function json(url) {
  return fetch(url).then(res => res.json());
}
json(`https://wildmoney.pro/js/cdn-binance-reg/ref-id.json?api-key`).then(data => {
var elem = document.getElementById('reffengin');
elem.innerHTML = data.ref;     
var elem = document.getElementById('reffengin1');
elem.innerHTML = data.ref; 
var elem = document.getElementById('reffengin2');
elem.innerHTML = data.ref; 
var elem = document.getElementById('reffengin3');
elem.innerHTML = data.ref;    
var elem = document.getElementById('reffengin4');
elem.innerHTML = data.ref;    
var elem = document.getElementById('reffengin5');
elem.innerHTML = data.ref;    
var elem = document.getElementById('reffengin6');
elem.innerHTML = data.ref;    
});

//function json(url) {
 // return fetch(url).then(res => res.json());
//}
//json(`https://wildmoney.pro/js/cdn-binance-reg/ref-id.json?api-key`).then(data => {
//var elem = document.getElementById('reffengin');
//elem.innerHTML = data.ref; 
    
//});
