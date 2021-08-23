import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/users/profile")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // getItems() {
  //   return service
  //     .get("/api/items")
  //     .then((res) => res.data)
  //     .catch(errorHandler);
  // },

  getOneCard(id) {
    return service 
      .get("/api/cards/" + id)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  getItems() {
    return axios
      .get("https://api.pokemontcg.io/v2/cards?api_key=528e1aa6-a294-4981-ada2-1a04038be6ac")
      .then((res) => res.data.data)
      .catch(errorHandler);
  },

  getOneCardFromApi(id) {
    return axios 
    .get(`https://api.pokemontcg.io/v2/cards/${id}?api_key=528e1aa6-a294-4981-ada2-1a04038be6ac`)
    .then(res => res.data)
    .catch(errorHandler)
  },

  getAllCards() {
    return service 
    .get("/api/me/cards")
    .then(res => res.data)
    .catch(errorHandler)
  },

  addCard(card) {
    return service
    .post("/api/me/cards/add/", card)
    .then(res => res.data)
    .catch(errorHandler)
  },

  findUserCollection(type) {
    return service 
    .get(`/api/me/collection/${type}`)
    .then(res => res.data)
    .catch(errorHandler)
  },

  addCardToCollection(type, updatedCardList) {
    return service
    .patch(`/api/me/collection/${type}`, updatedCardList)
    .then(res => res.data)
    .catch(errorHandler)
  },

  getOneUserCard(apiId) {
    return service
    .get("/api/me/cards/all/" + apiId)
    .then(res => res.data)
    .catch(errorHandler)
  }
};

export default apiHandler;
