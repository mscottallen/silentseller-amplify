const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const axios = require('axios');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const fetchCognitoKeys = async (poolId) => {
  const url = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${poolId}/.well-known/jwks.json`;
  const response = await axios.get(url);
  return response.data.keys;
};

exports.handler = async (event) => {
  const poolId = 'us-east-1_GxsQiVjSk'; // Replace with your Cognito Pool ID
  const token = event.headers.Authorization || event.headers.authorization; // Extract the token from the Authorization header
  let userId;

  try {
    const keys = await fetchCognitoKeys(poolId);
    const pems = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const keyId = key.kid;
      const modulus = key.n;
      const exponent = key.e;
      const keyType = key.kty;
      const jwk = { kty: keyType, n: modulus, e: exponent };
      const pem = jwkToPem(jwk);
      pems[keyId] = pem;
    }

    const decodedJwt = jwt.decode(token, { complete: true });
    
    if (!decodedJwt) {
      console.error('Invalid token');
      return {
        statusCode: 401,
        body: JSON.stringify('Unauthorized')
      };
    }

    const pem = pems[decodedJwt.header.kid];
    
    if (!pem) {
      console.error('Invalid token');
      return {
        statusCode: 401,
        body: JSON.stringify('Unauthorized')
      };
    }

    userId = jwt.verify(token, pem, { algorithms: ['RS256'] })['cognito:username'];

  } catch (error) {
    console.error('Error verifying the token', error);
    return {
      statusCode: 401,
      body: JSON.stringify('Unauthorized')
    };
  }

  // Assuming the body of the request contains API keys
  const body = JSON.parse(event.body);
  const { openAI, etsy, shopify, printify, printful, midjourney, discord } = body;

  const params = {
    TableName: 'SilentSellerDB',
    Item: {
      userId,
      openAI,
      etsy,
      shopify,
      printify,
      printful,
      midjourney,
      discord
    }
  };

  try {
    await dynamoDB.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'API keys successfully stored' })
    };
  } catch (dbError) {
    console.error('Error saving to DynamoDB', dbError);
    return {
      statusCode: 500,
      body: JSON.stringify('Internal Server Error')
    };
  }
};
