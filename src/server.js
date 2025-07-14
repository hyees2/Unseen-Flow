import http from "http";
import WebSocket from "ws";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fetch from 'node-fetch'; // node-fetch 모듈을 사용하여 API 요청 보내기

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express 서버 설정
const app = express();
const corsOptions = {
    origin: 'https://unseen-flow.onrender.com',  // 허용할 origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  };
app.set('view engine', "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// 라우트 설정
app.get("/", (req, res) => res.redirect("/controller"));
app.get("/controller", (req, res) => res.render("controller"));
app.get("/display", (req, res) => res.render("display"));

// 🥬새로운 종료 페이지 라우팅
app.get("/exit-screen", (req, res) => {
    const timeSpent = req.query.timeSpent;
    const rowClickCount = req.query.rowClickCount || 0; // 추가
    res.render("exit-screen", { timeSpent: timeSpent, rowClickCount: rowClickCount }); // 수정
});

// Wikidata API 요청 처리
app.get('/wikidata/:id', async (req, res) => {
    const wikidataId = req.params.id;
    const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wikidataId}&sites=en&props=labels|descriptions&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Wikidata' });
    }
});

const handleListen = () => console.log(`✅ Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("🌐 Connected to Browser");

    socket.on("close", () => {
        console.log("❌ Disconnected from the Browser");
        sockets.splice(sockets.indexOf(socket), 1);
    });

    socket.on("message", (msg) => {
        let message;
        try {
            message = JSON.parse(msg);
        } catch (e) {
            console.log("⚠️ Could not parse message:", msg);
            return;
        }

        switch (message.type) {
            case "new_message":
                const isSystem = message.source === "system";
                const textToSend = isSystem ? message.payload : message.payload;
                sockets.forEach((aSocket) => aSocket.send(JSON.stringify({
                 type: "new_message",
                 payload: textToSend
                })));
                break;

            case "border_click":
                const { coords, name, description } = message.payload;
                sockets.forEach((aSocket) =>
                    aSocket.send(JSON.stringify({
                        type: "border_click",
                        payload: { coords, name, description }
                    }))
                );
                break;

            case "custom_trigger":
                console.log("🚨 Custom trigger received:", message.payload);
                sockets.forEach((aSocket) => aSocket.send(message.payload));
                break;

            case "another_trigger":
                console.log("✨ Another trigger received:", message.payload);
                sockets.forEach((aSocket) => aSocket.send(message.payload));
                break;

            case "change_background_color": // 배경색 변경 요청 처리
                const backgroundColor = message.payload;
                sockets.forEach(aSocket => {
                    if (aSocket !== socket) { // 요청을 보낸 클라이언트는 제외 (선택 사항)
                        aSocket.send(JSON.stringify({
                            type: 'background_color_changed',
                            payload: backgroundColor
                        }));
                    }
                });
                case "remove_background_color": // 배경색 제거 요청 처리 (추가된 부분)
                console.log('🧹 Broadcasting removal request to', sockets.length, 'sockets.');
                sockets.forEach(aSocket => {
                    console.log('  - Socket:', aSocket);
                    if (aSocket !== socket) {
                        aSocket.send(JSON.stringify({
                            type: 'remove_background_color'
                        }));
                        console.log('    -> Sent remove_background_color');
                    } else {
                        console.log('    -> Skipped sender socket');
                    }
                });
                console.log('🧹 Broadcasting background color removal request completed.');
                break;

                //🥬Exit
            case "exit_with_log":
                const { timeSpent, rowClickCount, clickedCoords } = message.payload; // 추가: rowClickCount, clickedCoords 받기
                console.log("⏱️ Received exit log - Time spent:", timeSpent, "Row Clicks:", rowClickCount, "Clicked Coords:", clickedCoords);

                // 엑시트 요청을 보낸 클라이언트에게 리다이렉트 응답 전송 (rowClickCount 포함)
                socket.send(JSON.stringify({ 
                    type: "redirect", 
                    payload: "/exit-screen?timeSpent=" + Math.floor(timeSpent / 1000) + "&rowClickCount=" + rowClickCount 
                })); // 수정: Math.floor 적용

                // 모든 display 클라이언트에게 종료 메시지 브로드캐스팅 (rowClickCount, clickedCoords 포함)
                sockets.forEach(aSocket => {
                    if (aSocket !== socket) {
                        aSocket.send(JSON.stringify({ type: "user_exited", payload: { timeSpent: Math.floor(timeSpent / 1000), rowClickCount: rowClickCount, clickedCoords: clickedCoords } })); // 수정: Math.floor 적용
                    }
                });
                break;
        }
    });
});

const port = process.env.PORT || 3000;  // Render에서는 자동으로 포트를 할당, 로컬에서는 3000번 포트 사용
server.listen(3000, handleListen);
