import { FormEvent, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getTokens } from '../../store/user.slice';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

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
		<div className={styles.container}>
			<img src="/public/human.svg" alt="Декорация" />
			<div className={styles.wrapper}>
				<form onSubmit={submit} className={styles.form}>
					{loginErrorMessage && <div>Неверный логин или пароль</div>}
					<div className={styles.formItem}>
						<label className={styles.label}>Ваш логин</label>
						<Input placeholder='Логин' type='text' name='login'></Input>
					</div>
					<div className={styles.formItem}>
						<label className={styles.label}>Ваш пароль</label>
						<Input placeholder='Пароль' type='password' name='password'></Input>
					</div>
					<Button>Войти</Button>
				</form>
			</div>
			<img src="/public/human2.svg" alt="Декорация" />
		</div>
	)
}

export default Auth;