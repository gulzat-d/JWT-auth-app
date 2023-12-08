import { FormEvent, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';

function Auth() {

	const getToken = async () => {
		const options = {
			method: 'GET',
			url: 'https://api.escuelajs.co/api/v1/auth/profile',
			headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcwMjA0Nzc3OCwiZXhwIjoxNzAzNzc1Nzc4fQ.48wMyOc6MlBc2as2weCvHJJgaJKOlarn9fwQG8m2xo8' }
		};
		try {
			const response = await axios.request(options);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	}

	const getUserInfo = async (access_token) => {
		const { data } = await axios.get(`${PREFIX}/profile`, {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		}
		)
		return data;
	}

	const getTokens = async (login, password) => {
		const { data } = await axios.post(`${PREFIX}/login`, {
			"email": `${login}`,
			"password": `${password}`
		})
		return data;
	}

	const refreshToken = async (refresh_token) => {
		const { data } = await axios.post(`${PREFIX}/refresh-token`, {
			"refreshToken": `${refresh_token}`
		})
		return data;
	}

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		const form = e.target as typeof e.currentTarget & HTMLFormElement;
		const formData = new FormData(form);
		const { login, password } = Object.fromEntries(formData);
		const { access_token, refresh_token } = await getTokens(login, password);
		console.log(access_token, refresh_token);
		const user = await getUserInfo(access_token);
		console.log(user);
		const refresh = await refreshToken(refresh_token);
		console.log(refresh);

	}

	useEffect(() => {
		getToken();
	}, [])

	return (
		<>
			<form onSubmit={submit}>
				<Input placeholder='Введите логин' type='text' name='login'></Input>
				<Input placeholder='Введите пароль' type='password' name='password'></Input>
				<Button>Войти</Button>
			</form>
		</>
	)
}

export default Auth;