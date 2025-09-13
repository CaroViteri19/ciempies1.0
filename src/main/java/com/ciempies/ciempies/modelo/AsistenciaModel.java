package com.ciempies.ciempies.modelo;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "asistencia")
public class AsistenciaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_asistencia;

    private Long id_ruta;
    private String nombre_ruta;

    private Long id_estudiante;
    private String nombre_estudiante;

    private String estado; // presente, ausente, tarde, etc.

    private LocalDate fecha;
    private LocalTime hora_inicio;
    private LocalTime hora_final;

    private String observaciones;

    private Long id_usuario_registro;
    private LocalDate fecha_registro;

    private String cod_ruta;
    private Long id_usuario;
}

