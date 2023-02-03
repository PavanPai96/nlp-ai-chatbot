from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path, path
from chatbot_app import consumers
from django.core.asgi import get_asgi_application

# URLs that handle the WebSocket connection are placed here.
websocket_urlpatterns = [
    re_path(r"ws/chat/(?P<chat_box_name>\w+)", consumers.ChatRoomConsumer.as_asgi()),
]

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": AuthMiddlewareStack(
            URLRouter(
                websocket_urlpatterns
            )
        ),
    }
)
