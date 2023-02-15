package com.hub.accommodation.aws.configuration;

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
    public final Regions regionName = Regions.EU_WEST_2;
    public static final String bucketName = "accommodation-ukraine";
    private final AWSCredentials credentials;


    public AwsClientConfig (KeysPasswordsConfig secretsConfig){
        String accessKeyId = secretsConfig.accessKeyId();
        String secretKey = secretsConfig.accessSecretKey();
        credentials = new BasicAWSCredentials(accessKeyId, secretKey);
    }

    @Bean
    public AmazonS3 getAmazonS3Client(){
//        System.out.println("getAWSAccessKeyId(): " + credentials.getAWSAccessKeyId());
//        System.out.println("getAWSSecretKey(): " + credentials.getAWSSecretKey());


        return AmazonS3ClientBuilder
            .standard()
            .withCredentials(new AWSStaticCredentialsProvider(credentials))
            .withRegion(regionName)
            .build();
    }
}
