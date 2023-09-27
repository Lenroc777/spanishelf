package com.lenroc.springbootlibrary.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="checkout")
@Data
@NoArgsConstructor
public class Checkout {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    @Column(name="user_email")
    private String userEmail;
    @Column(name="checkout_date")
    private String checkoutDate;
    @Column(name="return_date")
    private String returnDate;
    @Column(name="book_id")
    private Long bookId;
    public Checkout(String userEmail, String checkoutDate, String returnDate, Long bookId){
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.bookId = bookId;
    }
}
