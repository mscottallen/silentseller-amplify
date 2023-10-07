export type AmplifyDependentResourcesAttributes = {
  "api": {
    "SilentSellerAPI": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "auth": {
    "silentselleramplify72b17d1d": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "SilentSellerFunction": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "hosting": {
    "S3AndCloudFront": {
      "CloudFrontDistributionID": "string",
      "CloudFrontDomainName": "string",
      "CloudFrontOriginAccessIdentity": "string",
      "CloudFrontSecureURL": "string",
      "HostingBucketName": "string",
      "Region": "string",
      "S3BucketSecureURL": "string",
      "WebsiteURL": "string"
    }
  }
}