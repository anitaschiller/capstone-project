import styled from 'styled-components/macro';
import Icon from './Icon';

const Svg = styled(Icon)`
  width: 31px;
  height: 30px;
`;

export const StarIconFilled = ({ className }) => (
  <Svg viewBox="0 0 30.849 29.339" className={className}>
    <path
      fill="currentColor"
      dataName="Icon metro-star-empty"
      d="M18,25.905,27.27,31.5,24.81,20.955,33,13.86l-10.785-.915L18,3l-4.215,9.945L3,13.86l8.19,7.1L8.73,31.5Z"
      transform="translate(-2.571 -2.683)"
    />
  </Svg>
);
