package com.ciempies.ciempies.service;

import com.ciempies.ciempies.modelo.Estudiante;
import java.util.List;

public interface EstudianteServiciolpml {
    List<Estudiante> listarTodos();
    Estudiante guardar(Estudiante estudiante);
    Estudiante buscarPorId(Long id);
    void eliminar(Long id);
}

