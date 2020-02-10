import axios from "../../axios/index.js"
export default {
    getAll(filters) {
        //filters=?paginate=5&sortAsc=id
        return axios.get(`apartment${filters}`)
    },

    view(id) {
        return axios.get(`apartment/${id}`)
    },

    create(data) {
        return axios.post(`apartment`, data)
    },

    update(id, data) {
        return axios.put(`apartment/${id}`, data)
    },

    delete(id) {
        return axios.delete(`apartment/${id}`)
    }
}
