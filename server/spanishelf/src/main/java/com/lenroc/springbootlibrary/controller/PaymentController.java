package com.lenroc.springbootlibrary.controller;

import com.lenroc.springbootlibrary.repository.PaymentRepository;
import com.lenroc.springbootlibrary.requestmodels.PaymentInfoRequest;
import com.lenroc.springbootlibrary.service.PaymentService;
import com.lenroc.springbootlibrary.util.ExtractJwt;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("api/payments/secure")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest) throws StripeException{
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInfoRequest);
        String paymentStr = paymentIntent.toJson();
        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("/payment-complete")
    public ResponseEntity<String> stripePaymentComplete(@RequestHeader(value="Authorization") String token) throws Exception{
        String userEmail = ExtractJwt.payloadJwtExtraction(token, "\"sub\"");
        if(userEmail == null){
            throw new Exception("User email is missing");
        }
        return paymentService.stripePayment(userEmail);
    }
}
