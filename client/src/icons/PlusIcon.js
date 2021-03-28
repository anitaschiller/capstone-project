import styled from 'styled-components/macro';
import Icon from './Icon';

const Svg = styled(Icon)`
  width: 40px;
  height: 40px;
`;

export const PlusIcon = ({ className }) => (
  <Svg viewbox="0 0 40.332 39.902" className={className}>
    <g
      id="Icon_feather-plus-circle"
      dataName="Icon feather-plus-circle"
      transform="translate(-1.5 -1.5)"
    ></g>
    <path
      fill="currentColor"
      dataName="Pfad 5"
      d="M40.332,21.451A18.667,18.667,0,0,1,3,21.451a18.667,18.667,0,0,1,37.332,0Z"
      stroke="#fff4f4"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
    ></path>
    <path
      fill="currentColor"
      dataName="Pfad 6"
      d="M18,12V24"
      transform="translate(3.666 3.451)"
      stroke="#fff4f4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    ></path>
    <path
      fill="currentColor"
      dataName="Pfad 7"
      d="M12,18H24"
      transform="translate(3.666 3.451)"
      stroke="#fff4f4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    ></path>
  </Svg>
);
