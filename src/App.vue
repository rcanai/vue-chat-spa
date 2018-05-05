<template>
  <div id="app">
    <the-header/>
    <main>
      <router-view/>
    </main>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
  mounted() {
    this.$nextTick(() => {
      this.$socket.off('login');
      this.$socket.on('login', (data) => {
        this.$store.state.participants = data.participants;
      });

      this.$socket.off('duplication');
      this.$socket.on('duplication', () => {
        this.$store.commit('clear');
        this.$router.replace('/');
      });

      this.$socket.off('new-message');
      this.$socket.on('new-message', (data) => {
        this.$store.commit('removeTyping', data.userName);
        this.$store.commit('addMessage', data);
      });

      this.$socket.off('user-joined');
      this.$socket.on('user-joined', (data) => {
        this.$store.state.participants = data.participants;
        this.$store.commit('addMessage', {
          id: data.id,
          userName: 'Server',
          content: `${data.userName}が入室しました`,
        });
      });

      this.$socket.off('user-left');
      this.$socket.on('user-left', (data) => {
        this.$store.state.participants = data.participants;
        this.$store.commit('addMessage', {
          id: data.id,
          userName: 'Server',
          content: `${data.userName}が退室しました`,
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
        this.$socket.close();
        this.$router.replace('/');
        this.$store.commit('clear');
      });

      this.$socket.off('reconnect');
      this.$socket.on('reconnect', () => {
        console.log('再接続');
      });

      this.$socket.off('reconnect_error');
      this.$socket.on('reconnect_error', () => {
        this.$socket.close();
        this.$router.replace('/');
        this.$store.commit('clear');
      });
    });
  },
};
</script>


<style lang="scss">
@import '~normalize.css/normalize.css';

@import './color.scss';

@import '~milligram-scss/dist/milligram.scss';

body {
  font-family: 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', メイリオ, Meiryo, 'ＭＳ Ｐゴシック', sans-serif;
}

ul, ol {
  list-style: none;
}

a, button {
  transition: all 0.3s;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
