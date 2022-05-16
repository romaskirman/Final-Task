/* MAIN PAGE */

const DATA_LINK = 'https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json';

const greetingText = document.querySelector('.greeting-text');
const yourBalance = document.querySelector('.your-balance');
const deviceInfo = document.querySelector('.device-info');


async function getClient(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    greetingText.innerText = respData[0].greeting;
    yourBalance.innerText = 'Your balance: ' + respData[0].balance;
    deviceInfo.innerText = 'You are logged in from ' + getDevice() + '.';
}

getDevice = () => {
    const isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);
    const isTablet = navigator.userAgent.toLowerCase().match(/tablet/i);
    const isAndroid = navigator.userAgent.toLowerCase().match(/android/i);
    const isiPhone = navigator.userAgent.toLowerCase().match(/iphone/i);
    const isiPad = navigator.userAgent.toLowerCase().match(/ipad/i);
    if (isMobile){ return 'mobile';}
    else if (isTablet){ return 'tablet';}
    else if (isAndroid){ return 'android';}
    else if (isiPhone){return  'iPhone';}
    else if (isiPad){return 'iPad';}
    else {return 'PC';}
}

getClient(DATA_LINK);






