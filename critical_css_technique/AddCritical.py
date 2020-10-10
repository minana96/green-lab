import sys
import os
from os import path
from io import StringIO

def make_critical(directory):
    for cat in os.listdir(directory):   
        found = False
        valid_path = directory + cat + "/" + cat
        for fil in os.listdir(valid_path):
            if fil.startswith("index.html"):
                found = True
                # print(fil, valid_path + "/" + fil)
                path_to_index = valid_path + "/" + fil
                # print(path_to_index)
                critical_cmd = "cat " + path_to_index + " | " + "node_modules/.bin/critical --base " + valid_path + " --inline -w 412 -h 660 > " + valid_path + "/index_temp.html"
                mv_cmd = "mv " + valid_path + "/index_temp.html " + path_to_index
                # print(critical_cmd)
                # print(mv_cmd)
                # sys.stdout = mystdout = StringIO()

                if not os.path.exists(valid_path + "/index_temp.html"):
                    os.system(critical_cmd)
                if os.stat(path_to_index).st_size <= os.stat(valid_path + "/index_temp.html").st_size:
                    print(path_to_index, "is smaller than temp", os.stat(valid_path + "/index_temp.html").st_size)
                else:
                    print("\n", path_to_index, "is not smaller or equal to temp", os.stat(valid_path + "/index_temp.html").st_size)
                if os.stat(valid_path + "/index_temp.html").st_size == 0:
                    print(valid_path, "TEMP IS ZERO BYTES")
            
        if not found:
            print("Couldn't find index of ", cat)

        


if __name__ == '__main__':
    # USAGE: (python3 AddCritical.py path/To/Directory/With/All/WebApplication/)
    # Overrides the index.html with an inlined css version
    make_critical(sys.argv[1])