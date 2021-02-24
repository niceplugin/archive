<template>
  <div class="row justify-content-center">
    <div class="col-sm-8 col-md-6 pt-5">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link class="nav-link" to="/" exact>Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/chat">Chat</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/zip">Zip</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
a.router-link-active {
  color: #495057;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}
</style>