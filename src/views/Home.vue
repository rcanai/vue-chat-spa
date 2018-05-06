<template>
  <section class="home">
    <header class="container">
      <h2 class="container">ホーム</h2>
    </header>
    <div class="container" >
      <label>
        名前
        <input
          type="text"
          placeholder="入力してください"
          v-model="inputName"
          @keypress.enter="enter">
      </label>
      <button type="button" class="button-primary" @click="enter">参加</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      inputName: '',
    };
  },
  methods: {
    enter() {
      if (this.inputName) {
        this.$socket.open();
        this.$socket.emit('add-user', this.inputName);
        this.$store.state.userName = this.inputName;
        this.$router.push('/chat');
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$socket.close();

      // 入室
      this.$socket.off('login');
      this.$socket.on('login', (data) => {
        this.$store.state.participants = data.participants;
      });

      // 他の参加者と名前が重複エラー
      this.$socket.off('duplication');
      this.$socket.on('duplication', () => {
        // eslint-disable-next-line no-alert
        alert('名前が他の参加者と重複しています');
        this.$store.commit('clear');
        this.$router.replace('/');
      });
    });
  },
};
</script>
