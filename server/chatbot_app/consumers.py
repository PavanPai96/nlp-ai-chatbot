import json
from channels.generic.websocket import AsyncWebsocketConsumer
from nlp_service.ml_model import NLPEngine
from API.vacation_details_api import VacationDetails


class ChatRoomConsumer(AsyncWebsocketConsumer):
    nlpObj = None
    
    def __init__(self):
        super().__init__(self, AsyncWebsocketConsumer)
        self.vacation_details = VacationDetails()
        self.nlpObj = NLPEngine()
        self.nlpObj.trainModel()

    async def connect(self):
        self.chat_box_name = self.scope["url_route"]["kwargs"]["chat_box_name"]
        self.group_name = "chat_%s" % self.chat_box_name

        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    # This function receive messages from WebSocket.
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        username = text_data_json["username"]
        cookie = text_data_json["cookie"]

        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "chatbox_message",
                "message": message,
                "username": username,
                "cookie": cookie,
            },
        )

    # Receive message from room group.
    async def chatbox_message(self, event):
        message = event["message"]
        username = event["username"]
        cookie = event["cookie"]
        answer = self.nlpObj.answer_me(message)
        if "VACATION_DETAILS" in answer:
            answer = self.vacation_details.send_vacation_details(cookie)
        # send message and username of sender to websocket
        await self.send(
            text_data=json.dumps(
                {
                    "message": answer,
                    "username": username,
                }
            )
        )

    pass
