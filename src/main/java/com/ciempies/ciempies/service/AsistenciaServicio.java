package com.ciempies.ciempies.service;

import com.ciempies.ciempies.modelo.AsistenciaModel;
import java.util.List;

public interface AsistenciaServicio {
    List<AsistenciaModel> listarTodas();
    AsistenciaModel guardar(AsistenciaModel asistencia);
    AsistenciaModel buscarPorId(Long id);
    void eliminar(Long id);
}

