// 村上担当、HTML
// 管理者のログイン、

Vue.component("login-form", {
    template: `
        <div>
            <form @submit.prevent="postLogin">
                <p>管理者ID<input type="text" name="user_id" id="user_id" size="24"></p>
                <p>password<input type="password" name="password" id="password" size="24"></p>
                <p><input type="submit" value="ログイン"></p>
            </form>
        </div>
    `,
    methods: {
        postLogin: function () {
            axios.post('/login', {
                user_id: $("#user_id")[0].value,
                password: $("#password")[0].value,
            }).then(() => {
                app.display = 3
            }).catch((e) => {
                alert('login failed')
            })
            return false;
        }
    }
})

Vue.component("admin", {
    template: `
        <div>
            <form action="/admin" method="post">
                <p>管理者画面だよ</p>
            </form>
        </div>
    `
})

Vue.component("weekly-menus", {
    template: `
        <div>
            <div v-for="menu in menus">
                <div v-if="menu.length!==0">
                    <div class="card mb-3" style="max-width: 400px">
                        <div class="row no-gutters">
                            <div class="card-body">
                                <h4 class="card-title">{{menu.date_}}</h4>
                                <h5 class="card-text">Aセット{{menu.set_a.name}}{{menu.set_a.value}}円</h5>
                                <h5 class="card-text">Bセット{{menu.set_b.name}}{{menu.set_b.value}}円</h5>                                
                            </div>       
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted: function () {
        axios.get("/weekly/search").then(response => {
            this.menus = response.data.weekly_menu;

        });
    },
    data: function () {
        return {
            menus: [],
            ymd: []
        }
    }
})

Vue.component("special-menus", {
    template: `
        <div>            
            <div v-if="set_a!==null">
                <div class="card mb-3" style="max-width: 400px">
                    <div class="row no-gutters">
                        <div class="col-6">
                            <div class="card-body">
                                <h4>Aセット</h4>
                            </div>        
                        </div>
                        <div class="col-6">
                            <h5 class="card-title">{{set_a[0].name}}</h5>
                            <p class="card-text">{{set_a[0].value}}円</p>
                            <div v-if="set_a[0].is_sold_out!==true">
                                <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changeModal" v-on:click="set_sold_out_menu(set_a[0].name)">販売中</a>
                            </div>
                            <div v-else>
                                <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#revertModal" v-on:click="set_sold_out_menu(set_a[0].name)">売り切れ</a>
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
                        <div class="col-6">
                            <div class="card-body">
                                <h4>Bセット</h4>
                            </div>        
                        </div>
                        <div class="col-6 my-auto">
                            <h5 class="card-title">{{set_b[0].name}}</h5>
                            <p class="card-text">{{set_b[0].value}}円</p>
                            <div v-if="set_b[0].is_sold_out!==true">
                                <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changeModal" v-on:click="set_sold_out_menu(set_b[0].name)">販売中</a>
                            </div>
                            <div v-else>
                                <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#revertModal" v-on:click="set_sold_out_menu(set_b[0].name)">売り切れ</a>
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
        set_sold_out_menu: function (menu) {
            console.log(menu)
            app.sold_out_menu = menu
        }
    }
});

Vue.component("permanent-menus", {
    template: `
        <div>
            <div v-for="menu in menus">
                <div class="card mb-3" style="max-width: 400px">
                    <div class="row no-gutters">
                        <div class="col-6 my-auto">
                            <img class="card-img" v-bind:src="'../static/images/' + menu.img_name + '.jpg'">
                        </div>
                        <div class="col-6">
                            <div class="card-body">
                                <h5 class="card-title">{{menu.name}}</h5>
                                <p class="card-text">{{menu.value}}円</p>
                                <div v-if="menu.is_sold_out === false">
                                    <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changeModal" v-on:click="set_sold_out_menu(menu.name)">販売中</a>
                                </div>
                                <div v-else>
                                    <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#revertModal" v-on:click="set_sold_out_menu(menu.name)">売り切れ</a>
                                </div>
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
    },
    methods: {
        set_sold_out_menu: function (menu) {
            console.log(menu)
            app.sold_out_menu = menu
        }
    },
});


const app = new Vue({
    el: "#app",
    delimiters: ["[[", "]]"],
    data: {
        display: 0, //0:販売状況、1:メニュー、2:ログイン
        sold_out_menu: null
    },
    methods: {
        change_sold_out: function () {
            axios.get('/sold_out/change', {params: {name: this.sold_out_menu}}).then(response => {
                console.log(response.data);
                if (response.data === 1) {
                    location.reload();
                } else {
                    console.log("error: sold_out/change/");
                }
            });
        },
        revert_sold_out: function () {
            axios.get('/sold_out/revert', {params: {name: this.sold_out_menu}}).then(response => {
                console.log(response.data);
                if (response.data === 1) {
                    location.reload();
                } else {
                    console.log("error: sold_out/revert/");
                }
            });
        }
    }
});
