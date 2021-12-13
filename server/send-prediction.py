import json
import boto3

dynamodb = boto3.resource('dynamodb')
userTable = dynamodb.Table('users')
predictionTable = dynamodb.Table('predictions')
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):

    # by default search for all userPseudo
    filterByPseudo = Attr("userPseudo").exists()

    requestParam = event.get('queryStringParameters')
    # if pseudo get statistic only for the pseudo
    if requestParam :
        userPseudo = requestParam.get('pseudo')
        if userPseudo :
            filterByPseudo =  Attr("userPseudo").eq(userPseudo)


    nbUser = userTable.scan(Select='COUNT',FilterExpression = filterByPseudo).get('Count',0)

    nbPrediction = predictionTable.scan(Select='COUNT',FilterExpression = filterByPseudo).get('Count',0)
    nbPredictionSuccess = predictionTable.scan(Select='COUNT',FilterExpression = Attr("isSuccess").eq(True) & filterByPseudo ).get('Count',0)

    nbLeft = predictionTable.scan(Select='COUNT',FilterExpression =Attr("imageLocation").eq("left")& filterByPseudo).get('Count',0)
    nbLeftSuccess = predictionTable.scan(Select='COUNT',FilterExpression =Attr("imageLocation").eq("left") & Attr("isSuccess").eq(True)& filterByPseudo).get('Count',0)

    nbRight = nbPrediction - nbLeft
    nbRightSuccess = predictionTable.scan(Select='COUNT',FilterExpression =Attr("imageLocation").eq("right") & Attr("isSuccess").eq(True)& filterByPseudo).get('Count',0)

    nbErotic = predictionTable.scan(Select='COUNT',FilterExpression =Attr("imageType").eq("erotic") & filterByPseudo).get('Count',0)
    nbEroticSuccess = predictionTable.scan(Select='COUNT',FilterExpression =Attr("imageType").eq("erotic") & Attr("isSuccess").eq(True) & filterByPseudo ).get('Count',0)

    nbNonErotic = nbPrediction - nbErotic
    nbNonEroticSuccess = predictionTable.scan(Select='COUNT',FilterExpression =Attr("imageType").eq("nonErotic") & Attr("isSuccess").eq(True) & filterByPseudo ).get('Count',0)


    print(f'Pseudo {nbUser} Prediction {nbPredictionSuccess} / {nbPrediction}  A gauche : {nbLeftSuccess} / {nbLeft} A droite : {nbRightSuccess} / {nbRight} Erotique : {nbEroticSuccess} / {nbErotic} Non Erotique : {nbNonEroticSuccess} / {nbNonErotic} ')

    stat = dict()
    stat["nbUser"] = nbUser
    stat["nbPrediction"] = nbPrediction
    stat["nbPredictionSuccess"] = nbPredictionSuccess
    stat["nbLeft"] = nbLeft
    stat["nbLeftSuccess"] = nbLeftSuccess
    stat["nbRight"] = nbRight
    stat["nbRightSuccess"] = nbRightSuccess
    stat["nbErotic"] = nbErotic
    stat["nbEroticSuccess"] = nbEroticSuccess
    stat["nbNonErotic"] = nbNonErotic
    stat["nbNonEroticSuccess"] = nbNonEroticSuccess

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin' : '*'
        },
        'body': json.dumps(stat)
    }

