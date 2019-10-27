import numpy
import pandas as pd
import numpy as np
from pandas.plotting import scatter_matrix
from sklearn import preprocessing
import matplotlib.pyplot as plt
plt.rc("font", size=14)
from sklearn.linear_model import LogisticRegression
from sklearn import model_selection
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn import metrics

import seaborn as sns
import statsmodels.api as sm
sns.set(style="white")
sns.set(style="whitegrid", color_codes=True)

data = pd.read_csv('C:\\Users\\Francesco\\Desktop\\Applications for Data Analysis\\Labs\\Lab03\\loans.csv')

print(data.head(20))
print(data.shape)
print(list(data.columns))

# #data exploration
# print(data['not.fully.paid'].value_counts())
# sns.countplot(x='not.fully.paid', data=data, palette='hls')
# plt.show()
#
# count_no_sub = len(data[data['not.fully.paid']==0])
# count_sub = len(data[data['not.fully.paid']==1])
# pct_of_no_sub = count_no_sub/(count_no_sub+count_sub)
# print("percentage of no not fully paid is", pct_of_no_sub*100)
# pct_of_sub = count_sub/(count_no_sub+count_sub)
# print("percentage of fully paid is", pct_of_sub*100)
#
# print(data.groupby('not.fully.paid').mean())

X = data.loc[:, data.columns != 'not.fully.paid']
Y = data.loc[:, data.columns == 'not.fully.paid']

validation_size = 0.30
seed = 142
X_train, X_validation, Y_train, Y_validation = model_selection.train_test_split(X, Y, test_size=validation_size, random_state=seed)


logit_model=sm.Logit(Y_train,X_train)
result=logit_model.fit()
print(result.summary2())

X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.3, random_state=0)
logreg = LogisticRegression()
logreg.fit(X_train, y_train)
#proba= LogisticRegression.predict_proba(logreg)
#print(proba)
y_pred = logreg.predict(X_test)
proba = logreg.predict_proba(X_test)
print(proba[:,1])
plt.hist(proba[:,1])
#plt.plot(X_test, proba[:,0])
plt.show()
print('Accuracy of logistic regression classifier on test set: {:.2f}'.format(logreg.score(X_test, y_test)))

# high_risk = X_test[logreg.predict_proba(X_test) >= 0.75]
# #medium_high_risk = X_test[logreg.predict_proba(X_test) >= 0.5 & logreg.predict_proba(X_test) <0.75]
# medium_risk = X_test[logreg.predict_proba(X_test) >= 0.25 & logreg.predict_proba(X_test) <0.5]
# low_risk = X_test[logreg.predict_proba(X_test) <0.25]
#
# medium_risk = X_test[numpy.where(logreg.predict_proba(X_test) >= 0.25 & logreg.predict_proba(X_test) <0.5)]


confusion_matrix = confusion_matrix(y_test, y_pred)
print(confusion_matrix)

print(data.shape)
print(result.summary2())