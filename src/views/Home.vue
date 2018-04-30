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
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      inputName: '',
    };
  },
  computed: {
    ...mapGetters([
      'userName',
    ]),
  },
  methods: {
    enter() {
      if (this.userName) {
        this.$socket.open();
        this.$socket.emit('add-user', this.userName);
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
