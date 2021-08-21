import { getTokenFromStorage } from './utils';
import bcrypt from 'bcryptjs';
import * as store from './store';
// const endPoint = `https://ofg-auction-test.herokuapp.com/api`;
// const endPoint = `https://ofg-raffle.herokuapp.com/api`;
const endPoint = `http://localhost:3030/api`;
// const endPoint = `https://main.d39h9sudxy5itw.amplifyapp.com/api`;

export const getTable = async (table) => {
    const val = store.get(`get ${table}`);
    if(val) return val;
    const holdResponse = await fetch (`${endPoint}/${table}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const response = (await holdResponse.json()).map(data => {
        const existingData = store.get(table) || {};
        if(existingData[data[`${table}_id`]]) return existingData[data[`${table}_id`]];
        Object.assign(existingData, {[data[`${table}_id`]]:data})
        store.set(table, existingData);
        return data;
    });
    console.log(store.data, response);
    store.set(`sql: ${table}`, response);
    return response;
}

export const getTableById = async (table, id) => {
    const val = store.get(table) || {};
    if(val[id]) return val[id];
    const holdResponse = await fetch(`${endPoint}/${table}/${id}`);
    const data = (await holdResponse.json())[0];
    store.set(table,{...val,id: data});
    return data;
}

export const addTable = async (table, data) => {
    const holdResponse = await fetch(`${endPoint}/${table}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authentication':  getTokenFromStorage()
        },
        body: JSON.stringify(data)
    });
    return holdResponse
}

export const updateTable = async (table, id, data) => {
    const holdResponse = await fetch(`${endPoint}/${table}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authentication':  getTokenFromStorage()
        },
        body: JSON.stringify(data)
    })
    return holdResponse;
}

export const createMember = async (data) => {
    const holdResponse = await fetch(`${endPoint}/create-member`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return holdResponse;
}

export const getMember = async (username) => {
    const holdResponse = await fetch(`${endPoint}/get-member/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authentication':  getTokenFromStorage()
        }
    });
    return holdResponse.json();
}

export const deleteTableById = async (table, id) => {
    const holdResponse = await fetch(`${endPoint}/${table}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authentication':  getTokenFromStorage()
        }
    })
    return holdResponse
}

//Square API Connections

export const squareConnection = async (method = 'POST', route = '/', body) => {
    const headers = {
        'Content-Type':'application/json',
        'Square-Version': '2021-07-21',
        'Access-Control-Allow-Origin':'*'
    }
    const response = await fetch(`${endPoint}/square${route}`,{
        method,
        headers,
        body: JSON.stringify(body)
    })
    try{
        return response.json();
    } catch(error){ console.warn(error); }
}

export const generateIdempotency = async (user) => (await bcrypt.hash(`${new Date().toString().slice(8, 24)}${user?.email}`,11)).slice(0,44)

