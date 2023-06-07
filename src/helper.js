// helper.js
export const getRecipeIdFromUri = (uri) => {
  const regex = /#recipe_(.*)/;
  const match = uri.match(regex);
  return match ? match[1] : null;
};
