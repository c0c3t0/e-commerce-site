const host = 'https://dummyjson.com/products/';

async function requester(method, url, data) {
    const option = {
        method,
        headers: {}
    }

    if (data) {
        option.headers["Content-type"] = "application/json";
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, option);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }
        if(response.status === 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

const get = requester.bind(null, 'get');

export {
    get,
}
