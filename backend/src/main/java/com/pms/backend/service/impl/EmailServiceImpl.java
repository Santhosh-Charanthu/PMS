package com.pms.backend.service.impl;

import com.pms.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendOtp(String email, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("OTP Verification - Placement Management System");
        message.setText(
                "Your OTP is: " + otp +
                        "\n\nThis OTP is valid for 5 minutes." +
                        "\n\nDo not share it with anyone."
        );

        mailSender.send(message);
    }
}