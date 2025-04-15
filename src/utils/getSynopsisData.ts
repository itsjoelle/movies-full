export const getIdThroughURL = () => {
  const pageURL = window.location.href;
  const pageID = pageURL.split('/');
  const type = pageID[pageID.length - 2];
  const id = pageID[pageID.length - 1];

  return { type, id };
};
