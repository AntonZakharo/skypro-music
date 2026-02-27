<template>
  <div class="wrapper">
    <div class="container-enter">
      <div class="modal__block">
        <form class="modal__form-login" action="#">
          <a href="../">
            <div class="modal__logo">
              <img src="@/assets/imgs/logo_modal.png" alt="logo" />
            </div>
          </a>
          <input
            class="modal__input login"
            type="text"
            name="login"
            placeholder="Почта"
            v-model="email"
          />
          <input
            class="modal__input password"
            type="password"
            name="password"
            placeholder="Пароль"
            v-model="password"
          />
          <input
            class="modal__input password-double"
            type="password"
            name="password"
            placeholder="Повторите пароль"
            v-model="password2"
            v-if="isReg"
          />
          <div class="loading" v-if="loading">Загрузка...</div>
          <button
            class="modal__btn-enter"
            :style="{ marginTop: loading ? '20px' : '60px' }"
            v-if="!isReg"
            @click.prevent="log"
          >
            Войти
          </button>
          <button class="modal__btn-signup" v-if="!isReg" @click.prevent="isReg = true">
            Зарегистрироваться
          </button>
          <button class="modal__btn-enter" v-if="isReg" @click.prevent="reg">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
useHead({
  title: 'Вход | Skypro.Music',
})

const isReg = ref(false)
const email = ref('')
const password = ref('')
const password2 = ref('')
const error = ref('')
const response = ref('')
const loading = ref(false)

const router = useRouter()

async function log() {
  try {
    if (email.value && password.value) {
      loading.value = true
      await login(email.value, password.value)
      const response = await getToken(email.value, password.value)
      localStorage.setItem('access', response.access)
      localStorage.setItem('refresh', response.refresh)
      loading.value = false
      router.push('/')
    }
  } catch (error) {
    console.error(error)
  }
}
async function reg() {
  if (email.value && password.value) {
    if (password.value == password2.value) {
      try {
        response.value = await register(email.value, password.value, email.value)
        if (response.value.success) {
          isReg.value = false
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      error.value = 'Пароли различаются'
    }
  } else {
    error.value = 'Не все поля заполнены'
  }
}
</script>
<style scoped>
.wrapper {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
}

.container-enter {
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: rgba(0, 0, 0, 0.85);
}

.modal__btn-enter:hover {
  background-color: #3f007d;
}

.modal__btn-signup:hover {
  background-color: #f4f5f6;
}

.modal__btn-enter:active {
  background-color: #271a58;
}

.modal__btn-signup:active {
  background-color: #d9d9d9;
}

.modal__block {
  position: absolute;
  z-index: 2;
  left: calc(50% - (366px / 2));
  top: calc(50% - (439px / 2));
  opacity: 1;
}

.modal__form-login {
  width: 366px;
  height: 439px;
  background-color: #ffffff;
  border-radius: 12px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 43px 47px 47px 40px;
}

.modal__form-login input:first-child {
  margin-bottom: 30px;
}

.modal__logo {
  width: 140px;
  height: 21px;
  margin-bottom: 34px;
  background-color: transparent;
}

.modal__logo img {
  width: 140px;
  height: auto;
}

.modal__input {
  width: 100%;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #d0cece;
  padding: 8px 1px;
  outline: none;
}

.modal__input::-webkit-input-placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #d0cece;
}

.modal__input:-ms-input-placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #d0cece;
}

.modal__input::-ms-input-placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #d0cece;
}

.modal__input::placeholder {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #d0cece;
}

.modal__btn-enter {
  width: 278px;
  height: 52px;
  background-color: #580ea2;
  border-radius: 6px;
  margin-top: 60px;
  margin-bottom: 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: white;
  border: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.modal__btn-enter a {
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #ffffff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.modal__btn-signup {
  width: 278px;
  height: 52px;
  background-color: transparent;
  border: 1px solid #d0cece;
  border-radius: 6px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #000000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.modal__btn-signup a {
  width: 100%;
  height: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
  color: #000000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.login {
  margin-bottom: 30px;
}
.loading {
  color: black;
  margin-top: 20px;
}
.password-double {
  margin-top: 30px;
}
.success {
  width: 500px;
  height: 100px;
  position: absolute;
  top: 100px;
  left: 50%;
  border-radius: 15px;
  animation: goDown 0.7s ease;
  background-color: rgb(10, 109, 10);
  color: white;
  transform: translate(-50%, 0);
  font-family: 'StratosSkyeng';
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: -0.05px;
  padding: 15px 0;
  text-align: center;
}
.success-box {
  position: relative;
}
.success__img {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 10px;
  right: 10px;
}

@keyframes goDown {
  from {
    top: -100px;
  }
  to {
    top: 75px;
  }
}
</style>
