package com.lenroc.springbootlibrary.controller;

import com.lenroc.springbootlibrary.entity.Message;
import com.lenroc.springbootlibrary.requestmodels.AdminQuestionRequest;
import com.lenroc.springbootlibrary.service.MessageService;
import com.lenroc.springbootlibrary.util.ExtractJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessagesController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value="Authorization") String token, @RequestBody Message messageRequest) throws Exception{
        String userEmail = ExtractJwt.payloadJwtExtraction(token, "\"sub\"");
        messageService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value="Authorization") String token, @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception{
        String userEmail = ExtractJwt.payloadJwtExtraction(token, "\"sub\"");
        String admin = ExtractJwt.payloadJwtExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")){
            throw new Exception("Administration page only");
        }
        messageService.putMessage(adminQuestionRequest, userEmail);
    }
}
