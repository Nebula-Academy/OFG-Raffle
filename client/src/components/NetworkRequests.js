export const getTable = async (table) => {
    const holdResponse = await fetch (`http://localhost:3030/${table}`);
    return holdResponse.json();
}

export const getTableById = async (table, id) => {
    const holdResponse = await fetch(`http://localhost:3030/${table}/${id}`)
    return ( await holdResponse.json() )[0];
}
//add new entry to table with data
export const addTable = async (table, data) => {
    const holdResponse = await fetch(`http://localhost:3030/${table}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return holdResponse
}

export const updateTable = async (table, id, data) => {
    const holdResponse = await fetch(`http://localhost:3030/${table}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return holdResponse;
}

export const deleteTableById = async (table, id) => {
    const holdResponse = await fetch(`http://localhost:3030/${table}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return holdResponse
}

//Square API Connections

export const squareConnection = async (method = 'POST', route = '/', body) => {
    const headers = {
        'Content-Type':'application/json',
        'Square-Version': '2021-03-17',
        'Access-Control-Allow-Origin':'*'
    }
    const response = await fetch(`http://localhost:3030/api/square${route}`,{
        method,
        headers,
        body: JSON.stringify(body)
    })

}

squareConnection('POST', '/customers')