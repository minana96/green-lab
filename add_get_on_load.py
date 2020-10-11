import os, sys
from bs4 import BeautifulSoup

def add_get_on_load(directory, ip):
    for web_app in os.listdir(directory):
        print(f"Now adding request on load to: {web_app}")
        index_path = f"{directory}/{web_app}/{web_app}/index.html"
        if os.path.exists(index_path):
            soup = BeautifulSoup(open(index_path, 'rb'), "lxml")
            if(soup.find('head')):
                script = soup.new_tag('script')
                script.string = "window.addEventListener('load', (event) => {\n\
		                        const Http = new XMLHttpRequest();\n\
		                        const url='" + f"http://{ip}:8001/" + "';\n\
		                        Http.open(\"GET\", url);\n\
		                        Http.send();\n\
	                            });"
                soup.head.insert(0,script)

                with open(index_path, "w") as file:
                    file.write(str(soup))
            else:
                print(f"Index of {web_app} contained no head")

        else:
            print("Couldn't find index of ", web_app)

if __name__ == '__main__':
    #USAGE: (python3 add_get_on_load.py path/To/Directory/With/All/WebApplication/ IPADRRESS)
    add_get_on_load(sys.argv[1], sys.argv[2])
