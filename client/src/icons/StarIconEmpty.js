import styled from 'styled-components/macro';
import Icon from './Icon';

const Svg = styled(Icon)`
  width: 31px;
  height: 30px;
`;

export const StarIconEmpty = ({ className }) => (
  <Svg viewBox="0 0 30.849 29.339" className={className}>
    <path
      fill="currentColor"
      dataName="Icon metro-star-empty"
      d="M33.419,13.889,22.761,12.341,17.995,2.683l-4.766,9.658L2.571,13.889l7.712,7.517L8.462,32.022l9.533-5.012,9.533,5.012L25.707,21.407l7.712-7.517ZM17.995,24.628l-6.732,3.539,1.286-7.5L7.1,15.362l7.527-1.094,3.366-6.82,3.366,6.82,7.526,1.094-5.446,5.309,1.286,7.5-6.732-3.539Z"
      transform="translate(-2.571 -2.683)"
    />
  </Svg>
);
