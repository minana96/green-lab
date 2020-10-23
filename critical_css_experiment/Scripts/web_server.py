"""Web server script

This script contains methods for starting and stopping a local web server 
on port 8000 from a directory of a target web app. This is necessary due
to dependent resources of some web apps whose paths are set to web server's
root folder. The paths are set in this way by the automated tool for 
downloading an entire web app.

The start method is called from before_run script. The stop method is called
from the after_run script. The local server is hosting a web app in a separate
subprocess. Since the global variables are not preserved during a run, the 
process id of the web server's subprocess is preserved in a file so that the 
subprocessed can be terminated.
"""

import time
import os
import pickle
import subprocess
import signal


def start(path):
    """Starts up a local web server from a directory of a target 
    web app
    """

    old_dir = os.getcwd()
    os.chdir(path)
    retval = os.getcwd()
    print("Directory changed successfully %s" % retval)

    cmd = 'python3 -m http.server'
    proc = subprocess.Popen(cmd, shell=True, preexec_fn=os.setsid)
    print("Web server started")

    os.chdir(old_dir)
    retval = os.getcwd()
    print("Directory restored successfully %s" % retval)
    print(f"Saving pid {proc.pid}")

    with open('proc_pid.pickle', 'wb') as f:
        pickle.dump(proc.pid, f)


def stop():
    """Stops a local web server
    """

    with open('proc_pid.pickle', 'rb') as f:
        pid = pickle.load(f)
    
        try:
            print(f"Killing pid {pid}")
            os.killpg(pid, signal.SIGTERM)
            print("Web server stopped")
        except ProcessLookupError:
            print("No process with this pid could be found")

