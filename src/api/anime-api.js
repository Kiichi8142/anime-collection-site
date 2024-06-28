import api from "./api";

export const seasonNow = () => api.get('/seasons/now')

export const seasonUpcoming = () => api.get('/seasons/upcoming')

export const animeSeason = (year, season, page) => api.get(`/seasons/${year}/${season}`, { params: { page: page || 1, sfw: true, filter: "tv", unapproved: false, continuing: false } })

export const animeFullById = (id) => api.get(`/anime/${id}/full`)

export const animeCharactersById = (id) => api.get(`/anime/${id}/characters`)

export const topAnime = () => api.get('/top/anime')

export const animeSearch = (searchString, type) => api.get('/anime', { params: { q: searchString, sfw: true, type: type } })

export const animeRecentRecommendation = () => api.get('/recommendations/anime')