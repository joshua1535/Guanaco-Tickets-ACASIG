package com.guanacobusiness.event_ticket_sales.controllers;

import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guanacobusiness.event_ticket_sales.models.dtos.EventLocationDTO;
import com.guanacobusiness.event_ticket_sales.services.EventLocationService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/event-locations")
@CrossOrigin(origins = "*")
public class EventLocationController {

    @Autowired
    private EventLocationService eventLocationService;

    @GetMapping("/all")
    public ResponseEntity<?> GetAllEventLocations(HttpServletRequest request) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        List<EventLocationDTO> response = eventLocationService.findAllEventLocations();

        if (response.isEmpty()) {
            return new ResponseEntity<>("No Event Locations Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{code}")
    public ResponseEntity<?> GetOneEventLocation(@PathVariable(name = "code") UUID code, HttpServletRequest request) {

        if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
        }

        try {
            EventLocationDTO response = eventLocationService.findEventLocationByCode(code);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/department/{code}")
    public ResponseEntity<?> GetEventLocationsByDepartment(@PathVariable(name = "code") String code, HttpServletRequest request) {
    
            if(request.getHeader("Authorization") == null || !request.getHeader("Authorization").startsWith("Bearer ")) {
                return new ResponseEntity<>("Invalid Auth Type", HttpStatus.BAD_REQUEST);
            }
    
            try {
                List<EventLocationDTO> response = eventLocationService.findEventLocationsByDepartment(code);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
            }  
    }
}
