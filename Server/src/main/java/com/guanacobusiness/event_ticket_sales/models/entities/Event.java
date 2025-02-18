package com.guanacobusiness.event_ticket_sales.models.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "event", schema = "public")
@ToString(exclude = {"userXEvents", "tiers"})
public class Event {

    @Id
    @Column(name = "code")
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private UUID code;

    @Column(name = "event_title")
    private String title;

    @Column(name = "involved_people")
    private String involvedPeople;

    @Column(name = "event_image")
    private String image;

    @Column(name = "event_date")
    private LocalDate date;

    @Column(name = "event_time")
    private LocalTime time;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "sponsors")
    private String sponsors;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "weather")
    private String weather;

    @Column(name = "temperature")
    private Float temperature;

    @Column(name = "demo")
    private String demo;

    @OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
    @JsonIgnore
    List<UserXEvent> userXEvents;

    @OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
    @JsonIgnore
    List<Tier> tiers;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_code")
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_location_code")
    private EventLocation eventLocation;

}
