import sys
import os
from os import path

def make_critical(directory):
    for cat in os.listdir(directory):   
        found = False
        valid_path = directory + cat + "/" + cat
        for fil in os.listdir(valid_path):
            if fil.startswith("index"):
                found = True
                print(fil, valid_path + "/" + fil)
                path_to_index = valid_path + "/" + fil
            critical_cmd = "cat" + path_to_index + " | " + "node_modules/.bin/critical --base " + valid_path + " --inline > " + valid_path + "/index_temp.html"
            mv_cmd = "mv " + valid_path + "/index_temp.html " + path_to_index
        if not found:
            print("Couldn't find index of ", cat)

        


if __name__ == '__main__':
    # USAGE: (python3 AddCritical.py path/To/Directory/With/All/WebApplication/)
    # Overrides the index.html with an inlined css version
    make_critical(sys.argv[1])