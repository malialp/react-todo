import { createSlice } from "@reduxjs/toolkit";

const initTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    return { value: todos };
  }
  return { value: [] };
};

export const todoSlice = createSlice({
  name: "todos",
  initialState: initTodos(),
  reducers: {
    addTodo: (state, action) => {
      state.value.unshift(action.payload.todo);
      state.value = state.value.sort((a, b) => a.status - b.status);

      localStorage.setItem("todos", JSON.stringify(state.value));
    },
    deleteTodo: (state, action) => {
      state.value = state.value
        .filter((todo) => todo.id !== action.payload.id)
        .sort((a, b) => a.status - b.status);

      localStorage.setItem("todos", JSON.stringify(state.value));
    },
    completeTodo: (state, action) => {
      state.value = state.value
        .map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, status: !todo.status }
            : todo
        )
        .sort((a, b) => a.status - b.status);

      localStorage.setItem("todos", JSON.stringify(state.value));
    },
  },
});

export const { addTodo, deleteTodo, completeTodo } = todoSlice.actions;
export default todoSlice.reducer;
