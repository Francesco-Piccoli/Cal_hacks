import argparse

from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types




def print_result(annotations):
    score = annotations.document_sentiment.score
    magnitude = annotations.document_sentiment.magnitude

    for index, sentence in enumerate(annotations.sentences):
        sentence_sentiment = sentence.sentiment.score
        print('Sentence {} has a sentiment score of {}'.format(
            index, sentence_sentiment))

    print('Overall Sentiment: score of {} with magnitude of {}'.format(
        score, magnitude))
    return 0


def analyze(hello):
    """Run a sentiment analysis request on text within a passed filename."""
    client = language.LanguageServiceClient()

    with open(hello, 'r') as review_file:
        # Instantiates a plain text document.
        content = review_file.read()
        print(content)

    document = types.Document(
        content=content,
        type=enums.Document.Type.PLAIN_TEXT)
    annotations = client.analyze_sentiment(document=document)

    # Print the results
    print_result(annotations)

#movie_review_filename='C:\\Users\\Francesco\\PycharmProjects\\PGAA1819\\Cal_hacks\\hello.txt'
if __name__ == '__main__':
    # parser = argparse.ArgumentParser(
    #     description=__doc__,
    #     formatter_class=argparse.RawDescriptionHelpFormatter)
    # parser.add_argument('hello', help='C:\\Users\\Francesco\\PycharmProjects\\PGAA1819\\Cal_hacks\\hello.txt')
    # args = parser.parse_args()

    hello = 'C:\\Users\\Francesco\\PycharmProjects\\PGAA1819\\Cal_hacks\\hello.txt'

    analyze(hello)