export interface DeleteStudentResponse {
  code: number;
  success: boolean;
  message: string;
  students: Students;
}

export interface Students {
  nombres: string;
  apellidos: string;
  codigo: string;
}

export interface CreateStudentResponse {
  code: number;
  success: boolean;
  message: string;
  student: Student;
}

export interface Student {
  id: number;
  codigo: string;
  nombres: string;
  apellidos: string;
  dni: string;
  direccion: string;
  sexo: string;
  nroTelefono: string;
  edad: number;
  url_image: string;
  key_image: string;
  estadoId: number;
  createdAt: string;
  updatedAt: string;
}
