import React from "react";

export const data = {};
export const subscriptions = {}
export const set = (key, value) => {
    // if(!data[key]){
    //     if(Array.isArray(value)) data[key] = [];
    //     else if(typeof value === 'function') data[key] = ()=>{};
    //     else if(typeof value === 'string') data[key] = '';
    //     else if(typeof value === 'number') data[key] = 0;
    //     else if(value instanceof React.Component) data[key] = new React.Component();
    //     else data[key] = Object.create(value);
    // }
    // Object.assign(data[key], value);
    data[key] = value;
    for(let i = 0; i < subscriptions[key]?.length; i++) subscriptions[key][i]?.(value);
}
export const get = (key) => data[key];
export const subscribe = (key, handler) => subscriptions[key] = (subscriptions[key] || []).concat(handler);
export const unsubscribe = (key, handler) =>{
    let index = subscriptions[key].indexOf(handler);
    if(index === -1)return
    subscriptions[key].splice(index, 1);
}