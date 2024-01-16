export const calculateTotalStats = (item) => {
  return (
    item.hp +
    item.attack +
    item.defense +
    item.special_attack +
    item.special_defense +
    item.speed
  );
};

export const calculateMinMaxPower = (
  currentChunkData,
  setMinPower,
  setMaxPower
) => {
  const powerValues = currentChunkData.map((item) =>
    calculateTotalStats(item)
  );
  const minValue = Math.min(...powerValues);
  const maxValue = Math.max(...powerValues);

  setMinPower(minValue);
  setMaxPower(maxValue);
};
