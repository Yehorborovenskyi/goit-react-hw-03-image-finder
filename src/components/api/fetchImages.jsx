// import axios from 'axios';

// axios.defaults.baseURL = `https://pixabay.com/api`;

// export const fetchImages = async (inputValue, pageNr) => {
//   const response = await axios.get(`/?q=${inputValue}&page=${pageNr}&key=29588079-fbc492831fdad231bf7222b96&image_type=photo&orientation=horizontal&per_page=12`
//   );
//   return response.data.hits.map(image => {
//     return {
//       id: image.id,
//       webformatURL: image.webformatURL,
//       largeImageURL: image.largeImageURL,
//       tags: image.tags,
//     };
//   });
// };
import axios from 'axios';

const API_KEY = '34440201-5499953839d306eec21c3a246';
const BASE_URL = 'https://pixabay.com/api';

axios.defaults.baseURL = BASE_URL;

export const fetchImages = async (inputValue, pageNr) => {
  try {
    const { data } = await axios.get('/', {
      params: {
        q: inputValue,
        page: pageNr,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });

    return data.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
