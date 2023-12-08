import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function RequireAuth({ children }: { children: ReactNode }) {
	const jwt = null;

	if (!jwt) {
		return <Navigate to='/auth' />
	}
	return children;
}