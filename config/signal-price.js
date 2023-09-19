//Say No MO
function json(url) {
  return fetch(url).then(res => res.json());
}
json(`https://wildmoney.pro/config/signal.price.json?api-key=RichLife&Hash=MakeMoneyNotFriends`).then(data => {
var elem = document.getElementById('freewild');
elem.innerHTML = data.free;     
var elem = document.getElementById('14daywild');
elem.innerHTML = data.7day; 
var elem = document.getElementById('mounthwild');
elem.innerHTML = data.mounth;  
});
