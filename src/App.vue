<template>
  <div :class="$style.container">
  <form class="pt-3">
        <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              class="form-control"
              :class="{'is-invalid': $v.email.$error}"
              type="email"
              @blur="$v.email.$touch()"
              v-model="email">
            <div class="invalid-feedback">
              <div v-if="!$v.email.required">Email feild is required</div>
              <div v-if="!$v.email.email">This feild shoud be an email</div>
              <div v-if="!$v.email.uniqEmail">this email is used</div>
            </div>
        </div>
        <div class="form-group">
          <label for="password">password</label>
          <input
            id="password"
            class="form-control"
            :class="{'is-invalid': $v.password.$error}"
            type="password"
            @blur="$v.password.$touch()"
            v-model="password">
          <div class="invalid-feedback">
            <div v-if="!$v.password.minLength">
              MINleNGHT OF PASSWORD is {{ $v.password.$params.minLength.min }}. NOW IT IS {{  password.length }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="confirmPass">Confirm password</label>
          <input
            id="confirmPass"
            class="form-control"
            :class="{'is-invalid': $v.confirmPass.$error}"
            type="password"
            @blur="$v.confirmPass.$touch()"
            v-model="confirmPass">
          <div class="invalid-feedback">
            <div v-if="!$v.confirmPass.sameAs">
              password shoud be the same
            </div>
          </div>
        </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPass: ''
    }
  },
  validations: {
    email: {
      required,
      email,
      uniqEmail: function(newEmail) {
        if (newEmail === '') return true

        return new Promise((resolve, reject) => {
           setTimeout(() => {
             const value = newEmail !== 'test@mail.ru'
              resolve(value)
           }, 3000)
        })
      }
    },
    password: {
       minLength:  minLength(6)
    },
    confirmPass: {
      sameAs: sameAs('password')
    }
  }
}
</script>

<style lang="scss" module>
  .container {
    width: 80%;
    margin: 0 auto;
  }
</style>
