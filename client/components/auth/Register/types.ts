export type RegisterFormValues = {
  email: string;
  fullName: string;
  password: string;
  phone: string;
  passwordConfirmation: string;
};

export type RegisterField = {
  autoComplete: string;
  id: keyof Pick<RegisterFormValues, "email" | "fullName">;
  label: string;
  placeholder: string;
  required?: boolean;
  type: "email" | "text";
};
