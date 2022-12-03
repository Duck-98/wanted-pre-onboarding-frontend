export interface TodoType {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: string;
}

export interface UserType {
  email: string;
  password: string;
}
