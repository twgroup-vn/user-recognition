import moment from 'moment';

export const getAgoTime = (serTime) => {
    const time = moment(serTime);

    if (Math.abs(moment().diff(time)) < 1000) {
        return 'just now';
    }

    return time.fromNow();
}