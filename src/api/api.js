import axios from "axios";
import rateLimit from "axios-rate-limit";

const api = rateLimit(axios.create({ baseURL: "https://api.jikan.moe/v4" }), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

export default api;