package com.flickfinder.flickfinderbackend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ApiKeyService {

    @Value("${api.key}")
    private static String apiKey;

    public static String getApiKey() {
        return apiKey;
    }
}
