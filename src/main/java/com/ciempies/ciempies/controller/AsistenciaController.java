package com.ciempies.ciempies.controller;
import com.ciempies.ciempies.modelo.AsistenciaModel;
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
    public List<AsistenciaModel> listarTodas() {
        return asistenciaServicio.listarTodas();
    }

    @PostMapping
    public AsistenciaModel guardar(@RequestBody AsistenciaModel asistencia) {
        return asistenciaServicio.guardar(asistencia);
    }

    @GetMapping("/{id}")
    public AsistenciaModel buscarPorId(@PathVariable Long id) {
        return asistenciaServicio.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        asistenciaServicio.eliminar(id);
    }
}
