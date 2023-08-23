function json(url) {
  return fetch(url).then(res => res.json());
}
json(`https://wildmoney.pro/js/cdn-binance-reg/ref-id.json?api-key`).then(data => {
var elem = document.getElementById('country');
elem.innerHTML = data.ref; 
    
});
