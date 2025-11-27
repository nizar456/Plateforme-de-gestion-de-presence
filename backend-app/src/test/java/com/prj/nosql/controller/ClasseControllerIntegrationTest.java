package com.prj.nosql.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prj.nosql.dto.ClasseCreateRequest;
import com.prj.nosql.dto.ClasseResponse;
import com.prj.nosql.dto.SimpleUserResponse;
import com.prj.nosql.model.Classe;
import com.prj.nosql.model.User;
import com.prj.nosql.service.ClasseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ClasseControllerIntegrationTest {

    private MockMvc mockMvc;
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Mock
    private ClasseService classeService;
    @BeforeEach
    void setup() {
        ClasseController controller = new ClasseController();
        ReflectionTestUtils.setField(controller, "classeService", classeService);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void createClasse_endpointShouldReturnCreatedClasse() throws Exception {
        // Arrange - given
        ClasseCreateRequest request = new ClasseCreateRequest();
        request.setNom("Classe B");
        request.setNiveau(Classe.Niveau.DEUXIEME_ANNEE);

        ClasseResponse resp = new ClasseResponse();
        resp.setId("int-generated-id-2");
        resp.setNom("Classe B");
        resp.setNiveau(Classe.Niveau.DEUXIEME_ANNEE);
        resp.setEtudiants(Collections.emptyList());

        when(classeService.createClasse(any(ClasseCreateRequest.class))).thenReturn(resp);

        // Act - when
        mockMvc.perform(post("/api/admin/classes")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                // Assert - then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("int-generated-id-2"))
                .andExpect(jsonPath("$.nom").value("Classe B"))
                .andExpect(jsonPath("$.niveau").value("DEUXIEME_ANNEE"))
                .andExpect(jsonPath("$.etudiants").isArray());
    }
    @Test
    void getEtudiantsParClasse_HappyPath() throws Exception{
        // arrange - Given
        String class_id = "1";
        List<User> response = new ArrayList<>();
        User rep1 = User.builder()
                .id("1")
                .nom("Fikhane")
                .prenom("Nizar")
                .email("nizar@gmail.com")
                .build();
        response.add(rep1);
        when(classeService.getEtudiantsParClasse(class_id/*any(String.class)*/))
                .thenReturn(response);
        // Act - When
        mockMvc.perform(get("/api/admin/classes/1/etudiants"))
                // ASSERT - Then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").value("1"))
                .andExpect(jsonPath("$..nomComplet").value("Nizar Fikhane"))
                .andExpect(jsonPath("$..email").value("nizar@gmail.com"));

    }
}
