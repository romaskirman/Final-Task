/* LOGIN PAGE */

const switchRegLink = document.querySelector('.switch-link');
const inputBlock = document.getElementById('input-block');
const confirmBlock = document.createElement('div');
const descriptionQuestion = document.querySelector('.description-question');
const signBtn = document.querySelector('.sign-btn');
const mainLoginText = document.querySelector('.main-login-text');

//const passwordField = document.getElementById('password-field');


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

const DATA_LINK = 'https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json';

async function getClient(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    return respData;
}

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
    getClient(DATA_LINK).then(
        result => {
            result.push(userData);
            console.log(result);
            //greetingText.innerText = result[result.length - 1].email;
            //window.location.href = 'index.html';
        }
    );

}

regForm.addEventListener('submit', handleSubmit);



