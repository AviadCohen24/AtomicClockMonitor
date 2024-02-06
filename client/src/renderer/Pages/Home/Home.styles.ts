import styled from 'styled-components';
import { Button } from '@mui/material';

export const ContentContainer = styled.div`
  border: 1px solid #713893;
  border-radius: 25px;
  padding: 1rem;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

export const StartButton = styled(Button)`
  justify-self: center;
  align-self: center;
  margin-bottom: 50px;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
`;
