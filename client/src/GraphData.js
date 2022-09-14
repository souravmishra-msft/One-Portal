import axios from 'axios';

export const callMSGraph = async (endpoint, accessToken) => {
    console.log(endpoint);
    console.log(accessToken);

    const bearer = `Bearer ${accessToken}`;
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    };

    console.log(headers);
    const response = await axios.get(endpoint, { headers: headers });

    console.log(response);
    return response.data;
}