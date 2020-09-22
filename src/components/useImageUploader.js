import { useState, useRef, useCallback } from 'react';

const useImageUploader = ({
  aspectRatio,
  maxWidth,
  maxHeight,
  minHeight,
  minWidth,
  fileSizeLimit,
  onError,
  onImageEditingDone,
}) => {
  const getInitialCrop = useCallback(
    () => ({
      unit: '%',
      aspect: aspectRatio || undefined,
      width: 90,
      height: 90,
      x: 5,
      y: 5,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const imageRef = useRef();
  const [src, setSrc] = useState();
  const [scaledMaxHeight, setScaledMaxHeight] = useState();
  const [scaledMaxWidth, setScaledMaxWidth] = useState();
  const [scaledMinHeight, setScaledMinHeight] = useState();
  const [scaledMinWidth, setScaledMinWidth] = useState();
  const [cropModalOpen, setModalOpen] = useState(false);
  const [crop, setCrop] = useState(getInitialCrop());

  const removeRef = useCallback(() => {
    imageRef.current = undefined;
  }, []);
  const onSelectFile = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        const file = e.target.files[0];
        if (file.size > fileSizeLimit) {
          if (onError) {
            onError(
              'Sorry, this image is too big! Please try a smaller image.',
            );
          }
          removeRef();
          return;
        }
        reader.addEventListener('load', () => {
          const image = new Image();
          image.src = reader.result;
          image.onload = () => {
            if (image.height < minHeight || image.width < minWidth) {
              if (onError) {
                onError(
                  `Sorry, please upload a ${minWidth}x${minHeight} minimum image or greater`,
                );
              }
              removeRef();
              return;
            }
            setSrc(reader.result);
            setModalOpen(true);
            setCrop(getInitialCrop());
          };
        });
        reader.readAsDataURL(file);
      }
    },
    [fileSizeLimit, getInitialCrop, minHeight, minWidth, onError, removeRef],
  );

  const onImageLoaded = useCallback(
    (image) => {
      const { naturalWidth, naturalHeight, clientHeight, clientWidth } = image;
      let maxWidthRatio;
      let minWidthRatio;
      let minHeightRatio;
      let maxHeightRatio;
      if (maxWidth) {
        maxWidthRatio = maxWidth / naturalWidth;
        setScaledMaxWidth(maxWidthRatio * clientWidth);
      }
      if (minWidth) {
        minWidthRatio = minWidth / naturalWidth;
        setScaledMinWidth(minWidthRatio * clientWidth);
      }
      if (maxHeight) {
        maxHeightRatio = maxHeight / naturalHeight;
        setScaledMaxHeight(maxHeightRatio * clientHeight);
      }
      if (minHeight) {
        minHeightRatio = minHeight / naturalHeight;
        setScaledMinHeight(minHeightRatio * clientHeight);
      }
      const initialCrop = { ...getInitialCrop() };
      let updatedHeightPercentage = initialCrop.height;
      if (maxHeightRatio && initialCrop.height > maxHeightRatio * 100) {
        updatedHeightPercentage = maxHeightRatio * 100;
      } else if (minHeightRatio && initialCrop.height < minHeightRatio * 100) {
        updatedHeightPercentage = minHeightRatio * 100;
      }
      let updatedWidthPercentage = initialCrop.width;
      if (maxWidthRatio && initialCrop.width > maxWidthRatio * 100) {
        updatedWidthPercentage = maxWidthRatio * 100;
      } else if (minWidthRatio && initialCrop.width < minWidthRatio * 100) {
        updatedWidthPercentage = minWidthRatio * 100;
      }

      if (
        updatedWidthPercentage === initialCrop.width &&
        updatedHeightPercentage === initialCrop.height
      ) {
        if (naturalWidth > naturalHeight) {
          updatedWidthPercentage *= naturalHeight / naturalWidth;
        } else {
          updatedHeightPercentage *= naturalWidth / naturalHeight;
        }
      }

      if (aspectRatio) {
        if (aspectRatio > 1) {
          updatedHeightPercentage /= aspectRatio;
        } else if (aspectRatio < 1) {
          updatedWidthPercentage *= aspectRatio;
        }
      }

      setCrop({
        ...initialCrop,
        height: updatedHeightPercentage,
        width: updatedWidthPercentage,
        y: (100 - updatedHeightPercentage) / 2,
        x: (100 - updatedWidthPercentage) / 2,
      });
      imageRef.current = image;
      return false;
    },
    [aspectRatio, getInitialCrop, maxHeight, maxWidth, minHeight, minWidth],
  );

  const onInputClick = useCallback((event) => {
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
    return false;
  }, []);

  const onCropChange = (imgCrop) => {
    setCrop(imgCrop);
  };

  const getCroppedImg = (image, imgCrop) => {
    const modifiedCrop = { ...imgCrop };
    if (modifiedCrop.unit === '%') {
      modifiedCrop.width = (imgCrop.width * image.clientWidth) / 100;
      modifiedCrop.height = (imgCrop.height * image.clientHeight) / 100;
      modifiedCrop.x = (imgCrop.x * image.clientWidth) / 100;
      modifiedCrop.y = (imgCrop.y * image.clientHeight) / 100;
    }
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const originWidth = modifiedCrop.width * scaleX;
    const originHeight = modifiedCrop.height * scaleY;

    canvas.width = originWidth;
    canvas.height = originHeight;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      modifiedCrop.x * scaleX,
      modifiedCrop.y * scaleY,
      modifiedCrop.width * scaleX,
      modifiedCrop.height * scaleY,
      0,
      0,
      originWidth,
      originHeight,
    );

    return canvas.toDataURL();
  };

  const onDone = () => {
    if (imageRef && crop.width && crop.height) {
      const img = getCroppedImg(imageRef.current, crop);
      onImageEditingDone(img);
      setModalOpen(false);
      removeRef();
    }
  };

  const onCancel = useCallback(() => {
    setModalOpen(false);
    setSrc();
  }, []);

  return {
    src,
    crop,
    scaledMaxHeight,
    scaledMaxWidth,
    scaledMinHeight,
    scaledMinWidth,
    cropModalOpen,
    onCancel,
    onDone,
    onCropChange,
    onSelectFile,
    onImageLoaded,
    onInputClick,
  };
};

export default useImageUploader;
