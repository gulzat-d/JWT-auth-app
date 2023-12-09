import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PREFIX } from '../helpers/API';
import axios, { AxiosError } from 'axios';
import { JWTResponse } from '../interfaces/JWT.interface';
import { loadState } from './localStorage';

export const JWT_PERSISTENT_STATE = 'jwt';

export interface JWTState {
	access_token: string | null;
	refresh_token: string | null;
}

const initialState: JWTState = loadState(JWT_PERSISTENT_STATE)??{
	access_token: null,
	refresh_token: null
}

export const refreshToken = createAsyncThunk('user/refreshToken', 
	async (refresh_token) => {
		const { data } = await axios.post(`${PREFIX}/refresh-token`, {
			"refreshToken": `${refresh_token}`
		})
		return data;
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
			state.access_token = null;
			state.refresh_token = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getTokens.fulfilled, (state, action: PayloadAction<JWTResponse>)=>{
			return state = action.payload;
		});
		builder.addCase(getTokens.rejected, (state, action)=>{
			console.log(`error  ${action.error.message}`);
		});
		builder.addCase(refreshToken.fulfilled, (state, action)=>{
			console.log(`extraReducers access_token ${state.access_token}`);
			console.log(`extraReducers refresh_token ${action.payload.access_token}`);
			return state = action.payload;
		});
	}
})

export default userSlice.reducer;
export const userActions = userSlice.actions;