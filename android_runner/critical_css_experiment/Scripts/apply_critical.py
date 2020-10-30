"""Apply critical script

This script applies the Critical CSS technique programatically using Addy
Osmani's critical tool. The command line version shall be installed available
in the node_modules folder.

The viewport used to determine what is above the fold content is set to 412 x
660, which is the viewport size of a Nexus 6P device.

The script should be called once, before the experiment execution with the
following command:
python3 apply_critical.py path/to/subjects_original path/to/subjects_critical

For each subject in the given subjects_original folder, a copy will be created
in the given subjects_critical folder. This copy will have inlined crtitical
CSS content within the index.html file.
"""

import sys
import os

from distutils.dir_util import copy_tree


def apply_critical(original_directory, critical_directory):
    copy_tree(original_directory, critical_directory)

    for web_app in os.listdir(critical_directory):
        print(f"Now applying critical to: {web_app}")
        index_path = f"{critical_directory}/{web_app}/{web_app}/index.html"
        if os.path.exists(index_path):
            os.system(f"cat {index_path} > {index_path[:-11]}/index_temp.html")

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
    if len(sys.argv) != 3:
        print('Invalid amount of arguments. Usage:\n'
              'python3 apply_critical.py path/to/subjects_original path/to/subjects_critical')
        exit(1)
    apply_critical(sys.argv[1], sys.argv[2])
