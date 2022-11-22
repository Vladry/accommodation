package com.hub.accommodation.domain;

import com.hub.accommodation.domain.user.enums.ServiceGroup;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="photos")
@ToString
public class Photo extends BaseEntity {

    @GeneratedValue(strategy = GenerationType.SEQUENCE) //изменить генератор, чтобы не отключить batching,см. раздел 7:  https://www.baeldung.com/jpa-hibernate-batch-insert-update
    private Long id;

    @Column(name="user_id")
    private Long userId;

   @Enumerated(EnumType.STRING)
    @Column(name="service_group")
    private ServiceGroup serviceGroup;

 @Column(name="url")
    private String url;                 // "http://res.cloudinary.com/vladry/image/upload/v1669069435/dating/mmkk8a1mq7mpschcum5n.jpg";



// все остальные (доп) мета-данные фоток перечисленные ниже, я буду вынимать из Cloudinary, но на всякий случай они тут все прописаны и работают, если их раскомментировать здесь:

// @Column(name = "created_at")
// private String createdAt;          // "2022-11-21T22:23:55Z";
// @Column(name = "bytes")
// private Integer bytes;              // 137091;
// @Column(name = "secure_url")
//    private String secureUrl;          // "https://res.cloudinary.com/vladry/image/upload/v1669069435/dating/mmkk8a1mq7mpschcum5n.jpg";
// @Column(name = "public_id")
//    private String publicId;           // "dating/mmkk8a1mq7mpschcum5n";
// @Column(name = "signature")
//    private String signature;           // "631d5e0fa976f3d660019a190259be7cea4070b5";
// @Column(name = "access_mode")
//    private String accessMode;         // "public";
// @Column(name = "asset_id")
//    private String assetId;            // "274775799956e3d9c33abc8070660462";
//    @Column(name = "folder")
//    private String folder;              // "dating";
//    @Column(name = "height")
//    private Integer height;             // 1000;
//    @Column(name = "width")
//    private Integer width;              // 750;
//    @Column(name = "original_filename")
//    private String originalFilename;   // "IMG_20210910_154113";



}
