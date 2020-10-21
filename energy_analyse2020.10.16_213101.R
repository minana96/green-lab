#set path of data and get all the subforders
#change the path where you put the data
setwd("D:/Rdata/2020.10.16_213101/data/nexus6p") 
#change the path where you put the data
projectpath="D:/Rdata/2020.10.16_213101/data/nexus6p"

library(stringr)

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
memory_usage_cri_chro=vector()
energy_cri_chro=vector()
CPU_utilisation_cri_chro=vector()
'#get time_cri_chro
for (i in 1:25) {
  fileswithoutagg_cri_chro<-list.files(completetrepath_cri_chro[i], pattern = "ENU")
  timesum_cri_chro= 0
  for(j in 1:10){
    openpath<-paste(completetrepath_cri_chro[i], fileswithoutagg_cri_chro[j], sep = "/")
    data<-read.csv(openpath)
    timesum_cri_chro<-timesum_cri_chro+max(data[,1])
  }
  timecal_cri_chro[i]<-timesum_cri_chro/10
}'
#get energy
for (i in 1:25) {
  filesbattery_cri_chro<-list.files(completebatpath_cri_chro[i], pattern = "Agg")
  openpath<-paste(completebatpath_cri_chro[i], filesbattery_cri_chro, sep = "/")
  data<-read.csv(openpath)
  energy_cri_chro[i]<-data[,1]
}
'#get memory_use
for (i in 1:25) {
  openpath<-paste(completetrepath_cri_chro[i], "Aggregated.csv", sep = "/")
  #  print(openpath)
  data<-read.csv(openpath)
  memory_usage_cri_chro[i]<-max(data[,1])
  #  print(memory_usage[i])
}
#ger CPU_utilisation
for (i in 1:25) {
  openpath<-paste(completeandpath_cri_chro[i], "Aggregated.csv", sep = "/")
  #print(openpath)
  data<-read.csv(openpath)
  CPU_utilisation_cri_chro[i]<-max(data[,1])
  #  print(CPU_utilisation[i])
}'
'trainSet_cri_chro <-data.frame(name_cri_chro,timecal_cri_chro,energy_cri_chro,memory_usage_cri_chro,CPU_utilisation_cri_chro)
trainSet_cri_chro'
energy_cri_chro_mean<-mean(energy_cri_chro)
energy_cri_chro_mean
energy_cri_chro_median<-median(energy_cri_chro)
energy_cri_chro_median
energy_cri_chro_var<-var(energy_cri_chro)
energy_cri_chro_var
energy_cri_chro_sd<-sd(energy_cri_chro)
energy_cri_chro_sd
energy_cri_chro_range<-range(energy_cri_chro)
energy_cri_chro_range
energy_cri_chro_coeffofvariation<-100*sd(energy_cri_chro)/mean(energy_cri_chro)
energy_cri_chro_coeffofvariation

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
memory_usage_non_chro=vector()
energy_non_chro=vector()
CPU_utilisation_non_chro=vector()

'#get time
for (i in 1:25) {
  fileswithoutagg_non_chro<-list.files(completetrepath_non_chro[i], pattern = "ENU")
  timesum_non_chro=0
  for(j in 1:10){
    openpath<-paste(completetrepath_non_chro[i], fileswithoutagg_non_chro[j], sep = "/")
    data<-read.csv(openpath)
    timesum_non_chro<-timesum_non_chro+max(data[,1])
    #    print(timesum)
  }
  timecal_non_chro[i]<-timesum_non_chro/10
}'
#get energy
for (i in 1:25) {
  filesbattery_non_chro<-list.files(completebatpath_non_chro[i], pattern = "Agg")
  openpath<-paste(completebatpath_non_chro[i], filesbattery_non_chro, sep = "/")
  data<-read.csv(openpath)
  energy_non_chro[i]<-data[,1]
}
'#get memory_use
for (i in 1:25) {
  openpath<-paste(completetrepath_non_chro[i], "Aggregated.csv", sep = "/")
  #  print(openpath)
  data<-read.csv(openpath)
  memory_usage_non_chro[i]<-max(data[,1])
  #  print(memory_usage[i])
}
#ger CPU_utilisation
for (i in 1:25) {
  openpath<-paste(completeandpath_non_chro[i], "Aggregated.csv", sep = "/")
  #  print(openpath)
  data<-read.csv(openpath)
  CPU_utilisation_non_chro[i]<-max(data[,1])
  #  print(CPU_utilisation[i])
}'
'trainSet_non_chro <-data.frame(name_non_chro,timecal_non_chro,energy_non_chro,memory_usage_non_chro,CPU_utilisation_non_chro)
trainSet_non_chro'

energy_non_chro_mean<-mean(energy_non_chro)
energy_non_chro_mean
energy_non_chro_median<-median(energy_non_chro)
energy_non_chro_median
energy_non_chro_var<-var(energy_non_chro)
energy_non_chro_var
energy_non_chro_sd<-sd(energy_non_chro)
energy_non_chro_sd
energy_non_chro_range<-range(energy_non_chro)
energy_non_chro_range
energy_non_chro_coeffofvariation<-100*sd(energy_non_chro)/mean(energy_non_chro)
energy_non_chro_coeffofvariation

#visualization

#install.packages("rstatix")
library("rstatix")
boxplot(trainSet_non_chro$energy_non_chro)
trainSet_non_chro %>%identify_outliers(energy_non_chro)
library("ggplot2")



#qqPlot(energy_non_chro)

#method
cor.test(energy_cri_chro, energy_non_chro,
         alternative = c("two.sided"),
         method = c("pearson"),
         exact = NULL, conf.level = 0.95, continuity = FALSE)
diff_energy_chro=vector()
for(i in 1:25){
  diff_energy_chro[i]<- energy_cri_chro[i] - energy_non_chro[i]
}
dataframe_energy_chro<-data.frame(name_non_chro,diff_energy_chro)
dataframe_energy_chro %>%
  identify_outliers(diff_energy_chro)
shapiro.test(diff_energy_chro)
library(bestNormalize)
diff_energy_chro_method <- bestNormalize(diff_energy_chro, allow_lambert_s = TRUE)
diff_energy_chro_asinh <- asinh(diff_energy_chro)
shapiro.test(diff_energy_chro_asinh)
dataframe_energy_chro<-data.frame(name_non_chro,diff_energy_chro_asinh)
ggplot(data = dataframe_energy_chro) +
  geom_point(mapping = aes(x = name_non_chro, y = diff_energy_chro_asinh))
qqnorm(dataframe_energy_chro$diff_energy_chro_asinh)
qqline(dataframe_energy_chro$diff_energy_chro_asinh)
#wilcox.test(energy_non_chro, energy_cri_chro, paired = TRUE)
