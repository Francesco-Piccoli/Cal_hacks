# Imports the Google Cloud client library
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types
from google.oauth2 import service_account

#credentials = service_account.Credentials.from_service_account_file('\\Users\\Francesco\\Desktop\\Cal_Hacks\\prova.json')
# Instantiates a client
client = language.LanguageServiceClient()

# The text to analyze
text = 'I really love Berkeley, it is amazing. I like it a lot. Super cool, I am so excited to tell everybody!'
document = types.Document(
    content=text,
    type=enums.Document.Type.PLAIN_TEXT)
annotations = client.analyze_sentiment(document=document)

# Detects the sentiment of the text
sentiment = client.analyze_sentiment(document=document).document_sentiment
Entities = client.analyze_entities(document=document)

print('Text: {}'.format(text))
print('Sentiment: {}, {}'.format(sentiment.score, sentiment.magnitude))

for index, sentence in enumerate(annotations.sentences):
    sentence_sentiment = sentence.sentiment.score
    print('Sentence {} has a sentiment score of {}'.format(index, sentence_sentiment))

print('Overall Sentiment: score of {} with magnitude of {}'.format(sentiment.score, sentiment.magnitude))