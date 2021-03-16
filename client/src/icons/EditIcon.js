import styled from 'styled-components';
import Icon from './Icon';

const Svg = styled(Icon)`
  width: 19px;
  height: 22px;
`;

export const EditIcon = ({ className }) => (
  <Svg viewbox="0 0 19 22" className={className}>
    <path
      fill="currentColor"
      data-name="Icon awesome-pen"
      d="M11.194,4.007l4.929,5.5L5.42,21.453l-4.395.541a.982.982,0,0,1-1.02-1.139l.489-4.908,10.7-11.94Zm7.978-.819L16.857.6a1.716,1.716,0,0,0-2.615,0l-2.177,2.43,4.929,5.5,2.177-2.43a2.237,2.237,0,0,0,0-2.918Z"
      transform="translate(0.001 -0.001)"
    ></path>
  </Svg>
);
