import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';
import { saveState } from './localStorage';

export const store = configureStore({
	reducer: {
		user: userSlice
	}
});

store.subscribe(() => {
	saveState( store.getState().user , JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;