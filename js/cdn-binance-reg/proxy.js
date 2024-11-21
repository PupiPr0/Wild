//say no mo

document.addEventListener('DOMContentLoaded', function() {
    const button = document.createElement('a');
    button.href = 'https://dkon.app/WildMoneyPro';
    button.target = '_blank';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.width = '60px'; // 
    button.style.height = '60px'; // 
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    button.style.cursor = 'pointer';
    button.style.textDecoration = 'none';

    const svgImage = document.createElement('img');
    svgImage.src = 'https://res.dkon.app/logotype/DK.svg';
    svgImage.alt = 'DK Logo';
    svgImage.style.width = '100%'; // 
    svgImage.style.height = '100%'; // 
    svgImage.style.background = 'transparent'; 

    button.appendChild(svgImage);

    document.body.appendChild(button);
});
