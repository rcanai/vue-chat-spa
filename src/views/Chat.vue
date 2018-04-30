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
        @keyup="inputMessage"
        @keypress.enter="sendMessage">
      <button type="button" @click="sendMessage">送信</button>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'chat',
  data() {
    return {
      participants: 0,
      messages: [
        { id: 1, title: 'AAA' },
        { id: 2, title: 'BBB' },
      ],
    };
  },
  methods: {
    inputMessage() {
      console.log('input message');
    },
    sendMessage() {
      console.log('send message');
    },
  },
};
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  .messages {
  }
  footer {
    display: flex;
    margin-top: auto;
  }
}
</style>

