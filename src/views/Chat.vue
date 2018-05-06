<template>
  <section class="chat">
    <header id="chat-header" class="container">
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
    <footer id="chat-footer" class="container">
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
      if (e.key === 'Enter' || e.key === 'Control') {
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
    this.$nextTick(() => {
      if (!this.userName) {
        this.$router.replace('/');
      }

      // メッセージ着信
      this.$socket.off('new-message');
      this.$socket.on('new-message', (data) => {
        this.$store.commit('removeTyping', data.userName);
        this.$store.commit('addMessage', data);
        // 通知
        if (document.hidden) {
          const options = {
            body: `[${data.userName}] ${data.content}`,
            icon: '',
          };
          const n = new Notification('新しいメッセージ | Chat SPA', options);
          setTimeout(() => {
            n.close.bind(n);
          }, 5000);
        }
      });

      // 新規参加者が入室
      this.$socket.off('user-joined');
      this.$socket.on('user-joined', (data) => {
        this.$store.state.participants = data.participants;
        this.$store.commit('addMessage', {
          id: data.id,
          userName: 'Server',
          content: `${data.userName}が入室しました`,
        });
      });

      // 参加者が退室
      this.$socket.off('user-left');
      this.$socket.on('user-left', (data) => {
        this.$store.state.participants = data.participants;
        this.$store.commit('addMessage', {
          id: data.id,
          userName: 'Server',
          content: `${data.userName}が退室しました`,
        });
      });

      // 参加者がタイピング
      this.$socket.off('typing');
      this.$socket.on('typing', (data) => {
        this.$store.commit('addTyping', {
          id: data.id,
          userName: data.userName,
        });
      });

      // 参加者のタイピングが終了
      this.$socket.off('stop-typing');
      this.$socket.on('stop-typing', (data) => {
        this.$store.commit('removeTyping', data.userName);
      });
    });
  },
  destroyed() {
    this.$socket.close();
  },
};
</script>

<style lang="scss" scoped>
@import '../color.scss';

#chat-header {
  text-align: right;
}

#chat-body {
  height: calc(100vh - 18rem);
  overflow: auto;
  .message,
  .typing {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    .avatar {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
    .message-content {
      margin: 0;
      margin-left: 2rem;
      padding: 0.5rem;
      border: 0.1rem solid $color-secondary;
      border-radius: 0 1rem 1rem 1rem;
    }
    &.is-mine {
      align-items: flex-end;
      .avatar {
        text-align: right;
      }
      .message-content {
        margin: 0;
        margin-right: 2rem;
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

