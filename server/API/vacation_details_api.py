import requests
import json


class VacationDetails:
    def __init__(self):
        # authToken
        self.user_token = "https://everest-k2.galeinternal-testing.g43labs.net/api/v1/auth/jwt_auth/"
        self.vacation_detail = "https://everest-k2.galeinternal-testing.g43labs.net/api/v1/vacation/get_vacation_data/"
        self.headers = {'Content-type': 'application/json'}

    def __get_session_token(self):
        data = {"username": "", "password": ""}
        session_token = requests.post(self.user_token, data=json.dumps(data), headers=self.headers)
        return session_token

    def __get_vacation_details(self, cookie):
        # data = {"Authorization": authtoken, "Cookie": cookie}
        self.headers.update({"Cookie": cookie})
        vacation_details = requests.get(self.vacation_detail, headers=self.headers)
        return vacation_details.json()

    def send_vacation_details(self, cookie):
        result = self.__get_vacation_details(cookie)
        return result
