import { FormEvent, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getTokens } from '../../store/user.slice';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

function Auth() {

	const dispatch = useDispatch();
	const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);
	const navigate = useNavigate();

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		const form = e.target as typeof e.currentTarget & HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData);
		dispatch(getTokens(data));
	}

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt])

	return (
		<>
			{loginErrorMessage && <div>Неверный логин или пароль</div>}
			<form onSubmit={submit}>
				<Input placeholder='Введите логин' type='text' name='login'></Input>
				<Input placeholder='Введите пароль' type='password' name='password'></Input>
				<Button>Войти</Button>
			</form>
		</>
	)
}

export default Auth;