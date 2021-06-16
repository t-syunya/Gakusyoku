// 村上担当、HTML
// 管理者のログイン、
Vue.component("login-form", {
    template: `
        <div>
            <p>管理者ID</p>
            <input type="text" class="login_input" required minlength="4" maxlength="8" size="10">
            <p>パスワード</p>
            <input type="text" class="login_input" required minlength="4" maxlength="8" size="10">
            <button class="favorite styled"
                    type="button">
                Sign Up
                <!-- red -->
            </button>
            <button class="favorite styled"
                    type="button">
                Cancel
            </button>
        </div>
    `,
    mounted: function () {
    },
    data: function () {
    },
    methods: function () {

    }
})

Vue.component("weekly-menus", {
    template: `
        <div>
            <div v-for="menu in memus">
                <div v-if="menu.length!==0">
                    <div class="card mb-3" style="max-width: 540px">
                        <div class="row no-gutters">
                            <div class="card-body">
                                <h5 class="card-title">{{menu.date}}</h5>
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
        axios.get("/weekly/search", {params: {}}).then(response => {
            this.menus = response.data;
            console.log(this.menus)
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
                <div class="card mb-3" style="max-width: 540px">
                    <div class="row no-gutters">
                        <div class="col-sm-6">
                            <div class="card-body">
                                <h4>Aセット</h4>
                                <h5 class="card-title">{{set_a[0].name}}</h5>
                                <p class="card-text">{{set_a[0].value}}円</p>
                            </div>        
                        </div>
                        <div class="col-sm-6 my-auto">
                            <a class="btn btn-primary" onclick="">売り切れ</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h4>本日のAセットは存在しません。</h4>
            </div>
            <div v-if="set_b!==null">
                <div class="card mb-3" style="max-width: 540px">
                    <div class="row no-gutters">
                        <div class="col-sm-6">
                            <div class="card-body">
                                <h4>Bセット</h4>
                                <h5 class="card-title">{{set_b[0].name}}</h5>
                                <p class="card-text">{{set_b[0].value}}円</p>
                            </div>        
                        </div>
                        <div class="col-sm-6 my-auto">
                            <a class="btn btn-primary" onclick="">売り切れ</a>
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
            console.log(response.data)
            this.set_a = response.data;
            console.log(this.set_a)
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
    methods: function () {
//        sold_out: function (e) {
//            axios.get('sold_out', {params: {genre: e}})
//        }
    }
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
                            <img class="card-img" src="/static/images/{{image}}.jpeg" height="200px">
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
            menus: null,
            image: null
        }
    },
    methods: function (){}
});


const app = new Vue({
    el: "#app",
    delimiters: ["[[", "]]"],
    data: {
        display: 0 //0:販売状況、1:メニュー、2:ログイン
    },
    methods: function (){},
});
