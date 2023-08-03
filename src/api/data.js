import * as api from "./api.js";

const endpoints = {
    'catalog': 'products',
    'getById': 'products/',
}


export async function getAllItems(){
    const result = await api.get(endpoints.catalog);
    return result;
}

export async function getById(id){
    const result = await api.get(endpoints.getById + id);
    return result;
}
