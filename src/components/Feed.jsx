import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import FeedCard from './FeedCard';

const homeFeed = [
    {
        _id: 0,
        badges: ["creativity"],
        carrotsEach: 10,
        createdAt: "2020-09-22T08:17:19.646Z",
        message: 'Đưa anh lên board',
        type: 'recognition',
        from: {
            profile: {
                firstName: 'Vo Xuan',
                lastName: 'Bach',
                username: 'xuanbach'
            }
        },
        to: {
            nickname: "",
            users: [
                {
                    profile: {
                        firstName: 'Lại Văn Anh',
                        lastName: 'Thức',
                        username: 'lại văn anhthức'
                    },
                    isDeleted: false
                }
            ]
        },
        taggedUsers: []
    }
]

function Feed() {
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
                    <FeedCard key={feed._id} card={feed} />
                ))
            }
        </div>
    )
}

export default Feed;