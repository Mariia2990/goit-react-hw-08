import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const baseApi = axios.create({
  baseURL: 'https://connections-api.goit.global',
  headers: {
    'Content-Type': 'application/json',
  },
});


const setAuthHeader = token => {
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
    console.log('Login credentials:', credentials);
    try {
      const response = await baseApi.post('/users/login', credentials);
      console.log('Login response:', response.data);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
       console.error('Login error:', error.message);
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

export const refreshUser = createAsyncThunk('auth/refreshUser', async (_, thunkAPI) => {
  const token =
    thunkAPI.getState().auth.token || localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No token found. Refresh aborted.');
  }
 
    try {
      setAuthHeader(token);
      const response = await baseApi.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);