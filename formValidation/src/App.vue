<template>
  <div id="app">
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">Nombre de Usuario:</label>
        <input type="text" v-model="userData.username" v-validate="'required'" name="username" />
        <span v-show="errors.has('username')">{{ errors.first('username') }}</span>
      </div>

      <div>
        <label for="email">Correo:</label>
        <input type="email" v-model="userData.email" v-validate="'required|email'" name="email" />
        <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
      </div>

      <div>
        <label for="password">Contraseña:</label>
        <input type="password" v-model="userData.password" v-validate="'required|min:6'" name="password" />
        <span v-show="errors.has('password')">{{ errors.first('password') }}</span>
      </div>

      <div>
        <label for="zipcode">Código Postal:</label>
        <input type="number" v-model="userData.zipcode" v-validate="'required|numeric'" name="zipcode" />
        <span v-show="errors.has('zipcode')">{{ errors.first('zipcode') }}</span>
      </div>

      <div>
        <label for="birthdate">Fecha de Nacimiento:</label>
        <input type="date" v-model="userData.birthdate" v-validate="'required|date_format:YYYY-MM-DD|adult'" name="birthdate" />
        <span v-show="errors.has('birthdate')">{{ errors.first('birthdate') }}</span>
      </div>

      <div>
        <label for="image">Imagen:</label>
        <input type="file" accept="image/*" @change="validateImage" />
        <span v-show="errors.has('image')">{{ errors.first('image') }}</span>
      </div>

      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { extend, configure } from 'vee-validate';
import { required, email, min, numeric, date_format } from 'vee-validate/dist/rules';

extend('required', required);
extend('email', email);
extend('min', min);
extend('numeric', numeric);
extend('date_format', date_format);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

export default {
  data() {
    return {
      userData: {
        username: '',
        email: '',
        password: '',
        zipcode: '',
        birthdate: '',
        image: null,
      },
    };
  },
  methods: {
    submitForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          console.log('Formulario enviado');
        }
      });
    },
    validateImage(event) {
      const image = event.target.files[0];
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

      if (!allowedExtensions.exec(image.name)) {
        this.$set(this.errors.errors, 'image', 'Solo se permiten archivos de imagen (jpg, jpeg, png).');
      } else {
        this.$set(this.errors.errors, 'image', null);
      }
    },
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
};
</script>

