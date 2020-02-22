import csv
import logging
import os
import os.path as op

from .Profiler import Profiler
from physalia.power_meters import MonsoonHVPMPowerMeter as HVPM

class Monsoon(Profiler):

    # noinspection PyUnusedLocal
    def __init__(self, config, paths):
        super(Monsoon, self).__init__(config, paths)
        self.output_dir = ''
        self.paths = paths
        self.profile = False
        self.type = config['type']
        self.monsoon = config['profilers']['monsoon']
        self.power_meter = HVPM(self.monsoon['voltage'], self.monsoon['id']
        self.ramp = self.monsoon['ramp']
        self.max_current = self.monsoon['max_current']
        self.max_powerup_current = self.monsoon['max_powerup_current']
        self.usb_passthrough = self.monsoon['usb_passthrough']
        self.use_case = self.monsoon['use_case']
        self.sampling_method = self.monsoon['sampling_method']
        self.hz = float(1000 / self.monsoon['sample_interval'])
        #available_data_points = ['cpu', 'mem']
        #self.interval = float(self.is_integer(config.get('sample_interval', 0))) / 1000
        #self.data_points = config['data_points']
        #invalid_data_points = [dp for dp in config['data_points'] if dp not in set(available_data_points)]
        #if invalid_data_points:
           # self.logger.warning('Invalid data points in config: {}'.format(invalid_data_points))
        #self.data_points = [dp for dp in config['data_points'] if dp in set(available_data_points)]
        #self.data = [['datetime'] + self.data_points]
        self.logger = logging.getLogger(self.__class__.__name__)
        pass

    def dependencies(self):
        """Returns list of needed app dependencies,like com.quicinc.trepn, [] if none"""
        return []

    def load(self, device):
        """Load (and start) the profiler process on the device"""
        raise NotImplementedError

    def start_profiling(self, device, **kwargs):
        """Start the profiling process"""
        raise NotImplementedError

    def stop_profiling(self, device, **kwargs):
        """Stop the profiling process"""
        raise NotImplementedError

    def collect_results(self, device):
        """Collect the data and clean up extra files on the device, save data in location set by 'set_output' """
        raise NotImplementedError

    def unload(self, device):
        """Stop the profiler, removing configuration files on device"""
        raise NotImplementedError

    def set_output(self, output_dir):
        """Set the output directory before the start_profiling is called"""
        raise NotImplementedError

    def aggregate_subject(self):
        """Aggregate the data at the end of a subject, collect data and save data to location set by 'set output' """
        raise NotImplementedError

    def aggregate_end(self, data_dir, output_file):
        """Aggregate the data at the end of the experiment.
         Data located in file structure inside data_dir. Save aggregated data to output_file
        """
        raise NotImplementedError
