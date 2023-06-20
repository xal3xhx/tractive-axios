const axios = require('axios');
const TractiveClient = "625e533dc3c3b41c28a669f0";

async function liveOn(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/tracker/${trackerID}/command/live_tracking/on` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        console.error(error.message);
    }
}

async function liveOff(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/tracker/${trackerID}/command/live_tracking/off` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        console.error(error.message);
    }
}

async function LEDOn(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/tracker/${trackerID}/command/led_control/on` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        console.error(error.message);
    }
}

async function LEDOff(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/tracker/${trackerID}/command/led_control/off` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        console.error(error.message);
    }
}

async function BuzzerOn(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/tracker/${trackerID}/command/buzzer_control/on` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        console.error(error.message);
    }
}

async function BuzzerOff(trackerID) {
    if(!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/tracker/${trackerID}/command/buzzer_control/off` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    liveOn: liveOn,
    liveOff: liveOff,
    LEDOn: LEDOn,
    LEDOff: LEDOff,
    BuzzerOn: BuzzerOn,
    BuzzerOff: BuzzerOff
}
