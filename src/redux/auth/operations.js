import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const baseApi = axios.create({
  baseURL: 'https://connections-api.goit.global',
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log(baseApi.defaults.headers);

const setAuthHeader = token => {
  console.log('Setting auth token:', token); 
  baseApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  baseApi.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await baseApi.post('/users/signup', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await baseApi.post('/users/login', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await baseApi.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;
    console.log(savedToken);

    if (!savedToken) {
      return thunkAPI.rejectWithValue('Token is not exist!');
    }

    try {
      setAuthHeader(savedToken);
      const { data } = await baseApi.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);