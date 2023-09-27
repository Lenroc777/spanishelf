package com.lenroc.springbootlibrary.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="book")
@Data
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String description;
    private Integer copies;
    @Column(name="copies_available")
    private Integer copiesAvailable;
    private String category;
    private String img;
}