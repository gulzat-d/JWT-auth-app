import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PREFIX } from '../helpers/API';
import axios, { AxiosError } from 'axios';
import { JWTResponse } from '../interfaces/JWT.interface';
import { loadState } from './localStorage';

export const JWT_PERSISTENT_STATE = 'jwtData';

export interface JWT {
	access_token: string | null;
	refresh_token: string | null;
}

export interface JWTState {
	jwt: JWT | null;
	loginErrorMessage?: string | null;
}

const initialState: JWTState = loadState(JWT_PERSISTENT_STATE)??{
	jwt: null
}

export const refreshToken = createAsyncThunk('user/refreshToken', 
	async (refresh_token) => {
		try {
			const { data } = await axios.post(`${PREFIX}/refresh-token`, {
				"refreshToken": `${refresh_token}`
			})
			return data;
		} catch (error) {
				if (error instanceof AxiosError) {
					throw new Error(error.response?.data.message);
			}
		}
	}
)

export const getTokens = createAsyncThunk('user/getTokens', 
	async (params: {login: string, password: string}) => {
		try {
			const { data } = await axios.post(`${PREFIX}/login`, {
				"email": `${params.login}`,
				"password": `${params.password}`
			})
			return data;
		} catch (error) {
				if (error instanceof AxiosError) {
					throw new Error(error.response?.data.message);
				}
			}
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		},
		getToken: (state) => {
			state.jwt;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getTokens.fulfilled, (state, action: PayloadAction<JWTResponse>)=>{
			state.jwt = action.payload;
			state.loginErrorMessage = null;
		});
		builder.addCase(getTokens.rejected, (state, action)=>{
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(refreshToken.fulfilled, (state, action)=>{
			state.jwt = action.payload;
		});
	}
})

export default userSlice.reducer;
export const userActions = userSlice.actions;