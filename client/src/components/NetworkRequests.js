export const getTable = async (table, jwt) => {
    const holdResponse = await fetch (`http://localhost:3030/${table}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authentication': jwt
        }
    });
    const res = holdResponse.json();
    console.log(res, "<--- table")
    return res;
}

export const getTableById = async (table, id) => {
    const holdResponse = await fetch(`http://localhost:3030/${table}/${id}`)
    return ( await holdResponse.json() )[0];
}

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
    console.log(data)
    const holdResponse = await fetch(`http://localhost:3030/${table}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return holdResponse;
}

export const createMember = async (data) => {
    const holdResponse = await fetch(`http://localhost:3030/create-member`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return holdResponse;
}

export const getMember = async (username) => {
    const holdResponse = await fetch(`http://localhost:3030/get-member/${username}`);
    return holdResponse.json();
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


