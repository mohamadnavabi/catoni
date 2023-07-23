export const isAddressCovered = (address: any, zones: any): boolean => {
  if (!zones.length) return true;

  const city = address.city;
  const state = city.state;
  const isStateCovered = zones.findIndex(
    (zone: any) => zone.states.findIndex((s: any) => s.id === state.id) !== -1
  );
  const isCitiesCovered = zones.findIndex(
    (zone: any) => zone.cities.findIndex((c: any) => c.id === city.id) !== -1
  );

  return isStateCovered !== -1 && isCitiesCovered !== -1;
};
