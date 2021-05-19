/*
Vue.component("special-menus", {
    template: `
<div class="row">
    <div v-for="menu of menus">{{menu}}
    aaa
    </div>
</div>
`,
    mounted: function () {
        axios.get('/menu/search', this.data.genre).then(response => {
            this.menus = response.data;
            console.log(response.data);
        })
        //this.menus = ["a", "b", "c"]
    },
    data: function () {
        return {
            genre: "special",
            menus: []
        }
    },
    methods: {}
});
*/

Vue.component("permanent-menus", {
    template: `
        <div>
            <div v-for="menu in menus.data">
                <div class="row">   
                    <p>{{menu.name}}</p>
                </div>
            </div>
        </div>
`,
    mounted: function () {
        axios.get('/menu/search', {
            params:{
                genre: "permanent"
            }
        }).then(response => {
            this.menus = response;
        })
    },
    data: function () {
        return {
            menus: []
        }
    },
    methods: {}
});


const app = new Vue({
    el: "#app",
    delimiters: ["[[", "]]"],
    data: {},
    methods: {},
});
