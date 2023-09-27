package com.lenroc.springbootlibrary.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="payment")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "user_email")
    private String userEmail;
    private double amount;
}
