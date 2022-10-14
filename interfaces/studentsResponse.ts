export interface StudentsResponse {
  data: Student[];
  meta: Meta;
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
  estado: Estado;
}

export interface Estado {
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
