# Critical CSS Experiment: Replication Package

This repository represents the replication package of the Critical CSS experiment performed as part of the Green Lab course at the Vrije Universiteit Amsterdam. The experiment is performed with the [android-runner](https://github.com/S2-group/android-runner) tool.

The repository contains all the material needed for the replication of the experiment: 
- The total of 50 subjects of the experiment with and without Critical CSS treatment applied 
- The android-runner tool along with the custom experiment scripts and configurations 
- Raw data outputs and statistical analysis script

Selected subjects
-----------
The detailed information regarding subject selection process and the properties of the selected subjects can be found [here](https://github.com/minana96/green-lab/blob/master/subjects/README.md). 
The selected subjects can be found [here](https://github.com/minana96/green-lab/tree/master/subjects). The Critical CSS tecnique is applied to all selected subjects and another version of each subject is created.

Experiment execution
-----------

The source code of the android-runner tool was slightly adjusted to fit the requirements of the Critical CSS experiment. The detailed information about the adjustments can be found [here](https://github.com/minana96/green-lab/blob/master/android_runner/README.md). 

The following custom scripts were used in the experiment:
1. [apply_critical.py](https://github.com/minana96/green-lab/blob/master/android_runner/critical_css_experiment/Scripts/apply_critical.py) - automatically applies the Critical CSS technique to the listed web apps using the [Critical](https://github.com/addyosmani/critical) tool.
2. [add_get_on_load.py](https://github.com/minana96/green-lab/blob/master/android_runner/critical_css_experiment/Scripts/add_get_on_load.py) - adds a custom `DOMContentLoaded` event listener to each subject. The listener sends an empty `HTTP GET` request that terminates the profiling of the target subject.
3. [after_launch.py](https://github.com/minana96/green-lab/blob/master/android_runner/critical_css_experiment/Scripts/after_launch.py) - programmatical interaction with Chrome to close all pop-up windows before a target subject is launched in the browser.
4. [web_server.py](https://github.com/minana96/green-lab/blob/master/android_runner/critical_css_experiment/Scripts/web_server.py) - a custom local web server run from the target subject's directory.
5. [before_run.py](https://github.com/minana96/green-lab/blob/master/android_runner/critical_css_experiment/Scripts/before_run.py) - starts a local web server from a target subject's directory so that all dependent resources would be accessed using correct paths.
6. [after_run.py](https://github.com/minana96/green-lab/blob/master/android_runner/critical_css_experiment/Scripts/after_run.py) - stops the local web server once the experiment run is finished.
7. [interaction.py](https://github.com/minana96/green-lab/blob/master/android_runner/critical_css_experiment/Scripts/interaction.py) - listens for the
custom `HTTP GET` request once the `DOMContentLoad` event is triggered and stops the profiling of the target subject.

There are two configuration files for the experiments on both Chrome and Firefox browser:
1. [config_chrome.json](https://github.com/minana96/green-lab/blob/master/android_runner/critical_css_experiment/config_chrome.json) - Chrome experiment configuration.
2. [config_firefox.json](https://github.com/minana96/green-lab/blob/master/android_runner/critical_css_experiment/config_firefox.json)- Firefox experiment configuration.

The detailed steps for the replication of the experiment are listed [here](https://github.com/minana96/green-lab/blob/master/android_runner/critical_css_experiment/README.md).

Data analysis
------

The statical analysis was performed over the raw data outputs presented [here](https://github.com/minana96/green-lab/tree/master/data_analysis/data) of the experiment. The analysis was performed in `R` and the details are available in both `R-Markdown` file format [here](https://github.com/minana96/green-lab/blob/master/data_analysis/data_analysis.Rmd) and `R-notebook HTML` format [here](https://github.com/minana96/green-lab/blob/repo-organize/data_analysis/data_analysis.nb.html) formats. Additionally, reliability of measures is assessed in the `R-script` available [here](https://github.com/minana96/green-lab/master/data_analysis/reliability_of_measures.R).

The tranformed data outputs of the statistical analysis can be found here [here](https://github.com/minana96/green-lab/tree/master/data_analysis/analysis_results). Descriptive plots as aditional output of statistical analysis can be found here.
