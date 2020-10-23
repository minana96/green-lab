"""Addd get on load script

This script adds a custom DOMContentLoaded event listener inside the head 
of an each web app as a last element. This position will ensure that all 
blocking stylesheets delay DOMConetentLoaded event thus prolonging the 
profiling time. When the event is triggered, an empty GET request is sent
to the local server running on port 8001 and profiling is stopped.

This script requires BeautifulSoup package installed within the Python
environment. All web apps must be named 'index.html' in order to add the
listener programatically.

The script should be called once before the experiment execution with the
following command:
python3 add_get_on_load.py path/To/Directory/With/All/WebApps/ <IP_ADDRESS>
"""

import os, sys
from bs4 import BeautifulSoup

def add_get_on_load(directory, ip):
    """Adds a custom DOMContentLoaded event listener
    """

    for web_app in os.listdir(directory):
        print(f"Now adding request on load to: {web_app}")
        index_path = f"{directory}/{web_app}/{web_app}/index.html"

        if os.path.exists(index_path):
            soup = BeautifulSoup(open(index_path, 'rb'), "lxml")

            if(soup.find('head')):
                script = soup.new_tag('script')
                script.string = "window.addEventListener('DOMContentLoaded', (event) => {\n\
		                        const Http = new XMLHttpRequest();\n\
		                        const url='" + f"http://{ip}:8001/" + "';\n\
		                        Http.open(\"GET\", url);\n\
		                        Http.send();\n\
	                            });"
                soup.head.insert(len(soup.head.contents),script)

                with open(index_path, "w") as file:
                    file.write(str(soup))
            else:
                print(f"Index of {web_app} contained no head")

        else:
            print("Couldn't find index of ", web_app)


if __name__ == '__main__':
    add_get_on_load(sys.argv[1], sys.argv[2])
