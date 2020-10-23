"""Interaction script

This script will be executed between the start and end of each run.

It starts up the local server on port 8001 that will listen for the
custom GET request once the DOMContentLoad event is triggered from a
target web app. Upon processing the request, the server is stopped 
and the interaction script ends. This will in fact end the entire run.
"""

from http.server import BaseHTTPRequestHandler, HTTPServer


# noinspection PyUnusedLocal
def main(*args: tuple, **kwargs: dict):
    """Starts a local server and ends it upon processing
    one HTTP request
    """
    device = args[0]
    browser = args[1]
    local_address = args[2]

    server_address = ('', 8001)
    httpd = HTTPServer(server_address, TestHandler)
    browser.load_url(device, local_address)
    httpd.handle_request()


class TestHandler(BaseHTTPRequestHandler):
    """Custom HTTP Request Handler class that is handed 
    over to a web server object for processing HTTP requests 
    """

    def do_GET(self):
        """Handler for the custom GET request which prints
        the console message once the target web app's DOM
        content is loaded
        """

        print("loaded")

