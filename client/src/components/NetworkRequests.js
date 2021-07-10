const endPoint = 'http://localhost:3030/api'
export const getTable = async (table) => {
    const holdResponse = await fetch (`${endPoint}/${table}`);
    return holdResponse.json();
}

export const getTableById = async (table, id) => {
    const holdResponse = await fetch(`${endPoint}/${table}/${id}`)
    return ( await holdResponse.json() )[0];
}

export const addTable = async (table, data) => {
    const holdResponse = await fetch(`${endPoint}/${table}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return holdResponse
}

export const updateTable = async (table, id, data) => {
    const holdResponse = await fetch(`${endPoint}/${table}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return holdResponse;
}

export const deleteTableById = async (table, id) => {
    const holdResponse = await fetch(`${endPoint}/${table}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return holdResponse
}


