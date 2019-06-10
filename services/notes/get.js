import * as dynamoDbLib from "../..//libs/dynamodb-lib";
import { success, notFound, failure } from "../../libs/response-lib";

export async function main(event, context) {
  try {
    const params = {
      TableName: "notes",
      // 'Key' defines the partition key and sort key of the item to be retrieved
      // - 'userId': Identity Pool identity id of the authenticated user
      // - 'noteId': path parameter
      Key: {
        userId: event.requestContext.identity.cognitoIdentityId,
        noteId: event.pathParameters.id
      }
    };
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      // Return the retrieved item
      return success(result.Item);
    } else {
      return notFound({ error: "Item not found." });
    }
  } catch (e) {
    return failure({ error: e, event });
  }
}
