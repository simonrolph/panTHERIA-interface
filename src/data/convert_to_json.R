setwd("~/panTHERIA-interface")

install.packages("jsonlite")
library(jsonlite)

WR05 <- read.delim("~/panTHERIA-interface/data/PanTHERIA_1-0_WR05_Aug2008.txt", stringsAsFactors=FALSE)
WR93 <- read.delim("~/panTHERIA-interface/data/PanTHERIA_1-0_WR93_Aug2008.txt", stringsAsFactors=FALSE)

WR05json <- toJSON(WR05)
write(WR05json, "WR05.json")

WR93json <- toJSON(WR93)
write(WR93json, "WR93.json")

