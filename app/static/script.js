Vue.component("special-menus", {
    template: `
        <div>
            <div v-if="set_a.length!==0">
                <div class="card mb-3" style="max-width: 540px">
                    <div class="row no-gutters">
                        <div class="col-md-6">
                            <div class="card-body">
                                <h4>Aセット</h4>
                                <h5 class="card-title">{{set_a.name}}</h5>
                                <p class="card-text">{{set_a.value}}円</p>
                            </div>        
                        </div>
                        <div class="col-md-6 my-auto">
                            <img class="card-img" src="/static/images/curry.jpeg">
                            <a class="btn btn-primary" href="#">Details</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h4>本日のAセットは存在しません。</h4>
            </div>
            <div v-if="set_b.length!==0">
                <div class="card mb-3" style="max-width: 540px">
                    <div class="row no-gutters">
                        <div class="col-md-6">
                            <div class="card-body">
                                <h4>Bセット</h4>
                                <h5 class="card-title">{{set_b.name}}</h5>
                                <p class="card-text">{{set_b.value}}円</p>
                            </div>        
                        </div>
                        <div class="col-md-6 my-auto">
                            <img class="card-img" src="/static/images/curry.jpeg" height="200px">
                            <a class="btn btn-primary" href="#">Details</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h4>本日のBセットは存在しません。</h4>
            </div>
        </div>
`,
    mounted: function () {
        axios.get('/menu/search', {params: {genre: "A"}}).then(response => {
            this.set_a = response.data;
            console.log(this.set_a)
        });
        axios.get('/menu/search', {params: {genre: "B"}}).then(response => {
            this.set_b = response.data;
        })
    },
    data: function () {
        return {
            set_a: [],
            set_b: []
        }
    },
    methods: {}
});

Vue.component("permanent-menus", {
    template: `
        <div>
            <div v-for="menu in menus">
                <div class="card mb-3" style="max-width: 540px">
                    <div class="row no-gutters">
                        <div class="col-4">
                            <div class="card-body">
                                <h5 class="card-title">{{menu.name}}</h5>
                                <p class="card-text">{{menu.value}}円</p>
                            </div>        
                        </div>
                        <div class="col-8 my-auto">
                            <img class="card-img" src="/static/images/curry.jpeg" height="200px">
                            <a class="btn btn-primary" href="#">Details</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`,
    mounted: function () {
        axios.get('/menu/search', {
            params: {
                genre: "permanent"
            }
        }).then(response => {
            this.menus = response.data;
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
