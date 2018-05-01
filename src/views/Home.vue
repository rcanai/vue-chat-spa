<template>
  <section class="home">
    <h1>ホーム</h1>
    <label>
      名前
      <input
        type="text"
        placeholder="入力してください"
        v-model="inputName"
        @keypress.enter="enter">
    </label>
    <button type="button" class="button-primary" @click="enter">参加</button>
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
    });
  },
};
</script>
