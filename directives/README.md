# Custom Directives Examples

Tài liệu về các custom directives trong dự án.

## Danh sách Directives

1. **v-click-outside** - Phát hiện click bên ngoài element
2. **v-focus** - Auto focus khi element được mount
3. **v-lazy-load** - Lazy load images với Intersection Observer
4. **v-tooltip** - Hiển thị tooltip khi hover
5. **v-copy** - Copy text vào clipboard khi click

## Cách sử dụng

```vue
<template>
  <!-- Click outside -->
  <div v-click-outside="handleClickOutside">
    Modal content
  </div>

  <!-- Auto focus -->
  <input v-focus type="text" />

  <!-- Lazy load image -->
  <img v-lazy-load="imageUrl" alt="Lazy loaded" />

  <!-- Tooltip -->
  <button v-tooltip="'Click me!'">Hover</button>

  <!-- Copy to clipboard -->
  <div v-copy="textToCopy">Click to copy</div>
</template>
```
