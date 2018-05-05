<template>
  <header>
    <router-link to="/">
      <h1 class="app-title">Chat SPA</h1>
    </router-link>
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import '../color.scss';

header {
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  background-color: $color-tertiary;
  * {
    margin: 0;
  }
  h1 {
  font-size: 3rem;
  }
  ul {
    display: flex;
    align-items: center;
    li {
      margin-left: 1rem;
    }
  }
}

</style>
