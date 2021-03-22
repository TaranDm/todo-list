<template>
  <div id="app">
      <v-app id="inspire">
          <div class="nav">
              <v-navigation-drawer
                      absolute
                      permanent
                      left
              >
                  <v-list dense>
                      <v-list-item
                              v-for="item in items"
                              :key="item.id"
                              link
                      >
                          <v-list-item-icon>
                              <v-icon>{{ item.icon }}</v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                              <v-list-item-title>
                                  <router-link :to="{path: item.path}">
                                      {{ item.title }}
                                  </router-link>
                              </v-list-item-title>
                          </v-list-item-content>
                      </v-list-item>
                  </v-list>
              </v-navigation-drawer>
          </div>
          <div class="main" >
              <div class=" container">
                      <router-view/>
              </div>
          </div>

      </v-app>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    { title: 'Users', icon: 'mdi-account', path: '/' },
                    { title: 'Tasks', icon: 'mdi-file-tree', path: '/tasks' },
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
    position: relative;
    width: 100%;
    height: 100vh;
}
.nav {
    position: fixed;
    margin: 0;
    padding: 0;
    max-width: 190px;
    width: 100%;

    height: 100%;
    .v-navigation-drawer {
        @media (max-width: 768px) {
            max-width: min-content;
            .v-list-item__icon {
                margin: 0 auto;
            }
            .v-list-item__title {
                display: none;
            }


       }



    }
    .list-item__content {
        padding: 0;

    }
  a {

    font-weight: bold;
    color: #2c3e50;
      width: 100%;
      display: block;
      padding: 8px 0;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
    .v-application--wrap {
        min-height: min-content;
    }
}
</style>
