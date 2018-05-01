<template>
  <section class="chat">
    <h1>チャットルーム</h1>
    <header>
      {{participants}}人が参加中
    </header>
    <div class="messages">
      <ol>
        <li v-for="msg in messages" :key="msg.id">
          {{msg.userName}} : {{msg.title}}
        </li>
      </ol>
      <ol>
        <li v-for="typ in typings" :key="typ.id">
          {{typ.userName}} ： 入力中...
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
      message: '',
      typingTimeout: null,
    };
  },
  computed: {
    ...mapGetters([
      'userName',
      'participants',
      'messages',
      'typings',
    ]),
  },
  methods: {
    inputMessage(e) {
      console.log(e);
      if (e.key === 'Enter') {
        return;
      }
      this.$socket.emit('typing');
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(
        () => {
          this.$socket.emit('stop-typing');
          clearTimeout(this.typingTimeout);
        },
        3000,
      );
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

