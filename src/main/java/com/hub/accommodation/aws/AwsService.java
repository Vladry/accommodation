package com.hub.accommodation.aws;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.time.Instant;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AwsService {
    private final AmazonS3 s3Client;

    public URL getPresignedUrl(String fileNameKey, int duration) throws AmazonServiceException {
        System.out.println("in getPresignedUrl(fileNameKey: "+ fileNameKey+ ", duration: "+duration+" )");
        Date expiration = Date.from(Instant.now().plusSeconds(duration));
        GeneratePresignedUrlRequest request = new GeneratePresignedUrlRequest(
                AwsClientConfig.bucketName, fileNameKey)
                .withMethod(HttpMethod.PUT)
                .withExpiration(expiration);
        return s3Client.generatePresignedUrl(request);
    }
}
