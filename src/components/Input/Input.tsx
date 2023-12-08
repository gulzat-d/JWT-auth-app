import { forwardRef } from 'react';
import styles from './Input.module.css';
import { InputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ ...props }, ref) {
	return (
		<>
			<input ref={ref} type='text' className={styles.input} {...props} />
		</>
	);
});
export default Input;
