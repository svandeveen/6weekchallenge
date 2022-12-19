<template>
  <div v-if="challenge">
    <h1>Welkom {{ challenge.options.naam }}</h1>
    <p>Je hebt om dit moment {{ challenge.subchallenges.length }} challenges geregistreerd. </p>
    <ul>
      <li v-for="subchallenge in challenge.subchallenges" v-bind:key="subchallenge.nummer"><a
          v-bind:href="'#challenge/' + subchallenge.nummer">{{ subchallenge.naam }}</a></li>
    </ul>
  </div>
  <div v-else>
    Je hebt op dit moment nog geen chalange geregistreerd.
    <router-link to="/conf">Ga naar de registratie pagina om dit te maken. </router-link>
  </div>
</template>

<script>
export default {
  name: 'BeginScherm',
  data() {
    return {
      challenge: this.getChallenge()
    }
  },
  methods: {
    getChallenge: function () {
      return JSON.parse(window.localStorage.getItem('savedChallenge'))
    },
  }
}
</script>
