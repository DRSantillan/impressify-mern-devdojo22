import { useState, useRef, useEffect } from 'react';
import Button from '../button/Button.component';

import './ImageUploader.styles.scss';

const ImageUploader = ({
	id,
	center,
	onInput,
	errorText,
	setFormData,
	formState,
}) => {
	const [imageFile, setImageFile] = useState();
	const [previewUrl, setPreviewUrl] = useState();
	const [isValid, setIsValid] = useState(false);
	const imageInput = useRef();

	useEffect(() => {
		if (!imageFile) return;
		const imageFileReader = new FileReader();
		imageFileReader.onload = () => {
			setPreviewUrl(imageFileReader.result);
		};
		imageFileReader.readAsDataURL(imageFile);
	}, [imageFile]);

	const chooseImageHandler = () => {
		imageInput.current.click();
	};
	const selectedImageHandler = event => {
		let selectedFile;
		let fileIsValid = isValid;
		if (event.target.files && event.target.files.length === 1) {
			selectedFile = event.target.files[0];
			setImageFile(selectedFile);

			setIsValid(true);
			fileIsValid = true;
			setFormData(
				{
					...formState.inputs,
					imageUrl: { value: selectedFile, isValid: true },
				},
				true
			);
			return;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}
		onInput(id, selectedFile, fileIsValid);
	};
	return (
		<div className='form-control'>
			<input
				ref={imageInput}
				id={id}
				type='file'
				style={{ display: 'none' }}
				accept='.jpg, .png, .jpeg8'
				onChange={selectedImageHandler}
			/>

			<div className={`image-upload ${center && 'center'}`}>
				<div className='image-upload__preview'>
					{previewUrl && <img src={previewUrl} alt='Preview' />}
					{!previewUrl && <p>Please select an image.</p>}
				</div>
				<Button type='button' onClick={chooseImageHandler}>
					Chooose Image
				</Button>
			</div>
			{!isValid && <p>{errorText}</p>}
		</div>
	);
};

export default ImageUploader;
