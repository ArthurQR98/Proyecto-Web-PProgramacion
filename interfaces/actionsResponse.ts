export interface UpdateEnrollResponse {
  code: number;
  success: boolean;
  message: string;
  enroll: Enroll;
}

export interface Enroll {
  id: number;
  estado: string;
  fecha: string;
  estudianteId: number;
  cursos: Curso[];
}

export interface Curso {
  id: number;
  nombre: string;
  creditos: number;
  nHoras: number;
  nDocente: string;
  url_image: string;
  key_image: string;
  periodoId: number;
  programaId: number;
}

export interface DeleteEnrollResponse {
  code: number;
  success: boolean;
  message: string;
  enroll: Enroll;
}

export interface Enroll {
  id: number;
  estado: string;
  fecha: string;
  estudianteId: number;
  estudiante: Estudiante;
}

export interface Estudiante {
  nombres: string;
  apellidos: string;
}

export interface GetEnrollResponse {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: number;
  estado: string;
  fecha: string;
  estudianteId: number;
  estudiante: Estudiante;
  cursos: Curso[];
}

export interface Meta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: null;
  next: null;
}

export interface CreateEnrollResponse {
  code: number;
  success: boolean;
  message: string;
  enroll: Enroll;
}

export interface Enroll {
  id: number;
  estado: string;
  fecha: string;
  estudianteId: number;
  estudiante: Estudiante;
  cursos: Curso[];
}

export interface Curso {
  id: number;
  nombre: string;
  creditos: number;
  nHoras: number;
  nDocente: string;
  url_image: string;
  key_image: string;
  periodoId: number;
  programaId: number;
  periodo: Periodo;
  programa: Programa;
}

export interface Periodo {
  id: number;
  descripcion: string;
}

export interface Programa {
  id: number;
  nombre: string;
}

export interface Estudiante {
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

export interface GetStudentByCodeResponse {
  code: number;
  success: boolean;
  student: Student;
}
export interface Estado {
  id: number;
  nombre: string;
}

export interface CreateCourseResponse {
  code: number;
  success: boolean;
  message: string;
  course: Course;
}

export interface Course {
  id: number;
  nombre: string;
  creditos: number;
  nHoras: number;
  nDocente: string;
  url_image: string;
  key_image: string;
  periodoId: number;
  programaId: number;
  programa: Programa;
  periodo: Periodo;
}

export interface Periodo {
  id: number;
  descripcion: string;
}

export interface Programa {
  id: number;
  nombre: string;
}

export interface DeleteCourseResponse {
  code: number;
  success: boolean;
  message: string;
  course: Course;
}

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
