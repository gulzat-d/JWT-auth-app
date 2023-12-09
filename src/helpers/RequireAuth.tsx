import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';

export function RequireAuth({ children }: { children: ReactNode }) {
	const tokens = useSelector((s: RootState) => s.user)
	if (!tokens) {
		return <Navigate to='/auth' />
	}
	return children;
}