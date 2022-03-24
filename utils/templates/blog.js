module.exports = {
  folderPrefix: '',
  modelName: 'Blog',
  modelToken: 'blog',
  endpoint: 'blogs',
  url: '/blogs',
  settings: {
    create: true,
    update: true,
    delete: true,
  },
  data: [
    [
      {
        type: 'text',
        subtype: 'text',
        name: 'title',
        label: 'Title',
        flexGrow: 1,
        placeholder: 'Title',
        showOnTable: true,
        align: 'right',
        tableLabel: 'Some Title',
      },
      {
        type: 'placeholder',
        flexGrow: 2,
      },
      {
        type: 'text',
        subtype: 'number',
        name: 'counter',
        label: 'Counter',
        flexGrow: 1,
        placeholder: 'Counter',
        showOnTable: true,
      },
    ],
    [
      {
        type: 'textarea',
        subtype: 'text',
        name: 'description',
        label: 'Description',
        flexGrow: 1,
        placeholder: 'Description',
        showOnTable: true,
      },
    ],
    [
      {
        type: 'file',
        name: 'image',
        label: 'Profile Image',
        flexGrow: 1,
      },
    ],
    [
      {
        type: 'select',
        flexGrow: 1,
        name: 'selection',
        label: 'Drop',
        options: [
          { value: 'ten', label: 'Ten' },
          { value: 'twenty', label: 'Twenty' },
          { value: 'thirty', label: 'Thirty' },
        ],
        showOnTable: true,
      },
    ],
    [
      {
        type: 'radio',
        flexGrow: 1,
        name: 'color',
        label: 'Favorite color',
        options: [
          { value: 'green', label: 'Green' },
          { value: 'red', label: 'Red' },
          { value: 'blue', label: 'Blue' },
        ],
        showOnTable: true,
      },
      {
        type: 'radio',
        subtype: 'number',
        flexGrow: 1,
        name: 'tune_level',
        label: 'Tune level',
        options: [
          { value: 10, label: 10 },
          { value: 20, label: 20 },
          { value: 30, label: 30 },
        ],
        showOnTable: true,
      },
    ],
    [
      {
        type: 'checkbox',
        flexGrow: 1,
        name: 'conditions',
        label: 'Accept TOS',
      },
    ],
    [
      {
        type: 'date',
        name: 'created_at',
        label: 'Created At',
      },
    ],
  ],
};
