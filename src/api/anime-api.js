import api from "./api";

export const seasonNow = () => api.get('/seasons/now')

export const seasonUpcoming = () => api.get('/seasons/upcoming')

export const animeFullById = (id) => api.get(`/anime/${id}/full`)

export const animeCharactersById = (id) => api.get(`/anime/${id}/characters`)

export const topAnime = () => api.get('/top/anime')