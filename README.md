# 💬 Real-Time Chat App with NestJS & Socket.IO

## How to clone the Repo
```bash
git clone git@github.com:syedomer17/webSockets-nest.js.git
```

This is a full-stack real-time chat application built with:

- 🔧 **Backend:** [NestJS](https://nestjs.com/) using `@nestjs/websockets` and `socket.io`
- 🌐 **Frontend:** HTML, CSS, and JavaScript (Vanilla DOM)

Users can:
- Enter a username before joining the chat
- Send and receive messages in real time
- See when users join or leave (with usernames)
- Press `Enter` to send messages

---

## 📁 Project Structure
```bash
webSockets-nest.js/
├── server/ # NestJS Backend
│ ├── src/
│ │ └── chat/
│ │ └── chat.gateway.ts
│ └── main.ts
├── client/ # Frontend (Client)
│ ├── index.html
│ ├── style.css
│ └── script.js
└── README.md
```


---

## 🔧 Backend Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. To start The Backend

```bash
npm run start:dev
```
# The backend will run on: http://localhost:3000

### 3. 🌐 Frontend Setup
Just open the client/index.html in your browser. It connects to the WebSocket server running on localhost:3001.

Alternatively, serve it with a simple static server: