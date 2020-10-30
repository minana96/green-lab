# The script for establishing reliability of measures by collecting standard deviation per metric and per subject



# The function that processes one subject on path given as a first argument and
# the browser used for subject launching as the second argument 
calculate_reliability <- function(path, browser) {
old_dir <- getwd()
setwd(path)
setwd(browser)

# extract name of the subject
name <- strsplit(path, split = "-") [[1]][2]

# process row batterystats plugin outputs
setwd("batterystats")
energy_data <- data.frame(joules = numeric())

for(raw_file_name in list.files(pattern = "^Joule"))
{
  batterystats_results <- read.csv(raw_file_name)
  energy_data[nrow(energy_data) + 1, ] <- c(batterystats_results[1, ])
}

energy <- mean(energy_data$joules)
energy_sd <- sd(energy_data$joules)
setwd("../")

# process row android plugin outputs
setwd("android")
cpu_util_data <- data.frame(cpu_util = numeric())

for(raw_file_name in list.files(pattern = "^ENU"))
{
  android_results <- read.csv(raw_file_name)
  cpu_util_data[nrow(cpu_util_data) + 1, ] <- c(mean(android_results$cpu))
}

cpu_util <- mean(cpu_util_data$cpu_util)
cpu_util_sd <- sd(cpu_util_data$cpu_util)
setwd("../")

# process row trepn plugin outputs
setwd("trepn")
memory_data <- data.frame(mem_usage = numeric())
time_data <- data.frame(time=numeric())

for(raw_file_name in list.files(pattern = "^ENU"))
{
  trepn_results <- read.csv(raw_file_name)
  memory_data[nrow(memory_data) + 1, ] <- c(mean(trepn_results[, 2]))
  time_data[nrow(time_data) + 1, ] <- c(max(trepn_results[, 1]))
}

memory_usage <- mean(memory_data$mem_usage)
memory_usage_sd <- sd(memory_data$mem_usage)
time <- mean(time_data$time)
time_sd <- sd(time_data$time)

setwd("../")

setwd(old_dir)
return(c(name, energy, energy_sd, cpu_util, cpu_util_sd, memory_usage, memory_usage_sd, time, time_sd))
}


# processing chrome subjects
setwd("data/chrome")
setwd("data/nexus6P")

# collecting reliability of measures for subjects with non-critical treatment
chrome_non_critical <- data.frame(name = numeric(), energy_mean = numeric(), energy_sd = numeric(), cpu_util_mean = numeric(), cpu_util_sd = numeric(),
                                  memory_usage_mean = numeric(), memory_usage_sd = numeric(), time_mean = numeric(), time_sd = numeric()) 


for(subject_folder_name in list.files(pattern = "^subjects-", include.dirs = TRUE, recursive = FALSE))
{
  row <- calculate_reliability(subject_folder_name, "chrome")
  chrome_non_critical[nrow(chrome_non_critical) + 1, ] <- row
}

# collecting reliability of measures for subjects with critical treatment
chrome_critical <- data.frame(name = numeric(), energy_mean = numeric(), energy_sd = numeric(), cpu_util_mean = numeric(), cpu_util_sd = numeric(),
                                  memory_usage_mean = numeric(), memory_usage_sd = numeric(), time_mean = numeric(), time_sd = numeric()) 


for(subject_folder_name in list.files(pattern = "^subjects_critical", include.dirs = TRUE, recursive = FALSE))
{
  row <- calculate_reliability(subject_folder_name, "chrome")
  chrome_critical[nrow(chrome_critical) + 1, ] <- row
}

setwd("../../../..")


# processing firefox subjects
setwd("data/firefox")
setwd("data/nexus6P")

# collecting reliability of measures for subjects with non-critical treatment
firefox_non_critical <- data.frame(name = numeric(), energy_mean = numeric(), energy_sd = numeric(), cpu_util_mean = numeric(), cpu_util_sd = numeric(),
                                   memory_usage_mean = numeric(), memory_usage_sd = numeric(), time_mean = numeric(), time_sd = numeric()) 


for(subject_folder_name in list.files(pattern = "^subjects-", include.dirs = TRUE, recursive = FALSE))
{
  row <- calculate_reliability(subject_folder_name, "firefox")
  firefox_non_critical[nrow(firefox_non_critical) + 1, ] <- row
}

# collecting reliability of measures for subjects with critical treatment
firefox_critical <- data.frame(name = numeric(), energy_mean = numeric(), energy_sd = numeric(), cpu_util_mean = numeric(), cpu_util_sd = numeric(),
                              memory_usage_mean = numeric(), memory_usage_sd = numeric(), time_mean = numeric(), time_sd = numeric()) 


for(subject_folder_name in list.files(pattern = "^subjects_critical", include.dirs = TRUE, recursive = FALSE))
{
  row <- calculate_reliability(subject_folder_name, "firefox")
  firefox_critical[nrow(firefox_critical) + 1, ] <- row
}

setwd("../../../..")

# merge critical and non-critical subjects into separate data sets
reliability_non_critical <- merge(x = chrome_non_critical, y = firefox_non_critical, all = TRUE)
reliability_critical <- merge(x = chrome_critical, y = firefox_critical, all = TRUE)

# save results into the analysis results folder
setwd("analysis_results")

write.csv(reliability_non_critical, file = "reliability_non_critical.csv")
write.csv(reliability_critical, file = "reliability_critical.csv")

setwd("../")

