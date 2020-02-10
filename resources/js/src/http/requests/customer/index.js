import axios from "../../axios/index.js"
export default {
    getAll(filters) {
        //filters=?paginate=5&sortAsc=id
        return axios.get(`customer${filters}`)
    },

    view(id) {
        return axios.get(`customer/${id}`)
    },

    create(data) {
        return axios.post(`customer`, data)
    },

    update(id, data) {
        return axios.put(`customer/${id}`, data)
    },

    delete(id) {
        return axios.delete(`customer/${id}`)
    }
}
