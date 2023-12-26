export const applySearch = (photos, search) => {
  const filtered = photos.filter((photo) => {
    const searchSlug = photo?.slug + photo?.alt_description;
    return searchSlug.toLowerCase().includes(search?.toLowerCase());
  });

  return filtered;
};

export const formatUserName = (photo) => {
  let formattedUserName = "NA";

  if (photo?.firstName) {
    formattedUserName = photo?.firstName;
  }

  if (photo?.lastName) {
    formattedUserName += photo?.lastName;
  }
  return formattedUserName;
};
