from django.urls import path
from chatbot_app.views import ChatbotQuery, chat_box

app_name = "chatbot_app"

urlpatterns = [
    path('queries/', ChatbotQuery.as_view(), name="chatbot_query"),
    path("chat/<str:chat_box_name>/", chat_box, name="chat"),
]
