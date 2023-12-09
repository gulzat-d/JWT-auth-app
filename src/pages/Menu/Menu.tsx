import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { useEffect, useState } from 'react';
import { refreshToken } from '../../store/user.slice';

function Menu() {
	const jwt = useSelector((s: RootState) => s.user);
	const [state, setState] = useState();
	const dispatch = useDispatch();
	const [isRefresh, setIsRefres] = useState<boolean>();

	const getUserInfo = async (access_token) => {
		try {
			const { data } = await axios.get(`${PREFIX}/profile`, {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			}
			)
			setState(data);
		} catch (error) {
			console.error(error);
		}
	}

	const refresh = () => {
		const timerId = setTimeout(() => {
			dispatch(refreshToken(jwt.refresh_token));
			setIsRefres(true);
		}, 180000);
		return () => {
			clearTimeout(timerId);
		}
	}

	useEffect(() => {
		setIsRefres(false)
		refresh()
	}, [isRefresh])


	useEffect(() => {
		getUserInfo(jwt.access_token);
	}, [jwt])

	return (
		<div>{state && state.role}
		</div>
	)
}

export default Menu;
