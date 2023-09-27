package com.lenroc.springbootlibrary.controller;

import com.lenroc.springbootlibrary.entity.Book;
import com.lenroc.springbootlibrary.responsemodels.ShelfCurrentLoansResponse;
import com.lenroc.springbootlibrary.service.BookService;
import com.lenroc.springbootlibrary.util.ExtractJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value = "Authorization") String token) throws Exception{
        String userEmail = ExtractJwt.payloadJwtExtraction(token, "\"sub\"");
        return bookService.currentLoans(userEmail);
    }
    @PutMapping("/secure/checkout")
    public Book checkoutBook (@RequestHeader(value = "Authorization") String token,
                              @RequestParam Long bookId) throws Exception{
        String userEmail = ExtractJwt.payloadJwtExtraction(token, "\"sub\"");
        return bookService.checkoutBook(userEmail, bookId);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestHeader(value = "Authorization") String token,
                                      @RequestParam Long bookId){
        String userEmail = ExtractJwt.payloadJwtExtraction(token, "\"sub\"");
        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token){
        String userEmail = ExtractJwt.payloadJwtExtraction(token, "\"sub\"");
        return bookService.currentLoansCount(userEmail);
    }

    @PutMapping("/secure/return")
    public void returnBook(@RequestHeader(value="Authorization") String token, @RequestParam Long bookId) throws Exception{
        String userEmail = ExtractJwt.payloadJwtExtraction(token, "\"sub\"");
        bookService.returnBook(userEmail, bookId);
    }
    @PutMapping("/secure/renew/loan")
    public void renewLoan(@RequestHeader(value="Authorization") String token, @RequestParam Long bookId) throws Exception{
        String userEmail = ExtractJwt.payloadJwtExtraction(token, "\"sub\"");
        bookService.renewLoan(userEmail, bookId);
    }
}
