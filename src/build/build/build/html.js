
let mainPageStructure = `<!DOCTYPE html>
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
            <a class="sign-link">
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
</html>`;

export {mainPageStructure};