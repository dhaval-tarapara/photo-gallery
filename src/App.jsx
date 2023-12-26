import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";

import { Container, ImageList, ImageListItem } from "@mui/material";

import { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import DetailsDialog from "./components/DetailsDialog";
import NavBar from "./components/NavBar";
import { applySearch } from "./utils/funcs";

const unsplash = createApi({
  accessKey: "AtJtRXVQIBX4h-Y0iD-A8ufF_-82YSmsEG5s5Ja6nss",
});

function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState({});
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (photo) => {
    setSelectedPhoto(photo);
    setOpen(true);
  };

  const handleSearchChange = (search) => {
    setSearch(search);
  };

  const photosToShow = search ? applySearch(photos, search) : photos;

  useEffect(() => {
    const loadPhotos = async () => {
      // const result = await unsplash.photos.get();
      const result = await unsplash.photos.list({ page: 1, perPage: 20 });
      setPhotos(result?.response?.results);
      // handle success here
      // const photo = result.response;
      // console.log(photo);
    };

    loadPhotos();
  }, []);

  return (
    <>
      <DetailsDialog
        isOpen={open}
        onClose={handleClose}
        photo={selectedPhoto}
      />
      <Container maxWidth="lg">
        <NavBar onSearchChange={handleSearchChange} />

        <ImageList variant="masonry" cols={3} gap={8}>
          {photosToShow?.map((photo) => (
            <ImageListItem key={photo?.urls?.regular}>
              <img
                srcSet={`${photo?.urls?.regular}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${photo?.urls?.regular}?w=248&fit=crop&auto=format`}
                alt={photo?.alt_description}
                loading="lazy"
                // onClick={() => setSelectedPhoto(photo)}
                onClick={() => handleClickOpen(photo)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </>
  );
}

export default App;
