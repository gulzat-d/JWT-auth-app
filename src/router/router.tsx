import { createBrowserRouter } from 'react-router-dom';
import Auth from '../pages/Auth/Auth';
import Menu from '../pages/Menu/Menu';
import { RequireAuth } from '../helpers/RequireAuth';

export const router = createBrowserRouter([
	{
		path: '/auth',
		element: <Auth />
	},
	{
		path: '/',
		element: <RequireAuth><Menu /></RequireAuth>
	},
])