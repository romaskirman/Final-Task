/* LOGIN PAGE */

const switchRegLink = document.querySelector('.switch-link');
const inputBlock = document.getElementById('input-block');
const confirmBlock = document.createElement('div');
const descriptionQuestion = document.querySelector('.description-question');
const signBtn = document.querySelector('.sign-btn');
const mainLoginText = document.querySelector('.main-login-text');

switchRegLink.addEventListener('click', () => {

    if(switchRegLink.innerText === 'Create an account') {

        confirmBlock.classList.add('input-block');
        confirmBlock.innerHTML = `
            <label class="label-field" for="confirm-field">Confirm Password</label>
            <input type="password" id="confirm-field" class="input-field" required>
        `;
        inputBlock.after(confirmBlock);
        descriptionQuestion.innerText = 'Already have an account?';
        switchRegLink.innerText = 'Sign in';
        signBtn.innerText = 'Sign Up';
        mainLoginText.innerText = 'Sign up to CashBank';
    }

    else {
        confirmBlock.remove();
        descriptionQuestion.innerText = 'New to CashBank?';
        switchRegLink.innerText = 'Create an account';
        signBtn.innerText = 'Sign In';
        mainLoginText.innerText = 'Sign in to CashBank';
    }

});

const regForm = document.querySelector('.reg-form');

let DATA_LINK = 'https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json';

let dataArray = [];

async function getClient(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    return respData;
}

getClient(DATA_LINK).then(
    result => {
        let isLocalStorage = JSON.parse(localStorage.getItem('data'));
        dataArray = isLocalStorage !== null ? isLocalStorage : result; // кладём исходные данные с сервера (ссылки) в пустой массив
        console.log(dataArray);
    }
);

const handleSubmit = (e) => {
    e.preventDefault();
    let userEmail = document.getElementById('email-field');
    let email = userEmail.value;
    let userPassword = document.getElementById('password-field');
    let password = userPassword.value;
    let userData = {
        "email": email,
        "password": password,
    };
    console.log(userData);
    localStorage.setItem('data', JSON.stringify(dataArray)); // создаём item в хранилище и кладём туда наш массив (в 1 раз это будет исходный массив, все последующие - изменённый)
    dataArray = JSON.parse(localStorage.getItem('data')); // получаем массив из хранилища
    let currentIndex;
    if (signBtn.innerText === 'Sign In') {
        for ( let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].email === email) {
                currentIndex = i;
                    if (dataArray[currentIndex].guid !== password && dataArray[currentIndex].password !== password) {
                        //userEmail.value = '';
                        userPassword.value = '';
                        alert('Incorrect password!');
                        return null;
                    }
                break;
            }
            else if (i === dataArray.length - 1) {
                //userEmail.value = '';
                userPassword.value = '';
                alert('There are no such user in system!');
                return null;
            }
        }
    }
    else {
        let confirmPassword = document.getElementById('confirm-field');
        let matchPassword = confirmPassword.value;
        if (password !== matchPassword) {
            alert('Passwords dont match!');
            userPassword.value = '';
            confirmPassword.value = '';
            return null;
        }
        for ( let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].email === email) {
                alert('There is already a user with this email');
                userEmail.value = '';
                userPassword.value = '';
                confirmPassword.value = '';
                return null;
            }
        }
        dataArray.push(userData); // добавляем новый элемент в конец массива
        currentIndex = dataArray.indexOf(userData);
        localStorage.setItem('data', JSON.stringify(dataArray)); // перезаписываем изменённый массив в хранилище
    }
    console.log(dataArray); // вывод изменённого массива для проверки
    document.documentElement.innerHTML = '';
    let greeting = dataArray[currentIndex].greeting !== undefined ? dataArray[currentIndex].greeting
        : 'Hello, ' + dataArray[currentIndex].email.split('@')[0] + '! You have 1 unread message.';
    if (dataArray[currentIndex].balance === undefined){
        dataArray[currentIndex].balance = '$0.00';
    }
    let balance = 'Your balance: ' + dataArray[currentIndex].balance;
    let device = 'You are logged in from ' + getDevice() + '.';
    document.documentElement.innerHTML = `
                <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <title>Final Task</title>
            <link rel="stylesheet" href="./assets/styles/style.css" type="text/css">
        </head>
        
        <body>
            <header class="header">
        
                <div class="header-content">
        
                    <div class="header-logo">
                        <img width="97" height="60" src="./assets/images/logo.png" alt="cashbank logo">
                        <a href="#" class="logo-link">
                            Cash Bank
                        </a>
                    </div>
        
                    <nav class="header-menu">
        
                        <ul class="main-menu">
                            <li class="menu-list">
                                <a href="#" class="meni-link" > Главная </a>
                            </li>
                            <li class="menu-list">
                                <a href="#" class="meni-link" > Клиенты </a>
                            </li>
                            <li class="menu-list">
                                <a href="#" class="meni-link" > Карта </a>
                            </li>
                        </ul>
        
                    </nav>
        
                    <div class="header-sign">
                        <a href="#" class="sign-link">
                            <button class="sign-button" type="submit" > Sign In </button>
                        </a>
                        <div class="exit">
                            <span></span>
                        </div>
                    </div>
        
                </div>
        
            </header>
        
            <main class="main-page">
        
                <section class="main-page-container">
        
                    <div class="greeting">
                        <p class="your-balance">${balance}</p>
                        <h3 class="greeting-text">${greeting}</h3>
                    </div>
        
                    <div class="your-device">
                        <h5 class="device-info">${device}</h5>
                    </div>
        
                </section>
        
            </main>
        
            <footer class="footer">
        
                <div class="contacts">
                    Address: 848 Ditmas Avenue, Roeville, Indiana, 6710
                </div>
        
                <div class="social-media">
                    <a href="#" class="social-media-link">
                        <img width="24" height="24" src="./assets/images/facebook.png" alt="facebook logo">
                    </a>
                    <a href="#" class="social-media-link">
                        <img width="24" height="24" src="./assets/images/linkedin.png" alt="linkedin logo">
                    </a>
                    <a href="#" class="social-media-link">
                        <img width="24" height="24" src="./assets/images/twitter.png" alt="twitter logo">
                    </a>
                    <a href="#" class="social-media-link">
                        <img width="24" height="24" src="./assets/images/instagram.png" alt="instagram logo">
                    </a>
                </div>
        
                <div class="copyright">
                    &copy;Copyright 2022 <img width="22" height="14" src="./assets/images/logo.png" alt="cashbank logo">Cash Bank Inc. All rights reserved.
                </div>
        
            </footer>
        
            <script src="./script.js"></script>
        
        </body>
        </html>
    `;

    let activeLink = document.querySelectorAll('.meni-link')[0];
    activeLink.style.cssText = `
        text-decoration: underline;
    `;

    let exitBtn = document.querySelector('.exit');
    exitBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    let signButton = document.querySelector('.sign-button');
    signButton.addEventListener('click', () => {
       window.location.href = 'index.html';
    });
}

regForm.addEventListener('submit', handleSubmit);

function getDevice() {
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






