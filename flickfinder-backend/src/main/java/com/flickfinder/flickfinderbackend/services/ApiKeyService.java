package com.flickfinder.flickfinderbackend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ApiKeyService {

    @Value("${api.key}")
    private String apiKey;

    public ApiKeyService() {
    }

    public String getApiKey() {
        return apiKey;
    }
}
