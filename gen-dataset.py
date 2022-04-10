#!/usr/bin/python3

# Hiding all warnings
import warnings
warnings.filterwarnings('ignore')

# import numpy, pandas and other necessary libraries
import re
import numpy as np
import pandas as pd
import swifter
from wordcloud import STOPWORDS
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer

#pd.options.display.max_columns = 50

data = pd.read_csv('data.csv')

#newData = data[['Start_Time', 'Start_Lat', 'Start_Lng', 'Precipitation(in)', 'Junction', 'Sunrise_Sunset', 'Civil_Twilight', 'Nautical_Twilight', 'Astronomical_Twilight']]
newData = data[['Start_Time', 'Start_Lat', 'Start_Lng', 'Precipitation(in)', 'Junction']]

newData["Start_Time"]= pd.to_datetime(data["Start_Time"]) 

# Normalize Twilight
'''
newData['Sunrise_Sunset'] = newData['Sunrise_Sunset'].apply(lambda x: x == 'Day')
newData['Civil_Twilight'] = newData['Civil_Twilight'].apply(lambda x: x == 'Day')
newData['Nautical_Twilight'] = newData['Nautical_Twilight'].apply(lambda x: x == 'Day')
newData['Astronomical_Twilight'] = newData['Astronomical_Twilight'].apply(lambda x: x == 'Day')
'''

# Split date
newData['Year']=newData['Start_Time'].dt.year
newData['Month']=newData['Start_Time'].dt.month
newData['Day']=newData['Start_Time'].dt.day
newData['Hour']=newData['Start_Time'].dt.hour
newData['Minute']=newData['Start_Time'].dt.minute
newData['Weekday']=newData['Start_Time'].dt.weekday

# Drop all rows with incomplete data
print(len(newData))

newData.dropna(inplace=True)
newData.drop(columns=['Start_Time'], inplace=True)

newData['Junction'] = newData['Junction'].apply(lambda x: int(x) )

print(newData.head(100))
print(newData.columns)

newData.to_csv('./prod/dataset.csv')
