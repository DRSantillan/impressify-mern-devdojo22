import Modal from '../Modal.component';
import Button from '../../button/Button.component';

const ErrorModal = ({ onClear, error }) => {
	return (
		<Modal
			onCancel={onClear}
			header='An error has occurred!'
			show={!!error}
			footer={<Button onClick={onClear}>Ok</Button>}
		>
			<p>{error}</p>
		</Modal>
	);
};
export default ErrorModal;
