const axios = require('axios');
const TractiveClient = "625e533dc3c3b41c28a669f0";
const tAccount = require('./src/account');
const tPet = require('./src/pet');
const tTracker = require('./src/tracker');
const tCommands = require('./src/commands');
accountDetails = {
    email: "",
    password: ""
}
gloOpts = {
    method: "GET",
    url: "https://graph.tractive.com",
    headers: {
        "X-Tractive-Client": TractiveClient,
        "Authorization": `Bearer ${accountDetails.token}`,
        "content-type": "application/json"
    }
};

isAuthenticated = function () {
    if (accountDetails?.token) return true;
    return false;
}

async function authenticate() {
    return new Promise(async function (resolve, reject) {
        const options = {
            method: 'POST',
            url: `https://graph.tractive.com/4/auth/token?grant_type=tractive&platform_email=${encodeURIComponent(accountDetails.email)}&platform_token=${encodeURIComponent(accountDetails.password)}`,
            headers: {
                'X-Tractive-Client': TractiveClient,
                'Content-Type': "application/json"
            }
        };

        try {
            const res = await axios(options);
            accountDetails.token = res.data.access_token;
            accountDetails.uid = res.data.user_id;
            gloOpts = {
                method: "GET",
                url: "https://graph.tractive.com",
                headers: {
                    "X-Tractive-Client": TractiveClient,
                    "Authorization": `Bearer ${accountDetails.token}`,
                    "content-type": "application/json"
                }
            };
            resolve(true);
        } catch (error) {
            resolve(false);
        }
    });
}

async function connect(email, password) {
    accountDetails.email = email;
    accountDetails.password = password;
    await authenticate();
    return isAuthenticated() ? true : false;
}

async function getTrackerGeofences(trackerID) {
    if (!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/tracker/${trackerID}/geofences` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

async function getGeofence(fenceID) {
    if (!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/geofence/${fenceID}` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    connect: connect,
    isAuthenticated: isAuthenticated,
    getAccountInfo: tAccount.getAccountInfo,
    getAccountSubscriptions: tAccount.getAccountSubscriptions,
    getAccountSubscription: tAccount.getAccountSubscription,
    getAccountShares: tAccount.getAccountShares,
    getPets: tPet.getPets,
    getPet: tPet.getPet,
    getAllTrackers: tTracker.getAllTrackers,
    getTracker: tTracker.getTracker,
    getTrackerHistory: tTracker.getTrackerHistory,
    getTrackerLocation: tTracker.getTrackerLocation,
    getTrackerHardware: tTracker.getTrackerHardware,
    liveOn: tCommands.liveOn,
    liveOff: tCommands.liveOff,
    LEDOn: tCommands.LEDOn,
    LEDOff: tCommands.LEDOff,
    buzzerOn: tCommands.BuzzerOn,
    buzzerOff: tCommands.BuzzerOff
}
