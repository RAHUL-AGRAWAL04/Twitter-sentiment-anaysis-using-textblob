from fastapi import FastAPI
import TSA as tsa
from pydantic import BaseModel
import json

app = FastAPI()

class Query(BaseModel):
    count:str
    topic :str

@app.get("/get-tweets/{topic}/{count}")
async def check_ip(topic:str,count:int):
    tsa.get_tweets(topic,count)
    #return {'response':'success'}
    
@app.get("/get-sentiment/")
async def get_sentiments():
    tsa.df['clean_tweet'] = tsa.df['Tweet'].apply(lambda x : tsa.clean_tweet(x))
    tsa.df["Sentiment"] = tsa.df["Tweet"].apply(lambda x : tsa.analyze_sentiment(x))
    print(tsa.df.head(5))
    tsa.df.to_excel('{}.xlsx'.format("TweetDataset"),index=False)   ## Save as Excel
    d = tsa.df.to_dict()

    res = {}
    for i in d['Sentiment']:
        dict1 = {}
        for key in d.keys():
            dict1[key] = d[key][i]
        res[i] = dict1

    return res
    
