SET
FOREIGN_KEY_CHECKS = 0;

INSERT INTO users (name, last_name, email, password, role, hide_social_data, dating_participation, dating_last_visit_date, avatar)
VALUES ('Eva', 'Brown', 'EvaBrown@ukr.net', 'Eva', 'USER', true, true, '2021-10-03T09:59:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628868305/avatars/Ira_yvvlml.png'),
       ('Serge', 'Goulida', 'Serge@ukr.net', 'pasSerge', 'USER', true, true, '2020-06-03T09:59:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vocal-studio-bruce_fzmdlp.jpg'),
       ('Andrey', 'Strange', 'Andrey@ukr.net', 'pasAndrey', 'USER', true, true, '2022-10-01T09:59:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Andrey_avatar_bxcjny.jpg'),
       ('Vlad2', 'Pufikovf', 'Vlad2@ukr.net', 'pasVlad2', 'USER', true, true, '2022-08-03T09:59:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_sings1_ltbkc2.png'),
       ('Tanya', '', 'Tanya@ukr.net', 'pasTanya', 'USER', false, false, '2022-03-03T09:59:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628868305/avatars/Tanya_mi0o0m.png'),
       ('Lena', '', 'Lena@ukr.net', 'pasLena', 'USER', true, true, '2022-01-03T09:59:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628868304/avatars/Lena_m2gbmx.png'),
       ('Sidora', 'Guaza', 'Sidora@ukr.net', 'pasSidora', 'USER', true, true, '2022-06-03T09:59:29.503359+03:00', ''),
       ('Taras', '', 'Taras@ukr.net', 'pasTaras', 'USER', true, true, '2022-04-03T09:59:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Taras_avatar_hnldon.jpg'),
       ('Larisa', 'Goliychuk', 'Larisa@ukr.net', 'pasLarisa', 'USER', false, false, '2022-10-03T09:59:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628868305/avatars/Ira_yvvlml.png'),
       ('Semyon', '', 'Semyon@ukr.net', 'pasSemyon', 'USER', true, true, '2022-10-01T09:59:29.503359+03:00', ''),
       ('Kuzya', '', 'Kuzya@ukr.net', 'pasKuzya', 'USER', true, true, '2022-10-01T09:59:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/guitar_and_cat_painting_tbjpdl.jpg'),
       ('Ilya', '', 'Ilya@ukr.net', 'pasIlya', 'USER', true, true, '2022-02-03T01:59:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628196848/avatars/Ilya_avatar_ecn4wr.jpg'),
       ('Karisa', 'Kysyl', 'Karisa@ukr.net', 'pasKarisa', 'USER', false, false, '2022-05-03T06:59:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/tosya_tanya_s3w0kl.jpg'),
       ('Matvey', '', 'Matvey@ukr.net', 'pasMatvey', 'USER', true, true, '2022-02-03T09:39:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/cat2_x0yqxm.jpg'),
       ('Danil', '', 'Danil@ukr.net', 'pasDanil', 'USER', true, true, '2022-03-03T09:59:19.503359+03:00', ''),
       ('Violetta', '', 'Violetta@ukr.net', 'pasVioletta', 'USER', true, true,  '2022-10-03T02:59:29.503359+03:00',''),
       ('Vlad', 'Ryab', 'VladRyab@ukr.net', 'pasVladRyab', 'USER', false, false, '2022-07-03T09:39:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Vlad_avatar_tjrcut.jpg'),
       ('Efimovna', 'Nedavalka', 'Efimovna@ukr.net', 'pasEfimovna', 'USER', false, false, '2022-04-03T09:29:29.503359+03:00',
        'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/cat1_ygmygo.jpg');


INSERT INTO accommodations (user_id, locations, acc_type, num_of_rooms, num_of_beds,
                            provide_work, provide_food, status, disab_sprt, childcare_sprt, pets)
