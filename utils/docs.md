## Data format

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
