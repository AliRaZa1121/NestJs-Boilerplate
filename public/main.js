const app = new Vue({
  el: "#app",
  data: {
    title: "Nestjs Websockets Chat",
    name: "",
    text: "",
    messages: [],
    socket: null,
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text,
        };
        this.socket.emit("createNotification", message);
        this.text = "";
      }
    },
    receivedMessage(message) {
      this.messages.push(message);
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0;
    },
  },
  created() {
    console.log("created");
    this.socket = io("http://localhost:8005/", {
      auth: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZmFtaWx5X25hbWUiOiJTdXBlciAiLCJnaXZlbl9uYW1lIjoiQWRtaW4iLCJpYXQiOjE2NjcyMjI0MTMsImV4cCI6MTY5ODc1ODQxM30.AbKfBND-TZ0_maVKmAatcN_GiTf_B_cI_MD_ypyhuJg",
      },
    });
    console.log(this.socket.toString());
    this.socket.on("notification", (response) => {
        const myArray = Object.values(response)[0];
        console.log('res',myArray )
      alert(myArray);
    });
  },
});
