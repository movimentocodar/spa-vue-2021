const LocalJsonApi = './Items.json'

const basicFetch = async () => {
    const req = await fetch (`${LocalJsonApi}`)
    
    const json = await req.json();
    json.then(console.log(json), '')
    return json
}

export default {
    busca: async () => {
        return await basicFetch()
    }
}