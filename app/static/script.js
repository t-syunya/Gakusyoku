// 村上担当、HTML
// 管理者のログイン、
Vue.component("login-form", {
    template: `
        <div>
            <form action="/login" method="post">
                <p>管理者ID<input type="text" name="user_id" value="" size="24"></p>
                <p>password<input type="password" name="password" value="" size="24"></p>
                <p><input type="submit" value="ログイン"></p>
            </form>
        </div>
    `,
})

Vue.component("weekly-menus", {
    template: `
        <div>
            <div v-for="menu in menus.weekly_menu">
                <div v-if="menu.length!==0">
                    <div class="card mb-3" style="max-width: 400px">
                        <div class="row no-gutters">
                            <div class="card-body">
                                <h5 class="card-title">{{menu.date_}}</h5>
                                <p class="card-text">Aセット{{menu.set_a.name}}{{menu.set_a.value}}円</p>
                                <p class="card-text">Bセット{{menu.set_b.name}}{{menu.set_b.value}}円</p>                                
                            </div>       
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted: function () {
        axios.get("/weekly/search").then(response => {
            this.menus = response.data;
        });
    },
    data: function () {
        return {
            menus: []
        }
    }
})

Vue.component("special-menus", {
    template: `
        <div>
            <div v-if="set_a!==null">
                <div class="card mb-3" style="max-width: 400px">
                    <div class="row no-gutters">
                        <div class="col-xs-4">
                            <div class="card-body">
                                <h4>Aセット</h4>
                                <h5 class="card-title">{{set_a[0].name}}</h5>
                                <p class="card-text">{{set_a[0].value}}円</p>
                            </div>        
                        </div>
                        <div class="col-xs-4">
                            <div v-if="set_a.is_sold_out!==false">
                                <a class="btn btn-primary" onclick="">販売中</a>
                            </div>
                            <div v-else>
                                <a class="btn btn-primary" onclick="">売り切れ</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h4>本日のAセットは存在しません。</h4>
            </div>
            <div v-if="set_b!==null">
                <div class="card mb-3" style="max-width: 400px">
                    <div class="row no-gutters">
                        <div class="col-xs-6">
                            <div class="card-body">
                                <h4>Bセット</h4>
                                <h5 class="card-title">{{set_b[0].name}}</h5>
                                <p class="card-text">{{set_b[0].value}}円</p>
                            </div>        
                        </div>
                        <div class="col-xs-6 my-auto">
                            <div v-if="set_a.is_sold_out!==false">
                                <a class="btn btn-primary" onclick="">販売中</a>
                            </div>
                            <div v-else>
                                <a class="btn btn-primary" onclick="">売り切れ</a>
                            </div>
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
        });
        axios.get('/menu/search', {params: {genre: "B"}}).then(response => {
            this.set_b = response.data;
        })
    },
    data: function () {
        return {
            set_a: null,
            set_b: null
        }
    },
    methods: {
        sold_out: function (e) {
            axios.get('sold_out', {params: {genre: e}})
        }
    }
});

Vue.component("permanent-menus", {
    template: `
        <div>
            <div v-for="menu in menus">
                <div class="card mb-3" style="max-width: 400px">
                    <div class="row no-gutters">
                        <div class="col-xs-4">
                            <div class="card-body">
                                <h5 class="card-title">{{menu.name}}</h5>
                                <p class="card-text">{{menu.value}}円</p>
                            </div>        
                        </div>
                        <div class="col-xs-8 my-auto">
                            <img class="card-img" v-bind:src="'../static/images/' + menu.img_name + '.jpg'" height="10%" width="10%">
                            <div v-if="menu.is_sold_out === false">
                                <a class="btn btn-primary">販売中</a>
                            </div>
                            <div v-else>
                                <a class="btn btn-primary">売り切れ</a>
                            </div>
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
            menus: [],
        }
    }
});


const app = new Vue({
    el: "#app",
    delimiters: ["[[", "]]"],
    data: {
        display: 0 //0:販売状況、1:メニュー、2:ログイン
    },
    methods: {},
});
