package com.flickfinder.flickfinderbackend.controllers;

import com.flickfinder.flickfinderbackend.services.ApiKeyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:4200")
public class ApiController {

    @Autowired
    private ApiKeyService apiKeyService;

    @GetMapping("get-api-key")
    public String getApiKey() {
        System.out.println(apiKeyService.getApiKey());
        return apiKeyService.getApiKey();
    }
}
