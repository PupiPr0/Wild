//say no mo

const logoElement = document.querySelector('.summary__logo.not-hover');

if (logoElement) {
    const newElement = document.createElement('div');
    newElement.className = 'summary__logo not-hover';
    newElement.innerHTML = '<script async src="https://res.dkon.app/dev/widget.js" dkon-widget="wildmoneypro"></script>';

    logoElement.parentNode.replaceChild(newElement, logoElement);
}
