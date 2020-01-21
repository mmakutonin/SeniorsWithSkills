<template>
  <div class='cust-vh-full w3-theme-light'>
    <Header />
    <div class='w3-container cust-mainview'>
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './components/AppHeader'

export default {
  name: 'app',
  components: {
    Header
  }
}
</script>
