const URL = '34.213.11.120/organizations/1/users'

export default () => {
    return fetch (URL) 
        .then(response => Promise.all([response, response.json()]))
}
