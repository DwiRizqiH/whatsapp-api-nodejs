class makeRetryHandler {
   messagesMap = {}

   // Add Message
   addMessage(message) {
      const id = message.key.id ?? "";
      this.messagesMap[id] = {
         message: this.cleanMessage(message),
         ts: Date.now(),
      };
      return message;
   }

   // Add getMessage
   getMessage(msgKey) {
      return this.messagesMap[msgKey];
   }

   // removeMessage
   removeMessage(msgKey) {
      delete this.messagesMap[msgKey];
   }

   // getMessageKeys
   getMessageKeys() {
      return Object.keys(this.messagesMap);
   }

   // cleanMessage
   cleanMessage(message) {
      const msg = message.message ?? {};
      return msg;
   }

   // clearObseleteMessages
   clearObseleteMessages() {
      // Check if the message is older than 60 seconds
      const keys = Object.keys(this.messagesMap);
      keys.forEach((key) => {
         const ts = this.messagesMap[key].ts;
         if (Date.now() - ts > 60_000) {
            this.removeMessage(key);
         }
      });
   }

   // getHandler
   getHandler(message) {
      const msg = this.getMessage(message);
      this.clearObseleteMessages();
      return msg;
   }
}

exports.makeRetryHandler = makeRetryHandler