#set path of data and get all the subforders
#change the path where you put the data
setwd("D:/Rdata/2020.10.17_230431/data/nexus6p") 
#change the path where you put the data
projectpath="D:/Rdata/2020.10.17_230431/data/nexus6p"

library(stringr)
#using paste strings and list.files to find the files
#for app with critical
criticalfiles<-list.files(pattern = "subjects_critical")
name_cri_fire <- strsplit(criticalfiles, "-")
name_cri_fire <- sapply(name_cri_fire, "[", 2)
appbrowser_cri_fire <- paste(criticalfiles, "firefox", sep = "/")
androidappbrowser_cri_fire<- paste(appbrowser_cri_fire, "android", sep = "/")
trepnappbrowser_cri_fire<- paste(appbrowser_cri_fire, "trepn", sep = "/")
batterystatsappbrowser_cri_fire<- paste(appbrowser_cri_fire, "batterystats", sep = "/")
androidappbrowser_cri_fire<- paste(appbrowser_cri_fire, "android", sep = "/")
completetrepath_cri_fire<-paste(projectpath, trepnappbrowser_cri_fire, sep = "/")
completebatpath_cri_fire<-paste(projectpath, batterystatsappbrowser_cri_fire, sep = "/")
completeandpath_cri_fire<-paste(projectpath, androidappbrowser_cri_fire, sep = "/")
timecal_cri_fire=vector()
memory_cri_fire=vector()
energy_cri_fire=vector()
CPU_cri_fire=vector()
#get time_cri_fire
for (i in 1:25) {
  fileswithoutagg_cri_fire<-list.files(completetrepath_cri_fire[i], pattern = "ENU")
  timesum_cri_fire= 0
  for(j in 1:10){
    openpath<-paste(completetrepath_cri_fire[i], fileswithoutagg_cri_fire[j], sep = "/")
    data<-read.csv(openpath)
    timesum_cri_fire<-timesum_cri_fire+max(data[,1])
  }
  timecal_cri_fire[i]<-timesum_cri_fire/10
}
#get energy
for (i in 1:25) {
  filesbattery_cri_fire<-list.files(completebatpath_cri_fire[i], pattern = "Agg")
  openpath<-paste(completebatpath_cri_fire[i], filesbattery_cri_fire, sep = "/")
  data<-read.csv(openpath)
  energy_cri_fire[i]<-data[,1]
}
#get memory_use
for (i in 1:25) {
  openpath<-paste(completetrepath_cri_fire[i], "Aggregated.csv", sep = "/")
  data<-read.csv(openpath)
  memory_cri_fire[i]<-max(data[,1])
}
#ger CPU
for (i in 1:25) {
  openpath<-paste(completeandpath_cri_fire[i], "Aggregated.csv", sep = "/")
  data<-read.csv(openpath)
  CPU_cri_fire[i]<-max(data[,1])
}
trainSet_cri_fire <-data.frame(name_cri_fire,timecal_cri_fire,energy_cri_fire,memory_cri_fire,CPU_cri_fire)
trainSet_cri_fire

#for app with noncritical
noncriticalfiles<-list.files(pattern = "subjects-")
name_non_fire <- strsplit(noncriticalfiles, "-")
name_non_fire <- sapply(name_non_fire, "[", 2)
appbrowser_non_fire <- paste(noncriticalfiles, "firefox", sep = "/")
androidappbrowser_non_fire<- paste(appbrowser_non_fire, "android", sep = "/")
trepnappbrowser_non_fire<- paste(appbrowser_non_fire, "trepn", sep = "/")
batterystatsappbrowser_non_fire<- paste(appbrowser_non_fire, "batterystats", sep = "/")
androidappbrowser_non_fire<- paste(appbrowser_non_fire, "android", sep = "/")

completetrepath_non_fire<-paste(projectpath, trepnappbrowser_non_fire, sep = "/")
completebatpath_non_fire<-paste(projectpath, batterystatsappbrowser_non_fire, sep = "/")
completeandpath_non_fire<-paste(projectpath, androidappbrowser_non_fire, sep = "/")
timecal_non_fire=vector()
memory_non_fire=vector()
energy_non_fire=vector()
CPU_non_fire=vector()

