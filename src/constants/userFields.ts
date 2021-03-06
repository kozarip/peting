import { localizations } from '../services/localizations';

export const gender = [
  { text: localizations.t('female'), key: 0 },
  { text: localizations.t('male'), key: 1 },
];

export const age = {
  label: localizations.t('age'),
};

export const height = {
  label: localizations.t('height'),
};

export const email = {
  label: localizations.t('email'),
};

export const userName = {
  label: localizations.t('name'),
};

export const animalName = {
  label: localizations.t('animalName'),
};

export const hairColor = {
  label: localizations.t('hairColor'),
  options: [
    { label: localizations.t('blonde'), value: 'blonde' },
    { label: localizations.t('brown'), value: 'brown' },
    { label: localizations.t('red'), value: 'red' },
    { label: localizations.t('black'), value: 'black' },
    { label: localizations.t('bald'), value: 'bald' },
  ],
};

export const animalType = {
  label: localizations.t('species'),
  options: [
    { label: localizations.t('dog'), value: 'dog' },
    { label: localizations.t('cat'), value: 'cat' },
    { label: localizations.t('ferret'), value: 'ferret' },
    { label: localizations.t('horse'), value: 'horse' },
    { label: localizations.t('bird'), value: 'bird' },
    { label: localizations.t('fish'), value: 'fish' },
    { label: localizations.t('turtle'), value: 'turtle' },
    { label: localizations.t('snake'), value: 'snake' },
    { label: localizations.t('lizard'), value: 'lizard' },
    { label: localizations.t('dwarfPig'), value: 'dwarf pig' },
    { label: localizations.t('hedgehog'), value: 'hedgehog' },
    { label: localizations.t('rabbit'), value: 'rabbit' },
    { label: localizations.t('chinchilla'), value: 'chinchilla' },
    { label: localizations.t('degu'), value: 'degu' },
    { label: localizations.t('guineaPig'), value: 'guinea pig' },
    { label: localizations.t('hamster'), value: 'hamster' },
    { label: localizations.t('mouse'), value: 'mouse' },
    { label: localizations.t('rat'), value: 'rat' },
    { label: localizations.t('other'), value: 'other' },
    { label: localizations.t('noAnimal'), value: 'no' },
  ],
};

export const animalSize = {
  label: localizations.t('animalSize'),
  options: [
    { label: localizations.t('small'), value: 'small' },
    { label: localizations.t('medium'), value: 'medium' },
    { label: localizations.t('big'), value: 'big' },
  ],
};
export const smokeFrequency = {
  label: localizations.t('smoking'),
  options: [
    { label: localizations.t('never'), value: 'never' },
    { label: localizations.t('rarely'), value: 'rarely' },
    { label: localizations.t('often'), value: 'often' },
  ],
};

export const hobbies = {
  label: localizations.t('hobbies'),
  options: [
    { label: localizations.t('basketball'), value: 'basketball' },
    { label: localizations.t('tabletennis'), value: 'tabletenis' },
    { label: localizations.t('tennis'), value: 'tenis' },
    { label: localizations.t('football'), value: 'football' },
    { label: localizations.t('hiking'), value: 'hiking' },
    { label: localizations.t('handball'), value: 'handball' },
    { label: localizations.t('fineArts'), value: 'fineArts' },
    { label: localizations.t('theatre'), value: 'theatre' },
    { label: localizations.t('cinema'), value: 'cinema' },
    { label: localizations.t('running'), value: 'running' },
    { label: localizations.t('reading'), value: 'reading' },
    { label: localizations.t('esotericism'), value: 'esotericism' },
    { label: localizations.t('gastronomy'), value: 'gastronomy' },
    { label: localizations.t('chess'), value: 'chess' },
    { label: localizations.t('boardGame'), value: 'boardGame' },
    { label: localizations.t('climbing'), value: 'climbing' },
    { label: localizations.t('traveling'), value: 'traveling' },
  ],
};

export const cityName = {
  label: localizations.t('yourCity'),
};

export const images = {
  label: localizations.t('images'),
};

export const animalImages = {
  label: localizations.t('animalImages'),
};

export const bio = {
  label: localizations.t('bio'),
};
