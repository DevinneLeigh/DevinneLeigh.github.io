import { ref, watch } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

function applyTheme(value) {
  document.documentElement.setAttribute('data-theme', value)
}

applyTheme(theme.value)

watch(theme, (newTheme) => {
  applyTheme(newTheme)
  localStorage.setItem('theme', newTheme)
})

export function useTheme() {
  const toggle = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { theme, toggle }
}
