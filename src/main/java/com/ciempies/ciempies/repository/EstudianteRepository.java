package com.ciempies.ciempies.repository;



import com.ciempies.ciempies.modelo.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

    @Repository
    public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
        // Aquí puedes agregar métodos personalizados si los necesitas
    }

