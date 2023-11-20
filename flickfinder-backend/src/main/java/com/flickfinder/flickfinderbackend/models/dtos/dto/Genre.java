package com.flickfinder.flickfinderbackend.models.dtos.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Genre {
    @Id
    private Number id;
    private String name;

    public Genre(Number id, String name) {
        this.id = id;
        this.name = name;
    }
    public Genre(){}

    public Number getId() {
        return id;
    }

    public void setId(Number id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
