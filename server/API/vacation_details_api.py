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

    def __get_formatted_html(self, res):
        try:
            final_res_data = {}
            vacation_data = res.get("vacationData", [])
            accured_data = res.get("accuredData", 0.00).get("total_remaining", 0.00)
            remaining_leaves = 0.00
            for all_vacation in res.get("accuredData").get("listAllVacationPolicy", []):
                if all_vacation.get("text") != "Other Time Off":
                    remaining_leaves += float(all_vacation.get("remaining"))
            for data in vacation_data:
                vacation_type = data.get("vacationType").get("name")
                if vacation_type != "Other Time Off":
                    # remaining_leaves = remaining_leaves + data.get("availableIfApproved", 0.00)
                    final_date_data = [f"Date: {date.get('date')} for {date.get('time')}day<br>" for date in
                                       data["dates"]]
                    # for date in dates:
                    #     final_date_data.append(f"Date: {date.get('date')} for {date.get('time')}day<br>")
                    final_res_data.update({data.get("vacationType").get("name"): final_date_data})
            formatted_html = f"<strong>Accured: {accured_data}</strong><br>" \
                             f"<strong>Remaining: {str(round(remaining_leaves, 2))}</strong><br>" \
                             f"<strong>Vacation Details: </strong><ul>"
            for data in final_res_data:
                formatted_html += f"<li>Type: {data}</li>" \
                                  f"<li>Info:<br>{''.join(final_res_data.get(data, ''))}</li>"

            formatted_html += f"</ul>"
            return formatted_html
        except Exception as ex:
            return "working on it, will be back shortly"

    def send_vacation_details(self, cookie):
        result = self.__get_vacation_details(cookie)
        result = self.__get_formatted_html(result)
        return result
