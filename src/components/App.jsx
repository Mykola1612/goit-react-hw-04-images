import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { fetchImage } from './fetch';
import { useEffect, useState } from 'react';

export const App = () => {
  const [element, setElement] = useState([]);
  const [loader, setLoader] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [perPage] = useState(12);
  const [page, setPage] = useState(1);
  const [bigPhoto, setBigPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // const fetchPhoto = async ({ inputValue, page }) => {
  //   try {
  //     setLoader(true);

  //     const data = await fetchImage({ inputValue, perPage, page });

  //     setElement(prevState => {
  //       return [...prevState, ...data.hits];
  //     });
  //     setTotalHits(data.totalHits);
  //   } catch (error) {
  //     console.error('Ошибка при загрузке данных:', error);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    const fetchPhoto = async ({ inputValue, page }) => {
      try {
        setLoader(true);

        const data = await fetchImage({ inputValue, perPage, page });

        setElement(prevState => {
          return [...prevState, ...data.hits];
        });
        setTotalHits(data.totalHits);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoader(false);
      }
    };

    fetchPhoto({
      inputValue: inputValue,
      page: page,
    });
  }, [inputValue, page, perPage]);

  const onSubmit = data => {
    if (data !== inputValue) {
      setPage(1);
      setElement([]);
      setInputValue(data);
    }
  };

  const handleOnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleUrlOnClick = bigPhoto => {
    setBigPhoto(bigPhoto);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <div>
      {loader && <Loader />}
      <Searchbar onSubmit={onSubmit} />
      {element.length !== 0 && (
        <ImageGallery>
          <ImageGalleryItem
            elements={element}
            toggleModal={toggleModal}
            handleUrlOnClick={handleUrlOnClick}
          />
        </ImageGallery>
      )}
      {element.length !== 0 && page < Math.ceil(totalHits / perPage) && (
        <Button handleOnClick={handleOnClick} />
      )}

      {showModal && <Modal photo={bigPhoto} toggleModal={toggleModal} />}
    </div>
  );
};
