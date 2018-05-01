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

<script>
export default {
  name: 'App',
  mounted() {
    this.$nextTick(() => {
      this.$socket.off('login');
      this.$socket.on('login', (data) => {
        this.$store.state.participants = data.participants;
      });
      this.$socket.off('new-message');
      this.$socket.on('new-message', (data) => {
        this.$store.commit('removeTyping', data.userName);
        this.$store.commit('addMessage', {
          id: data.id,
          userName: data.userName,
          title: data.message,
        });
      });
      this.$socket.off('user-joined');
      this.$socket.on('user-joined', (data) => {
        this.$store.state.participants = data.participants;
        this.$store.commit('addMessage', {
          id: data.id,
          userName: data.userName,
          title: 'が入室しました',
        });
      });
      this.$socket.off('user-left');
      this.$socket.on('user-left', (data) => {
        this.$store.state.participants = data.participants;
        this.$store.commit('addMessage', {
          id: data.id,
          userName: data.userName,
          title: '退室しました',
        });
      });
      this.$socket.off('typing');
      this.$socket.on('typing', (data) => {
        this.$store.commit('addTyping', {
          id: data.id,
          userName: data.userName,
        });
      });
      this.$socket.off('stop-typing');
      this.$socket.on('stop-typing', (data) => {
        this.$store.commit('removeTyping', data.userName);
      });
      this.$socket.off('disconnect');
      this.$socket.on('disconnect', () => {
        console.error('切断');
      });
      this.$socket.off('reconnect');
      this.$socket.on('reconnect', () => {
        console.log('再接続');
      });
      this.$socket.off('reconnect_error');
      this.$socket.on('reconnect_error', () => {
        console.error('再接続失敗');
      });
    });
  },
};
</script>


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
