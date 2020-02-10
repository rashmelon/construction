import axios from "../../axios/index.js"
export default {
    getAll(filters) {
        //filters=?paginate=5&sortAsc=id
        return axios.get(`project${filters}`)
    },

    view(id) {
        return axios.get(`project/${id}`)
    },

    create(data) {
        return axios.post(`project`, data)
    },

    update(id, data) {
        return axios.post(`project/${id}`, data)
    },

    delete(id) {
        return axios.delete(`project/${id}`)
    }
}
