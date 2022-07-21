// http://localhost:4000/v1/api/student
import * as axios from "axios";

export async function  getStudents(){
    return await axios.default.get("http://localhost:4000/v1/api/student");
}