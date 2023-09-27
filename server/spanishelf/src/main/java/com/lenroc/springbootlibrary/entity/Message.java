package com.lenroc.springbootlibrary.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="messages")
@Data
@NoArgsConstructor
public class Message {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    private String title;
    @Column(name="user_email")
    private String userEmail;
    private String question;
    @Column(name="admin_email")
    private String adminEmail;
    private String response;
    @Column(columnDefinition = "boolean default '0'")
    private Boolean closed;

    public Message(String title, String question) {
        this.title = title;
        this.question = question;
    }
}
