"""Apply critical script

This script applies Critical CSS technique programatically with an 
external npm module, the Critical tool by Addy Osmani. The viewport of 
is 412 x 660 is customized for Nexus6P mobile device.

%% SAY MORE ABOUT THE SCRIPT %%

The script should be called once, before the experiment execution with the
following command:
python3 apply_critical.py path/To/Directory/With/All/WebApplication/

It will create another folder with '_critical' appended to original name 
with inlined crtitical CSS content within index.html file of each web app.
"""

import sys
import os

from distutils.dir_util import copy_tree

def apply_critical(directory):
    copy_tree(directory, f"{directory[:-1]}_critical")
    directory = f"{directory[:-1]}_critical"

    for web_app in os.listdir(directory):
        print(f"Now applying critical to: {web_app}")
        index_path = f"{directory}/{web_app}/{web_app}/index.html"
        if os.path.exists(index_path):
            os.system(f"cat {index_path} | node_modules/.bin/critical --base {index_path[:-11]} --inline -w 412 -h 660 > {index_path[:-11]}/index_temp.html")

            if os.stat(index_path).st_size <= os.stat(index_path[:-11] + "/index_temp.html").st_size:
                print(index_path, "is smaller than temp", os.stat(index_path[:-11] + "/index_temp.html").st_size)
            else:
                print("\n", index_path, "is not smaller or equal to temp", os.stat(index_path[:-11] + "/index_temp.html").st_size)
            if os.stat(index_path[:-11] + "/index_temp.html").st_size == 0:
                print(index_path[:-11], "TEMP IS ZERO BYTES")

            os.system(f"mv {index_path[:-11]}/index_temp.html {index_path}")
        else:
            print("Couldn't find index of ", web_app)

if __name__ == '__main__':
    apply_critical(sys.argv[1])
