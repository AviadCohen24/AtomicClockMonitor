import { useContext } from 'react';
import {
  DateValidation,
  GpsValidation,
  LatLngValidation,
  SatelliteValidation,
  TimeValidation,
} from '../../../shared/utils/StatValidations';
import StatBox from '../../Components/StatBox/Stat.component';
import { UserActionHandlers } from '../../hooks/userActionHandlers.hook';
import { ContentContainer, StartButton, StatsContainer } from './Home.styles';
import { StatusContext } from '../../Context/Status.context';

export type HomeProps = {
  userActionHandlers: UserActionHandlers;
};

export default function Home(props: HomeProps) {
  const { userActionHandlers } = props;

  const currentStatus = useContext(StatusContext);

  const handleStartRequest = () => {
    userActionHandlers.handleStartMonitor();
  };

  return (
    <ContentContainer>
      <StartButton variant="contained" onClick={handleStartRequest}>
        התחל ניטור שעון
      </StartButton>
      <StatsContainer>
        <StatBox
          label="GPS"
          value={currentStatus.status.GPS}
          icon="GpsFixed"
          validationFunction={GpsValidation}
        />
        <StatBox
          label="Satellite"
          value={currentStatus.status.NumOfSat}
          icon="SatelliteAlt"
          validationFunction={SatelliteValidation}
        />
        <StatBox
          label="Date"
          value={currentStatus.status.Date}
          icon="DateRange"
          validationFunction={DateValidation}
        />
        <StatBox
          label="Time"
          value={currentStatus.status.Time}
          icon="AccessTime"
          validationFunction={TimeValidation}
        />
        <StatBox
          label="Lat"
          value={currentStatus.status.Lat}
          icon="PersonPinCircle"
          validationFunction={LatLngValidation}
        />
        <StatBox
          label="Lng"
          value={currentStatus.status.Lng}
          icon="PersonPinCircle"
          validationFunction={LatLngValidation}
        />
      </StatsContainer>
      {/* <h1>Inisde ContentContainer in Home Component</h1> */}
    </ContentContainer>
  );
}
