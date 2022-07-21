import * as axios from "axios";

export async function  getCourses(){
    return await axios.default.get("http://localhost:4000/v1/api/course");
}