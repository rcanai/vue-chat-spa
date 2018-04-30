<template>
  <section class="chat">
    <h1>チャットルーム</h1>
    <header>
      {{participants}}人が参加中
    </header>
    <div class="messages">
      <ol>
        <li v-for="msg in messages" :key="msg.id">
          {{msg.title}}
        </li>
      </ol>
    </div>
    <footer>
      <input
        type="text"
        placeholder="メッセージ"
        v-model="message"
        @keyup="inputMessage"
        @keypress.enter="sendMessage">
      <button type="button" @click="sendMessage">送信</button>
    </footer>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'chat',
  data() {
    return {
      participants: 0,
      message: '',
      messages: [
        { id: 1, title: 'AAA' },
        { id: 2, title: 'BBB' },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'userName',
    ]),
  },
  methods: {
    inputMessage() {
      this.$socket.emit('typing');
    },
    sendMessage() {
      if (this.message) {
        this.$socket.emit('new-message', this.message);
        this.message = '';
      }
    },
  },
  mounted() {
    if (!this.userName) {
      this.$router.replace('/');
    }
  },
};
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  .messages {
    ol {
      list-style: none;
    }
  }
  footer {
    display: flex;
    margin-top: auto;
  }
}
</style>

