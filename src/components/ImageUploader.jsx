import React from 'react';
import { number, node, func, shape, string } from 'prop-types';
import useImageUploader from './useImageUploader';
import DisplayImageUploader from './index.presentational';
import 'react-image-crop/dist/ReactCrop.css';

const ImageUploader = ({
  aspectRatio,
  classes,
  children,
  limits: {
    MIN_DIMENSIONS: { WIDTH: minWidth, HEIGHT: minHeight } = {},
    MAX_DIMENSIONS: { WIDTH: maxWidth, HEIGHT: maxHeight } = {},
    FILE_SIZE_LIMIT: fileSizeLimit,
  },
  onError,
  onImageEditingDone,
  overlayIcon,
}) => {
  const returnedHookValues = useImageUploader({
    aspectRatio,
    maxWidth,
    maxHeight,
    minHeight,
    minWidth,
    fileSizeLimit,
    onError,
    onImageEditingDone,
  });

  return (
    <DisplayImageUploader
      classes={classes}
      overlayIcon={overlayIcon}
      headingText="Edit Image"
      cancelButtonText="Cancel"
      doneButtonText="Done"
      {...returnedHookValues}
    >
      {children}
    </DisplayImageUploader>
  );
};

ImageUploader.propTypes = {
  classes: shape({}),
  children: node.isRequired,
  onImageEditingDone: func.isRequired,
  aspectRatio: number,
  limits: shape({
    MIN_DIMENSIONS: { WIDTH: number, HEIGHT: number },
    MAX_DIMENSIONS: { WIDTH: number, HEIGHT: number },
    FILE_SIZE_LIMIT: number,
  }),
  onError: func,
  overlayIcon: string,
};

ImageUploader.defaultProps = {
  classes: {},
  aspectRatio: null,
  onError: null,
  limits: {
    MIN_DIMENSIONS: {},
    MAX_DIMENSIONS: {},
    FILE_SIZE_LIMIT: Infinity,
  },
  overlayIcon: '',
};

export default ImageUploader;
