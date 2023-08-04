import * as api from "./api.js";

const endpoints = {
    'first': 'category/womens-dresses',
    'getById': '',
    'getByCategory': 'category/',
}


export async function getFirstCategory(){
    const result = await api.get(endpoints.first);
    return result;
}

export async function getById(id){
    const result = await api.get(endpoints.getById + id);
    return result;
}

export async function getByCategory(slug){
    const result = await api.get(endpoints.getByCategory + slug);
    return result;
}