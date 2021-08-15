import { getTokenFromStorage } from './utils';
import bcrypt from 'bcryptjs';
const endPoint = `https://ofg-raffle-test.herokuapp.com/api`;
// const endPoint = `https://ofg-raffle.herokuapp.com/api`;
// const endPoint = `http://localhost:3030/api`;
// const endPoint = `https://main.d39h9sudxy5itw.amplifyapp.com/api`;

export const getTable = async (table) => {
    const holdResponse = await fetch (`${endPoint}/${table}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const res = await holdResponse.json();
    console.log(res, "<--- table")
    return res;
}

export const getTableById = async (table, id) => {
    const holdResponse = await fetch(`${endPoint}/${table}/${id}`)
    return ( await holdResponse.json() )[0];
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

    return response.json()



}

export const generateIdempotency = async (user) => (await bcrypt.hash(`${new Date().toString().slice(8, 24)}${user?.email}`,11)).slice(0,44)

