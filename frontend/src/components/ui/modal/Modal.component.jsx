import React from 'react';
import ReactDom from 'react-dom';
import Backdrop from '../backdrop/BackDrop.component';
import { CSSTransition } from 'react-transition-group';
import './Modal.styles.scss';

const ModalOverlay = ({
	children,
	className,
	style,
	headerClass,
	contentClass,
	header,
	footer,
	footerClass,
	onSubmit,
}) => {
	const modalContent = (
		<div className={`modal ${className}`} style={style}>
			<header className={`modal__header ${headerClass}`}>
				<h2>{header}</h2>
			</header>
			<form
				onSubmit={onSubmit ? onSubmit : event => event.preventDefault()}
			>
				<div className={`modal__content ${contentClass}`}>
					{children}
				</div>
				<footer className={`modal__footer ${footerClass}`}>
					{footer}
				</footer>
			</form>
		</div>
	);
	return ReactDom.createPortal(
		modalContent,
		document.getElementById('modal')
	);
};
const Modal = props => {
	const { show, onCancel } = props;
	return (
		<>
			{show && <Backdrop onClick={onCancel} />}
			<CSSTransition
				in={show}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames='modal'
			>
				<ModalOverlay {...props} />
			</CSSTransition>
		</>
	);
};

export default Modal;
