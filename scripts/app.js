const totals = new Vue({
  el: "#totals",
  created() {
    this.fetchData();
  },
  data: {
    totalCases: "",
    totalDeaths: "",
    totalRecovered: "",
    showInfo: true,
  },
  methods: {
    fetchData() {
      axios.get('https://coronavirus-19-api.herokuapp.com/all').then(response => {
        this.totalCases = new Intl.NumberFormat().format(response.data.cases)
        this.totalDeaths = new Intl.NumberFormat().format(response.data.deaths)
        this.totalRecovered = new Intl.NumberFormat().format(response.data.recovered)
      })
    },
    toggleData: function() {
      this.showInfo = !this.showInfo
    },
  },
})

const app = new Vue({
  el: '#app',
  created() {
    this.fetchData();
  },
  data: {
    covid19DataList: [],
    country: '',
    searchQuery: '',
  },
  methods: {
    fetchData() {
      axios.get('https://coronavirus-19-api.herokuapp.com/countries').then(response => {
        if (response) {
          const data = response.data;
          console.log(data)
          for (var d in data) {
            if (!data[d].showDetail) {
              data[d].showDetail = false;
            }
          }
          data.sort(function(a, b) {
            if (a.country < b.country) {
              return -1;
            }
            if (a.country > b.country) {
              return 1;
            }
            return 0;
          })

          this.covid19DataList = data;
        }

      })
    },
    toggleDeatils: function(data) {
      data.showDetail = !data.showDetail
    },
    filterList: function() {
      this.country = event.target.value
    }
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.covid19DataList.filter((item) => {
          return this.searchQuery.toLowerCase().split(' ').every(v => item.country.toLowerCase().includes(v))
        })
      } else {
        return this.covid19DataList;
      }
    }
  }
})
