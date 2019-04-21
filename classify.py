#!D:\Users\Ritvik\Anaconda3\envs\datascience\python.exe
import warnings
warnings.filterwarnings("ignore")

import sys
import pyperclip

import textpreprocessing

import pickle
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences

y_cols = ['activities', 'art_and_sciences', 'living', 'love', 'mythology_and_folklore', 'nature', 'relationships', 'religion', 'social_commentaries']

model = load_model('lstm.h5')
tokenizer = pickle.load(open('Tokenizer.pickle', 'rb'))

def classify_poem(poem):
    poem = textpreprocessing.cleanText(poem, True, False, True, False)
    probabs =  model.predict(pad_sequences(tokenizer.texts_to_sequences([poem]), maxlen=1000))
    classes = []
    for i in range(len(y_cols)):
        if probabs[0][i] >= 0.5:
            classes.append(y_cols[i])
    if len(classes) == 0:
        classes.append('miscellaneous')
    return classes
   
print('\n\n\n')    
print(classify_poem(pyperclip.paste())) if len(sys.argv) == 1 else print(classify_poem(' '.join(sys.argv[1:])))