SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO users (name, last_name, email, password, role, hide_social_data, dating_participation, avatar)
VALUES ('Vlady1', 'Ivanov', 'vlad1@ukr.net', 'rvy1', 'USER', true, true,
        'https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Vlad_avatar_tjrcut.jpg'),
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
       ('Efimovna', 'Nedavalka', 'Efimovna@ukr.net', 'pasEfimovna', 'USER', false, false,
        'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/cat1_ygmygo.jpg');


INSERT INTO accommodation (locations, acc_type, num_of_rooms, num_of_beds,
                           provide_work, provide_food, status, disab_sprt, childcare_sprt, pets)
VALUES ('Loc1', 1, 1, 1, false, false, 1, false, false, 1),
       ('Loc2', 2, 30, 30, true, true, 1, true, false, 1),
       ('Loc3', 3, 3, 30, false, true, 1, true, false, 1),
       ('Loc4', 1, 3, 3, true, true, 1, true, false, 1),
       ('Loc5', 1, 3, 3, false, true, 1, true, false, 1),
       ('Loc6', 2, 3, 3, true, true, 1, true, false, 1),
       ('Loc7', 3, 3, 3, false, true, 1, true, false, 1),
       ('Loc8', 1, 30, 30, true, true, 1, true, false, 1);

INSERT INTO dating_user_profiles (user_id, sex, i_want_a, my_height, min_height_wanted,
                                  max_height_wanted, min_pref_age, max_pref_age,
                                  my_children, their_children_allowed)
VALUES (1, 'M', 'F', 173, 160, 188, 18, 30, 0, 1),
       (2, 'F', 'M', 163, 180, 198, 18, 30, 2, 0),
       (3, 'M', 'F', 193, 160, 188, 18, 30, 0, 2),
       (4, 'M', 'F', 170, 160, 188, 18, 30, 1, 0),
       (5, 'F', 'M', 160, 180, 198, 18, 30, 0, 0),
       (6, 'M', 'F', 183, 160, 188, 18, 30, 1, 0);


INSERT INTO user_pictures (id, dating_user_profile, picture)
VALUES (1, 1, 'pic1'),
       (2, 1, 'pic2'),
       (3, 1, 'pic3');

SET FOREIGN_KEY_CHECKS = 1;