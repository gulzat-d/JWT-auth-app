import { FormEvent, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import axios from 'axios';

function Auth() {



	const submit = (e: FormEvent) => {
		e.preventDefault();
		const form = e.target as typeof e.currentTarget & HTMLFormElement;
		const formData = new FormData(form);
		const { login, password } = Object.fromEntries(formData);
		console.log(login, password);
	}


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