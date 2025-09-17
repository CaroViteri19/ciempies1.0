package com.ciempies.ciempies.controller;

import com.ciempies.ciempies.modelo.Estudiante;
import com.ciempies.ciempies.service.EstudianteServiciolpml;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/estudiantes")
public class EstudianteController {

    @GetMapping("/estudiante")
    public String vistaEstudiantes() {
        // Spring busca automáticamente el archivo estudiante.html en /templates
        return "estudiante";
    }


    private final EstudianteServiciolpml estudianteService;

    @Autowired
    public EstudianteController(EstudianteServiciolpml estudianteService) {
        this.estudianteService = estudianteService;
    }

    @GetMapping
    public ResponseEntity<List<Estudiante>> listar() {
        return ResponseEntity.ok(estudianteService.listarTodos());
    }

    @PostMapping
    public ResponseEntity<Estudiante> guardar(@RequestBody Estudiante estudiante) {
        Estudiante saved = estudianteService.guardar(estudiante);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> buscarPorId(@PathVariable Long id) {
        Estudiante est = estudianteService.buscarPorId(id);
        return ResponseEntity.ok(est);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Estudiante> actualizar(@PathVariable Long id, @RequestBody Estudiante estudiante) {
        estudiante.setIdEstudiante(id);
        Estudiante updated = estudianteService.guardar(estudiante);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        estudianteService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}


