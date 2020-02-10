import axios from "../../axios/index.js"
export default {
    getAll(filters) {
        //filters=?paginate=5&sortAsc=id
        return axios.get(`follow-up${filters}`)
    },

    view(id) {
        return axios.get(`follow-up/${id}`)
    },

    create(data) {
        return axios.post(`follow-up`, data)
    },

    update(id, data) {
        return axios.put(`follow-up/${id}`, data)
    },

    delete(id) {
        return axios.delete(`follow-up/${id}`)
    }
}
