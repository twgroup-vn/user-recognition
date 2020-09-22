import React from 'react';
import { number, node, func, shape, string, bool } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SVGIcon from '../../atoms/SVGIcon';
import ThemeV2 from '../../../componentsV2/theme';

import ImageCropperModal from '../../molecules/ImageCropperModal';
import 'react-image-crop/dist/ReactCrop.css';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: 'fit-content',
  },
  selectPictureContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
    cursor: 'pointer',
  },
  selectPictureOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    top: 0,
    left: 0,
    'background-color': 'rgba(0, 0, 0, 0.5)',
    opacity: 0,
    '&:hover': {
      opacity: 1,
    },
  },
  selectPictureImage: {
    width: '100%',
    height: '100%',
  },
  selectPictureInput: {
    display: 'none',
  },
});

const DisplayImageUploader = ({
  onSelectFile,
  onInputClick,
  src,
  cropModalOpen,
  onCancel,
  crop,
  onImageLoaded,
  onDone,
  onCropChange,
  scaledMinHeight,
  scaledMaxHeight,
  scaledMinWidth,
  scaledMaxWidth,
  headingText,
  cancelButtonText,
  doneButtonText,
  classes: classNames,
  children,
  overlayIcon,
}) => {
  const classes = useStyles({ classes: classNames });

  return (
    <div className={classes.root}>
      <label
        htmlFor="image-upload-display"
        className={classes.selectPictureContainer}
      >
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          id="image-upload-display"
          className={classes.selectPictureInput}
          onClick={onInputClick}
        />
        {children}
        {overlayIcon && (
          <div className={classes.selectPictureOverlay}>
            <SVGIcon icon={overlayIcon} color={ThemeV2.palette.white} />
          </div>
        )}
      </label>
      {src && (
        <ImageCropperModal
          src={src}
          cropModalOpen={cropModalOpen}
          onCancel={onCancel}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onDone={onDone}
          onCropChange={onCropChange}
          scaledMinHeight={scaledMinHeight}
          scaledMaxHeight={scaledMaxHeight}
          scaledMinWidth={scaledMinWidth}
          scaledMaxWidth={scaledMaxWidth}
          headingText={headingText}
          cancelButtonText={cancelButtonText}
          doneButtonText={doneButtonText}
        />
      )}
    </div>
  );
};

DisplayImageUploader.propTypes = {
  classes: shape({}),
  children: node.isRequired,
  onSelectFile: func.isRequired,
  onInputClick: func.isRequired,
  cropModalOpen: bool.isRequired,
  src: string.isRequired,
  onCancel: func.isRequired,
  onImageLoaded: func.isRequired,
  onDone: func.isRequired,
  onCropChange: func.isRequired,
  scaledMinHeight: number.isRequired,
  scaledMaxHeight: number.isRequired,
  scaledMinWidth: number.isRequired,
  scaledMaxWidth: number.isRequired,
  crop: shape({
    aspect: string,
    x: number,
    y: number,
    width: number,
    height: number,
  }).isRequired,
  overlayIcon: string,
  headingText: string,
  cancelButtonText: string,
  doneButtonText: string,
};

DisplayImageUploader.defaultProps = {
  classes: {},
  headingText: 'Edit Image',
  cancelButtonText: 'Cancel',
  doneButtonText: 'Done',
  overlayIcon: null,
};

export default DisplayImageUploader;
