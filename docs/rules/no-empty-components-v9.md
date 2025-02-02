# FluentUI components should not be empty (`@microsoft/fluentui-jsx-a11y/no-empty-components-v9`)

<!-- end auto-generated rule header -->

Provide labels to identify all form controls, including text fields, checkboxes, radio buttons, and drop-down menus. In most cases, this is done by using the label element.

<https://www.w3.org/WAI/tutorials/forms/labels/>

## Rule Details

This rule aims to prevent missing text and info for users.

Examples of **incorrect** code for this rule:

```jsx
<Text></Text>
```

```jsx
<Label></Label>
```

Examples of **correct** code for this rule:

```jsx
<Label size="small">Small</Label>
```

```jsx
<Label size="small">Small</Label>
```

```jsx
<Text>This is an example of the Text component's usage.</Text>
```

