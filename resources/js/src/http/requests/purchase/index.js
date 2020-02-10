import axios from "../../axios/index.js"
export default {
    getAll(filters) {
        //filters=?paginate=5&sortAsc=id
        return axios.get(`purchase${filters}`)
    },

    getCreate() {
        return axios.get(`purchase/create`)
    },

    view(id) {
        return axios.get(`purchase/${id}`)
    },

    create(data) {
        return axios.post(`purchase`, data)
    },

    update(id, data) {
        return axios.patch(`purchase/${id}`, data)
    },

    delete(id) {
        return axios.delete(`purchase/${id}`)
    }
}
