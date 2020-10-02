import React, { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
import FeedCard from './FeedCard';
import axios from 'axios';

function Feed() {
    const [homeFeed, setHomeFeed] = useState([]);
    useEffect(() => {
        // Update the document title using the browser API
        axios('https://camon.twgroup.vn/api/v1/feed', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'eyJhbGciOiJSUzI1NiJ9.eyJpZCI6IjE0NWRjNGI3LWQyODEtNDIzNi1hZjYwLWM2MmI3NDk3YmVjYSIsImVtYWlsIjoicGhhdGx0QHR3Z3JvdXAudm4ifQ.Ft8bNFXhOSbFneB_A4_zqzM3QMpzOEpHUo-OuAOJAC-nDqb3M1S0mGtqcMhadbdP8LP0fws9ecK3FNgvazKf1btp6Ojg5hCxORy2Wc8LAohb_cl4T3_DKy44XvYkVKM8zX61WLud2yUcTrpe46cbX80n6ItahSNvvQNtR0j_x-BzeaSr0MX13hrftKqGdFZGG6NKOS9THEHzNLXhkcG3m4vxXv3rNPyeDMQIimw3EF2FNjBNhZJff2Dj0_QtullEm26hf4NrS5ZjZBPJJo6SgSH7-M4hrOtPTAhLB0_QsBJm6W4Oq9OYd-cxe470WpeSz1TIPuVLJV9TEKW95lcDK-SXBH781xwxvr3WLpbK7qe-RdGnEOl1ymnoJAH7TpIWCAsiVUOmob3xjUDrvuylLACQ43k5sfh4au9vch9-AIR74US0uIdJZGfnPeUGc4QMz8rrlztnRhdvLBwErWkqg-lebjICvWg-5GQm6FPmpalNxTBB1QX20B-3Hg1hr8LqiptVWhn6156DSRwxjLCgyaQrsq707fseYZbKDRi35VVus9dMhCTVlQ11SH2TLOpd8n1EeHsL3ESObtdXzNFrVKgKAVnQawWnYM1ZEim4yzaVBbHgKqB2QKCupdj-U6pMH0oVA8t1se0RuRMageF4_TRlAnOC1Oq2z0Lhmv_VAlI'
            }
        }).then((res) => {
            setHomeFeed(res.data.data)
        })
    }, []);

    return (
        <div>
            {/* <InfiniteScroll
                dataLength={homeFeed.length + Math.random()}
                next={newPostOnNext}
                hasMore={!isEndOfFeed}
                style={{
                    paddingBottom: homeFeed.length > 0 ? 100 : 0,
                    overflow: 'unset'
                }}
                loader={!isEndOfFeed && !isHomeFeedEmpty && renderLoadingPulse()}
                endMessage={
                    isEndOfFeed && !isHomeFeedEmpty && renderEndMessage()
                }
            >
                
            </InfiniteScroll> */}
            {
                homeFeed.map((feed) => (
                    <FeedCard key={feed.id} card={feed} />
                ))
            }
        </div>
    )
}

export default Feed;