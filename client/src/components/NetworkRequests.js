import { getTokenFromStorage } from './utils';
const endPoint = `${endPoint}/api/`

export const getTable = async (table) => {
    const holdResponse = await fetch (`${endPoint}/${table}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authentication':  getTokenFromStorage()
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
            'Authentication':  getTokenFromStorage()
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


