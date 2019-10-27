import numpy
import pandas as pd
import numpy as np
from pandas import array
from pandas.plotting import scatter_matrix
from sklearn import preprocessing
import matplotlib.pyplot as plt
plt.rc("font", size=14)
from sklearn.linear_model import LogisticRegression
from sklearn import model_selection
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn import metrics
# Imports the Google Cloud client library
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
from google.oauth2 import service_account

import seaborn as sns
import statsmodels.api as sm
sns.set(style="white")
sns.set(style="whitegrid", color_codes=True)

data = pd.read_csv('C:\\Users\\Francesco\\PycharmProjects\\PGAA1819\\Cal_hacks\\ML\\DATASET-BURNOUT4.csv', sep=";")
# print(data.head(20))
# print(data.shape)
# print(list(data.columns))

# print(data.Burnout)

data.Burnout = data.Burnout.replace(to_replace=['No', 'Yes'], value=[0, 1])
# print(data.Burnout)

#%%#####################################################################################################################
#credentials = service_account.Credentials.from_service_account_file('\\Users\\Francesco\\Desktop\\Cal_Hacks\\prova.json')
# Instantiates a client
client = language.LanguageServiceClient()

tweets = pd.read_csv('C:\\Users\\Francesco\\PycharmProjects\\PGAA1819\\Cal_hacks\\ML\\sentiment.csv', sep=";")
print(tweets.head(20))
# The text to analyze
# text = 'I really love Berkeley, it is amazing. I like it a lot. Super cool, I am so excited to tell everybody!'
# document = types.Document(
#     content=text,
#     type=enums.Document.Type.PLAIN_TEXT)
# annotations = client.analyze_sentiment(document=document)
#
# # Detects the sentiment of the text
# sentiment = client.analyze_sentiment(document=document).document_sentiment
# Entities = client.analyze_entities(document=document)
#
# print('Text: {}'.format(text))
# print('Sentiment: {}, {}'.format(sentiment.score, sentiment.magnitude))
#
# for index, sentence in enumerate(annotations.sentences):
#     sentence_sentiment = sentence.sentiment.score
#     print('Sentence {} has a sentiment score of {}'.format(index, sentence_sentiment))
#
# print('Overall Sentiment: score of {} with magnitude of {}'.format(sentiment.score, sentiment.magnitude))
# ######################################################################################################################
#
#
#
# #data = data.sample(frac=1).reset_index(drop=True)
# #print(data.Burnout)
#
# #print(data.loc[:,0])
# #
# # # #data exploration
# # # print(data['not.fully.paid'].value_counts())
# # # sns.countplot(x='not.fully.paid', data=data, palette='hls')
# # # plt.show()
# # #
# # # count_no_sub = len(data[data['not.fully.paid']==0])
# # # count_sub = len(data[data['not.fully.paid']==1])
# # # pct_of_no_sub = count_no_sub/(count_no_sub+count_sub)
# # # print("percentage of no not fully paid is", pct_of_no_sub*100)
# # # pct_of_sub = count_sub/(count_no_sub+count_sub)
# # # print("percentage of fully paid is", pct_of_sub*100)
# # #
# # # print(data.groupby('not.fully.paid').mean())
# #
# X = data.loc[:, data.columns != 'Burnout']
# Y = data.loc[:, data.columns == 'Burnout']
# #
# validation_size = 0.30
# seed = 142
# X_train, X_validation, Y_train, Y_validation = model_selection.train_test_split(X, Y, test_size=validation_size, random_state=seed)
#
#
# logit_model=sm.Logit(Y_train,X_train)
# result=logit_model.fit()
# print(result.summary2())
# #
#
# X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.3, random_state=seed)
# logreg = LogisticRegression()
# result = logreg.fit(X_train, y_train)
#
# y_pred = logreg.predict(X_test)
# proba = logreg.predict_proba(X_test)
# print(proba[:,1])
# plt.hist(proba[:,1])
# #plt.plot(X_test, proba[:,0])
# plt.show()
# confusion_matrix = confusion_matrix(y_test, y_pred)
# print(confusion_matrix)
# print('Accuracy of logistic regression classifier on test set: {:.2f}'.format(logreg.score(X_test, y_test)))
#
#
# #new_obs = [[1,0,22, 0.7,1]]
# new_obs = [[0,1,70, 1,0]]
# # Create the pandas DataFrame
# new_observation = pd.DataFrame(new_obs, columns=['Insomnia', 'Gender', 'Age', 'emails_read', 'seasonality'])
# print(new_observation.size)
#
# new_prediction = logreg.predict_proba(new_observation)
# print(new_prediction[:,1])
#

