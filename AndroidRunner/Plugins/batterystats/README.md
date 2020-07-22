# Batterystats Plugin
This plugin uses the `batterystats` utility and estimates energy consumption via the algorithm proposed in [this article](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=7884613&casa_token=oEEnY7XOip8AAAAA:AyRZxwboUh55-n9vmW5NGT62mL_hv85T4wPGWlDQGJ36VpF3bcAV1ufvYBhsYxlB0lIMOYJ_Hc-O&tag=1).

## Configuration
Below, an example configuration can be found.
```json
  "profilers": {
    "batterystats": {
      "cleanup": true,
      "subject_aggregation": "default",
      "experiment_aggregation": "default",
      "enable_systrace_parsing": true,
      "python2_path": "python2"
    }
  }
```

**enable_systrace_parsing** *boolean*
The Batterystats profiler uses the profiling tool Systrace internally to measure CPU specific activity and energy consumption on the mobile device. For some devices the parsing of the output of Systrace fails, causing the experiment run to fail. You can safely disable the Systrace parsing when you encounter Systrace parsing errors given that your experiment does not need rely on CPU specific information, but rather on the overall energy consumption of the mobile device. The overall energy consumption is not affected by the Systrace logs since it is tracked using another tool. The default is *true*.

**python2_path** *string*
The path to python 2 that is used to launch Systrace. The default is *python2*.

**subject_aggregation** *string*
TODO: default subject aggregation

**experiment_aggregation** *string*
TODO: default experiment aggregation