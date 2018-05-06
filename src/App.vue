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
    if (('Notification' in window) && Notification.permission !== 'denied') {
      Notification.requestPermission((permission) => {
        // ユーザが許可した場合は、通知を作成する
        if (permission === 'granted') {
          // pass
        }
      });
    }

    this.$nextTick(() => {
      // 切断
      this.$socket.off('disconnect');
      this.$socket.on('disconnect', () => {
        this.$socket.close();
        this.$router.replace('/');
        this.$store.commit('clear');
      });

      // 再接続
      this.$socket.off('reconnect');
      this.$socket.on('reconnect', () => {
        console.log('再接続');
      });

      // 再接続に失敗
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
