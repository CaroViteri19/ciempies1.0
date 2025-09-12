package com.ciempies.ciempies.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

    @Controller
    public class home {

        @GetMapping("/")
        public String estudiante(Model model) {
            model.addAttribute("mensaje", "Bienvenido al proyecto Ciempiés 🚀");
            return "estudiante"; // busca la plantilla index.html en /templates
        }
    }


