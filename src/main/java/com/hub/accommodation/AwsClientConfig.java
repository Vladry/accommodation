package com.hub.accommodation;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsClientConfig {

    private static final String accessKeyId = "AKIARK6ZVBSLFA42RZV4";
//    private static final String accessKeyId = "AKIARK6ZVBSLLG7P7SOV";
//    private static final String accessKeyId = "AKIARK6ZVBSLJ465QAOC";
//    private static final String secretKey = "&_21SlyVlad_12#";
//    private static final String secretKey = "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";
    private static final String secretKey = "yGE8A4WfPgLmZ+o7vibb5Bi2MqAR35GwbJLpqnzm";
//    private static final String secretKey = "V8g10yZha6KfQiic0UxI2tqoLTUcvEr2HfBDnvex";
    public static final Regions regionName = Regions.EU_WEST_2;
    public static final String regionNameStr = "eu-west-2";

    public static final String bucketName = "accommodation-ukraine";
    private static final AWSCredentials credentials = new BasicAWSCredentials(accessKeyId, secretKey);

    @Bean
    public AmazonS3 getAmazonS3Client(){
//        System.out.println("BasicAWSCredentials: ");
//        System.out.println("getAWSAccessKeyId(): " + credentials.getAWSAccessKeyId());
//        System.out.println("getAWSSecretKey(): " + credentials.getAWSSecretKey());


        return AmazonS3ClientBuilder
            .standard()
            .withCredentials(new AWSStaticCredentialsProvider(credentials))
            .withRegion(regionName)
            .build();
    }
}
