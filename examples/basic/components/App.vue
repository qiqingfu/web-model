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
    <ul class="user-list">
      <li v-for="(item, index) in realUser" :key="index">
        {{ item.key }} : {{ item.val }}
      </li>
    </ul>

    <ul class="storage-info" v-if="realStorage.length">
      <li v-for="(item, index) in realStorage" :key="index">
        {{ item.key }} : {{ item.val }}
      </li>
    </ul>
  </div>
</div>
</template>
<script>
  import model from '../apis/Model'
  export default {
      name: "BasicApp",
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
                .then(res => {
                    console.log(res)
                    this.userInfo = res.body
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
                .then(res => {
                    this.storageInfo = res.body;
                })
                .catch(err => {
                    console.log(err)
                })
          }
      },
      computed: {
          realUser() {
              return Object.keys(this.userInfo).reduce((arr, key) => {
                  arr.push({ key, val: this.userInfo[key] })
                  return arr;
              }, [])
          },
          realStorage() {
              return Object.keys(this.storageInfo).reduce((arr, key) => {
                  arr.push({ key, val: this.storageInfo[key] })
                  return arr;
              }, [])
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
  .user-list, .storage-info {
    font-size: 12px;
    color: #000;
    list-style: none;
  }
  .user-list > li, .storage-info > li {
    line-height: 22px;
    border-bottom: solid 1px #ccc;
  }
  .user-list {
    flex: 1;
  }
  .storage-info {
    margin-left: 40px;
    flex-basis: 50%;
  }
</style>