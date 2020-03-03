# Harmony JS-SDK Documentation

## [CLICK ME!!](https://harmony-js-sdk-doc.s3-us-west-1.amazonaws.com/index.html) to see the documentation

# metaDocumentation 
## Summary 
The following content demonstrate how to generate our documentation!

## Step 1: Generate Documentation

### Introduction of TypeDoc
[TypeDoc is used to generate HTML](https://typedoc.org/api/index.html)
> See [TypeDoc command line arguments](https://typedoc.org/guides/options/), to understand how to use them.  
> Using `typedoc --help` to see them 
> 
> **For example:**  
> `typedoc --name <Name>` to set the name of header  
> `typedoc --theme <default | minimal | path/to/theme>` to set the theme of documation  
> `typedoc --readme <path/to/readme | none>` path to readme file that should be displayed on the index page.  
> `typedoc --ignoreCompilerErrors` Should TypeDoc generate documentation pages even after the compiler has returned errors?

### Install TypeDoc
Local installation (prefered)
```
$ npm install typedoc --save-dev
```

Golbal CLI installation
```
$ npm install --global typedoc
```

### Generate HTML
```
$ cd docs
$ typedoc --out ./build ../packages/ --ignoreCompilerErrors --theme default --name Harmony_SDK_Doc --readme ../README.md
```

### See the generated doc at local

>open the `index.html` under the path `sdk/docs/build/index.html`

## Step 2: Deploy on AWS (harmony core only!)

### Create an AWS s3 bucket
Actually, there are just two points needed!
1. Create an AWS S3 bucket, **UNCHECK** `Block all public access`
2. Put the files into the bucket, and set the **public permission** to `Grant public read access to this object(s)`

### Method 1: Use Console

[Here](https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) is the documentation of AWS, just follow it! 

>Don't forget the two points mentioned above

### Method 2: Use AWS CLI

Reference: [AWS CLI documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-s3-commands.html)

If you have never used AWS CLI, you need follow these to set up your environment first!
- [Install the AWS CLI version 1](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html)
- [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

After that, use AWS CLI to do following

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
Here is some explanations
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

1. Open the folder in S3 bucket and find `index.html`, get the 
`Object URL`, then make it public!


  