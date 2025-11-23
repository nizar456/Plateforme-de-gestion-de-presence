package com.prj.nosql.service;

import com.prj.nosql.dto.ClasseCreateRequest;
import com.prj.nosql.dto.ClasseResponse;
import com.prj.nosql.model.Classe;
import com.prj.nosql.model.Classe.Niveau;
import com.prj.nosql.repository.ClasseRepository;
import com.prj.nosql.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ClasseServiceTest {

    @Mock
    private ClasseRepository classeRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ClasseService classeService;

    @Test
    void createClasse_shouldSaveAndReturnResponse() {
        // Arrange
        ClasseCreateRequest request = new ClasseCreateRequest();
        request.setNom("Classe A");
        request.setNiveau(Niveau.PREMIERE_ANNEE);

        when(classeRepository.save(any(Classe.class))).thenAnswer(invocation -> {
            Classe arg = invocation.getArgument(0);
            arg.setId("generated-id-1");
            return arg;
        });

        // Act
        ClasseResponse response = classeService.createClasse(request);

        // Assert
        assertNotNull(response);
        assertEquals("generated-id-1", response.getId());
        assertEquals("Classe A", response.getNom());
        assertEquals(Niveau.PREMIERE_ANNEE, response.getNiveau());
        assertNotNull(response.getEtudiants());
        assertTrue(response.getEtudiants().isEmpty());
    }
}
