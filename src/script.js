
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

let dataArray = []; // промежуточный массив
let currentData = []; // объединённый массив с 100 исходными пользователями и добавленными (lsArray)
let lsArray = []; // массив с новыми пользователями (берётся из localStorage, по ключу data)

async function getClient(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData); // данные клиентов, полученные с сервера*
    return respData;
}

getClient(DATA_LINK).then(
    result => {
        let newUsers = JSON.parse(localStorage.getItem('data')); // получаем свежий массив новых клиентов из localStorage
        let specialUser = JSON.parse(localStorage.getItem('dataArray')); // записываем сначала в dataArray массив в котором возможно есть клиент со спец ключом
        if (specialUser !== null) {
            dataArray.push(specialUser); // кладем обьект данных 1 вошедшего клиента в пустой массив
        }

        console.log(dataArray); // здесь должны быть только данные одного вошедшего клиента
        // или только что вышедшего (берутся из хранилища - ключ dataArray)

        //localStorage.removeItem('dataArray'); // РАСКОММЕНТИТЬ ЧТОБЫ ВРУЧНУЮ ОЧИСТИТЬ КЛЮЧ С ВОШЕДШИМ КЛИЕНТОМ
        //localStorage.removeItem('data'); // РАСКОММЕНТИТЬ ЧТОБЫ ВРУЧНУЮ ОЧИСТИТЬ КЛЮЧ С НОВЫМИ КЛИЕНТАМИ

        if (dataArray[0] !== null) { // если массив с вошедшим клиентом не пустой (т.е. если уже кто-то входил в приложение) то выполнять следующий цикл
            for (let i = 0; i < dataArray.length; i++) {
                if (dataArray[i].isAuthenticate === true) {
                    const alreadySigned = () => {
                        document.documentElement.innerHTML = '';
                        greeting = dataArray[i].greeting !== undefined ? dataArray[i].greeting
                            : 'Hello, ' + dataArray[i].email.split('@')[0] + '! You have 1 unread message.';
                        if (dataArray[i].balance === undefined) {
                            dataArray[i].balance = '$0.00';
                        }
                        balance = 'Your balance: ' + dataArray[i].balance;
                        device = 'You are logged in from ' + getDevice() + '.';
                        document.documentElement.innerHTML = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>Cashbank - Main</title> <link rel="stylesheet" href="./assets/styles/style.css" type="text/css"> </head> <body> <header class="header"> <div class="header-content"> <div class="header-logo"> <img width="97" height="60" src="./assets/images/logo.png" alt="cashbank logo"> <a href="#" class="logo-link"> CashBank </a> </div> <nav class="header-menu"> <ul class="main-menu"> <li class="menu-list"> <a href="#" class="meni-link" > Главная </a> </li> <li class="menu-list"> <a href="clients.html" class="meni-link" > Клиенты </a> </li> <li class="menu-list"> <a href="#" class="meni-link" > Карта </a> </li> </ul> </nav> <div class="header-sign"> <a class="sign-link"> <button class="sign-button" type="submit" > Sign In </button> </a> <div class="exit"> <span></span> </div> </div> </div> </header> <main class="main-page"> <section class="main-page-container"> <div class="greeting"> <p class="your-balance">${balance}</p> <h3 class="greeting-text">${greeting}</h3> </div> <div class="your-device"> <h5 class="device-info">${device}</h5> </div> </section> </main> <footer class="footer"> <div class="contacts"> Address: 848 Ditmas Avenue, Roeville, Indiana, 6710 </div> <div class="social-media"> <a href="#" class="social-media-link"> <img width="24" height="24" src="./assets/images/facebook.png" alt="facebook logo"> </a> <a href="#" class="social-media-link"> <img width="24" height="24" src="./assets/images/linkedin.png" alt="linkedin logo"> </a> <a href="#" class="social-media-link"> <img width="24" height="24" src="./assets/images/twitter.png" alt="twitter logo"> </a> <a href="#" class="social-media-link"> <img width="24" height="24" src="./assets/images/instagram.png" alt="instagram logo"> </a> </div> <div class="copyright"> &copy;Copyright 2022 <img width="22" height="14" src="./assets/images/logo.png" alt="cashbank logo">CashBank Inc. All rights reserved. </div> </footer> <script src="./script.js"></script> </body> </html>`;
                    }
                    alreadySigned();

                    activeLink = document.querySelectorAll('.meni-link')[0];
                    activeLink.style.cssText = `
                    text-decoration: underline;
                    `;

                    exitBtn = document.querySelector('.exit');
                    exitBtn.addEventListener('click', () => {
                        dataArray[i].isAuthenticate = false; // меняем флаг спец ключа на false (выход из приложения)
                        localStorage.setItem('dataArray', JSON.stringify(specialUser)); // если клиент вышел
                        // то временно записываем в хранилище обьект с его данными ( значение флага спец ключа - false - то есть пользователь вышел)
                        window.location.href = 'index.html';
                    });

                    signButton = document.querySelector('.sign-button');
                    signButton.addEventListener('click', () => {
                        dataArray[i].isAuthenticate = false; // меняем флаг спец ключа на false (выход на страницу аутентификации)
                        localStorage.setItem('dataArray', JSON.stringify(specialUser)); // если клиент вышел
                        // то временно записываем в хранилище обьект с его данными ( значение флага спец ключа - false - то есть пользователь вышел)
                        window.location.href = 'index.html';
                    });
                }
            }
        }
        if (newUsers) {
            lsArray = newUsers; // передаем в этот пустой массив новых клиентов из хранилища
            currentData = result.concat(lsArray); // соединяем исходных и новых клиентов в один массив
        }
        else {
            currentData = result;
        }

        console.log(currentData); // вывод свежего массива всех зарегистрированных клиентов на данный момент
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

    console.log(userData); // вывод введенных клиентом данных

    dataArray.splice(0, 1); // очищаем dataArray от specialUser (от предыдущего вошедшего клиента)
    dataArray = currentData; // теперь передаем в этот массив свежий массив с 100 исходными и всеми нашими добавленными клиентами
    let currentIndex; // индекс, по которому лежат данные того клиента, чьи данные были введены

    if (signBtn.innerText === 'Sign In') { // если нажата кнопка входа в приложение
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
    else { // если нажата кнопка регистрации
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
        dataArray.push(userData); // добавляем нового клиента в конец массива
        currentIndex = dataArray.indexOf(userData); // находим индекс, по которому лежат данные нового клиента

        lsArray.push(userData); // также добавляем нового клиента и в массив который впоследствии будет передан в хранилище, где лежат новые клиенты
        console.log(lsArray); // то, что лежит на данном этапе в localStorage по ключу data (наши новые клиенты)
        localStorage.setItem('data', JSON.stringify(lsArray)); // перезаписываем изменённый массив с новыми клиентами в хранилище
    }

    dataArray[currentIndex].isAuthenticate = true; // добавляем вошедшему клиенту специальный ключ и устанавливаем флаг true (т.е. клиент зашел в приложение)
    let signedUser = dataArray[currentIndex]; // кладем сюда все данные вошедшего клиента
    localStorage.setItem('dataArray', JSON.stringify(signedUser)); // кладём dataArray в хранилище с клиентом у которого есть спец ключ

    console.log(dataArray); // вывод изменённого массива для проверки
    console.log(signedUser); // выводим данные вошедшего клиента

    document.documentElement.innerHTML = '';
    let greeting = dataArray[currentIndex].greeting !== undefined ? dataArray[currentIndex].greeting
        : 'Hello, ' + dataArray[currentIndex].email.split('@')[0] + '! You have 1 unread message.';
    if (dataArray[currentIndex].balance === undefined){
        dataArray[currentIndex].balance = '$0.00';
    }
    let balance = 'Your balance: ' + dataArray[currentIndex].balance;
    let device = 'You are logged in from ' + getDevice() + '.';

    document.documentElement.innerHTML = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>Cashbank - Main</title> <link rel="stylesheet" href="./assets/styles/style.css" type="text/css"> </head> <body> <header class="header"> <div class="header-content"> <div class="header-logo"> <img width="97" height="60" src="./assets/images/logo.png" alt="cashbank logo"> <a href="#" class="logo-link"> Cash Bank </a> </div> <nav class="header-menu"> <ul class="main-menu"> <li class="menu-list"> <a href="#" class="meni-link" > Главная </a> </li> <li class="menu-list"> <a href="clients.html" class="meni-link" > Клиенты </a> </li> <li class="menu-list"> <a href="#" class="meni-link" > Карта </a> </li> </ul> </nav> <div class="header-sign"> <a class="sign-link"> <button class="sign-button" type="submit" > Sign In </button> </a> <div class="exit"> <span></span> </div> </div> </div> </header> <main class="main-page"> <section class="main-page-container"> <div class="greeting"> <p class="your-balance">${balance}</p> <h3 class="greeting-text">${greeting}</h3> </div> <div class="your-device"> <h5 class="device-info">${device}</h5> </div> </section> </main> <footer class="footer"> <div class="contacts"> Address: 848 Ditmas Avenue, Roeville, Indiana, 6710 </div> <div class="social-media"> <a href="#" class="social-media-link"> <img width="24" height="24" src="./assets/images/facebook.png" alt="facebook logo"> </a> <a href="#" class="social-media-link"> <img width="24" height="24" src="./assets/images/linkedin.png" alt="linkedin logo"> </a> <a href="#" class="social-media-link"> <img width="24" height="24" src="./assets/images/twitter.png" alt="twitter logo"> </a> <a href="#" class="social-media-link"> <img width="24" height="24" src="./assets/images/instagram.png" alt="instagram logo"> </a> </div> <div class="copyright"> &copy;Copyright 2022 <img width="22" height="14" src="./assets/images/logo.png" alt="cashbank logo">Cash Bank Inc. All rights reserved. </div> </footer> <script src="./script.js"></script> </body> </html>`;

    let activeLink = document.querySelectorAll('.meni-link')[0];
    activeLink.style.cssText = `
        text-decoration: underline;
    `;

    let exitBtn = document.querySelector('.exit');
    exitBtn.addEventListener('click', () => {
        dataArray[currentIndex].isAuthenticate = false; // меняем флаг спец ключа на false (выход из приложения)
        localStorage.setItem('dataArray', JSON.stringify(signedUser)); // кладём signedUser - клиента у которого есть спец ключ с флагом true
        window.location.href = 'index.html';
    });

    let signButton = document.querySelector('.sign-button');
    signButton.addEventListener('click', () => {
        dataArray[currentIndex].isAuthenticate = false; // меняем флаг спец ключа на false (выход из приложения)
        localStorage.setItem('dataArray', JSON.stringify(signedUser)); // кладём signedUser - клиента у которого есть спец ключ с флагом true
        window.location.href = 'index.html';
    });

}

regForm.addEventListener('submit', handleSubmit); // обработчик события на отправку формы входа/регистрации

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