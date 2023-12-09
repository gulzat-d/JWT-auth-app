import styles from './Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { useEffect, useState } from 'react';
import { refreshToken, userActions } from '../../store/user.slice';
import { UserInfo } from '../../interfaces/UserInfo.interface';
import { useNavigate } from 'react-router-dom';

function Menu() {
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const [state, setState] = useState<UserInfo>();
	const dispatch = useDispatch();
	const [isRefresh, setIsRefresh] = useState<boolean>();
	const navigate = useNavigate();

	const getUserInfo = async (access_token) => {
		try {
			const { data } = await axios.get<UserInfo>(`${PREFIX}/profile`, {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			}
			)
			setState(data);
		} catch (error) {
			if (error instanceof AxiosError) {
				throw new Error(error.response?.data.message);
			}
		}
	}

	const refresh = () => {
		const timerId = setTimeout(() => {
			const token = dispatch(userActions.getToken());
			if (token) {
				dispatch(refreshToken(token.payload));
				setIsRefresh(true);
			}
		}, 5000);
		return () => {
			clearTimeout(timerId);
		}
	}


	useEffect(() => {
		setIsRefresh(false)
		refresh()
	}, [isRefresh])

	const logout = () => {
		dispatch(userActions.logout());
		navigate('/auth')
	}

	useEffect(() => {
		getUserInfo(jwt.access_token);
	}, [jwt])

	return (
		<div className={styles.wrapper}>
			<div>
				{state && state.name}
			</div>
			<div>
				{state && state.email}
			</div>
			<div>
				{state && state.role}
			</div>
			<div>
				<img src={state && state.avatar} alt="Аватар" />
			</div>
			<button onClick={logout}>Выйти</button>
		</div>
	)
}

export default Menu;
