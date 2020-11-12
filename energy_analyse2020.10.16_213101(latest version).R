#set path of data and get all the subforders
#change the path where you put the data
setwd("D:/Rdata/2020.10.16_213101/data/nexus6p") 
#change the path where you put the data
projectpath="D:/Rdata/2020.10.16_213101/data/nexus6p"

library(stringr)
#using paste strings and list.files to find the files
#for app with critical
criticalfiles<-list.files(pattern = "subjects_critical")
name_cri_chro <- strsplit(criticalfiles, "-")
name_cri_chro <- sapply(name_cri_chro, "[", 2)
appbrowser_cri_chro <- paste(criticalfiles, "chrome", sep = "/")
androidappbrowser_cri_chro<- paste(appbrowser_cri_chro, "android", sep = "/")
trepnappbrowser_cri_chro<- paste(appbrowser_cri_chro, "trepn", sep = "/")
batterystatsappbrowser_cri_chro<- paste(appbrowser_cri_chro, "batterystats", sep = "/")
androidappbrowser_cri_chro<- paste(appbrowser_cri_chro, "android", sep = "/")
completetrepath_cri_chro<-paste(projectpath, trepnappbrowser_cri_chro, sep = "/")
completebatpath_cri_chro<-paste(projectpath, batterystatsappbrowser_cri_chro, sep = "/")
completeandpath_cri_chro<-paste(projectpath, androidappbrowser_cri_chro, sep = "/")
timecal_cri_chro=vector()
memory_cri_chro=vector()
energy_cri_chro=vector()
CPU_cri_chro=vector()
#get time_cri_chro
for (i in 1:25) {
  fileswithoutagg_cri_chro<-list.files(completetrepath_cri_chro[i], pattern = "ENU")
  timesum_cri_chro= 0
  for(j in 1:10){
    openpath<-paste(completetrepath_cri_chro[i], fileswithoutagg_cri_chro[j], sep = "/")
    data<-read.csv(openpath)
    timesum_cri_chro<-timesum_cri_chro+max(data[,1])
  }
  timecal_cri_chro[i]<-timesum_cri_chro/10
}
#get energy
for (i in 1:25) {
  filesbattery_cri_chro<-list.files(completebatpath_cri_chro[i], pattern = "Agg")
  openpath<-paste(completebatpath_cri_chro[i], filesbattery_cri_chro, sep = "/")
  data<-read.csv(openpath)
  energy_cri_chro[i]<-data[,1]
}
#get memory_use
for (i in 1:25) {
  openpath<-paste(completetrepath_cri_chro[i], "Aggregated.csv", sep = "/")
  data<-read.csv(openpath)
  memory_cri_chro[i]<-max(data[,1])
}
#ger CPU
for (i in 1:25) {
  openpath<-paste(completeandpath_cri_chro[i], "Aggregated.csv", sep = "/")
  data<-read.csv(openpath)
  CPU_cri_chro[i]<-max(data[,1])
}
trainSet_cri_chro <-data.frame(name_cri_chro,timecal_cri_chro,energy_cri_chro,memory_cri_chro,CPU_cri_chro)
trainSet_cri_chro

#for app with noncritical
noncriticalfiles<-list.files(pattern = "subjects-")
name_non_chro <- strsplit(noncriticalfiles, "-")
name_non_chro <- sapply(name_non_chro, "[", 2)
appbrowser_non_chro <- paste(noncriticalfiles, "chrome", sep = "/")
androidappbrowser_non_chro<- paste(appbrowser_non_chro, "android", sep = "/")
trepnappbrowser_non_chro<- paste(appbrowser_non_chro, "trepn", sep = "/")
batterystatsappbrowser_non_chro<- paste(appbrowser_non_chro, "batterystats", sep = "/")
androidappbrowser_non_chro<- paste(appbrowser_non_chro, "android", sep = "/")

completetrepath_non_chro<-paste(projectpath, trepnappbrowser_non_chro, sep = "/")
completebatpath_non_chro<-paste(projectpath, batterystatsappbrowser_non_chro, sep = "/")
completeandpath_non_chro<-paste(projectpath, androidappbrowser_non_chro, sep = "/")
timecal_non_chro=vector()
memory_non_chro=vector()
energy_non_chro=vector()
CPU_non_chro=vector()

