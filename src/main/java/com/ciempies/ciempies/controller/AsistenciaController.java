package com.ciempies.ciempies.controller;

import com.ciempies.ciempies.modelo.Asistencia;
import com.ciempies.ciempies.service.AsistenciaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asistencias")
public class AsistenciaController {

    @Autowired
    private AsistenciaServicio asistenciaServicio;

    @GetMapping
    public List<Asistencia> listarTodas() {
        return asistenciaServicio.listarTodas();
    }

    @PostMapping
    public Asistencia guardar(@RequestBody Asistencia asistencia) {
        return asistenciaServicio.guardar(asistencia);
    }

    @GetMapping("/{id}")
    public Asistencia buscarPorId(@PathVariable Long id) {
        return asistenciaServicio.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        asistenciaServicio.eliminar(id);
    }
}
