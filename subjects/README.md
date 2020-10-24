# Subjects selection

The subjects of the experiment are 50 web apps randomly chosen from the [Tranco list](https://tranco-list.eu/). The version of the list used for subject selection
covered the period from 23 September 2020 to 22 October 2020. The selection process was performed on a Nexus6P mobile device with the viewport of 412x660 pixels. 
The selected web apps were assesed against the folowing criteria:

- **CR1: Presence of below-the-fold content**: a potential subject's URL was loaded in the browser and the presence of below-the-fold content was verified by 
scrolling down within the browser's viewport.

- **CR2: No existing implementation of the Critical CSS technique**: the [Critical](https://github.com/addyosmani/critical) tool was applied to each potential 
subject for producing its version with the Critical CSS tecnique applied. If the size of an `index.html` file of the subject does not change, no critical CSS content
was inlined as a result of this process. This means that the subject already implements Critical CSS tecnique.

## Selected subjects

The total of 50 web apps that fullfil both above mention crieteria were chosen as subjects of the experiment. The table below gives an overview of the subjects and
their properties:

| # | Name and URL | No of CSS files | Inlined critical (%) | Avg external non-critical (%) | Asyncronous CSS | Browser
|---|---|---|---|---|---|---|
| 1 | [adidasnmd](http://www.adidasnmd.us/) | 4 | 0.0 | 93.075 | false | firefox |
| 2 | [adriaticbasket](http://www.adriaticbasket.info/) | 4 | 0.0 | 96.850 | false | firefox |
| 3 | [alliedtelesis](https://www.alliedtelesis.com/en) | 8 | 56.4 | 98.425 | false | chrome |
| 4 | [ammar](https://ammar.cloud/) | 18 | 24.0 | 98.128 | false | firefox |
| 5 | [andreaswaelti](http://andreaswaelti.com/) | 3 | 0.0 | 75.800 | false | chrome |
| 6 | [astropix](https://astropix.com/) | 2 | 80.4 | 85.3 | false | chrome |
| 7 | [bdfor](https://bdfor.com/) | 12 | 81.5 | 87.858 | false | chrome |
| 8 | [cbdvapejuice](https://cbdvapejuice.net/) | 6 | 16.1 | 99.200 | false | firefox |
| 9 | [coloradoboulevard](https://www.coloradoboulevard.net/) | 26 | 92.2 | 92.515 | false | chrome |
| 10 | [compresse-per-articolazioni](http://compresse-per-articolazioni.eu/) | 3 | 0.0 | 93.067 | false | firefox |
| 11 | [cottagelife](https://cottagelife.com/) | 13 | 0.0 | 92.528 | false | firefox |
| 12 | [denverite](https://denverite.com/) | 5 | 0.0 | 93.940 | false | chrome
| 13 | [drivenxdesign](https://drivenxdesign.com/d100/) | 12 | 0.0 | 98.683 | false | chrome |
| 14 | [fusion](https://www.fusion.org/) | 3 | 0.0 | 93.633 | false | firefox |
| 15 | [gildedserpent](http://gildedserpent.com/) | 2 | 96.6 | 56.8 | false | firefox |
| 16 | [greasyfork](https://greasyfork.org/en) | 2 | 0.0 | 92.9 | false | firefox |
| 17 | [greentechmedia](https://www.greentechmedia.com/) | 8 | 0.0 | 98.738 | false | firefox
| 18 | [hagley](https://www.hagley.org/) | 10 | 0.0 | 89.490 | false | firefox
| 19 | [hcss](https://www.hcss.com/) | 13 | 39.9 | 98.585 | false | firefox
| 20 | [heinlein-support](https://heinlein-support.de/) | 2 | 0.0 | 91.000 | false | chrome
| 21 | [holifestival](https://www.holifestival.org/) | 4 | 0.0 | 82.6 | false | firefox
| 22 | [iflyer](https://iflyer.tv/) | 3 | 0.0 | 90.133 | true | firefox
| 23 | [iliketubes](http://www.iliketubes.com/en/) | 3 | 0.0 | 85.633 | false | firefox
| 24 | [japassie](http://japassie.com/) | 12 | 1.8 | 94.508 | false | chrome
| 25 | [kasteelhoensbroek](https://www.kasteelhoensbroek.nl/) | 16 | 58.1 | 93.675 | false | chrome
| 26 | [kenengba](https://kenengba.com/) | 9 | 69.1 | 90.622 | false | |
| 27 | [kpoe](http://kpoe.at/) | 11 | 0.0 | 87.127 | false | |
| 28 | [legalaidnc](https://legalaidnc.org/) | 8 | 0.0 | 92.712 | false | |
| 29 | [lekhafoods](https://www.lekhafoods.com/) | 4 | 0.0 | 87.175 | false | |
| 30 | [magnetadservices](https://magnetadservices.com/) | 1 | 0.0 | 94.5 | false | |
| 31 | [marketlii](http://marketlii.com/) | 6 | 0.0 | 70.767 | false | |
| 32 | [megatorrentshd](https://megatorrentshd.biz/) | 7 | 59.4 | 81.486 | false | |
| 33 | [mrob](http://mrob.com/) | 1 | 0.0 | 75.200 | false | |
| 34 | [nflpenalties](https://www.nflpenalties.com/) | 5 | 0.0 | 81.340 | false | |
| 35 | [pieterhugo](https://pieterhugo.com/) | 2 | 16.1 | 87.05 | false | |
| 36 | [porn5f](https://www.porn5f.com/) | 3 | 49.9 | 97.033 | false | |
| 37 | [quechua](https://www.quechua.com/) | 7 | 100.0 | 95.714 | false | |
| 38 | [renesia](https://www.renesia.com/) | 5 | 0.0 | 96.420 | false | |
| 39 | [sciencebeta](https://sciencebeta.com/) | 1 | 0.0 | 84.6 | false | |
| 40 | [spansh](https://spansh.co.uk/plotter) | 2 | 0.0 | 95.850 | false | |
| 41 | [sportravel](https://sportravel.es/) | 12 | 0.0 | 96.692 | false | |
| 42 | [swimply](https://swimply.com/) | 8 | 0.0 | 83.688 | false | |
| 43 | [telfer](https://telfer.ru/) | 5 | 0.0 | 95.56 | false | |
| 44 | [ubersocial](https://ubersocial.com/) | 3 | 0.0 | 85.967 | false | |
| 45 | [velovita](https://velovita.com/) | 28 | 54.5 | 92.207 | false | |
| 46 | [vergecampus](https://vergecampus.com/) | 11 | 53.5 | 84.781 | false | |
| 47 | [sidneylophoto](http://www.sidneylophoto.com/) | 3 | 0.0 | 73.567 | false | |
| 48 | [worldlink](https://worldlink.com.np/) | 20 | 0.0 | 86.435 | false | |
| 49 | [xobor](http://xobor.com/) | 8 | 0.0 | 83.450 | false | |
| 50 | [zuver](https://zuver.net.au/) | 10 | 10.5 | 99.000 | false | |

