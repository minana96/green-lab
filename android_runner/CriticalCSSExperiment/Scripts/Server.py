import time
import os
import pickle
import subprocess
import signal


def start(path):
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

    with open('proc_pid.pickle', 'wb') as f:
        pickle.dump(proc.pid, f)


def stop():
    with open('proc_pid.pickle', 'rb') as f:
        pid = pickle.load(f)
    
    os.killpg(pid, signal.SIGTERM)
    print("Web server stopped")

