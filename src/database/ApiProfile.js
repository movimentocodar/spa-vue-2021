const API_BASE = 'https://api.github.com'

const basicFetch = async (endpoint) => {
    const req = await fetch (`${API_BASE}${endpoint}`)
    const json = await req.json();
    return json
}

export default {
    getUser: async (username) => {
        return await basicFetch(`/users/${username}`)
    }
}