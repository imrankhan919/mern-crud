import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, fetchTodos, update } from "./todoService";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    allTodos: [],
    edit: {
      todo: {},
      isEdit: false,
    },
  },
  reducers: {
    remove: (state, action) => {
      return {
        ...state,
        allTodos: state.allTodos.filter((item) => item._id !== action.payload),
      };
    },

    edit: (state, action) => {
      return {
        ...state,
        edit: {
          todo: action.payload,
          isEdit: true,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodos.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allTodos = action.payload;
      })
      .addCase(getAllTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(saveTodo.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(saveTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allTodos = [action.payload, ...state.allTodos];
      })
      .addCase(saveTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(removeTodo.pending, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allTodos = state.allTodos.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.edit = { todo: {}, isEdit: false };
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { remove, edit } = todoSlice.actions;
export default todoSlice.reducer;

// FETCH ALL TODOS

export const getAllTodos = createAsyncThunk("FETCH/TODOS", async () => {
  try {
    return await fetchTodos();
  } catch (error) {
    console.log(error);
  }
});

export const saveTodo = createAsyncThunk("SAVE/TODO", async (formData) => {
  try {
    return await addTodo(formData);
  } catch (error) {
    console.log(error);
  }
});

export const removeTodo = createAsyncThunk("DELETE/TODO", async (_id) => {
  try {
    return await deleteTodo(_id);
  } catch (error) {
    console.log(error);
  }
});

export const updateTodo = createAsyncThunk("UPDATE/TODO", async (formData) => {
  try {
    return await update(formData);
  } catch (error) {
    console.log(error);
  }
});
