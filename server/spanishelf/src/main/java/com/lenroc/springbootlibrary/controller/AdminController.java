package com.lenroc.springbootlibrary.controller;

import com.lenroc.springbootlibrary.requestmodels.AddBookRequest;
import com.lenroc.springbootlibrary.requestmodels.AdminQuestionRequest;
import com.lenroc.springbootlibrary.service.AdminService;
import com.lenroc.springbootlibrary.util.ExtractJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping("/secure/add/book")
    public void postBook(@RequestHeader(value="Authorization") String token, @RequestBody AddBookRequest addBookRequest) throws Exception{
        String admin = ExtractJwt.payloadJwtExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")){
            throw new Exception("Administration page only");
        }
        adminService.postBook(addBookRequest);
    }

    @PutMapping("/secure/increase/book/quantity")
    public void increaseBookQuantity(@RequestHeader(value="Authorization") String token, @RequestParam Long bookId) throws Exception{
        String admin = ExtractJwt.payloadJwtExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")){
            throw new Exception("Administration page only");
        }
        adminService.increaseBookQuantity(bookId);
    }
    @PutMapping("/secure/decrease/book/quantity")
    public void decreaseBookQuantity(@RequestHeader(value="Authorization") String token, @RequestParam Long bookId) throws Exception{
        String admin = ExtractJwt.payloadJwtExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")){
            throw new Exception("Administration page only");
        }
        adminService.decreaseBookQuantity(bookId);
    }
    @DeleteMapping("/secure/delete/book")
    public void deleteBook(@RequestHeader(value="Authorization") String token, @RequestParam Long bookId) throws Exception{
        String admin = ExtractJwt.payloadJwtExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")){
            throw new Exception("Administration page only");
        }
        adminService.deleteBook(bookId);
    }


}
