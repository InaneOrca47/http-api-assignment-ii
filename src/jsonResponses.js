const users = {};

const constructJSON = (content) => {
    return JSON.stringify(content);
}

const respondJSON = (request, response, status, content = "") => {
    response.writeHead(status, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content, 'utf8'),
    });

    if (request.method !== 'HEAD' || status !== 204) {
        response.write(content);
    }

    response.end();
};

const getUsers = (request, response) => {
    const responseJSON = users;

    const content = constructJSON(responseJSON);

    respondJSON(request, response, 200, content);
};

const addUser = (request, response) => {
    const responseJson = {
        message: 'Name and age are both required',
    }

    const { name, age } = request.body;

    if (!name || !age) {
        responseJson.id = 'addUserMissingParams';
        const content = constructJSON(responseJson);
        return respondJSON(request, response, 400, content);
    }

    let responseCode = 204;
    if (!users[name]) {
        responseCode = 201;
        users[name] = {
            name: name,
        };
    }

    users[name].age = age;

    if (responseCode === 201) {
        responseJson.message = 'Created Successfully';
        const content = constructJSON(responseJson);
        return respondJSON(request, response, responseCode, content)
    }

    return respondJSON(request, response, responseCode);
};

const notReal = (request, response) => {
    const responseJson = {
        message: 'The page you were looking for was not found',
        id: 'notFound'
    };

    const content = constructJSON(responseJson);

    respondJSON(request, response, 404, content);
}

module.exports = {
    getUsers,
    addUser,
    notReal,
};