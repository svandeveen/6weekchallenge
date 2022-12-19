import moment from "moment";

export default {
    options: {
        naam: "Superman",
        duur: "6",
        startdatum: moment().add(1, 'months').startOf('month').format("YYYY-MM-DD")
    },
    subchallenges: [
        {
            nummer: 1,
            naam: "Harlopen",
            omschrijving: "15 km harlopen per week",
            doel: "5 km in 22 min",
            meetPeriode: "week",
            aantalPeriode: 15,
            eenheid: "km"
        },
        {
            nummer: 2,
            naam: "Water drinken",
            omschrijving: "2 liter water per dag",
            meetPeriode: "dag",
            aantalPeriode: 2,
            eenheid: "l"
        },
    ]
}