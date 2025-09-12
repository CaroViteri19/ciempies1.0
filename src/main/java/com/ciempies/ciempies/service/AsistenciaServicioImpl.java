package com.ciempies.ciempies.service;

import com.ciempies.ciempies.modelo.Asistencia;
import com.ciempies.ciempies.repository.AsistenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AsistenciaServicioImpl implements AsistenciaServicio {

    @Autowired
    private AsistenciaRepository asistenciaRepository;

    @Override
    public List<Asistencia> listarTodas() {
        return asistenciaRepository.findAll();
    }

    @Override
    public Asistencia guardar(Asistencia asistencia) {
        return asistenciaRepository.save(asistencia);
    }

    @Override
    public Asistencia buscarPorId(Long id) {
        return asistenciaRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        asistenciaRepository.deleteById(id);
    }
}

