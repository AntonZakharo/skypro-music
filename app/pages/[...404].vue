<template>
  <NuxtLayout name="default">
    <div class="centerblock__search search">
      <svg class="search__svg">
        <use xlink:href="@/assets/icons/sprite.svg#icon-search" />
      </svg>
      <input class="search__text" type="search" placeholder="Поиск" name="search" />
    </div>
    <div class="error">
      <h1 class="error__status">404</h1>
      <h3 class="error__message">Страница не найдена 😭</h3>
      <p class="error__message2">
        Возможно, она была удалена <br />
        или перенесена на другой адрес
      </p>
      <NuxtLink to="/">
        <button class="error__button">Вернуться на главную</button>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.centerblock__search {
  width: 100%;
  border-bottom: 1px solid #4e4e4e;
  margin-bottom: 51px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.search__svg {
  width: 17px;
  height: 17px;
  margin-right: 5px;
  stroke: #ffffff;
  fill: transparent;
}

.search__text {
  -webkit-box-flex: 100;
  -ms-flex-positive: 100;
  flex-grow: 100;
  background-color: transparent;
  border: none;
  padding: 13px 10px 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  outline: none;
}

.search__text::-webkit-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text:-ms-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text::-ms-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text::placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80%;
  &__status {
    font-weight: 400;
    font-size: 160px;
    line-height: 168px;
  }
  &__message {
    font-weight: 400;
    font-size: 32px;
    line-height: 40px;
    margin-bottom: 8px;
  }
  &__message2 {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.3%;
    text-align: center;
    margin-bottom: 36px;
  }
  &__button {
    background-color: #580ea2;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.3%;
    padding: 12px 46px;
    color: white;
    border-radius: 6px;
    border: none;
    outline: none;
    transition: 0.3s;
    &:hover {
      background-color: #3f007d;
    }
    &:active {
      background-color: #271a58;
    }
  }
}
</style>
