from django.views import View
from django.http import JsonResponse
from django.shortcuts import render


# Create your views here.
class ChatbotQuery(View):
    def get(self, request):
        # print("self.request.body", self.request.body)
        # request_data = json.loads(self.request.body)
        # print("request_data", request_data)
        # print("type(request_data)", type(request_data))
        # final_data = f'This was the input sent- {request_data["input"]} -This is a demo response'
        # with open("data/Chatbot-QuestionAnswers-Samples.json") as f:
        #     json_data = json.load(f)
        #     print(f"json_data-> {json_data}")
        # for data in json_data["intents"]:
        #     if request_data["input"] in data["patterns"]:
        #         final_data = data["responses"]

        return JsonResponse({'user': "request.POST['user']", 'comment': "request.POST['comment']"})
        # return JsonResponse({"response": final_data})


def chat_box(request, chat_box_name):
    # we will get the chatbox name from the url
    return render(request, "chatbox.html", {"chat_box_name": chat_box_name})