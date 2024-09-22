const axios = require("axios");

exports.makeAxiosCall = async (Method, URL, Data) => {
    try {
        const response = await axios({
            url: URL,
            method: Method,
            data: Data,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        return error;
    }
}