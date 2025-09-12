package com.ciempies.ciempies.service;

import com.ciempies.ciempies.modelo.Asistencia;
import java.util.List;

public interface AsistenciaServicio {
    List<Asistencia> listarTodas();
    Asistencia guardar(Asistencia asistencia);
    Asistencia buscarPorId(Long id);
    void eliminar(Long id);
}

