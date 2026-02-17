export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps extends LoginProps {
  firstName: string;
  lastName: string;
  repeatPassword: string;
}
