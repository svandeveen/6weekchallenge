<template>
  <h1>Configure</h1>
  <form @submit.prevent="submitChallenges">
    <h2>Opties</h2>
    <label>Startdatum</label><input type="date" v-model="challenge.options.startdatum">
    <label>Naam van de held die deze challenge aan gaat </label><input type="text" v-model="challenge.options.naam">
    <label>Voor hoeveel weken wil je de challenge doen? <input type="number" v-model="challenge.options.duur"></label>
    <div class="challengeOverzicht" v-for="subchallenge in challenge.subchallenges" v-bind:key="subchallenge">
      <h2>Challenge {{ subchallenge.nummer }}: {{subchallenge.naam}}.</h2>
      <label>Naam<input type="text" v-model="subchallenge.naam"></label>
      <label>Omschrijving <input type="test" v-model="subchallenge.omschrijving"></label>
      <label>Doel <input type="text" v-model="subchallenge.doel"></label>
      <label>Meetperiode<select v-model="subchallenge.meetPeriode"><option>week</option><option>dag</option></select></label>
      <label>Aantal per meetperiode<input type="number" v-model="subchallenge.aantalPeriode"></label>
      <label>Eenheid<input placeholder="bijvoorbeeld [kg|liter|minuten]" type="text" v-model="subchallenge.eenheid"></label>
    </div>
    <button type="button" v-on:click="voegChallengeToe">Voeg een Challenge toe</button>
    <button type="submit">Opslaan</button>
  </form>
</template>

<script>
import defaultChallenges from '../challenges/content'

export default {
  name: 'Configure',
  data() {
    return {
      challenge: this.getChallenge()
    }
  },
  components: {},
  methods: {
    getChallenge(){
      const savedChallenge = JSON.parse(window.localStorage.getItem('savedChallenge'));
      if (savedChallenge){
        return savedChallenge
      }
      return defaultChallenges;
    },
    submitChallenges() {
      window.localStorage.setItem('savedChallenge', JSON.stringify(this.challenge));
      alert("De challenge gegevens zijn opgeslagen!")
    },
    voegChallengeToe() {
      this.challenge.subchallenges.push({
        nummer: this.challenge.subchallenges.length + 1,
      })
    }
  }
}
</script>

<style scoped>

input {
  width: 100%;
  display: block;
}
.challengeOverzicht {
  border: solid;
  padding: 10px;
}
</style>