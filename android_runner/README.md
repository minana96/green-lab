# Critical CSS experiment

This experiment was performed using [android-runner](https://github.com/S2-group/android-runner) tool. The experiment scripts are placed in the `critical_css_experiment` subfolder and detailed instructions for the experiment replication can be found [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/critical_css_experiment/README.md).

A few adjustments were performed on the original source code of the `android-runner` tool to fit the Critical CSS experiment. Here we list all adjustments and the reasonings behind them can be found in the source code comments.

1. `AndroidRunner/WebExperiment.py`: the field `local_server_address` is added and extracted from config file [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/AndroidRunner/WebExperiment.py#L20). The arguments of `interaction` method are adjusted [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/AndroidRunner/WebExperiment.py#L70) and browser launch is moved into the `critical_css_experiment/Scripts/interaction.py` script. 

2. `AndroidRunner/Experiment.py`: the arguments of `before_run` script [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/AndroidRunner/Experiment.py#L197) and `interaction` script [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/AndroidRunner/Experiment.py#L209) are adjusted. 

3. `__main__.py`: a local web server is stopped if running when user terminates the experiment prematurely via keyboard [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/__main__.py#L36).

**TODO**: was something changed for charging purposes? 
