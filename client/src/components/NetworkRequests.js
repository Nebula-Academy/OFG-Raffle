export const getTable = async (table) => {
    const holdResponse = await fetch (`http://localhost:3030/${table}`);
    return holdResponse.json();
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

export const getMember = async (data) => {
    const holdResponse = await fetch(`http://localhost:3030/get-member`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return holdResponse;
}