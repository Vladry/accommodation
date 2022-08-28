SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO users (name, last_name, email, password, role, hide_social_data, dating_participation, avatar)
VALUES ('Eva', 'Brown', 'EvaBrown@ukr.net', 'Eva', 'USER', true, true,
        'https://res.cloudinary.com/vladry/image/upload/v1628868305/avatars/Ira_yvvlml.png'),
       ('Serge', 'Goulida', 'Serge@ukr.net', 'pasSerge', 'USER', true, true,
        'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vocal-studio-bruce_fzmdlp.jpg'),
       ('Andrey', 'Strange', 'Andrey@ukr.net', 'pasAndrey', 'USER', true, true,
        'https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Andrey_avatar_bxcjny.jpg'),
       ('Anya', 'Pufikovf', 'Anya@ukr.net', 'pasAnya', 'USER', true, true,
        'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_sings1_ltbkc2.png'),
       ('Tanya', '', 'Tanya@ukr.net', 'pasTanya', 'USER', false, false,
        'https://res.cloudinary.com/vladry/image/upload/v1628868305/avatars/Tanya_mi0o0m.png'),
       ('Lena', '', 'Lena@ukr.net', 'pasLena', 'USER', true, true,
        'https://res.cloudinary.com/vladry/image/upload/v1628868304/avatars/Lena_m2gbmx.png'),
       ('Sidora', 'Guaza', 'Sidora@ukr.net', 'pasSidora', 'USER', true, true, ''),
       ('Taras', '', 'Taras@ukr.net', 'pasTaras', 'USER', true, true,
        'https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Taras_avatar_hnldon.jpg'),
       ('Larisa', 'Goliychuk', 'Larisa@ukr.net', 'pasLarisa', 'USER', false, false,
        'https://res.cloudinary.com/vladry/image/upload/v1628868305/avatars/Ira_yvvlml.png'),
       ('Semyon', '', 'Semyon@ukr.net', 'pasSemyon', 'USER', true, true, ''),
       ('Kuzya', '', 'Kuzya@ukr.net', 'pasKuzya', 'USER', true, true,
        'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/guitar_and_cat_painting_tbjpdl.jpg'),
       ('Ilya', '', 'Ilya@ukr.net', 'pasIlya', 'USER', true, true,
        'https://res.cloudinary.com/vladry/image/upload/v1628196848/avatars/Ilya_avatar_ecn4wr.jpg'),
       ('Karisa', 'Kysyl', 'Karisa@ukr.net', 'pasKarisa', 'USER', false, false,
        'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/tosya_tanya_s3w0kl.jpg'),
       ('Matvey', '', 'Matvey@ukr.net', 'pasMatvey', 'USER', true, true,
        'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/cat2_x0yqxm.jpg'),
       ('Danil', '', 'Danil@ukr.net', 'pasDanil', 'USER', true, true, ''),
       ('Violetta', '', 'Violetta@ukr.net', 'pasVioletta', 'USER', true, true, ''),
       ('Vlad', 'Ryab', 'VladRyab@ukr.net', 'pasVladRyab', 'USER', false, false, 'https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Vlad_avatar_tjrcut.jpg'),
       ('Efimovna', 'Nedavalka', 'Efimovna@ukr.net', 'pasEfimovna', 'USER', false, false,
        'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/cat1_ygmygo.jpg');


INSERT INTO accommodations (user_id, locations, acc_type, num_of_rooms, num_of_beds,
                           provide_work, provide_food, status, disab_sprt, childcare_sprt, pets)
VALUES (1,  'Loc1', 1, 1, 1, false, false, 1, false, false, 1),
--        (1,  'Loc2', 2, 30, 30, true, true, 1, true, false, 1),
--        (1,  'Loc3', 3, 3, 30, false, true, 1, true, false, 1),
--        (1,  'Loc4', 1, 3, 3, true, true, 1, true, false, 1),
--        (1,  'Loc5', 1, 3, 3, false, true, 1, true, false, 1),
--        (1,  'Loc6', 2, 3, 3, true, true, 1, true, false, 1),
       (1,  'Loc7', 3, 3, 3, false, true, 1, true, false, 1),
       (17, 'Loc8', 1, 30, 30, true, true, 1, true, false, 1);

INSERT INTO dating_user_profiles (user_id, birthday, last_visit_date, my_sex, seek_a_person_of_sex, my_height, min_height_wanted,
                                  max_height_wanted, min_pref_age, max_pref_age,
                                  my_children, their_children_allowed)
VALUES (1, '2022-06-23', NOW() , 'F', 'M', 173, 190, 198, 18, 30, 1, 0),
       (2, '2022-06-22', NOW() , 'F', 'M', 163, 0, 198, 18, 30, 2, 0),
       (3, '2022-06-21', NOW() , 'M', 'F', 193, 160, 0, 18, 30, 0, 2),
       (4, '2022-06-20', NOW() , 'M', 'F', 170, 0, 0, 18, 30, 1, 100),
       (5, '2022-06-19', NOW() , 'F', 'M', 160, 180, 198, 18, 30, 0, 0),
       (6, '2022-06-18', NOW() , 'M', 'F', 183, 160, 178, 18, 30, 1, 0),
       (17,'2022-06-17', NOW() , 'M', 'F', 173, 159, 188, 18, 30, 1, 0),
       (19,'2022-04-23', NOW() , 'M', 'F', 173, 150, 190, 16, 50, 0, 5);


INSERT INTO user_pictures (id, dating_user_profile, picture)
VALUES (1, 1, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_haircut_ziiyxb.jpg'),
       (2, 1, null),
       (3, 1, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_arsenalna_befcu2.jpg'),
       (4, 1, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_arsenalna_befcu2.jpg'),
       (5, 1, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_arsenalna_befcu2.jpg'),
       (6, 1, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_arsenalna_befcu2.jpg'),
       (7, 1, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_arsenalna_befcu2.jpg'),
       (8, 17, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_haircut_ziiyxb.jpg'),
       (9, 18, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_haircut_ziiyxb.jpg');

INSERT INTO user_dating_goals (USER_DATING_PROFILE_USER_ID, goals)
VALUES (1, 'TO_BUILD_FAMILY_WITH_CHILDREN'),
       (1, 'TO_BECOME_A_COUPLE_WITHOUT_CHILDREN'),
       (1, 'JOINT_RENT_OF_APARTMENT'),
       (1, 'I_AM_JUST_BORED'),
       (17, 'SPONSORSHIP_BASED_RELATIONSHIP'),
       (17, 'WANTED_WITH_SIMILAR_INTERESTS'),
       (17, 'MAKING_FRIENDS_ONLY'),
       (17, 'I_AM_JUST_BORED');

INSERT INTO my_interests_list (USER_DATING_PROFILE_USER_ID, my_interests)
VALUES (1, 'TRAVEL'),
       (1, 'PLAYING_MUSIC_INSTRUMENTS'),
       (1, 'DANCING'),
       (1, 'SINGING'),
       (17, 'PAINTING'),
       (17, 'OTHER_ARTS'),
       (17, 'CHILDREN'),
       (17, 'CARS');

INSERT INTO their_interests_list (USER_DATING_PROFILE_USER_ID, their_interests_wanted)
VALUES (1, 'PAINTING'),
       (1, 'OTHER_ARTS'),
       (1, 'CHILDREN'),
       (1, 'CARS'),
       (17, 'TRAVEL'),
       (17, 'PLAYING_MUSIC_INSTRUMENTS'),
       (17, 'DANCING'),
       (17, 'SINGING');


SET FOREIGN_KEY_CHECKS = 1;