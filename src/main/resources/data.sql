SET FOREIGN_KEY_CHECKS=0;

INSERT INTO users (name, last_name, email, password, role, hide_social_data, dating_participation, avatar)
VALUES
    ('Vlady1',   'Ivanov',    'vlad1@ukr.net',    'rvy1',        'USER',  true,   true,  'https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Vlad_avatar_tjrcut.jpg'),
    ('Serge',    'Goulida',   'Serge@ukr.net',    'pasSerge',    'USER',  true,   true,  ''),
    ('Andrey',   'Strange',   'Andrey@ukr.net',   'pasAndrey',   'USER',  true,   true,  'https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Andrey_avatar_bxcjny.jpg'),
    ('Anya',     'Pufikovf',  'Anya@ukr.net',     'pasAnya',     'USER',  true,   true,  ''),
    ('Tanya',    '',          'Tanya@ukr.net',    'pasTanya',    'USER',  false,  false, 'https://res.cloudinary.com/vladry/image/upload/v1628868305/avatars/Tanya_mi0o0m.png'),
    ('Lena',     '',          'Lena@ukr.net',     'pasLena',     'USER',  true,   true,  'https://res.cloudinary.com/vladry/image/upload/v1628868304/avatars/Lena_m2gbmx.png'),
    ('Sidora',   'Guaza',     'Sidora@ukr.net',   'pasSidora',   'USER',  true,   true,  ''),
    ('Taras', '',          'Taras@ukr.net',   'pasTaras',        'USER',  true,   true,  'https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Taras_avatar_hnldon.jpg'),
    ('Larisa',   'Goliychuk',  'Larisa@ukr.net',   'pasLarisa',  'USER',  false,  false,  'https://res.cloudinary.com/vladry/image/upload/v1628868305/avatars/Ira_yvvlml.png'),
    ('Semyon',   '',          'Semyon@ukr.net',   'pasSemyon',   'USER',  true,   true,  ''),
    ('Kuzya',    '',          'Kuzya@ukr.net',    'pasKuzya',    'USER',  true,   true,  ''),
    ('Ilya',     '',          'Ilya@ukr.net',      'pasIlya',    'USER',  true,   true,  'https://res.cloudinary.com/vladry/image/upload/v1628196848/avatars/Ilya_avatar_ecn4wr.jpg'),
    ('Karisa',   'Kysyl',     'Karisa@ukr.net',   'pasKarisa',   'USER',  false,  false, ''),
    ('Matvey',   '',          'Matvey@ukr.net',   'pasMatvey',   'USER',  true,   true,  ''),
    ('Danil',    '',          'Danil@ukr.net',    'pasDanil',    'USER',  true,   true,  ''),
    ('Efimovna', 'Nedavalka', 'Efimovna@ukr.net', 'pasEfimovna', 'USER',  false,  false,  '');


INSERT INTO accommodation (locations, acc_type, num_of_rooms, num_of_beds,
                           provide_work, provide_food, status, dating, disab_sprt, childcare_sprt, pets)
VALUES
       ('Loc1',  1,  1,  1, false, false, 1, true, false, false, 1),
       ('Loc30', 1, 30, 30, false, true, 1, true, true , false, 1);


SET FOREIGN_KEY_CHECKS=1;