package com.hub.accommodation.aws;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.net.URL;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class AwsController {

    private final AwsService awsService;

    @GetMapping("/presigned-url")
    public URL getPresignedUrl(
            @RequestParam("fileNameKey") String fileNameKey,
            @RequestParam("duration") Integer duration) {
        try {
            return awsService.getPresignedUrl(fileNameKey, duration);
        } catch (AmazonServiceException e) {
            log.error("Amazon S3 can't return presignedUrl \n" + e.getMessage());
        }
        return null;
    }
}
