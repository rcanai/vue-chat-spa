<template>
  <section class="chat">
    <h1>チャットルーム</h1>
    <header>
      {{participants}}人が参加中
    </header>
    <div class="chat-body">
      <ol class="messages">
        <li v-for="msg in messages" :key="msg.id">
          <div :class="{'is-mine': msg.isMine, 'message': true}">
            <div class="user-name" :title="msg.userName">
              {{msg.userName}}
            </div>
            <div class="message-title">
              {{msg.title}}
            </div>
          </div>
        </li>
      </ol>
      <ol class="typings">
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
@import '../color.scss';

.chat {
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  ol {
    list-style: none;
    margin-bottom: 0;
  }
  footer {
    display: flex;
    margin-top: auto;
  }
  .chat-body {
    overflow: auto;
  }
  .messages {
    .message {
      display: flex;
      align-items: flex-start;
      .user-name {
        width: 10rem;
        color: $color-primary;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .message-title {
        border: 0.1rem solid $color-tertiary;
        padding: 1rem;
        border-radius: 0 1rem 1rem 1rem;
      }
    }
    .message.is-mine {
      flex-flow: row-reverse;
      .user-name {
        text-align: right;
      }
      .message-title {
        color: $color-quaternary;
        border: 0.1rem solid $color-quaternary;
        border-radius: 1rem 0 1rem 1rem;
      }
    }
  }
}
</style>

