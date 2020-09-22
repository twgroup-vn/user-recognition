export const getter = (keys, hash) => {
    keys.reduce((newHash, key) => ((newHash && newHash[key]) ? newHash[key] : null), hash);
}