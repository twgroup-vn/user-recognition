import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const StoreContext = React.createContext(null);
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const emailLogin = urlParams.get('email') || sessionStorage.getItem('email');

export default ({children}) => {
    const [token, setToken] = useState('');
    const [me, setMe] = useState(null);
    const [points_earned, setPointEarned] = useState();
    const [remaining_point, setRemainingPoint] = useState();

    useEffect(() => {
        axios.post(`https://camon.twgroup.vn/api/v1/auth/user?email=${emailLogin}`)
        .then((res) =>{
            setToken(res.data.data.token);
            setMe(res.data.data.user.id);
            setPointEarned(res.data.data.user.points_earned);
            setRemainingPoint(res.data.data.user.remaining_point);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[emailLogin])

    const store = {
        token,
        me,
        points_earned,
        remaining_point,
        setRemainingPoint
    }

    return (
        <StoreContext.Provider value={store}>
            { ( token && me ) ? children : null}
        </StoreContext.Provider>
    )
}
