# Getting Started

## Installation

Install Whelk UI using npm:
```bash
npm install whelk-ui
```

## Import Components

You can import components individually:
```javascript
import { ButtonComponent } from 'whelk-ui'
import 'whelk-ui/dist/style.css'
```

Or install all components globally:
```javascript
import { createApp } from 'vue'
import WhelkUI from 'whelk-ui'
import 'whelk-ui/dist/style.css'

const app = createApp(App)
app.use(WhelkUI)
```

## Your First Component
```vue
<template>
  <ButtonComponent variant="primary" @click="handleClick">
    My Button
  </ButtonComponent>
</template>

<script setup>
const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```