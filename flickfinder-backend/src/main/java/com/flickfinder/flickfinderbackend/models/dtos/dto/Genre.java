package com.flickfinder.flickfinderbackend.models.dtos.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Genre {
    @Id
    Long id;
    String name;

    public Genre(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    public Genre(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
