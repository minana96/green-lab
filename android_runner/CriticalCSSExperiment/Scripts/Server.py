from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import multiprocessing

def start(path):
    old_dir = os.getcwd()
    os.chdir(path)
    retval = os.getcwd()
    print("Directory changed to %s" % retval)

    server_address = ('', 8000)
    server = HTTPServer(server_address, SimpleHTTPRequestHandler)
    proc = multiprocessing.Process(target = server.handle_request)
    proc.start()
    print("Web server started")

    os.chdir(old_dir)
    retval = os.getcwd()
    print("Directory changed back to %s" % retval)

