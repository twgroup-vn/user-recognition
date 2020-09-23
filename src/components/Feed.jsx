import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import FeedCard from './FeedCard';

const homeFeed = [
    {
        _id: 0,
        badges: ["creativity"],
        carrotsEach: 10,
        createdAt: "2020-09-22T08:17:19.646Z",
        message: 'Hello mọi người',
        type: 'recognition',
        from: {
            profile: {
                firstName: 'Vo Xuan',
                lastName: 'Bach',
                username: 'xuanbach'
            },
            _id: "5f616ea5e53380557cea92a8"
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
                    isDeleted: false,
                    _id: "5f60a577937a424a11ee2b36"
                }
            ]
        },
        taggedUsers: []
    },
    {
        _id: 1,
        badges: ["closer"],
        carrotsEach: 20,
        createdAt: "2020-09-23T08:00:00.646Z",
        message: 'Hello World',
        type: 'recognition',
        from: {
            profile: {
                firstName: 'Trịnh Xuân',
                lastName: 'Quyền',
                username: 'Xuan Quyen'
            },
            _id: "5f616ea5e53380557cea92b1"
        },
        to: {
            nickname: "",
            users: [
                {
                    profile: {
                        firstName: 'Huỳnh Ngọc',
                        lastName: 'Nga',
                        username: 'Huỳnh Ngọc Nga'
                    },
                    isDeleted: false,
                    _id: "5f60a577937a424a11ee2b21"
                }
            ]
        },
        taggedUsers: []
    },
    {
        _id: 2,
        badges: ["teamwork"],
        carrotsEach: 50,
        createdAt: "2020-09-20T08:00:00.646Z",
        message: 'Good morning',
        type: 'recognition',
        from: {
            profile: {
                firstName: 'Nguyễn Minh',
                lastName: 'Tân',
                username: 'Minh Tân'
            },
            _id: "5f616ea5e53380557cea93c2"
        },
        to: {
            nickname: "",
            users: [
                {
                    profile: {
                        firstName: 'La Văn',
                        lastName: 'Linh',
                        username: 'Linh La'
                    },
                    isDeleted: false,
                    _id: "5f60a577937a424a11ee3cb5"
                }
            ]
        },
        taggedUsers: []
    },
    {
        _id: 3,
        badges: ["closer"],
        carrotsEach: 30,
        createdAt: "2020-09-23T08:00:00.646Z",
        message: 'Hello World',
        type: 'recognition',
        from: {
            profile: {
                firstName: 'Quoc Huy',
                lastName: 'Truong',
                username: 'Quoc Huy'
            },
            _id: "5f616ea5e53380557cea35d2"
        },
        to: {
            nickname: "",
            users: [
                {
                    profile: {
                        firstName: 'Luan Hoang',
                        lastName: 'Nguyen',
                        username: 'Phong Nguyễn'
                    },
                    isDeleted: false,
                    _id: "5f60a577937a424a11ee4xy3"
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