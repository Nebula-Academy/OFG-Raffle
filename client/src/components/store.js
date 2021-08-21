export const data = {};
export const subscriptions = {}
export const set = (key, value) => {
    if(!data[key])data[key] = {}
    Object.assign(data[key], value);
    for(let i = 0; i < subscriptions[key]?.length; i++) subscriptions[key][i]?.();
}
export const get = (key) => data[key];
export const subscribe = (key, handler) => subscriptions[key] = (subscriptions[key] || []).concat(handler);
export const unsubscribe = (key, handler) =>{
    let index = subscriptions[key].indexOf(handler);
    if(index === -1)return
    subscriptions[key].splice(index, 1);
}