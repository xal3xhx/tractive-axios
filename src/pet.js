const axios = require('axios');
const TractiveClient = "625e533dc3c3b41c28a669f0";

async function getPet(petID) {
    if (!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/trackable_object/${petID}` };
    try {
        const res = await axios(options);
        let parsedData = res.data;
        parsedData.details.profile_picture_link = `https://graph.tractive.com/4/media/resource/${parsedData.details.profile_picture_id}.jpg`;
        parsedData.details.cover_picture_link = `https://graph.tractive.com/4/media/resource/${parsedData.details.cover_picture_id}.jpg`;
        return parsedData;
    } catch (error) {
        console.error(error.message);
    }
}

async function getPets() {
    if (!isAuthenticated()) return console.log('Not authenticated.');
    let options = { ...gloOpts, url: gloOpts.url + `/4/user/${accountDetails.uid}/trackable_objects` };
    try {
        const res = await axios(options);
        return res.data;
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    getPet: getPet,
    getPets: getPets
}