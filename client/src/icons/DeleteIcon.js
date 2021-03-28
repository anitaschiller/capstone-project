import styled from 'styled-components/macro';
import Icon from './Icon';

const Svg = styled(Icon)`
  width: 15px;
  height: 22px;
`;

export const DeleteIcon = ({ className }) => (
  <Svg viewBox="0 0 15.583 22" className={className}>
    <path
      fill="currentColor"
      dataName="Icon material-delete"
      d="M8.613,24.056A2.35,2.35,0,0,0,10.839,26.5h8.9a2.35,2.35,0,0,0,2.226-2.444V9.389H8.613ZM23.083,5.722h-3.9L18.074,4.5H12.509L11.4,5.722H7.5V8.167H23.083Z"
      transform="translate(-7.5 -4.5)"
    ></path>
  </Svg>
);
