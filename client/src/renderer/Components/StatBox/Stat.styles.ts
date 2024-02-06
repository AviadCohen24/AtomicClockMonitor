import styled from 'styled-components';

interface StatContainerProps {
  backgroundcolor: string;
}

export const StatContainer = styled.div<StatContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => props.backgroundcolor};
`;

export const StatText = styled.h2`
  font-size: 16px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
`;
