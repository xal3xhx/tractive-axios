const axios = require('axios');
const TractiveClient = "625e533dc3c3b41c28a669f0";

async function getAllTrackers() {
    if (!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/user/${accountDetails.uid}/trackers` };
    try {
        const res = await axios(options);
        console.log(res.data);
    } catch (error) {
        await logError(error);
    }
}

async function getTracker(trackerID) {
    if (!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/tracker/${trackerID}` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        await logError(error);
    }
}

async function getTrackerHistory(trackerID, from, to) {
    if (!isAuthenticated()) return console.log('Not authenticated.');
    let calcFrom = typeof from == "object" ? (from.getTime() / 1000).toFixed(0) : from;
    let calcTo = typeof to == "object" ? (to.getTime() / 1000).toFixed(0) : to;
    let options = { ...gloOpts, url: gloOpts.url + `/4/tracker/${encodeURIComponent(trackerID)}/positions?time_from=${encodeURIComponent(calcFrom)}&time_to=${encodeURIComponent(calcTo)}&format=json_segments` };
    try {
        const res = await axios(options);
        return res.data[0];
    } catch (error) {
        await logError(error);
    }
}

async function getTrackerLocation(trackerID) {
    if (!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/device_pos_report/${trackerID}` };
    try {
        const res = await axios(options);
        let data = res.data;
        options = { ...gloOpts, url: gloOpts.url + `/4/platform/geo/address/location?latitude=${encodeURIComponent(data.latlong[0])}&longitude=${encodeURIComponent(data.latlong[1])}` };
        try {
            const res2 = await axios(options);
            let address = res2.data;
            data.address = address;
            return data;
        } catch (error) {
            await logError(error);
            return data;
        }
    } catch (error) {
        await logError(error);
    }
}

async function getTrackerHardware(trackerID) {
    if (!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/device_hw_report/${trackerID}` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        await logError(error);
    }
}

module.exports = {
    getAllTrackers: getAllTrackers,
    getTracker: getTracker,
    getTrackerHistory: getTrackerHistory,
    getTrackerLocation: getTrackerLocation,
    getTrackerHardware: getTrackerHardware
}