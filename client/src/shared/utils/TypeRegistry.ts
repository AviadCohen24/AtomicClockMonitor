import { IClock } from '../../main/Clocks/IClock';

export const TypeRegistryMap: Map<string, { new (...args: any[]): IClock }> =
  new Map();

export function RegisterType(typeId: string) {
  return (constructor: { new (...args: any[]): IClock }) => {
    TypeRegistryMap.set(typeId, constructor);
  };
}

export function CreateInstance(typeId: string, ...args: any[]): IClock | null {
  const ClockType = TypeRegistryMap.get(typeId);
  if (ClockType) {
    return new ClockType(...args);
  }
  return null;
}
