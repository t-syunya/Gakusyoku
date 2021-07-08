Vue.component("login-button", {
    template: `<a class="btn btn-outline-primary ms-auto" v-on:click="loginByCookie">管理者</a>`,
    methods: {
        loginByCookie: function () {
            console.log("loginByCookie()")
            axios.get('/cookie', {
                user_id: app.getCookie('user_id'),
                token: app.getCookie('token'),
            }).then(response => {
                if (response.data.ret)
                    app.display = 3
                else
                    app.display = 2
            }).catch(e => {
                app.display = 2
                this.alert('Invalid Tokens')
            })
        },
    }
})

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
            console.log("postLogin()")
            axios.post('/login', {
                user_id: $("#user_id")[0].value,
                password: $("#password")[0].value,
            }).then(response => {
                console.log(response.data.UUID)
                document.cookie = "token=" + response.data.UUID
                document.cookie = "user_id=" + $("#user_id")[0].value
                app.display = 3
            }).catch((e) => {
                console.log(e)
                alert('login failed')
            })
            return false;
        },
    }
})

Vue.component("change-menus", {
    template: `
        <div>
            <form @submit.prevent="postMenus">
                <div v-for="(menu, index) in menus">
                    <div v-if="menu.length!==0">
                        <div class="card mb-3" style="max-width: 400px">
                            <div class="row no-gutters">
                                <div class="card-body">
                                    <h4 class="card-title">{{menu.date.split("-")[1]}}月{{menu.date.split("-")[2]}}日</h4>
                                    <label>Aセット：
                                        <input type="text" v-bind:value="menu.set_a.name" class="card-text" name="set_a">
                                    </label>
                                    <label>Bセット：
                                        <input type="text" v-bind:value="menu.set_b.name" class="card-text" name="set_b">
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a class="btn btn-outline-primary ms-auto" v-on:click="addForm">追加</a>
                <input type="submit" value="変更">
            </form>
        </div>
    `,
    mounted: function () {
        axios.get("/menu/search/monthly").then(response => {
            this.menus = response.data.monthly_menu;
        });
    },
    data: function () {
        return {
            menus: [],
        }
    },
    methods: {
        addForm: function () {
            let new_date = "---"
            let latest_date = null
            if (this.menus.length !== 0) {
                latest_date = this.menus[this.menus.length - 1].date
            }
            axios.get("/menu/change/return_date", {params: {latest_date: latest_date}})
                .then(response => {
                    new_date = response.data
                    let additionalForm = {
                        "set_a": {
                            "name": "",
                            "date": new_date,
                            "value": "380",
                            "genre": "A",
                            "is_sold_out": false,
                            "img_name": null
                        },
                        "set_b": {
                            "name": "",
                            "date": new_date,
                            "value": "320",
                            "genre": "B",
                            "is_sold_out": false,
                            "img_name": null
                        },
                        "date": new_date,
                    }
                    this.menus.push(additionalForm)
                })
        },
        postMenus: function () {
            let data_set_a = $('input[name="set_a"]').map(function () {
                return $(this).val();
            });
            let data_set_b = $('input[name="set_b"]').map(function () {
                return $(this).val();
            });
            for (let i = 0; i < this.menus.length; i++) {
                this.menus[i].set_a.name = data_set_a[i]
                this.menus[i].set_b.name = data_set_b[i]
            }
            let data = this.menus

            axios.post("/menu/change", {"menus": data})
                .then(() => {
                    location.reload()
                }).catch((e) => {
                alert('change failed')
            });
        }
    }
})

Vue.component("weekly-menus", {
    template: `
        <div>
            <div v-for="menu in menus">
                <div v-if="menu.length!==0">
                    <div class="card mb-3" style="max-width: 400px">
                        <div class="row no-gutters">
                            <div class="card-body">
                                <h4 class="card-title">{{menu.date.split("-")[1]}}月{{menu.date.split("-")[2]}}日</h4>
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
        axios.get("/menu/search/weekly").then(response => {
            this.menus = response.data.weekly_menu;
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
        axios.get('/menu/search/today', {params: {genre: "A"}}).then(response => {
            this.set_a = response.data;
        });
        axios.get('/menu/search/today', {params: {genre: "B"}}).then(response => {
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
        axios.get('/menu/search/today', {
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
        display: 0, //0:販売状況、1:メニュー、2:ログイン、3:メニュー変更
        sold_out_menu: null
    },
    methods: {
        getCookie: function (name) {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        },
        changeSoldOut: function () {
            axios.get('/sold_out/change', {params: {name: this.sold_out_menu}}).then(response => {
                console.log(response.data);
                if (response.data === 1) {
                    location.reload();
                } else {
                    console.log("error: sold_out/change/");
                }
            });
        },
        revertSoldOut: function () {
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
