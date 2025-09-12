package com.ciempies.ciempies.controller;

import com.ciempies.ciempies.modelo.Estudiante;
import com.ciempies.ciempies.service.EstudianteServiciolpml;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estudiantes")
public class EstudianteController {

    @Autowired
    private EstudianteServiciolpml estudianteServicio;

    // GET -> listar todos
    @GetMapping
    public List<Estudiante> listar() {
        return estudianteServicio.listarTodos();
    }

    // POST -> guardar nuevo
    @PostMapping
    public Estudiante guardar(@RequestBody Estudiante estudiante) {
        return estudianteServicio.guardar(estudiante);
    }

    // GET -> buscar por ID
    @GetMapping("/{id}")
    public Estudiante buscarPorId(@PathVariable Long id) {
        return estudianteServicio.buscarPorId(id);
    }

    // DELETE -> eliminar
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        estudianteServicio.eliminar(id);
    }
}

