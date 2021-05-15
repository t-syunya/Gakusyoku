Vue.component("permanent-menus", {
  template: `
            <div class="ui unstackable divided items permanent-wrapper">
            <div class="content">
               <h2 class="ui header special-container-header">
                  <img src="/static/images/udon.svg" class="ui image special-container-header-image">
                  <p>恒常メニュー</p>
               </h2>
            </div>

                <template v-for="menu in permanents">

              <div v-bind:class="{item: true, disabled: menu.is_sold_out }">

                <div class="image" v-bind:class="{blurred: menu.is_sold_out }">
                    <img v-bind:src='"/static/images/meal/"+menu.id+".jpg"' class="menu-image">
                </div>
                <div class="content">

                      <span class="header">
                      <i class="teal check icon hit-area" v-if="!menu.is_sold_out" v-on:click="setSoldOut(menu.id, true, menu.name)"></i>
                      <i class="red close icon hit-area" v-if="menu.is_sold_out" v-on:click="setSoldOut(menu.id, false, menu.name)"></i>
                      <span class="header-text">{{ menu.name }}</span>
                      </span>
                  <div class="meta flex-row" v-bind:class="{blurred: menu.is_sold_out }">
                    <span class="price">¥{{ menu.price }}</span>
                    <div class="ui right aligned">
                    <div class="ui left labeled button">
                      <a class="ui basic right pointing label">
                        {{ menu.like_count }}
                      </a>
                      <div class="ui red button" v-if="menu.is_liked" v-on:click="likeThis(menu, false)">
                        <i class="heart icon"></i> スキ
                      </div>
                      <div class="ui button" v-else v-on:click="likeThis(menu, true)">
                        <i class="heart icon"></i> スキ
                      </div>
                    </div>
                    </div>
                  </div>
                  <div class="extra" v-bind:class="{blurred: menu.is_sold_out }">
                    <div class="nutrition-wrapper-vertical">
                        <div class="nutrition-wrapper-horizontal">
                            <div class="nutrition">エネルギー: {{ menu.nutrition.energy }} kcal</div>
                            <div class="nutrition">脂質: {{ menu.nutrition.fat }} kcal</div>
                        </div>
                        <div class="nutrition-wrapper-horizontal">
                            <div class="nutrition">タンパク質: {{ menu.nutrition.protein }} g</div>
                            <div class="nutrition">塩分: {{ menu.nutrition.salt }} g</div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              </template>
            </div>`,
  mounted: async function () {
    let result = await getPermanentMenu();
    this.permanents = result.data.menus;
    this.permanents.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    this.setPermanent(this.permanents);
  },
  data: function () {
    return {
      permanents: [],
    };
  },
  methods: {},
});

const app = new Vue({
  el: "#app",
  data: {},
  methods: {},
});
