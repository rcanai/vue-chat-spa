<template>
  <section class="chat">
    <header id="chat-header">
      <div :title="participants">
        {{participantsCount}}人が参加中
      </div>
    </header>
    <div id="chat-body" class="container">
      <ol class="messages">
        <li v-for="msg in messages" :key="msg.id" class="message" :class="{'is-mine': msg.isMine}">
          <div class="avatar" :title="msg.userName">
            {{msg.userName}}
          </div>
          <div class="message-content" v-html="formatContent(msg.content)"></div>
        </li>
      </ol>
      <ol class="typings">
        <li v-for="typ in typings" :key="typ.id" class="typing">
          <div class="avatar" :title="typ.userName">
             {{typ.userName}}
          </div>
          <div class="message-content">
            入力中...
          </div>
        </li>
      </ol>
    </div>
    <footer id="chat-footer">
      <textarea
        placeholder="メッセージ（Ctrl+Enterで送信）"
        v-model="message"
        @keyup="inputMessage"
        @keypress.enter.ctrl="sendMessage">
      ></textarea>
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
      'participantsCount',
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
        2000,
      );
    },
    sendMessage() {
      if (this.message) {
        this.$socket.emit('new-message', this.message);
        this.message = '';
      }
    },
    formatContent(content) {
      if (!content) {
        return '';
      }
      let formatedContent = '';
      formatedContent = content.replace(/\n/g, '<br>');
      return formatedContent;
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

#chat-header {
  text-align: right;
}

#chat-body {
  height: calc(100vh - 20rem);
  overflow: auto;
  .message,
  .typing {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    .avatar {
      width: 7rem;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .message-content {
      margin-top: 1rem;
      padding: 0.5rem;
      border: 0.1rem solid $color-secondary;
      border-radius: 0 1rem 1rem 1rem;
    }
    &.is-mine {
      flex-flow: row-reverse;
      .avatar {
        text-align: right;
      }
      .message-content {
        border-radius: 1rem 0 1rem 1rem;
      }
    }
  }
}

#chat-footer {
  display: flex;
  align-items: flex-end;
  * {
    margin: 0;
  }
}
</style>

