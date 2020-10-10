import sys
import os

from distutils.dir_util import copy_tree

def apply_critical(directory):
    copy_tree(directory, f"{directory}_critical")
    directory = f"{directory}_critical"

    for web_app in os.listdir(directory):
        index_path = f"{directory}/{web_app}/{web_app}/index.html"
        if os.path_exists(index_path):
            os.system(f"cat {index_path} | node_modules/.bin/critical --base {index_path[:-11]} --inline -w 412 -h 660 > {index_path[:-11]}/index_temp.html")

            if os.stat(index_path).st_size <= os.stat(index_path[:-11] + "/index_temp.html").st_size:
                print(index_path, "is smaller than temp", os.stat(index_path[:-11] + "/index_temp.html").st_size)
            else:
                print("\n", index_path, "is not smaller or equal to temp", os.stat(index_path[:-11] + "/index_temp.html").st_size)
            if os.stat(index_path[:-11] + "/index_temp.html").st_size == 0:
                print(index_path[:-11], "TEMP IS ZERO BYTES")
            if False:
                os.system(f"mv {index_path[:-11]}/index_temp.html {index_path}")
        else:
            print("Couldn't find index of ", web_app)

if __name__ == '__main__':
    # USAGE: (python3 AddCritical.py path/To/Directory/With/All/WebApplication/)
    # Overrides the index.html with an inlined css version
    apply_critical(sys.argv[1])
