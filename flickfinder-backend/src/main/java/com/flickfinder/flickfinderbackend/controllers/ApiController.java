package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.services.ApiKeyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:4200")
public class ApiController {

    @Autowired
    private ApiKeyService apiKeyService;

    @GetMapping("get-api-key")
    public Map<String, String> getApiKey() {
        Map<String, String> apiKeyMap = new HashMap<>();
        apiKeyMap.put("apiKey", apiKeyService.getApiKey());
        return apiKeyMap;
    }
}
