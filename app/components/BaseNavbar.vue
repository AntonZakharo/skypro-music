<template>
  <nav class="main__nav nav">
    <RouterLink to="/">
      <div class="nav__logo logo">
        <img class="logo__image" src="@/assets/imgs/logo.png" />
      </div>
    </RouterLink>
    <div class="nav__burger burger" @click="showMenu">
      <span class="burger__line"></span>
      <span class="burger__line"></span>
      <span class="burger__line"></span>
    </div>
    <div v-show="isShow" class="nav__menu menu">
      <ul class="menu__list">
        <li class="menu__item">
          <RouterLink to="/" class="menu__link">Главное</RouterLink>
        </li>
        <li class="menu__item">
          <RouterLink to="/favorites" class="menu__link">Мой плейлист</RouterLink>
        </li>
        <li class="menu__item" v-if="refresh">
          <RouterLink to="/auth" class="menu__link">Войти</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup>
const isShow = ref(false)
function showMenu() {
  isShow.value = isShow.value ? false : true
}
onMounted(() => {
  const refresh = localStorage.getItem('refresh')
})
</script>
<style scoped>
.main__nav {
  width: 244px;
  background-color: #181818;
  padding: 20px 0 20px 36px;
}
.nav__logo {
  width: 113.33px;
  height: 43px;
  padding: 13px 0 13px 0;
  background-color: transparent;
  margin-bottom: 20px;
}
.logo__image {
  width: 113.33px;
  height: 17px;
  color: #181818;
}

.nav__burger {
  width: 20px;
  height: 36px;
  padding: 13px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  cursor: pointer;
}

.nav__menu {
  display: block;
  visibility: visible;
}
.burger__line {
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: #d3d3d3;
}
.menu__list {
  padding: 18px 0 10px 0;
  position: relative;
  animation: openMenu 0.3s ease;
}
@keyframes openMenu {
  from {
    left: -100px;
  }
  to {
    left: 0px;
  }
}

.menu__item {
  padding: 5px 0;
  margin-bottom: 16px;
}

.menu__link {
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
</style>
