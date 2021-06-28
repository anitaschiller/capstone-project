import styled from 'styled-components/macro';
import Icon from './Icon';

const Svg = styled(Icon)`
  width: 38px;
  height: 39px;
`;

export const FilterDeleteIcon = ({ className }) => (
  <Svg viewbox="0 0 37.72 38.447" className={className}>
    <g dataName="Gruppe 1" transform="translate(-79.852 -234.451)">
      <path
        dataName="Icon metro-filter"
        d="M17.995,1.928c-8.519,0-15.424,2.158-15.424,4.82V9.64L14.139,21.208v9.64c0,1.065,1.726,1.928,3.856,1.928s3.856-.863,3.856-1.928v-9.64L33.419,9.64V6.748c0-2.662-6.906-4.82-15.424-4.82ZM5.414,6.11A13.12,13.12,0,0,1,8.345,4.981a38.025,38.025,0,0,1,9.65-1.125,38.025,38.025,0,0,1,9.65,1.125A13.122,13.122,0,0,1,30.576,6.11a3.354,3.354,0,0,1,.852.638,3.356,3.356,0,0,1-.852.638,13.122,13.122,0,0,1-2.931,1.129,38.025,38.025,0,0,1-9.65,1.125,38.025,38.025,0,0,1-9.65-1.125A13.12,13.12,0,0,1,5.414,7.386a3.357,3.357,0,0,1-.852-.638,3.357,3.357,0,0,1,.852-.638Z"
        transform="translate(78.429 239.072)"
        fill="currentColor"
      />
      <line
        dataName="Linie 1"
        y1="36.349"
        x2="35.576"
        transform="translate(80.924 235.5)"
        fill="currentColor"
        stroke="var(--signal)"
        strokeWidth="3"
      />
    </g>
  </Svg>
);
