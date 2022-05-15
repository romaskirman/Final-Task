const DATA_LINK = 'https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json';

async function getClient(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
}

getClient(DATA_LINK);

console.log(DATA_LINK);