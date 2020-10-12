import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = React.createContext(null);

export default ({children}) => {
    const [token, setToken] = useState('');
    const [me, setMe] = useState('');
    const [points_earned, setPointEarned] = useState();
    const [remaining_point, setRemainingPoint] = useState();

    useEffect(() => {
        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);

        const emailLogin = urlParams.get('email')

        axios.post(`https://camon.twgroup.vn/api/v1/auth/user?email=${emailLogin}`)
        .then((res) =>{
            setToken(res.data.data.token);
            setMe(res.data.data.user.id);
            setPointEarned(res.data.data.user.points_earned);
            setRemainingPoint(res.data.data.user.remaining_point);
        })
    },[])

    const store = {
        token,
        me,
        points_earned,
        remaining_point
    }

    return (
        <StoreContext.Provider value={store}>
            {token ? children : null}
        </StoreContext.Provider>
    )
}
