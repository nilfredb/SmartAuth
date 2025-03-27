import sqlite3
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import LabelEncoder

#Database conection

conn = sqlite3.connect("smartauth.db")

#register read

df = pd.read_sql_query("SELECT * FROM access_logs", conn)

#Preprocessing

df['hour'] = pd.to_datetime(df['timestamp']).dt.hour
df['day_of_week'] =pd.to_datetime(df['timestamp']).dt.weekday

# IP and User agent codification

le_ip = LabelEncoder()
le_ua= LabelEncoder()

df['ip_encoded'] = le_ip.fit_transform(df['ip_address'])
df['ua_encoded'] = le_ua.fit_transform(df['user_agent'])

#Columns to train

X = df[['hour', 'day_of_week', 'ip_encoded', 'ua_encoded']]

#Anomalies detection model

model = IsolationForest(contamination=0.1) # you can change this rate as need
df['anomaly'] = model.fit_predict(X) #-1 = anomaly, 1= normal

#Print results

print(df[['email', 'timestamp', 'ip_address', 'user_agent', 'hour', 'day_of_week', 'anomaly']])

#save resutls

df.to_csv("Logs.cvs", index = False)