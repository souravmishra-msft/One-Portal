import { useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { loginRequest, graphConfig } from '../AuthConfig';
import { callMSGraph } from '../GraphData';

const Profile = () => {
    const [userProfile, setUserProfile] = useState();

    const { instance, accounts } = useMsal();

    useEffect(() => {
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => callMSGraph(graphConfig.graphMeEndpoint, response.accessToken)).then(response => setUserProfile(response));
    }, [instance]);

    console.log(userProfile);
    return (
        <>
            <div>{userProfile.displayName}</div>
            <div>{`${userProfile.displayName} ${userProfile.surname}`}</div>
            <div>{userProfile.jobTitle}</div>
            <div>{userProfile.userPrincipalName}</div>
        </>
    )
}

export default Profile