import json
import boto3

dynamodb = boto3.resource('dynamodb')
userTable = dynamodb.Table('users')
predictionTable = dynamodb.Table('predictions')
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):

    nbUser = userTable.scan(Select='COUNT').get('Count',0)

    filterByPseudo = Attr("userPseudo").exists()
    print(event.get('queryStringParameters'))
    requestParam = event.get('queryStringParameters')
    # if pseudo get statistic only for the pseudo
    if requestParam :
        userPseudo = requestParam.get('pseudo')
        if userPseudo :
            filterByPseudo =  Attr("userPseudo").eq(userPseudo)
            nbUser = 1


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

    # if pseudo get personal statistic
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
