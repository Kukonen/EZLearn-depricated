type methodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

const fetchResponseStatus = (response: Response) => {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return Promise.resolve(response);
}

const fetchJson = (response: Response) => {
    return Promise.resolve(response.json());
}

const fetchResponseResultStatus = (json: any) => {
    if (json.status !== 'ok') {
        return Promise.reject('Произошла ошибка на стороне сервера. Попробуйсте повторить запрос позже');
    }

    const {status, _, ...objects} = json;

    return Promise.resolve(objects);
}

export const request = async (
    URL: string,
    method: methodType = 'GET',
    body?: Object | string
) => {
    let formatterURL: string = `http://localhost:3030/api/`;
    formatterURL += URL[0] === '/' ? URL.substring(1) : URL;

    let init:RequestInit = {};

    init.method = method;

    init.headers = {
        'Content-Type': 'application/json;charset=utf-8'
    };

    let bodyFormatter: string = '';

    if(body) {
        if (typeof body === 'string') {
            bodyFormatter = body;
        } else {
            bodyFormatter = JSON.stringify(body);
        }

        init.body = bodyFormatter;
    }

    return fetch(formatterURL, init)
        .then(fetchResponseStatus)
        .then(fetchJson)
        .then(fetchResponseResultStatus)
        .catch(error => {
            console.log("ERROR! ", error);
            return error;
        });
}