#get time
for (i in 1:25) {
  fileswithoutagg_non_fire<-list.files(completetrepath_non_fire[i], pattern = "ENU")
  timesum_non_fire=0
  for(j in 1:10){
    openpath<-paste(completetrepath_non_fire[i], fileswithoutagg_non_fire[j], sep = "/")
    data<-read.csv(openpath)
    timesum_non_fire<-timesum_non_fire+max(data[,1])
  }
  timecal_non_fire[i]<-timesum_non_fire/10
}
#get energy
for (i in 1:25) {
  filesbattery_non_fire<-list.files(completebatpath_non_fire[i], pattern = "Agg")
  openpath<-paste(completebatpath_non_fire[i], filesbattery_non_fire, sep = "/")
  data<-read.csv(openpath)
  energy_non_fire[i]<-data[,1]
}
#get memory_use
for (i in 1:25) {
  openpath<-paste(completetrepath_non_fire[i], "Aggregated.csv", sep = "/")
  #  print(openpath)
  data<-read.csv(openpath)
  memory_non_fire[i]<-max(data[,1])
  #  print(memory[i])
}
#ger CPU
for (i in 1:25) {
  openpath<-paste(completeandpath_non_fire[i], "Aggregated.csv", sep = "/")
  #  print(openpath)
  data<-read.csv(openpath)
  CPU_non_fire[i]<-max(data[,1])
  #  print(CPU[i])
}
trainSet_non_fire <-data.frame(name_non_fire,timecal_non_fire,energy_non_fire,memory_non_fire,CPU_non_fire)
trainSet_non_fire
##############for RQ1########################
diff_energy_fire<-energy_non_fire-energy_cri_fire
energydata_fire <-data.frame(name_non_fire, energy_non_fire, energy_cri_fire, diff_energy_fire)
energydata_fire
#summary
summary(energydata_fire)
#visualization
hist(energydata_fire$diff_energy_fire, main = "Distribution of difference of energy(firefox)")
boxplot(energydata_fire$diff_energy_fire, main="Boxplot of difference of energy(firefox)")
plot(energydata_fire$diff_energy_fire, main="Scatterplot of difference of energy(firefox)")
library("rstatix")
library("ggplot2")
shapiro.test(diff_energy_fire)
#finding that differences are not in normal distribution
#statistic tests
wilcox.test(energy_cri_fire, energy_non_fire, paired = TRUE)
##############for RQ2########################
#for CPU
diff_CPU_fire<-CPU_cri_fire-CPU_non_fire
qqnorm(diff_CPU_fire, main = "QQplot for CPU utilisation(fire)")
qqline(diff_CPU_fire)
#check normal distribution(pass)
shapiro.test(diff_CPU_fire)
CPUdata_fire <-data.frame(name_non_fire, CPU_non_fire, CPU_cri_fire, diff_CPU_fire)
CPUdata_fire
#summary
summary(CPUdata_fire)
#visualization
hist(CPUdata_fire$diff_CPU_fire, main = "Distribution of difference of CPU utilisation(firefox)")
boxplot(CPUdata_fire$diff_CPU_fire, main="Boxplot of difference of CPU utilisation(firefox)")
plot(CPUdata_fire$diff_CPU_fire, main="Scatterplot of difference of CPU utilisation(firefox)")
#statisic test
t.test(CPU_non_fire, CPU_cri_fire, paired = TRUE)

#for memory
diff_memory_fire<-memory_cri_fire-memory_non_fire
qqnorm(diff_memory_fire, main = "QQplot for memory usage(firefox)")
qqline(diff_memory_fire)
#check normal distribution(pass)
shapiro.test(diff_memory_fire)
memorydata_fire <-data.frame(name_non_fire, memory_non_fire, memory_cri_fire, diff_memory_fire)
memorydata_fire
#summary
summary(memorydata_fire)
#visualization
hist(memorydata_fire$diff_memory_fire, main = "Distribution of difference of memory usage(firefox)")
boxplot(memorydata_fire$diff_memory_fire, main="Boxplot of difference of memory usage(firefox)")
plot(memorydata_fire$diff_memory_fire, main="Scatterplot of difference of memory usage(firefox)")
#statisic test
t.test(memory_non_fire, memory_cri_fire, paired = TRUE)

#for time
diff_timecal_fire<-timecal_cri_fire-timecal_non_fire
#check normal distribution(not pass)
shapiro.test(diff_timecal_fire)
timedata_fire <-data.frame(name_non_fire, timecal_non_fire, timecal_cri_fire, diff_timecal_fire)
timedata_fire
#summary
summary(timedata_fire)
#visualization
hist(timedata_fire$diff_timecal_fire, main = "Distribution of difference of time(firefox)")
boxplot(timedata_fire$diff_timecal_fire, main="Boxplot of difference of time(firefox)")
plot(timedata_fire$diff_timecal_fire, main="Scatterplot of difference of time(firefox)")
#statistic tests
wilcox.test(timecal_non_fire, timecal_cri_fire, paired = TRUE)
