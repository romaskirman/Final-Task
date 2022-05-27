
let DATA_LINK = 'https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json';

async function getClient(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData); // данные клиентов, полученные с сервера*
    return respData;
}

let clientsArray = [];

getClient(DATA_LINK).then(
    result => {
        clientsArray = result;
        console.log(clientsArray); // выводим массив полученных клиентов
        let mCount = 0;
        let wCount = 0;
        let mBalance = 0;

        let menCount = document.querySelector('.m-count');
        let womenCount = document.querySelector('.w-count');
        let maxBalance = document.querySelector('.max-balance');
        let clientsTable = document.querySelector('.clients-table'); // получаем пустую таблицу для вставки div клиентов
        for (let i = 0; i < clientsArray.length; i++) { // пробегаемся по каждому клиенту в массиве

            let numBalance = clientsArray[i].balance.replace(',', '');
            let cutBalance = numBalance.replace('$', '');
            if (cutBalance > mBalance) {
                mBalance = cutBalance;
            }

            let divClient = document.createElement('div'); // создаем для клиента div
            divClient.classList.add('client');
            divClient.id = i;
            if (clientsArray[i].gender === 'male') {
                divClient.style.border = '1px solid blue';
            }
            else if (clientsArray[i].gender === 'female') {
                divClient.style.border = '1px solid red';
            }

            if (clientsArray[i].isActive === true) {
                divClient.style.backgroundColor = 'white';
            }
            else {
                divClient.style.backgroundColor = 'lightgray';
            }

            let divBalance = document.createElement('div'); // div для баланса
            divBalance.classList.add('client-balance');
            divBalance.innerText = 'Balance: ' + clientsArray[i].balance; // записываем инфу

            let divMail = document.createElement('div'); // div для почты
            divMail.classList.add('client-mail');
            divMail.innerText = 'Email: ' + clientsArray[i].email; // записываем инфу

            let divCompany = document.createElement('div'); // div для компании
            divCompany.classList.add('client-company');
            divCompany.innerText = 'Company: ' + clientsArray[i].company; // записываем инфу

            let leftInfo = document.createElement('div'); // div для инфы слева
            leftInfo.classList.add('left-info');
            leftInfo.append(divBalance); // вставляем в левый столбец
            leftInfo.append(divMail); // вставляем в левый столбец
            leftInfo.append(divCompany); // вставляем в левый столбец
            divClient.append(leftInfo); // вставляем в div клиента

            let divName = document.createElement('div'); // div для имени (инфы по центру)
            divName.classList.add('client-name');
            divName.innerText = clientsArray[i].name; // записываем инфу
            divClient.append(divName); // вставляем в div клиента (центральный столбец)

            let divDelete = document.createElement('div'); // div для удаления
            divDelete.classList.add('client-delete');
            if (clientsArray[i].isActive === true) {
                divDelete.innerHTML = `<div> Online </div><img class="delete-btn" width="25" height="25" src="./assets/images/del.png" alt="del button">`; // вставляем иконку удаления, клиент онлайн
            }
            else {
                divDelete.innerHTML = `<div> Offline </div><img class="delete-btn" width="25" height="25" src="./assets/images/del.png" alt="del button">`; // вставляем иконку удаления, клиент оффлайн
            }

            let divPhone = document.createElement('div'); // div для телефона
            divPhone.classList.add('client-phone');
            divPhone.innerText = 'Phone: ' + clientsArray[i].phone; // записываем инфу

            let divDate = document.createElement('div'); // div для даты
            divDate.classList.add('client-date');
            divDate.innerText = 'Registered: ' + clientsArray[i].registered; // записываем инфу

            let rightInfo = document.createElement('div'); // div для инфы справа
            rightInfo.classList.add('right-info');
            rightInfo.append(divDelete); // вставляем в правый столбец
            rightInfo.append(divPhone); // вставляем в правый столбец
            rightInfo.append(divDate); // вставляем в правый столбец
            divClient.append(rightInfo); // вставляем в div клиента

            clientsTable.append(divClient); // вставляем готовый div клиента в нашу таблицу

            if (clientsArray[i].gender === 'male') {
                mCount++;
            }
            else {
                wCount++;
            }

            let deleteBtn = document.querySelectorAll('.delete-btn')[i];
            deleteBtn.addEventListener('click', () => {
                let conf = confirm('Are you sure you want to delete client?');
                if (conf) {
                    let delClient = document.getElementById(i);
                    delClient.remove();
                    let notification = document.createElement('div');
                    notification.classList.add('notification');

                    let close = document.createElement('div');
                    close.innerHTML = `<img width="15" height="15" src="./assets/images/del.png" alt="del button">`;
                    close.classList.add('close');
                    close.addEventListener('click', () => {
                        notification.remove();
                    });

                    let notifText = document.createElement('div');
                    notifText.innerText = 'This client was deleted successfully!';
                    notifText.classList.add('text');
                    notification.append(close);
                    notification.append(notifText);
                    document.body.append(notification);
                }
            });
        }

        menCount.innerText = mCount;
        womenCount.innerText = wCount;

        maxBalance.innerText = 'Max balance: $' + mBalance;
    }
);

let footer = document.querySelector('.footer');
footer.style.cssText = `
    position: static;
`;

let exitBtn = document.querySelector('.exit');
exitBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});

let signButton = document.querySelector('.sign-button');
signButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

activeLink = document.querySelectorAll('.meni-link')[1];
activeLink.style.cssText = `
    text-decoration: underline;
`;

let backToTopBtn = document.querySelector('.back-button');
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
});