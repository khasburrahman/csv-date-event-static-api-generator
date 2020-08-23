Put your input in here
Can put in subfolder, will read all csv file inside this directory

Format: csv Header: 
- date:  
  Format: (mm-dd-yyyy)  
  For repeatable events, please fill the year as XXXX to differentiate with non repeatable events, also prefer to put it before any repeatable events

- category:  
  Format: free string  
  The event category, we can use this for seperating events per category, so it will be used as a path to the events

- repeatable:  
  format: (T/F)  
  Boolean value representing is the event repeatable

- repeatable_year_period:  
  format: (yyyy-yyyy) [required if repeatable, seperated by comma]  
  Year range where the events is applicable, use XXXX for indefinite year  
  Sort the range for more readable value   
  For example:  
  `XXXX-2000`: from indefinite year to year 2000  
  `1990-2000`: from year 90\` to year 00\`  
  `1990-2000,2005-XXXX`: from year 90\` to year 00\` then from year 05\` to indefinite year  

- event:  
  Format: free string  
  The event name