import React, { useEffect, useState } from 'react';
import FeedCard from './FeedCard';
import axios from 'axios';
import { StoreContext } from '../store/StoreContext';

function Feed() {
    const [homeFeed, setHomeFeed] = useState([]);
    const { token, me } = React.useContext(StoreContext);
    useEffect(() => {
        axios('https://camon.twgroup.vn/api/v1/feed', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': token
            }
        }).then((res) => {
            const data = res.data.data.map(card => ({
                ...card,
                liked: card.likes.some((user) => user.id === me)
            }))
            setHomeFeed(data)
        })
    }, [me, token]);

    return (
        <div>
            {
                homeFeed.map((feed) => (
                    <FeedCard key={feed.id} card={feed} />
                ))
            }
        </div>
    )
}

export default Feed;