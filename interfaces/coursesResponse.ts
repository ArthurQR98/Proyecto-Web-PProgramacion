export interface CoursesResponse {
  data: Course[];
  meta: Meta;
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

export interface Meta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: null;
  next: null;
}