VALUES (1, 'Loc1', 1, 1, 1, false, false, 1, false, false, 1),
       (1, 'Loc2', 2, 30, 30, true, true, 1, true, false, 1),
       (1, 'Loc3', 3, 3, 30, false, true, 1, true, false, 1),
       (1, 'Loc4', 1, 3, 3, true, true, 1, true, false, 1),
       (1, 'Loc5', 1, 3, 3, false, true, 1, true, false, 1),
       (1, 'Loc6', 2, 3, 3, true, true, 1, true, false, 1),
       (19, 'Loc7', 3, 5, 2, false, true, 1, false, true, 0),
       (19, 'Loc8', 1, 30, 15, true, false, 2, true, false, 1);


INSERT INTO tenants (user_id,
                     desired_city,
                     desired_country,
                     info,
                     elder_childr,
                     babies,
                     adults,
                     eldery,
                     dogs,
                     cats,
                     other_pets,
                     require_care,
                     severity,
                     stay_length
)
VALUES (19, 'Lvov', 'USA', 'no additional info for user', 0, 1, 2, 1, 0, 1, 1, 1, 'HOUSE_UNTOUCHED_IN_WAR_ZONE', 'FEW_DAYS_TRANSITIONAL_STAY');


INSERT INTO user_pictures (dating_user_profile, picture)
VALUES
    (4, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vocal-studio-bruce_fzmdlp.jpg'),
    (4, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_sings2_tyligr.png'),
    (4, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_guitar_jqhojn.png'),

    (5, 'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/tosya_tanya_s3w0kl.jpg'),
    (5, 'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/bicycle2_wo1i08.jpg'),
    (5, 'https://res.cloudinary.com/vladry/image/upload/v1628499313/ilya_shrunk/4d7eea3c8660aac877338190a88144bc_fitted_400x300_jubjvd.jpg'),

    (11, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_arsenalna_befcu2.jpg'),
    (11, 'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/bicycle1_r0rlek.jpg'),

    (14, 'https://res.cloudinary.com/vladry/image/upload/v1628499313/ilya_shrunk/4d7eea3c8660aac877338190a88144bc_fitted_400x300_jubjvd.jpg'),
    (14, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/guitar_and_cat_painting_tbjpdl.jpg'),

    (17, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_arsenalna_befcu2.jpg'),
    (17, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_in_car_rtzqzp.jpg'),

    (19, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_haircut_ziiyxb.jpg'),
    (19, 'https://res.cloudinary.com/vladry/image/upload/v1628498610/vlad_shrunk/bicycle1_r0rlek.jpg'),
    (19, 'https://res.cloudinary.com/vladry/image/upload/v1628498611/vlad_shrunk/vlad_arsenalna_befcu2.jpg');


/*INSERT INTO user_dating_goals (USER_DATING_PROFILE_ID, goals) //это когда userDatingProfile имел ассоциацию с User -ом
VALUES (4, 'TO_BUILD_FAMILY_WITH_CHILDREN'),
    (5, 'TO_BECOME_A_COUPLE_WITHOUT_CHILDREN'),
    (5, 'JOINT_RENT_OF_APARTMENT'),
    (5, 'I_AM_JUST_BORED'),
    (19, 'SPONSORSHIP_BASED_RELATIONSHIP'),
    (19, 'WANTED_WITH_SIMILAR_INTERESTS'),
    (4, 'MAKING_FRIENDS_ONLY'),
    (4, 'I_AM_JUST_BORED');
*/
/*INSERT INTO my_interests_list (USER_DATING_PROFILE_ID, my_interests)
VALUES (1, 'TRAVEL'),
       (1, 'PLAYING_MUSIC_INSTRUMENTS'),
       (1, 'DANCING'),
       (1, 'SINGING'),
       (17, 'PAINTING'),
       (17, 'OTHER_ARTS'),
       (17, 'CHILDREN'),
       (17, 'CARS');

INSERT INTO their_interests_list (USER_DATING_PROFILE_ID, their_interests_wanted)
VALUES (1, 'PAINTING'),
       (1, 'OTHER_ARTS'),
       (1, 'CHILDREN'),
       (1, 'CARS'),
       (17, 'TRAVEL'),
       (17, 'PLAYING_MUSIC_INSTRUMENTS'),
       (17, 'DANCING'),
       (17, 'SINGING');
*/



SET
    FOREIGN_KEY_CHECKS = 1;
