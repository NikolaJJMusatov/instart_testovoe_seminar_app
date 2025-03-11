export type TSeminar = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
};

export type TSeminarsResponse = TSeminar[];

export type TDeleteSeminarData = {
  id: number;
};

export type TEditSeminarResponse = TSeminar;

export type TEditSeminarData = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
};

export type TDeleteSeminarResponse = TSeminar;
