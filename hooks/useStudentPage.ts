import { useToasts } from '@geist-ui/react';
import { baseAPI } from 'api/baseApi';
import { SocketContext } from 'context/SocketProvider';
import { CreateStudentResponse } from 'interfaces/actionsResponse';
import { Meta, StudentsResponse } from 'interfaces/studentsResponse';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

export const useStudentPage = (studentData, closeModal, setLoading) => {
  type Timer = ReturnType<typeof setTimeout>;
  const debounceRef = useRef<Timer>();
  const [, setToast] = useToasts();

  const [reloadStudent, setReloadStudent] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState<string | string[]>('1');
  const [metadatos, setMetadatos] = useState<Meta>({} as Meta);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await baseAPI.get<StudentsResponse>(`/student?status=${status}&page=${currentPage}`);
      setStudents(data.data.data);
      setMetadatos(data.data.meta);
    };
    fetchData();
    setReloadStudent(false);
  }, [reloadStudent]);

  const nextPage = async (page: number) => {
    const response = await baseAPI.get(`/student?status=${status}&page=${page}`);
    setCurrentPage(page);
    setStudents(response.data.data);
    setMetadatos(response.data.meta);
  };

  const selectHandler = async (value: string | string[]) => {
    const response = await baseAPI.get(`/student?status=${value}`);
    setStatus(value);
    setCurrentPage(1);
    setStudents(response.data.data);
    setMetadatos(response.data.meta);
  };

  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(async () => {
      const search = event.target.value;
      if (search.length === 0) {
        const response = await baseAPI.get<StudentsResponse>(`/student?status=${status}&page=${currentPage}`);
        setStudents(response.data.data);
        setMetadatos(response.data.meta);
        return;
      }
      const response = await baseAPI.get<StudentsResponse>(`/student?status=${status}&search=${search}`);
      setStudents(response.data.data);
      setMetadatos(response.data.meta);
    }, 350);
  };

  const addUser = async () => {
    try {
      setLoading(true);
      const response = await baseAPI.postForm<CreateStudentResponse>('/student', studentData);
      const {
        data: { student, message }
      } = response;
      socket.emit('new-student');
      setToast({
        text: `El estudiante ${student.nombres} ${student.apellidos} fue ${message.toLowerCase()}`,
        delay: 3000
      });
      setLoading(false);
      closeModal();
      setReloadStudent(true);
    } catch (err) {
      setToast({ text: err.message, delay: 3000, type: 'error' });
    }
  };

  return {
    setStudents,
    setMetadatos,
    setReloadStudent,
    reloadStudent,
    status,
    onQueryChanged,
    selectHandler,
    students,
    metadatos,
    currentPage,
    nextPage,
    addUser
  };
};
