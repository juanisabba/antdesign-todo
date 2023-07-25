import axios from 'axios'
import { FormValuesProps, ITabHeader } from '../interfaces/note.interface';

const notesApi = axios.create({
    baseURL: 'http://localhost:3001/notes'
})

export const getNotes = async () => {
  const res = await notesApi.get('/');
  const totalPending = res.data.filter((note: ITabHeader) => !note.isCompleted);
  const totalCompleted = res.data.filter((note: ITabHeader) => note.isCompleted);
  return {notes: res.data, totalPending: totalPending.length, totalCompleted: totalCompleted.length};
};

export const getNoteById = async(id: number) => {
  const res = await notesApi.get(`/${id}`)
  return res.data
};

export const createNote = async(note: FormValuesProps) => {
  await notesApi.post("/", note)
};

export const updateNote = async (note: FormValuesProps) =>{
    await notesApi.patch(`/${note.id}`,note);
}

export default notesApi;