<template>
  <div id="app">
    <header id="header">
      <router-link to="/">
        <h1>Chat SPA</h1>
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
    <main class="container">
      <router-view/>
    </main>
    <footer id="header">
      <small>&copy; 2018 XXXX</small>
    </footer>
  </div>
</template>

<style lang="scss">
@import '~normalize.css/normalize.css';

$color-initial: #fff !default;
$color-primary: #007E65 !default;
$color-secondary: #1ABC9C !default;
$color-tertiary: #66D8C1 !default;
$color-quaternary: #d1d1d1 !default;
$color-quinary: #e1e1e1 !default;
@import '~milligram-scss/dist/milligram.scss';

body {
  font-family: 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', メイリオ, Meiryo, 'ＭＳ Ｐゴシック', sans-serif;
}

#header {
  height: 5rem;
  display: flex;
  align-items: center;
  background-color: $color-tertiary;
  * {
    margin: 0;
  }
  h1 {
    font-size: 3rem;
  }
  nav {
    ul {
      list-style: none;
      display: flex;
      align-items: center;
      li {
        margin-left: 2rem;
      }
    }
  }
}

#footer {
  height: 5rem;
  background-color: $color-tertiary;
  display: flex;
  align-items: center;
}

.container {
  padding-top: 2rem;
  min-height: calc(100vh - 10rem);
  display: flex;
}


</style>
