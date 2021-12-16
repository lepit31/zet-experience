import json
import secrets
import datetime
import boto3
import uuid

from numpy import random


dynamodb = boto3.resource('dynamodb')
predictionTable = dynamodb.Table('predictions')
userTable = dynamodb.Table('users')

types = ["erotic","nonErotic"]
locations = ["left","right"]
eroticImages =    ["Nude couple 1.jpg","Nude couple 2.jpg","Nude couple 3.jpg","Nude couple 4.jpg","Nude couple 5.jpg","Nude couple 6.jpg","Nude couple 7.jpg","Nude couple 8.jpg","Nude couple 9.jpg","Nude couple 10.jpg","Nude couple 11.jpg","Nude couple 12.jpg","Nude couple 13.jpg","Nude couple 14.jpg","Nude man 1.jpg","Nude man 2.jpg","Nude man 4.jpg","Nude man 5.jpg","Nude man 6.jpg","Nude man 7.jpg","Nude man 8.jpg","Nude man 9.jpg","Nude man 10.jpg","Nude man 11.jpg","Nude man 12.jpg","Nude man 13.jpg","Nude man 14.jpg","Nude man 15.jpg","Nude man 16.jpg","Nude man 17.jpg","Nude man 18.jpg","Nude man 19.jpg","Nude man 20.jpg","Nude man 3.jpg","Nude man 21.jpg","Nude man 22.jpg","Nude woman 1.jpg","Nude woman 2.jpg","Nude woman 3.jpg","Nude woman 4.jpg","Nude woman 5.jpg","Nude woman 6.jpg","Nude woman 7.jpg","Nude woman 8.jpg","Nude woman 9.jpg","Nude woman 10.jpg","Nude woman 11.jpg","Nude woman 12.jpg","Nude woman 13.jpg","Nude woman 14.jpg","Nude woman 15.jpg","Nude woman 16.jpg","Nude woman 17.jpg","Nude woman 18.jpg","Nude woman 19.jpg","Nude woman 20.jpg","Nude woman 21.jpg","Nude woman 22.jpg"]
nonEroticImages = ["Miserable pose 3.jpg","Dummy 1.jpg","Dead bodies 1.jpg","Dead bodies 2.jpg","KKK rally 2.jpg","Dog 26.jpg","Dead bodies 3.jpg","KKK rally 1.jpg","Injury 4.jpg","War 6.jpg","Tumor 1.jpg","Fire 9.jpg","Garbage dump 2.jpg","Dirt 1.jpg","Animal carcass 5.jpg","Garbage dump 4.jpg","Severed finger 1.jpg","War 8.jpg","Fire 5.jpg","Fire 7.jpg","Fire 11.jpg","War 1.jpg","Scary face 1.jpg","Explosion 5.jpg","Destruction 4.jpg","Bloody knife 1.jpg","Car crash 1.jpg","Dog 24.jpg","Destruction 3.jpg","Keyboard 3.jpg","Sunset 4.jpg","Lake 16.jpg","Nature 1.jpg","Sunset 3.jpg","Baby 5.jpg","Lake 10.jpg","Fireworks 1.jpg","Lake 13.jpg","Baby 1.jpg","Dog 18.jpg","Dog 4.jpg","Siblings 1.jpg","Lake 8.jpg","Penguins 2.jpg","Cat 5.jpg","Rainbow 1.jpg","Lake 15.jpg","Lake 1.jpg","Rainbow 2.jpg","Fireworks 2.jpg","Dog 12.jpg","Lake 14.jpg","Beach 2.jpg","Beach 1.jpg","Lake 12.jpg","Lake 2.jpg","Lake 9.jpg","Dog 6.jpg"]

def lambda_handler(event, context):

    #testData()
    if ((len(event["userPseudo"]) < 3) or not (event["userPrediction"] == "right" or event["userPrediction"] == "left")) :
        raise Exception('Request not valid')

    prediction = createPrediction(event["userPseudo"],event["userPrediction"])
    savePrediction(prediction)
    saveUser(event["userPseudo"])

    return prediction

def getRandomType():
    i = secrets.randbelow(len(types))
    return types[i]

def getRandomEroticImage():
    i = secrets.randbelow(len(eroticImages))
    return eroticImages[i]


def getRandomNonEroticImage():
    i = secrets.randbelow(len(nonEroticImages))
    return nonEroticImages[i]

#use another random function
def getRandomLocation():
    i = random.randint(len(locations))
    return locations[i]


def testData():
    result = dict()
    for i in range(1000):

        prediction = createPrediction("test", getRandomLocation())

        result[prediction['imageType']] = result.get(prediction['imageType'], 0) + 1
        result[prediction['imageLocation']] = result.get(prediction['imageLocation'], 0) + 1
        if prediction['isSuccess'] and  prediction['imageType'] == "erotic":
            result['eroticSuccess'] = result.get('eroticSuccess', 0) + 1
        if prediction['isSuccess'] and prediction['imageType'] == "nonErotic":
            result['nonEroticSuccess'] = result.get('nonEroticSuccess', 0) + 1

    print(result)

def createPrediction(userPseudo, userPrediction):
    # choose between erotic and non erotic
    imageType = getRandomType()
    # choose the corespondant image
    imageURL = getRandomEroticImage() if imageType == "erotic" else  getRandomNonEroticImage()
    imageLocation = getRandomLocation()
    isSuccess = userPrediction == imageLocation

    prediction = dict()

    prediction["id"]=str(uuid.uuid4())
    prediction["userPseudo"]=userPseudo
    prediction["userPrediction"]=userPrediction
    prediction["imageType"]=imageType
    prediction["imageURL"]=imageURL
    prediction["imageLocation"]=imageLocation
    prediction["isSuccess"]=isSuccess
    prediction["date"]=datetime.datetime.now().isoformat()

    return prediction

def savePrediction(prediction):
    #save prediction
    res = predictionTable.put_item(
        Item=prediction
    )

def saveUser(userPseudo):
    #save user
    user = dict()

    user["userPseudo"]= userPseudo
    user["lastPredictionDate"]= datetime.datetime.now().isoformat()

    res = userTable.put_item(
        Item=user
    )
