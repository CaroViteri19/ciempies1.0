package com.ciempies.ciempies.service;

import com.ciempies.ciempies.modelo.Estudiante;
import com.ciempies.ciempies.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstudianteServicioImpl implements EstudianteServiciolpml {

    @Autowired
    private EstudianteRepository repositorio;

    @Override
    public List<Estudiante> listarTodos() {
        return repositorio.findAll();
    }

    @Override
    public Estudiante guardar(Estudiante estudiante) {
        return repositorio.save(estudiante);
    }

    @Override
    public Estudiante buscarPorId(Long id) {
        return repositorio.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        repositorio.deleteById(id);
    }
}



