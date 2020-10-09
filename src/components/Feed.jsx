import React, { useEffect, useState } from 'react';
import FeedCard from './FeedCard';
import axios from 'axios';

const token = sessionStorage.getItem('token');

function Feed() {
    const [homeFeed, setHomeFeed] = useState([]);
    useEffect(() => {
        axios('https://camon.twgroup.vn/api/v1/feed', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': token
            }
        }).then((res) => {
            setHomeFeed(res.data.data)
        })
    }, []);

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