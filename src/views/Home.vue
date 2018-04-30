<template>
  <section class="home">
    <h1>ホーム</h1>
    <label>
      名前
      <input
        type="text"
        placeholder="入力してください"
        v-model="userName"
        @keypress.enter="enter">
    </label>
    <button type="button" class="button-primary" @click="enter">送信</button>
  </section>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      userName: '',
    };
  },
  methods: {
    enter() {
      if (this.userName) {
        this.$router.push('/chat');
      }
    },
  },
};
</script>
