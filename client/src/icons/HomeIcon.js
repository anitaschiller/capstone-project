import styled from 'styled-components';
import Icon from './Icon';

const Svg = styled(Icon)`
  width: 30px;
  height: 27px;
`;

export const HomeIcon = ({ className }) => (
  <Svg viewbox="0 0 29.25 27" className={className}>
    <path
      fill="currentColor"
      data-name="Icon ionic-md-home"
      d="M14.625,31.5v-9h6.75v9h6.862V18h4.388L18,4.5,3.375,18H7.762V31.5Z"
      transform="translate(-3.375 -4.5)"
    ></path>
  </Svg>
);
