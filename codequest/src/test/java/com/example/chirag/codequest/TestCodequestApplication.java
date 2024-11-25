package com.example.chirag.codequest;

import org.springframework.boot.SpringApplication;

public class TestCodequestApplication {

	public static void main(String[] args) {
		SpringApplication.from(CodequestApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
