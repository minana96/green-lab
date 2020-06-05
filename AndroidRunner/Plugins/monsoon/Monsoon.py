import csv
import os
import os.path as op
import threading
import time
import timeit
from collections import OrderedDict
from functools import reduce

from AndroidRunner import util
from AndroidRunner.Plugins.Profiler import Profiler
from AndroidRunner.Plugins.monsoon.Script.power_device import power_meter

class Monsoon(Profiler):
    def __init__(self, config, paths):
        super(Monsoon, self).__init__(config, paths)
        self.output_dir = ''
        self.paths = paths
        self.profile = False
        self.use_case = config['use_case']

    def dependencies(self):
        """Returns list of needed app dependencies,like com.quicinc.trepn, [] if none"""
        return []

    def load(self, device):
        """Load (and start) the profiler process on the device"""
        return

    def start_profiling(self, device, **kwargs):
        """Start the profiling process"""
        power_meter.start()

    def stop_profiling(self, device, **kwargs):
        """Stop the profiling process"""
        self.results = power_meter.stop()
        self.profile = False

    def collect_results(self, device):
        """Collect the data and clean up extra files on the device, save data in location set by 'set_output' """
        filename = 'monsoon_{}.csv'.format(time.strftime('%Y.%m.%d_%H%M%S'))
        with open(op.join(self.output_dir, filename), 'w+') as f:
            writer = csv.writer(f)
            writer.writerow(["energy", "duration", "error_flag"])
            writer.writerow([self.results[0], self.results[1], self.results[2]])

    def unload(self, device):
        """Stop the profiler, removing configuration files on device"""
        return

    def set_output(self, output_dir):
        """Set the output directory before the start_profiling is called"""
        self.output_dir = output_dir

    def aggregate_subject(self):
        """Aggregate the data at the end of a subject, collect data and save data to location set by 'set output' """
        with open(op.join(self.output_dir, 'aggregated.csv'), 'w+') as output:
            writer = csv.writer(output)
            writer.writerow(["energy", "duration", "error_flag"])
            for output_file in os.listdir(self.output_dir):
                if output_file.startswith("monsoon_"):
                    res = open(op.join(self.output_dir, output_file)).readlines()[1]
                    res = res.split(",")
                    writer.writerow([res[0],res[1],res[2]])

    def aggregate_end(self, data_dir, output_file):
        """Aggregate the data at the end of the experiment.
         Data located in file structure inside data_dir. Save aggregated data to output_file
        """
        rows = self.aggregate_final(data_dir)
        util.write_to_file(output_file, rows)

    def aggregate_final(self, data_dir):
        """Compiles subject aggregation files"""
        rows = []
        for device in util.list_subdir(data_dir):
            row = OrderedDict({'device': device})
            device_dir = os.path.join(data_dir, device)
            for subject in util.list_subdir(device_dir):
                row.update({'subject': subject})
                subject_dir = os.path.join(device_dir, subject)
                if os.path.isdir(os.path.join(subject_dir, 'monsoon')):
                    row.update(self.get_aggregated_runs(
                        os.path.join(subject_dir, 'monsoon')))
                    rows.append(row.copy())
                else:
                    for browser in util.list_subdir(subject_dir):
                        row.update({'browser': browser})
                        browser_dir = os.path.join(subject_dir, browser)
                        if os.path.isdir(os.path.join(browser_dir, 'monsoon')):
                            ind_row = row.copy()
                            row.update(self.get_aggregated_runs(
                                os.path.join(browser_dir, 'monsoon')))
                            repetition_count = len(os.listdir(os.path.join(browser_dir, 'monsoon'))) - 1
                            if reptition_count > 1:
                                for i in range(repetition_count):
                                    ind_row.update({"energy": row["energy"][i], "duration": row["duration"][i], "error_flag": row['error_flag'][i]})
                                    rows.append(ind_row.copy())
                            else:
                                rows.append(row.copy())
        return rows

    @staticmethod
    def get_aggregated_runs(logs_dir):
        for aggregated_file in [f for f in os.listdir(logs_dir) if os.path.isfile(os.path.join(logs_dir, f))]:
            if aggregated_file == "aggregated.csv":
                with open(os.path.join(logs_dir, aggregated_file), 'r') as aggregated:
                    reader = csv.DictReader(aggregated)
                    row_dict = OrderedDict()
                    for row in reader:
                        for f in reader.fieldnames:
                            if f in row_dict.keys():
                                l = list()
                                l.append(row_dict[f])
                                l.append(row[f])
                                row_dict.update({f: l})
                            else:
                                row_dict.update({f: row[f]})
                    print(OrderedDict(row_dict))
                    return OrderedDict(row_dict)
