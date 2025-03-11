import {
  TSeminarsResponse,
  TDeleteSeminarData,
  TDeleteSeminarResponse,
  TEditSeminarData,
  TEditSeminarResponse
} from "../../types/types";

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getSeminarsApi = () => 
  fetch("http://localhost:3000/seminars")
    .then((res) => checkResponse<TSeminarsResponse>(res))
    .then((data) => {
      return data;
    });



export const deleteSeminarApi = (data: TDeleteSeminarData) => 
  fetch(`http://localhost:3000/seminars/${data.id}`, {
    method: 'DELETE'
  })
    .then((res) => checkResponse<TDeleteSeminarResponse>(res))
    .then((data) => {
      return data;
    });

export const editSeminarApi = (data: TEditSeminarData) =>
  fetch(`http://localhost:3000/seminars/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
  .then((res) => checkResponse<TEditSeminarResponse>(res))
  .then((data) => {
    return data;
  });