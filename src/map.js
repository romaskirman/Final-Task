
let headerLogo = document.querySelector('.header-logo');
headerLogo.style.cssText = `
    margin-right: 0px;
`;

let headerSign = document.querySelector('.header-sign');
headerSign.style.cssText = `
    visibility: hidden;
`;

activeLink = document.querySelectorAll('.meni-link')[2];

activeLink.style.cssText = `
    text-decoration: underline;
`;