<template>
  <h1>Challenge: {{challenge.naam}}</h1>
  <h2 v-if="subchallenge.omschrijving">{{subchallenge.omschrijving}}</h2>
  <p v-if="subchallenge.doel">Het doel van deze challenge is: {{subchallenge.doel}}</p>

  <label> Registreer voortgang:
      <input type="number" class="voortgang" v-model="registratie"/>
      {{subchallenge.eenheid.toUpperCase()}}
  </label>
  <button type="button" v-on:click="registreer">I did it</button>

  <h2>Voortgang</h2>
  <div v-if="subchallenge.voortgang">
    <p v-if="subchallenge.meetPeriode === 'week'">WeekTotaal: {{weektotaal}}</p>
    <p v-if="subchallenge.meetPeriode === 'week'">Percentage Weektotaal: {{(weektotaal/subchallenge.aantalPeriode)*100}}%</p>

    Totaal: {{subchallenge.voortgang.totaal}}
  </div>
  <p v-else>Je hebt nog geen voortgang. Registreer je voortgang hierboven.</p>

  <div v-if="subchallenge.log">
    <h2>Logboek</h2>
    <ul >
      <li v-for="registratie in subchallenge.log" v-bind:key="registratie.nummer" >{{registratie.tijdstip}} {{registratie.aantal}}{{subchallenge.eenheid.toUpperCase()}}</li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: 'Challenge',
  data() {
    return {
      challenge: JSON.parse(window.localStorage.getItem('savedChallenge')),
      subchallenge: this.getSubChallenge(),
      registratie: 0,
      weektotaal: 0,
    }
  },
  methods: {
    getSubChallenge: function () {
      const challenge = JSON.parse(window.localStorage.getItem('savedChallenge'));
      const subchallengeId = this.$route.params.challengeId
      return challenge.subchallenges.find(value => `${value.nummer}` === subchallengeId)
    },
    registreer: function () {
      //initiliaseren indien nog niet bestaant
      if (!this.subchallenge.log) {
        this.subchallenge.log = [];
      }
      if (!this.subchallenge.voortgang) {
        this.subchallenge.voortgang = {
          totaal: 0
        }
        for(let i = 1; i<= this.challenge.options.duur ; i++){
          this.subchallenge.voortgang[`week${i}`] = 0;
        }
      }

      //berekenen
      this.subchallenge.voortgang.totaal += this.registratie;
      let weeknr = moment().diff(moment(this.challenge.options.startdatum), 'week') + 1;
      this.subchallenge.voortgang[`week${weeknr}`] += this.registratie;
      this.weektotaal = this.subchallenge.voortgang[`week${weeknr}`];
      console.log(this.weektotaal)
      // opslaan
      this.subchallenge.log.push({aantal: this.registratie, tijdstip: moment().format('DD/MM/YYYY hh:mm')})
      this.challenge.subchallenges = this.challenge.subchallenges.map(obj => {
        if (obj.nummer === this.subchallenge.nummer){
          return this.subchallenge
        }
        return obj
      });
      console.log(this.challenge)
      window.localStorage.setItem('savedChallenge', JSON.stringify(this.challenge));
    }
  },
}
</script>

<style>
.voortgang{
  width: 75px;
}
</style>