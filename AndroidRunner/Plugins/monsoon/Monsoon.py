import csv
import logging
import os.path as op
import os

from AndroidRunner.Plugins.Profiler import Profiler
from AndroidRunner.Plugins.monsoon.Script.power_device import power_meter

class Monsoon(Profiler):
    def __init__(self, config, paths):
        super(Monsoon, self).__init__(config, paths)
        self.output_dir = ''
        self.paths = paths
        self.profile = False
        self.logger = logging.getLogger(self.__class__.__name__)

    def dependencies(self):
        """Returns list of needed app dependencies,like com.quicinc.trepn, [] if none"""
        return []

    def load(self, device):
        """Load (and start) the profiler process on the device"""
        return

    def start_profiling(self, device, **kwargs):
        """Start the profiling process"""
        print("Before start profiling")
        power_meter.start()

    def stop_profiling(self, device, **kwargs):
        """Stop the profiling process"""
        energy_consumption, duration, error_flag = power_meter.stop()
        print(str(energy_consumption))

    def collect_results(self, device):
        """Collect the data and clean up extra files on the device, save data in location set by 'set_output' """
        return

    def unload(self, device):
        """Stop the profiler, removing configuration files on device"""
        return

    def set_output(self, output_dir):
        """Set the output directory before the start_profiling is called"""
        return

    def aggregate_subject(self):
        """Aggregate the data at the end of a subject, collect data and save data to location set by 'set output' """
        return

    def aggregate_end(self, data_dir, output_file):
        """Aggregate the data at the end of the experiment.
         Data located in file structure inside data_dir. Save aggregated data to output_file
        """
        return
