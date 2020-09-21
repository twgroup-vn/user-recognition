import React from 'react';
import _ from 'lodash';
import SvgIcon from '@material-ui/core/SvgIcon';

function CarrotIcon(props) {
  // style={{ fontSize: 73 }}
  const { active, onClick, size, url, currency } = props;
  if (url) {
    const blendMode = active ? 'normal' : 'luminosity';
    if (url.type === 'emoji') {
      const emojiType = _.get(url, ['value', 'type'], 'REGULAR');
      if (emojiType === 'REGULAR') {
        return (
          <span
            className={props.className}
            style={{
              fontSize: size ? `${size}px` : '20px',
              mixBlendMode: blendMode,
              ...props.style,
            }}
            role="img"
            aria-label="custom-icon"
          >
            {String.fromCodePoint(parseInt(url.value.hexCode, 16))}
          </span>
        );
      }
      if (emojiType === 'CUSTOM') {
        return (
          <img
            src={url.value.url}
            alt={currency}
            className={props.className}
            style={{
              width: size ? `${size}px` : '20px',
              mixBlendMode: blendMode,
              ...props.style,
            }}
          />
        );
      }
    }
    return (
      <img
        src={url.value}
        alt={currency}
        className={props.className}
        style={{
          width: size ? `${size}px` : '20px',
          mixBlendMode: blendMode,
          ...props.style,
        }}
      />
    );
  }

  return (
    <SvgIcon
      className={props.className}
      style={props.style || { fontSize: size ? size : '24' }}
      viewBox="0 0 20 20"
      onClick={onClick}
    >
      <title>Gold</title>
      <desc>Icon for gold</desc>
      <g id="Logo" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="coin-copy-2">
          <circle
            id="Oval"
            fill={active ? '#FFCF40' : '#C0C0C0'}
            fillRule="nonzero"
            cx="10"
            cy="10"
            r="10"
          />
          <path
            d="M5.55578364,15.4442164 C3.98747343,14.1698866 3,12.2196023 3,10 C3,6.07999038 6.07999038,3 10,3 C12.2196023,3 14.1698866,3.98747343 15.4442164,5.55578364 C14.2427551,4.57953682 12.7004073,4 11,4 C7.07999038,4 4,7.07999038 4,11 C4,12.7004073 4.57953682,14.2427551 5.55578364,15.4442164 Z"
            id="Combined-Shape"
            fill={active ? '#FFBF00' : '#9E9E9E'}
            fillRule="nonzero"
          />
          <path
            d="M10,0 C4.4285802,0 0,4.4285802 0,10 C0,15.5714198 4.4285802,20 10,20 C15.5714198,20 20,15.5714198 20,10 C20,4.4285802 15.5714198,0 10,0 Z M10,17 C6.07999038,17 3,13.9200096 3,10 C3,6.07999038 6.07999038,3 10,3 C13.9200096,3 17,6.07999038 17,10 C17,13.9200096 13.9200096,17 10,17 Z"
            id="Shape"
            fill={active ? '#FFDB70' : '#CDCDCD'}
            fillRule="nonzero"
          />
          <path
            d="M10,19.9966916 L10,19.9966916 C15.5714198,20.1416163 20,15.5053955 20,10 L19.857099,10 C19.1428396,10 18.5713584,10.5795743 18.4285802,11.3039488 C18.142901,13.332272 17.1428396,15.2156706 15.7143208,16.5196193 C14.5714812,17.6786434 13.0000614,18.4030179 11.2857406,18.6928673 C10.5714812,18.6927428 10,19.2721926 10,19.9966916 Z"
            id="Path"
            fill={active ? '#FFBF00' : '#9E9E9E'}
            fillRule="nonzero"
          />
          <path
            d="M10,0.00330843364 L10,0.00330843364 C4.4285802,-0.141616265 0,4.49460453 0,10 L0.142900988,10 C0.857160395,10 1.42864158,9.42042571 1.5714198,8.69605123 C1.85709901,6.66772798 2.8571604,4.78432942 4.28567921,3.48038065 C5.42851881,2.32135658 6.99993862,1.5969821 8.71425941,1.3071327 C9.42864158,1.3072572 10,0.727682916 10,0.00330843364 Z"
            id="Path"
            fill={active ? '#FFD24F' : '#B1B1B1'}
            fillRule="nonzero"
          />
          <path
            d="M14.2239024,14.4323171 C14.0819512,14.4323171 13.940122,14.4323171 13.7981707,14.2903659 C13.5143902,14.0065854 13.5143902,13.5808537 13.7981707,13.2970732 C14.6496341,12.4456098 15.0753659,11.1684146 15.0753659,10.0331707 C15.0753659,9.60743902 15.3591463,9.32365854 15.784878,9.32365854 C16.2106098,9.32365854 16.4943902,9.60743902 16.4943902,10.0331707 C16.4943902,11.5941463 15.9267073,13.155122 14.9334146,14.2903659 C14.6496341,14.4323171 14.3658537,14.4323171 14.2239024,14.4323171 Z"
            id="Path"
            fill={active ? '#FFD24F' : '#B1B1B1'}
            fillRule="nonzero"
          />
          <path
            d="M8.5,7.5 C8.5,6.67157288 9.17157288,6 10,6 C10.8284271,6 11.5,6.67157288 11.5,7.5 L11.5,12.5 C11.5,13.3284271 10.8284271,14 10,14 C9.17157288,14 8.5,13.3284271 8.5,12.5 L8.5,7.5 Z"
            id="Combined-Shape"
            fill={active ? '#FFBF00' : '#9E9E9E'}
          />
        </g>
      </g>
    </SvgIcon>
  );
}

export default CarrotIcon;
