const axios = require('axios');
const TractiveClient = "625e533dc3c3b41c28a669f0";

async function getAccountInfo() {
    if (!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/user/${accountDetails.uid}` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        await logError(error);
    }
}

async function getAccountSubscriptions() {
    if (!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/user/${accountDetails.uid}/subscriptions` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        await logError(error);
    }
}

async function getAccountSubscription(subscriptionID) {
    if (!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/subscription/${subscriptionID}` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        await logError(error);
    }
}

async function getAccountShares() {
    if (!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/user/${accountDetails.uid}/shares` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        await logError(error);
    }
}

module.exports = {
    getAccountInfo: getAccountInfo,
    getAccountSubscriptions: getAccountSubscriptions,
    getAccountSubscription: getAccountSubscription,
    getAccountShares: getAccountShares
}