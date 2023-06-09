import React, { useState, FormEvent } from 'react';
import FormError from '../../formError';

import './index.scss';

interface Props {
  type: 'avatar' | 'photos';
  title?: string;
}

const LoadPhotoForm = ({ type }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | undefined | null>(
    null
  );
  const [imgUpload, setImgUpload] = useState<File | null>(null);
  const [imgError, setImgError] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const reader = new FileReader();

  const handleUpload = (filesList: FileList | null) => {
    const img = filesList ? filesList[0] : null;

    if (!img) {
      setImgError('Please select file!');
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
    // const data = ;
    if (!imgUpload) {
    }
  };

  return (
    <form className="photo-form">
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
        {type === 'photos' && (
          <textarea
            className="photo-form__text"
            placeholder="Your caption:"
            rows={3}
            onChange={({ target }) => setCaption(target.value.trim())}
          />
        )}

        <button type="submit" className="button button--primary">
          {type === 'avatar' ? 'Update Avatar!' : 'Upload Image!'}
        </button>
      </div>
    </form>
  );
};

export { LoadPhotoForm };
