package com.ciempies.ciempies.repository;
import com.ciempies.ciempies.modelo.AsistenciaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

    @Repository
    public interface AsistenciaRepository extends JpaRepository<AsistenciaModel, Long> {
        // aquí podrías agregar métodos personalizados si necesitas
    }


