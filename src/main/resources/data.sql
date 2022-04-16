SET FOREIGN_KEY_CHECKS=0;

INSERT INTO accommodation (locations, acc_type, num_of_rooms, num_of_beds,
                           provide_work, provide_food, status, dating, user_id, disab_sprt, childcare_sprt, pets)
VALUES
       ('Loc1',  1,  1,  1, false, false, 1, true, 1, false, false, 1),
       ('Loc2',  1,  2,  2, true , true, 1, false, 2, true , false, 1),
       ('Loc3',  3,  3,  3, false, true, 1, true, 3, false, true , 1),
       ('Loc4',  1,  4,  4, false, false, 1, true, 4, true , false, 1),
       ('Loc5',  2,  5,  5, true , true, 1, false, 5, false, true , 1),
       ('Loc6',  3,  6,  6, false, true, 1, false, 6, false, false, 1),
       ('Loc7',  1,  7,  7, false, true, 1, false, 7, true , false, 1),
       ('Loc8',  2,  8,  8, true , true, 1, true, 8, false, false, 1),
       ('Loc9',  1,  9,  9, false, false, 1, true, 9, false, true , 1),
       ('Loc10', 3, 10, 10, true , true, 1, true, 10, false, false, 1),
       ('Loc11', 2, 11, 11, false, true, 1, false, 11, false, true , 1),
       ('Loc12', 3, 12, 12, true , false, 1, true, 12, true , false, 1),
       ('Loc13', 1, 13, 13, false, true, 1, false, 13, false, true , 1),
       ('Loc14', 1, 14, 14, true , true, 1, true, 14, true , false, 1),
       ('Loc15', 1, 15, 15, false, false, 1, true, 15, false, false, 1),
       ('Loc16', 1, 16, 16, true , true, 1, false, 16, false, true , 1),
       ('Loc17', 1, 17, 17, false, true, 1, true, 17, false, false, 1),
       ('Loc18', 1, 18, 18, true , false, 1, true, 18, true , false, 1),
       ('Loc19', 1, 19, 19, false, true, 1, false, 19, false, true , 1),
       ('Loc20', 1, 20, 20, false, false, 1, true, 20, true , false, 1),
       ('Loc21', 1, 21, 21, true , true, 1, true, 21, false, true , 1),
       ('Loc22', 1, 22, 22, false, true, 1, true, 22, false, false, 1),
       ('Loc23', 1, 23, 23, true , true, 1, false, 23, false, true , 1),
       ('Loc24', 1, 24, 24, false, false, 1, true, 24, true , false, 1),
       ('Loc25', 1, 25, 25, true , true, 1, false, 25, false, false, 1),
       ('Loc26', 1, 26, 26, false, false, 1, true, 26, false, true , 1),
       ('Loc27', 1, 27, 27, false, true, 1, false, 27, false, false, 1),
       ('Loc28', 1, 28, 28, true , false, 1, true, 28, true , true , 1),
       ('Loc29', 1, 29, 29, true , false, 1, false, 29, false, true , 1),
       ('Loc30', 1, 30, 30, false, true, 1, true, 30, true , false, 1);


