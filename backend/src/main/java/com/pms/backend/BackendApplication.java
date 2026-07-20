package com.pms.backend;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Map;

@SpringBootApplication
public class BackendApplication {
	public static void main(String[] args) {
		Cloudinary cloudinary = new Cloudinary(System.getenv("CLOUDINARY_URL"));
		System.out.println("JWT_SECRET = " + System.getenv("JWT_SECRET"));
		SpringApplication.run(BackendApplication.class, args);
		System.out.println("Clodinary URL = " + System.getenv("CLOUDINARY_URL"));
		try{
			// Upload the image
			Map params1 = ObjectUtils.asMap(
					"use_filename", true,
					"unique_filename", false,
					"overwrite", true
			);

			System.out.println(
					cloudinary.uploader().upload("https://cloudinary-devs.github.io/cld-docs-assets/assets/images/coffee_cup.jpg", params1));
		} catch (Exception e){
			System.out.println(e);
		}
	}

}
