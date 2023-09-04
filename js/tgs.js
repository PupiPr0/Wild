var headings = ['Secret Society - WildMoney.Pro', 'Secret Knowledge - WildMoney.Pro', 'More Money, More Opportunities - WildMoney.Pro', 'Make Money! Not Friends ! - WildMoney.Pro'];
var i = 0;
var intervalId = setInterval(function() {
  document.getElementById('wild').innerHTML = headings[i];
  if (i == (headings.length - 1)) {
    i = 0;

  } else {
    i++;
  }
}, 1000)
