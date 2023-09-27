package com.lenroc.springbootlibrary.responsemodels;

import lombok.Data;
import com.lenroc.springbootlibrary.entity.Book;

@Data
public class ShelfCurrentLoansResponse {

    private Book book;
    private int daysLeft;
    public ShelfCurrentLoansResponse(Book book, int daysLeft){
        this.book = book;
        this.daysLeft = daysLeft;
    }
}
