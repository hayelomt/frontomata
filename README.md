# Frontomata

Generating admin template base with code

### Template File Format Placed in utils/templates/

```
module.exports = {
  modelName: string,
  modelToken: string,
  collectionType: boolean,
  folderPrefix: string,
  endpoint: { create: string, update: string, delete: string, read: string, },
  url: string,
  settings: { create: true, update: true, delete: true },
  data: [],
}
```

### Data format

```
{
  name: string,
  label: string,
  type: 'text' | 'richText' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'date',
  subtype?: 'text' | 'number',
  flexGrow: number,
  placeholder?: string,
  showOnTable?: boolean,
  tableLabel?: string,
} || {
  type: 'placeholder',
  flexGrow: number
}

// For type = 'radios' | 'select'
{
  options: [{ value: string | number, label: string }]
}
```

### TODO

- [x] Basic template generator
- [x] CRUD customization
- [x] date format
- [x] size small for forms
- [x] Add Profile menu on header
- [x] Auth handling
- [x] Single type generator
- [x] Delete integration
- [x] Rich text support
- [] account management

#### Optional

- [] continue adding check on create
- [] replace rich text editor
- [] Stylize file chooser
- [] Table customization, custom render
- [] date stylization
- [] Add media upload manager(optional)
- [] fix richTextModule import path
- [] firebase support
