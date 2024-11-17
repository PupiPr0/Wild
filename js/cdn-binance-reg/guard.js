//say no mo

const logoElement = document.querySelector('.summary__logo.not-hover');

if (logoElement) {
    const newElement = document.createElement('div');
    newElement.className = 'summary__logo not-hover';
    newElement.innerHTML = '<iframe src="https://dkon.app/dev/generate.widget.community?group=wildmoneypro" width="350" height="366" style="border: 0; background-color: #ffffff;"></iframe>';

    logoElement.parentNode.replaceChild(newElement, logoElement);
}
