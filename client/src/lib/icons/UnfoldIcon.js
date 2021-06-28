import styled from 'styled-components/macro';
import Icon from './Icon';

const Svg = styled(Icon)`
  width: 18px;
  height: 11px;
`;

export const UnfoldIcon = ({ className }) => (
  <Svg viewbox="0 0 18 11.115" className={className}>
    <path
      fill="currentColor"
      dataName="Icon material-keyboard-arrow-down"
      d="M11.115,11.76,18,18.63l6.885-6.87L27,13.875l-9,9-9-9Z"
      transform="translate(-9 -11.76)"
    ></path>
  </Svg>
);
