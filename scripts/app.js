$(function(){
  new Vue({
      el: '#app',
      created() {
          this.fetchData();
      },
      data: {
           country: [],
           confirmed:[]
      },
      methods: {
          fetchData() {
          axios.get('https://coronavirus-tracker-api.herokuapp.com/all').then(response => {
            let countries = {};
            const locations = response.data.confirmed.locations;

            var unique = locations.filter((v, i, a) => a.indexOf(v) === i);
            console.log(unique)

              this.confirmed = response.data.confirmed.latest;
              this.country = response.data.confirmed.locations;
              // console.log(countries)
            });
          }

      }
  });


})
