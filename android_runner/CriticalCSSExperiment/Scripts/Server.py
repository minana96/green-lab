from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import multiprocessing

def start(path):
    old_dir = os.getcwd()
    os.chdir(path)
    retval = os.getcwd()
    print("Directory changed successfully %s" % retval)

    server_address = ('', 8000)
    server = HTTPServer(server_address, SimpleHTTPRequestHandler)
    proc = multiprocessing.Process(target = server.handle_request)
    proc.start()
    
    print("Web server started")
    return

def stop():
    print("Web server stopped")
    os.chdir("/home/milica")            #hardcoded, change it to somehow return to android-runner's parent directory
    retval = os.getcwd()
    print("Directory restored successfully %s" % retval)
    return

