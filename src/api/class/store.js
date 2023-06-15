class makeRetryHandler {
    messagesMap = { }

    // Add Message
    async addMessage(message) {
       const id = message.key.id ?? "";
       this.messagesMap[id] = {
         message: this.cleanMessage(message),
         ts: Date.now(),
       };
       return message;
    }    

    // Add getMessage
    async getMessage(msgKey) {
       return this.messagesMap[msgKey];
    }    

    // removeMessage
    async removeMessage(msgKey) {
       delete this.messagesMap[msgKey];
    }    

    // getMessageKeys
    async getMessageKeys() {
       return Object.keys(this.messagesMap);
    }    

    // cleanMessage
    async cleanMessage(message) {
       const msg = message.message ?? {};
       return msg;
    }    

    // clearObseleteMessages
    async clearObseleteMessages() {
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
    async getHandler(message) {
       const msg = this.getMessage(message);
       this.clearObseleteMessages();
       return msg;
    }
}

exports.makeRetryHandler = makeRetryHandler