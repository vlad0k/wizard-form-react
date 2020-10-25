const getCurrentStepByHash = (hash: string) => {
  const index = STEPS.findIndex(({ url }) => url === hash.slice(1));
  return index === -1 ? 0 : index;
};