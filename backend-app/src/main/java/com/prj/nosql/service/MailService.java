package com.prj.nosql.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String text) {
        if (to == null || to.isEmpty()) return;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
    public void envoyerMailAbsence(String to, String prenom, String module, Date date) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Absence à justifier");
        message.setText("Bonjour " + prenom + ",\n\n"
                + "Vous avez été noté absent(e) au module \"" + module + "\" le " + date + ".\n"
                + "Merci de fournir une justification via votre espace étudiant.\n\n"
                + "Cordialement,\nL'administration");
        mailSender.send(message);
    }
    public void envoyerMailJustificationAuProf(String emailProf, String nomEtudiant, String prenomEtudiant, String module, Date date) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailProf);
        message.setSubject("Nouvelle justification d'absence");
        message.setText("Bonjour,\n\n"
                + "L'étudiant(e) " + prenomEtudiant + " " + nomEtudiant
                + " a soumis une justification pour son absence au module " + module + " le " + date + ".\n"
                + "Veuillez vérifier et traiter la justification via l’espace professeur.\n\n"
                + "Cordialement,\nL'administration");
        mailSender.send(message);
    }
}