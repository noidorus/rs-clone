import React, { useState, FormEvent } from 'react';
import FormError from '../formError';

import './index.scss';

interface Props {
  title?: string;
  children?: JSX.Element;
  submitCallback: (img: File) => void;
}

const ImageFormView = ({ children, submitCallback, title }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | undefined | null>(
    null
  );
  const [imgUpload, setImgUpload] = useState<File | null>(null);
  const [imgError, setImgError] = useState<string | null>(null);
  const reader = new FileReader();

  const handleUpload = (filesList: FileList | null) => {
    const img = filesList ? filesList[0] : null;

    if (!img) {
      setImgError('Please select file!');
      setImagePreview(null);
      return;
    }

    if (!img.type.includes('image')) {
      setImgError('Please select image file');
      return;
    }

    if (img) {
      reader.readAsDataURL(img);
      reader.addEventListener('load', function () {
        const url = reader.result;
        setImagePreview(url?.toString());
      });
    }

    setImgError(null);
    setImgUpload(img);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imgUpload) {
      setImgError('Please select file!');
      return;
    }

    submitCallback(imgUpload);
  };

  return (
    <form className="photo-form" onSubmit={handleSubmit}>
      {title && <h3 className="photo-form__title">{title}</h3>}
      <div className="photo-form__image-wrapper">
        {imagePreview ? (
          <img className="photo-form__image" src={imagePreview} />
        ) : (
          <img
            className="photo-form__image"
            src={'./images/placeholder-image.png'}
          />
        )}

        <input
          className="photo-form__file"
          type="file"
          onChange={({ target }) => handleUpload(target.files)}
        />

        {imgError && <FormError message={imgError} />}
        {!imagePreview && (
          <button className="button button--primary" type="button">
            Load file
          </button>
        )}
      </div>

      <div className="photo-form__footer">
        {children}
        <button type="submit" className="button button--primary">
          {children ? 'Upload Image!' : 'Update Avatar!'}
        </button>
      </div>
    </form>
  );
};

export { ImageFormView };