#get time
for (i in 1:25) {
  fileswithoutagg_non_chro<-list.files(completetrepath_non_chro[i], pattern = "ENU")
  timesum_non_chro=0
  for(j in 1:10){
    openpath<-paste(completetrepath_non_chro[i], fileswithoutagg_non_chro[j], sep = "/")
    data<-read.csv(openpath)
    timesum_non_chro<-timesum_non_chro+max(data[,1])
  }
  timecal_non_chro[i]<-timesum_non_chro/10
}
#get energy
for (i in 1:25) {
  filesbattery_non_chro<-list.files(completebatpath_non_chro[i], pattern = "Agg")
  openpath<-paste(completebatpath_non_chro[i], filesbattery_non_chro, sep = "/")
  data<-read.csv(openpath)
  energy_non_chro[i]<-data[,1]
}
#get memory_use
for (i in 1:25) {
  openpath<-paste(completetrepath_non_chro[i], "Aggregated.csv", sep = "/")
  #  print(openpath)
  data<-read.csv(openpath)
  memory_non_chro[i]<-max(data[,1])
  #  print(memory[i])
}
#ger CPU
for (i in 1:25) {
  openpath<-paste(completeandpath_non_chro[i], "Aggregated.csv", sep = "/")
  #  print(openpath)
  data<-read.csv(openpath)
  CPU_non_chro[i]<-max(data[,1])
  #  print(CPU[i])
}
trainSet_non_chro <-data.frame(name_non_chro,timecal_non_chro,energy_non_chro,memory_non_chro,CPU_non_chro)
trainSet_non_chro
##############for RQ1########################
diff_energy_chro<-energy_non_chro-energy_cri_chro
energydata_chro <-data.frame(name_non_chro, energy_non_chro, energy_cri_chro, diff_energy_chro)
energydata_chro
#summary
summary(energydata_chro)
#visualization
hist(energydata_chro$diff_energy_chro, main = "Distribution of difference of energy(Chrome)")
boxplot(energydata_chro$diff_energy_chro, main="Boxplot of difference of energy(Chrome)")
plot(energydata_chro$diff_energy_chro, main="Scatterplot of difference of energy(Chrome)")
library("rstatix")
library("ggplot2")
shapiro.test(diff_energy_chro)
#finding that differences are not in normal distribution
#statistic tests
wilcox.test(energy_cri_chro, energy_non_chro, paired = TRUE)
##############for RQ2########################
#for CPU
diff_CPU_chro<-CPU_cri_chro-CPU_non_chro
qqnorm(diff_CPU_chro, main = "QQplot for CPU utilisation(chrome)")
qqline(diff_CPU_chro)
#check normal distribution(pass)
shapiro.test(diff_CPU_chro)
CPUdata_chro <-data.frame(name_non_chro, CPU_non_chro, CPU_cri_chro, diff_CPU_chro)
CPUdata_chro
#summary
summary(CPUdata_chro)
#visualization
hist(CPUdata_chro$diff_CPU_chro, main = "Distribution of difference of CPU utilisation(chrome)")
boxplot(CPUdata_chro$diff_CPU_chro, main="Boxplot of difference of CPU utilisation(chrome)")
plot(CPUdata_chro$diff_CPU_chro, main="Scatterplot of difference of CPU utilisation(chrome)")
#statisic test
t.test(CPU_non_chro, CPU_cri_chro, paired = TRUE)

#for memory
diff_memory_chro<-memory_cri_chro-memory_non_chro
qqnorm(diff_memory_chro, main = "QQplot for memory usage(chrome)")
qqline(diff_memory_chro)
#check normal distribution(pass)
shapiro.test(diff_memory_chro)
memorydata_chro <-data.frame(name_non_chro, memory_non_chro, memory_cri_chro, diff_memory_chro)
memorydata_chro
#summary
summary(memorydata_chro)
#visualization
hist(memorydata_chro$diff_memory_chro, main = "Distribution of difference of memory usage(chrome)")
boxplot(memorydata_chro$diff_memory_chro, main="Boxplot of difference of memory usage(chrome)")
plot(memorydata_chro$diff_memory_chro, main="Scatterplot of difference of memory usage(chrome)")
#statisic test
t.test(memory_non_chro, memory_cri_chro, paired = TRUE)

#for time
diff_timecal_chro<-timecal_cri_chro-timecal_non_chro
#check normal distribution(not pass)
shapiro.test(diff_timecal_chro)
timedata_chro <-data.frame(name_non_chro, timecal_non_chro, timecal_cri_chro, diff_timecal_chro)
timedata_chro
#summary
summary(timedata_chro)
#visualization
hist(timedata_chro$diff_timecal_chro, main = "Distribution of difference of time(chrome)")
boxplot(timedata_chro$diff_timecal_chro, main="Boxplot of difference of time(chrome)")
plot(timedata_chro$diff_timecal_chro, main="Scatterplot of difference of time(chrome)")
#statistic tests
wilcox.test(timecal_non_chro, timecal_cri_chro, paired = TRUE)


