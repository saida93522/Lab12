import axios from 'axios'

const base_url = '/api/student'
//set up request that will map to routes created in service
export default {
    getAllStudent() {
        return axios.get(base_url).then(response => {
            return response.data
        })
    },
    addStudent(student) {
        return axios.post(base_url, student).then(response => {
            return response.data
        })

    },
    updateStudent(student) {
        return axios.patch(`${base_url}/${student.id}`, student).then(response => { //make patch request that matches routes/api
            return response.data
        })
    },
    //delete student from table
    deleteStudent(id) {
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        })
    }



}//end of export colon