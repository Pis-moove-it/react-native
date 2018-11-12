import strings from '../../localization/';

const recyclableMaterials = [
  {
    id: '1',
    name: strings.plastic,
    value: 'Plastic',
  },
  {
    id: '2',
    name: strings.glass,
    value: 'Glass',
  },
  {
    id: '3',
    name: strings.trash,
    value: 'Trash',
  },
];

export const possibleContainerStatus = [
  {
    id: '1',
    name: strings.ok,
    value: 'Ok',
  },
  {
    id: '2',
    name: strings.damaged,
    value: 'Damaged',
  },
  {
    id: '3',
    name: strings.removed,
    value: 'Removed',
  },
];

export default recyclableMaterials;
