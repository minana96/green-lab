from http.server import BaseHTTPRequestHandler, HTTPServer


# noinspection PyUnusedLocal
def main(*args: tuple, **kwargs: dict):
    server_address = ('', 8001)
    httpd = HTTPServer(server_address, TestHandler)
    httpd.handle_request()

class TestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        print("loaded")

