import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import MessageField from './MessageField';
import ChatList from './ChatList';
import { uid } from 'react-uid';
import ChatHeader from "./ChatHeader";

export default class ChatLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [
        { title: 'User 1', messageList: [0, 1] },
        { title: 'User 2', messageList: [] },
        { title: 'User 3', messageList: [] },
      ],
      messages: [
        {
          id: uid(),
          text: 'Привет',
          sender: 'not-me',
        },
        {
          id: uid(),
          text: 'Как дела?',
          sender: 'me',
        },
      ],
    };

    this.chatWindow = React.createRef();
  }

  sendMessage(text, sender) {
    if (text.length > 0) {
      const { messages } = this.state;
      const { chatId } = this.props;

      const messageId = Object.keys(messages).length + 1;

      this.setState(state => {
        const chatsTemp = state.chats.map((chat, index) => {
          if (index === chatId) {
            chat.messageList.push(messageId);
          }
          return chat;
        });
        return {
          messages: { ...messages, [messageId]: { id: uid, text, sender } },
          chats: chatsTemp,
        };
      });

    }
  }

  render() {
    const { chatId } = this.props;
    const { chats, messages } = this.state;

    return (
      <Grid className="grid-container" container alignItems="stretch">
        <Hidden only={['xs', 'sm']}>
          <Grid className="chatList" item xs={3}>
            <ChatList chats={chats} />
          </Grid>
        </Hidden>
        <Grid className="messageField" item xs>
          <ChatHeader title={chats[chatId].title} />
          <MessageField chatId={chatId} chats={chats} messages={messages} sendMessage={this.sendMessage.bind(this)} />
        </Grid>
      </Grid>
    );
  }
}

ChatLayout.propTypes = {
  chatId: PropTypes.number,
};

ChatLayout.defaultProps = {
  chatId: 0,
};