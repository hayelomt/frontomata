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
  settings: { create: true, update: true, delete: true, viewItem: true },
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
  renderTable?: string,             // Actual rendering function(typescript)
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
- [x] account management
- [x] edit container loader fix
- [x] date fields on generic table
- [x] table item rendering customization
- [x] file reset on form reset (patch not actual soln)
- [x] add view mode to table
- [] add view modal / page
- [] add array support
- [x] refactor form data parser
- [] search fields customization
- [x] single mode fix
- [] image form
- [] move deletion to hook

#### Optional

- [] continue adding check on create
- [] replace rich text editor
- [] Stylize file chooser
- [] Table customization, custom render
- [x] date stylization
- [] Add media upload manager(optional)
- [] fix richTextModule import path
- [] firebase support

### Bugs

- [x] fix login unmounted component error
- [x] remove rest form on edit and single mode
- [x] update file non update reuires image bug
