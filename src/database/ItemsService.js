const API_BASE = './Items.json'

const basicFetch = async () => {
    const req = await fetch (`${API_BASE}`)
    
    const json = await req.json();
    json.then(console.log(json), '')
    return json
}

export default {
    busca: async () => {
        return await basicFetch()
    }
}