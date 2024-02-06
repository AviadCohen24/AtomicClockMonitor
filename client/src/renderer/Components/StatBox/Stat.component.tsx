import * as MuiIcons from '@mui/icons-material';
import { ValidationProps } from '../../../shared/utils/StatValidations';
import { StatContainer, StatText } from './Stat.styles';

export type IconNames = keyof typeof MuiIcons;

export type StatProps = {
  label: string;
  value: string;
  icon: IconNames;
  validationFunction: ({ value }: ValidationProps) => string;
};

export default function StatBox(props: StatProps) {
  const { label, value, icon, validationFunction } = props;

  const IconComponent = MuiIcons[icon];

  return (
    <StatContainer backgroundcolor={validationFunction({ value })}>
      {IconComponent ? <IconComponent /> : null}
      <StatText>{label}:</StatText>
      <StatText> {value}</StatText>
    </StatContainer>
  );
}
