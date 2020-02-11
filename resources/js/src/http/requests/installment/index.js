import axios from "../../axios/index.js"
export default {
    getAll(filters) {
        //filters=?paginate=5&sortAsc=id
        return axios.get(`installment${filters}`)
    },

    view(id) {
        return axios.get(`installment/${id}`)
    },

    create(data) {
        return axios.post(`installment`, data)
    },

    update(id, data) {
        return axios.put(`installment/${id}`, data)
    },

    delete(id) {
        return axios.delete(`installment/${id}`)
    }
}
