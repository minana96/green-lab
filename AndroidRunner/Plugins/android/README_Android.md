# Android Plugin
This plugin collects memory and CPU usage via the `cpuinfo` and `meminfo` Android utilities.                                                                                                                                                                                                            

## Configuration
Below, an example configuration can be found.
```json
  "profilers": {
    "android": {
      "sample_interval": 100,
      "data_points": ["cpu", "mem"],
      "subject_aggregation": "user_subject_aggregation.py",
      "experiment_aggregation": "user_experiment_aggregation.py"
    }
  }
```
