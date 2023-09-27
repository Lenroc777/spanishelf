package com.lenroc.springbootlibrary.controller;

import com.lenroc.springbootlibrary.requestmodels.ReviewRequest;
import com.lenroc.springbootlibrary.service.ReviewService;
import com.lenroc.springbootlibrary.util.ExtractJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/secure")
    public void postReview(@RequestHeader(value="Authorization") String token, @RequestBody ReviewRequest reviewRequest) throws Exception{
        String userEmail = ExtractJwt.payloadJwtExtraction(token, "\"sub\"");

        if(userEmail == null ){
            throw new Exception("User email is missong");
        }
        reviewService.postReview(userEmail, reviewRequest);
    }

    @GetMapping("/secure/user/book")
    public Boolean reviewBookByUser(@RequestHeader(value="Authorization") String token, @RequestParam Long bookId) throws Exception{
        String userEmail = ExtractJwt.payloadJwtExtraction(token, "\"sub\"");
        if(userEmail == null ){
            throw new Exception("User email is missong");
        }
        return reviewService.userReviewListed(userEmail, bookId);
    }
}
