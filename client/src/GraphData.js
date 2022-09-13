import axios from 'axios';

export const callMSGraph = async (endpoint, accessToken) => {
    console.log(endpoint);
    console.log(accessToken);

    const bearer = `Bearer ${accessToken}`;
    const headers = {
        "Authorization": bearer,
        "Content-Type": 'application/json'
    }

    console.log(headers);
    const response = await axios.get(endpoint, null, {
        headers: headers
    });

    console.log(response);
}