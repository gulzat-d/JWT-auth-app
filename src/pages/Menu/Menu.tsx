import styles from './Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { useEffect, useState } from 'react';
import { refreshToken, userActions } from '../../store/user.slice';
import { UserInfo } from '../../interfaces/UserInfo.interface';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

function Menu() {
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const [userData, setUserData] = useState<UserInfo>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isRefresh, setIsRefresh] = useState<boolean>();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const getUserInfo = async (access_token: string | null) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<UserInfo>(`${PREFIX}/profile`, {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			}
			)
			setUserData(data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
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
		}, 180000);
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
		<>
			<div className={styles.container}>
				<img src="/public/ok.svg" alt="Декорация" className={styles.image}/>
				{isLoading && <div className={styles.loader}>Загружаю данные...</div> }
				{!isLoading && <div className={styles.wrapper}>
					<div>
						<img src={userData && userData.avatar} alt="Аватар" className={styles.avatar}/>
					</div>
					<div className={styles.userInfo}>
						<span className={styles.label}>Имя:</span> {userData && userData.name}
					</div>
					<div className={styles.userInfo}>
						<span className={styles.label}>Адрес:</span> {userData && userData.email}
					</div>
					<div className={styles.userInfo}>
						<span className={styles.label}>Роль:</span> {userData && userData.role}
					</div>

					<Button onClick={logout}>Выйти</Button>
				</div>}
			</div>
		</>
	)
}

export default Menu;
