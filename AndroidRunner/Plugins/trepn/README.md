# Trepn Plugin
This plugin collects data via the Trepn profiler, e.g., power consumption, battery temperature, CPUs frequency.
The plugin depends on the [Trepn Android app](./com.quicinc.trepn.apk) being installed on the device.

## Configuration
Below an example configuration is found:
```json
  "profilers": {
    "trepn": {
      "sample_interval": 100,
      "data_points": ["battery_power", "mem_usage"]
    }
  }
```

**sample_interval** *int*
The sample interval in which the data points are gathered.

**data_points** *Array<string>* 
The types of data that should be measured defined in an array of string enums. Possible options are listed in [data_points.json](./data_points.json).

**subject_aggregation** *string*
TODO: default subject aggregation

**experiment_aggregation** *string*
TODO: default experiment aggregation