export interface ILesson {
  subject: string;
  time: string;
}

export interface IDay {
  date: string;
  info: ILesson[];
}

export type IWeek = IDay[];