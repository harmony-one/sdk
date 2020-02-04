# Harmony JS-SDK Documentation

## [CLICK ME!!](https://harmony-js-sdk-doc.s3-us-west-1.amazonaws.com/index.html) to see the documentation

# metaDocumentation 
## Summary 
The following content demonstrate how to generate our documentations!

## Step 1: Generating Documentation

### Introduction of TypeDoc
[TypeDoc is used to generate HTML](https://typedoc.org/api/index.html)
> See [TypeDoc command line arguments](https://typedoc.org/guides/options/), to understand how to use them.  
> Using `typedoc --help` to see them 
> 
> For example:  
> `typedoc --name <Name>` to set the name of header  
> `typedoc --theme <default | minimal | path/to/theme>` to set the theme of documation  
> `typedoc --readme <path/to/readme | none>` path to readme file that should be displayed on the index page.  
> `typedoc --ignoreCompilerErrors` Should TypeDoc generate documentation pages even after the compiler has returned errors?

### Install the global cli 
```
npm install --global typedoc
```
### Generating HTML
```
cd docs

typedoc --out ./account ../packages/harmony-account/ --ignoreCompilerErrors
typedoc --out ./contract ../packages/harmony-contract/ --ignoreCompilerErrors
typedoc --out ./core ../packages/harmony-core/ --ignoreCompilerErrors
typedoc --out ./crypto ../packages/harmony-crypto/ --ignoreCompilerErrors
typedoc --out ./network ../packages/harmony-network/ --ignoreCompilerErrors
typedoc --out ./staking ../packages/harmony-staking/ --ignoreCompilerErrors
typedoc --out ./transaction ../packages/harmony-transaction/ --ignoreCompilerErrors
typedoc --out ./utils ../packages/harmony-utils/ --ignoreCompilerErrors
```

### Runing an simpleHTTPServer to test it
```
python3 -m http.server 8000
```
Then View the documentation generated at http://localhost:8000
>http://localhost:8000/core/index.html  
http://localhost:8000/account/index.html  
http://localhost:8000/contract/index.html  
http://localhost:8000/crypto/index.html  
http://localhost:8000/network/index.html  
http://localhost:8000/staking/index.html  
http://localhost:8000/transaction/index.html  
http://localhost:8000/utils/index.html  


## Step 2: Deploy them on AWS

### Create an AWS s3 bucket
Actually, there are just two points need to do!
1. Create an AWS S3 bucket, **UNCHECK** `Block all public access`
2. Put the files into that bucket, and set the **public permission** to `Grant public read access to this object(s)`

### Method 1: Using Console

Here is the documentation of AWS, just follow it! 
https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html

>Don't forget the two points mentioned above

### Method 2: Using AWS CLI

Reference: [AWS CLI documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-s3-commands.html)

If you have never used aws CLI, you need follow these two steps to set up your environment first!
- [Install the AWS CLI version 1](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html)
- [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

After that, we can used AWS CLI to do these jobs

1. Create a Bucket
```
aws s3 mb s3://harmony-js-sdk-doc
```

2. List all buckets you have created 
```
aws s3 ls
```

3. Uploade the files into bucket
```
aws s3 cp ./account s3://harmony-js-sdk-doc --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive
```
> **./account**  
> the path of folder which we want to upload
> 
> **s3://harmony-js-sdk-doc**  
> the bucket name on AWS S3
> 
> **--grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers**   
> Grant read access to all user  
> 
> **--recursive**  
> Command is performed on all files or objects under the specified directory or prefix.

4. Open the folder in S3 bucket and find the `index.html`, get the 
`Object URL` and share it to public!


  