import axios from 'axios'

const base_url = '/api/student'
//set up request that will map to routes created in service
export default {
    async getAllStudent() {
        const response = await axios.get(base_url)
        return response.data
    },
    async addStudent(student) {
        const response = await axios.post(base_url, student)
        return response.data

    },
    async updateStudent(student) {
        const response = await axios.patch(`${base_url}/${student.id}`, student)
        return response.data
    },
    //delete student from table
    async deleteStudent(id) {
        const response = await axios.delete(`${base_url}/${id}`)
        return response.data
    }



}//end of export colon