#!/usr/bin/python3

from requests import Session

# This data must be modified in accordance with the authentication process.
if __name__ == '__main__':
    url = 'http://localhost/'
    data = {
        'username': 'admin',
        'password': 'admin',
        'login': ''
    }
    file_path = '/path/file/cookie.txt'

    session = Session()
    get_cookie = session.get(url + 'index.php')

    if get_cookie.status_code == 200:
        res_headers = get_cookie.headers
        phpsessid_value = res_headers['Set-Cookie'].split(';')[0].split('=')[1]

        cookies = {'PHPSESSID': phpsessid_value}

        auth_res = session.post(url + 'index.php', cookies=cookies, data=data)
        html_content = auth_res.text

        if auth_res.status_code == 200:        
            with open(file_path, 'w') as cookie_file:
                cookie_file.write(phpsessid_value)
