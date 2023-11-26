package com.flickfinder.flickfinderbackend.models.dtos.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Genre {
    @Id
    private Integer id;
    private String name;

    public Genre(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
    public Genre(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
