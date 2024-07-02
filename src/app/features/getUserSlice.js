import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchallblog = createAsyncThunk(
  "fetchallblog",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/notes/fetchallblogs");
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllblogs = createAsyncThunk(
  "getblogs",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/notes/fetchallnotes", {
        method: "GET",
        headers: {
          'content-type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createblog = createAsyncThunk(
  "createblog",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/api/notes/addnote", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteblog = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          'content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const result = await response.json();
      return { id: result.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateData = createAsyncThunk(
  "updateblog",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/notes/updatenote/${data._id}`, {
        method: "PUT",
        headers: {
          'content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const blogDetails = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
    searchData: [],
    relatedTopics: [],
    allfetchedBlogs: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
    relatedblog: (state, action) => {
      state.relatedTopics = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchallblog.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchallblog.fulfilled, (state, action) => {
        state.loading = false;
        state.allfetchedBlogs = action.payload;
      })
      .addCase(fetchallblog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllblogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllblogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(getAllblogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createblog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createblog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(createblog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteblog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteblog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((ele) => ele._id !== action.payload);
      })
      .addCase(deleteblog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        );
      })
      .addCase(updateData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogDetails.reducer;
export const { searchUser, relatedblog } = blogDetails.actions;
