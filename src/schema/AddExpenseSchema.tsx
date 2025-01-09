import { number, object, string } from "yup";

export const expenseValidationSchema = object({
  title: string().required("Title is required!"),
  amount: number()
    .required("Amount is required!")
    .positive("Amount must be a positive number!"),
  category: string().required("Category is required!"),
  date: string()
    .required("Date is required!")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD!"),
});
