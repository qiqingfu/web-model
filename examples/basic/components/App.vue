<template>
<div class="wrapper">
  <div class="user-head">
    <div class="info">
      <label>
        <input type="text" v-model="username"/>
      </label>
      <button @click="getUser">获取 Github 用户信息</button>
    </div>
    <div class="storage">
      <label>
        <input type="text" v-model="storageName"/>
      </label>
      <button @click="getStorage">获取仓库信息</button>
    </div>
  </div>
  <div class="content">
    <list class="list-one" :items="realUser"></list>
    <list class="list-two" v-if="realStorage.length" :items="realStorage"></list>
  </div>
</div>
</template>
<script>
  import model from '../apis/Model'
  import List from "./List.vue"

  const createMap = function (data) {
      return Object.keys(data).reduce((arr, key) => {
          arr.push({ key, val: data[key] })
          return arr;
      }, [])
  }

  export default {
      name: "BasicApp",
      components: {
        List
      },
      data() {
          return {
              username: "qiqingfu",
              storageName: "web-model",
              userInfo: {},
              storageInfo: {},
          }
      },
      methods: {
          getUser() {
              model.getUser(this.username)
                .then(({ body }) => {
                    this.userInfo = body
                })
                .catch(err => {
                    console.log(err)
                })
          },
          getStorage() {
              if (!this.username) {
                  return alert("请先输入查找用户")
              }

              if (!this.storageName) {
                  return this.storageInfo = {}
              }

              model.getStorage({user: this.username, name: this.storageName})
                .then(({ body }) => {
                    this.storageInfo = body;
                })
                .catch(err => {
                    console.log(err)
                })
          }
      },
      computed: {
          realUser() {
              return createMap(this.userInfo)
          },
          realStorage() {
              return createMap(this.storageInfo)
          }
      }
  }
</script>
<style>
  .wrapper {
    min-width: 1000px;
  }
  .user-head {
    display: flex;
    justify-content: space-around;
    padding: 20px 40px;
  }
  .content {
    display: flex;
  }
  .list-one {
      flex: 1;
    }
  .list-two {
    margin-left: 40px;
    flex-basis: 50%;
  }
</style>