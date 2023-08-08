import * as api from "./api.js";

const endpoints = {
    'first': 'category/womens-dresses',
    'getByCategory': 'category/',
}

export async function getFirstCategory(){
    const result = await api.get(endpoints.first);
    return result;
}

export async function getByCategory(slug){
    const result = await api.get(endpoints.getByCategory + slug);
    return result;
}