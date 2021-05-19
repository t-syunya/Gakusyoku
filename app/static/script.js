Vue.component("special-menus", {
    template: `
<div class="row">
    <div v-for="menu of menus">{{menu}}</div>
</div>
`,
    mounted: function(){
        this.menus = ["a", "b", "c"]
    },
    data: function (){
        return {
            is_sold_out: 0,
            menus: []
        }
    },
    methods: {}
});

Vue.component("permanent-menus", {
    template: `
<div class="row">
    <p></p>
</div>`,
    mounted: {},
    data: function (){
        return {

        }
    },
    methods: {}
});



const app = new Vue({
    el: "#app",
    delimiters:["[[", "]]"],
    data: {
    },
    methods: {},
});
