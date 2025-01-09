import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpensesState {
  expenses: Expense[];
}

const initialState: ExpensesState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action?.payload);
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex(
        (exp) => exp?.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action: PayloadAction<number>) => {
      state.expenses = state.expenses.filter(
        (exp) => exp?.id !== action.payload
      );
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } =
  expensesSlice.actions;

export default expensesSlice.reducer;
