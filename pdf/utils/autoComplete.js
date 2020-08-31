import * as autoComplete from '../assets/autocomplete.json';

const data = autoComplete.data.map((item, index) => ({...item, id: index}));

const getSuggestions = (keyword) => {
  return data.filter((item) =>
    item.madde.startsWith(keyword.toLocaleLowerCase('tr')),
  );
};

export {getSuggestions};
