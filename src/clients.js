
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
        //localStorage.removeItem('clientsArray'); // ВРУЧНУЮ ОЧИСТИТЬ ХРАНИЛИЩЕ
        let localStorageClients = JSON.parse(localStorage.getItem('clientsArray')); // получаем текущий массив клиентов (без удалённых) из хранилища
        console.log(localStorageClients);
        if (localStorageClients) { // если в хранилище что-то лежит
            clientsArray = localStorageClients; // то это наш текущий массив без удалённых клиентов
        }
        else { // если хранилище пустое
            clientsArray = result; // то кладем в массив всех клиентов с сервера
        }
        console.log(clientsArray); // выводим массив полученных клиентов
        let mCount = 0;
        let wCount = 0;
        let mBalance = 0;

        let menCount = document.querySelector('.m-count');
        let womenCount = document.querySelector('.w-count');
        let maxBalance = document.querySelector('.max-balance');
        let clientsTable = document.querySelector('.clients-table'); // получаем пустую таблицу для вставки div клиентов

        let newArray = [];

        for (let i = 0; i < clientsArray.length; i++) {
            if (clientsArray[i].balance) {
                newArray.push(clientsArray[i]);
            }
        }

        console.log(newArray);

        for (let i = 0; i < newArray.length; i++) { // пробегаемся по каждому клиенту в массиве
            let numBalance = newArray[i].balance.replace(',', '');
            let cutBalance = numBalance.replace('$', '');
            if (cutBalance > mBalance) {
                mBalance = cutBalance;
            }

            let divClient = document.createElement('div'); // создаем для клиента div
            divClient.classList.add('client');
            divClient.id = i;
            if (newArray[i].gender === 'male') {
                divClient.style.border = '1px solid blue';
            }
            else if (newArray[i].gender === 'female') {
                divClient.style.border = '1px solid red';
            }

            if (newArray[i].isActive === true) {
                divClient.style.backgroundColor = 'white';
            }
            else {
                divClient.style.backgroundColor = 'lightgray';
            }

            let divBalance = document.createElement('div'); // div для баланса
            divBalance.classList.add('client-balance');
            divBalance.innerText = 'Balance: ' + newArray[i].balance; // записываем инфу

            let divMail = document.createElement('div'); // div для почты
            divMail.classList.add('client-mail');
            divMail.innerText = 'Email: ' + newArray[i].email; // записываем инфу

            let divCompany = document.createElement('div'); // div для компании
            divCompany.classList.add('client-company');
            divCompany.innerText = 'Company: ' + newArray[i].company; // записываем инфу

            let leftInfo = document.createElement('div'); // div для инфы слева
            leftInfo.classList.add('left-info');
            leftInfo.append(divBalance); // вставляем в левый столбец
            leftInfo.append(divMail); // вставляем в левый столбец
            leftInfo.append(divCompany); // вставляем в левый столбец
            divClient.append(leftInfo); // вставляем в div клиента

            let divName = document.createElement('div'); // div для имени (инфы по центру)
            divName.classList.add('client-name');
            divName.innerText = newArray[i].name; // записываем инфу
            divClient.append(divName); // вставляем в div клиента (центральный столбец)

            let divDelete = document.createElement('div'); // div для удаления
            divDelete.classList.add('client-delete');
            if (newArray[i].isActive === true) {
                divDelete.innerHTML = `<div> Online </div><img class="delete-btn" width="25" height="25" src="./assets/images/del.png" alt="del button">`; // вставляем иконку удаления, клиент онлайн
            }
            else {
                divDelete.innerHTML = `<div> Offline </div><img class="delete-btn" width="25" height="25" src="./assets/images/del.png" alt="del button">`; // вставляем иконку удаления, клиент оффлайн
            }

            let divPhone = document.createElement('div'); // div для телефона
            divPhone.classList.add('client-phone');
            divPhone.innerText = 'Phone: ' + newArray[i].phone; // записываем инфу

            let divDate = document.createElement('div'); // div для даты
            divDate.classList.add('client-date');
            divDate.innerText = 'Registered: ' + newArray[i].registered; // записываем инфу

            let rightInfo = document.createElement('div'); // div для инфы справа
            rightInfo.classList.add('right-info');
            rightInfo.append(divDelete); // вставляем в правый столбец
            rightInfo.append(divPhone); // вставляем в правый столбец
            rightInfo.append(divDate); // вставляем в правый столбец
            divClient.append(rightInfo); // вставляем в div клиента

            clientsTable.append(divClient); // вставляем готовый div клиента в нашу таблицу

            if (newArray[i].gender === 'male') {
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
                    let numBalance = newArray[i].balance.replace(',', '');
                    console.log(numBalance);
                    let cutBalance = numBalance.replace('$', '');

                    newArray.splice(i, 1, {deleted: true}); // удаляем клиента из массива
                    console.log(newArray);
                    console.log(cutBalance);
                    console.log(mBalance);
                    if (cutBalance === mBalance) { // если удаляемый клиент имел наибольший баланс
                        window.location.href = 'clients.html';
                    }

                    mCount = 0; // обнуляем счётчик мужчин
                    wCount = 0; // женщин
                    for (let i = 0; i < newArray.length; i++) { // вновь проходимся по массиву после удаления клиента
                        if (newArray[i].gender === 'male') {
                            mCount++; // считаем мужчин
                        } else {
                            wCount++; // женщин
                        }
                    }
                    menCount.innerText = mCount; // отображаем число мужчин
                    womenCount.innerText = wCount; // женщин
                    localStorage.setItem('clientsArray', JSON.stringify(newArray)); // при каждом удалении клиента перезаписываем оставшихся в хранилище

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

                    let addNotification = () => {
                        document.body.append(notification);
                    };

                    if (document.body.childElementCount === 4) {
                        addNotification();
                    }
                    if (document.body.childElementCount === 5) {
                        document.body.lastChild.remove();
                        setTimeout(addNotification, 100);
                    }
                }
            });
        }

        menCount.innerText = mCount;
        womenCount.innerText = wCount;
        maxBalance.innerText = 'Max balance: $' + mBalance;

        let addAllClients = document.querySelector('.add-all-button');
        addAllClients.addEventListener('click', () => { // если нажата кнопка добавить всех клиентов с сервера
            localStorage.removeItem('clientsArray'); // очищаем хранилище
            window.location.href = 'clients.html'; // перезагружаем страницу для отображения всех клиентов
        });
    }
);

let footer = document.querySelector('.footer');
footer.style.cssText = `
    position: static;
`;

let headerContent = document.querySelector('.header-content');
headerContent.style.cssText = `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

let headerLogo = document.querySelector('.header-logo');
headerLogo.style.cssText = `
    margin-right: 10px;
`;

let headerSign = document.querySelector('.header-sign');
headerSign.style.cssText = `
    visibility: hidden;
`;

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