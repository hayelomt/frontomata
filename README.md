# Frontomata

Generating admin template base with code

### Template File Format Placed in utils/templates/

```
module.exports = {
  folderPrefix: '',
  modelName: 'Blog',
  modelToken: 'blog',
  endpoint: '/blogs',
  data: [],
}
```

### Data format

```
{
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'date' | 'placeholder',
  subtype?: 'text' | 'number',
  name: string,
  label: string,
  flexGrow: number,
  placeholder: string,
}

// For type = 'radios' | 'select'
{
  options: [{ value: string | number, label: string }]
}
```

### TODO

- [x] Basic template generator
- [] Auth handling
- [] Add Profile menu on header
- [] Single type generator
- [] Rich text support
- [] CRUD customization
- [] Delete integration
- [] Table customization
- [] Add media upload manager
