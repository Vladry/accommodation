import React, {useState} from 'react';
import {Button} from "@mui/material";


const goals = [
    {
        val: 'FAMILY_BIRTH_OF_CHILDREN',
        en: 'seek for building a family and have children',
        ru: 'для создания семьи и рождения детей',
        ua: 'для створення родини та народження дiтей',
    },
    {
        val: 'FAMILY_NO_BIRTH_OF_CHILDREN',
        en: 'for building a family, no birth of children',
        ru: 'для создания семьи без рождения детей',
        ua: 'для створення родини без народження дiтей',
    },
    {
        val: 'JOINT_RENT_OF_APARTMENT',
        en: 'for renting apartment together',
        ru: '',
        ua: '',
    },
    {
        val: 'MAKING_FRIENDS_NO_RELATIONSHIP',
        en: 'making friends only. No relationship wanted',
        ru: '',
        ua: '',
    },
    {
        val: 'I_AM_SIMPLY_BORED',
        en: 'I am simply bored...',
        ru: '',
        ua: '',
    },
    {
        val: 'SPONSORSHIP_WANTED',
        en: 'sponsorship wanted',
        ru: '',
        ua: '',
    },
    {
        val: 'SPONSORSHIP_OFFERED',
        en: 'seeking for a sponsor',
        ru: '',
        ua: '',
    },
    {
        val: 'WANTED_WITH_SIMILAR_INTERESTS',
        en: 'seeking for a person with similar interests',
        ru: '',
        ua: '',
    },
    {
        val: 'OTHER',
        en: 'other...',
        ru: 'другое...',
        ua: 'iньше...',
    },
    {
        val: 'NOT_YET_DECIDED',
        en: 'not yet decided',
        ru: 'еще не решил(а)',
        ua: 'ще не вирiшив(ла)',
    }
];
const interests = [
    {
        val: 'TRAVEL',
        en: 'travelling',
        ru: 'путешествия',
        ua: 'мандрування',
    },
    {
        val: 'PLAYING_MUSIC_INSTRUMENTS',
        en: 'playing music instruments',
        ru: 'игра на музыкальных инструментах',
        ua: 'гра на музикальних iнструментах',
    },
    {
        val: 'DANCING',
        en: 'dancing',
        ru: 'танцы',
        ua: 'танцi',
    },
    {
        val: 'SINGING',
        en: 'singing',
        ru: 'пение/вокал',
        ua: 'спiв',
    },
    {
        val: 'PAINTING',
        en: 'painting art',
        ru: 'рисование',
        ua: 'малювання',
    },
    {
        val: 'OTHER_ARTS',
        en: 'other arts',
        ru: 'другие виды искусств',
        ua: 'iншi мистецтва',
    },
    {
        val: 'CHILDREN',
        en: 'child care',
        ru: 'дети',
        ua: 'дiти',
    },
    {
        val: 'CARS',
        en: 'cars',
        ru: 'автомобили',
        ua: 'автiвки',
    },
    {
        val: 'BICYCLES',
        en: 'bicycles',
        ru: 'велосипед',
        ua: 'велосипед',
    },
    {
        val: 'SCOOTERS',
        en: 'scooter riding',
        ru: 'катания на самокате/скутере, др.',
        ua: 'катання на самокатi/скутере, iн.',
    },
    {
        val: 'BOATING',
        en: 'boating',
        ru: 'катание на лодке',
        ua: 'катання на човнi',
    },
    {
        val: 'FISHING',
        en: 'fishing',
        ru: 'рыбалка',
        ua: 'рибальство',
    },
    {
        val: 'ENGINEERING',
        en: 'engineering, design',
        ru: 'инженерия, конструирование, дизайн',
        ua: 'iнженерiя, конструювання, дизайн',
    },
    {
        val: 'IT_COMPUTERS',
        en: 'it, computers',
        ru: 'it, компьютеры',
        ua: 'it, компьютори',
    },
    {
        val: 'GAMING',
        en: 'gaming',
        ru: 'компьютерные игры',
        ua: 'компьютернi iгри',
    },
    {
        val: 'ANIME',
        en: 'anime, cartoons',
        ru: 'аниме, мультяхи',
        ua: 'анiме, мультяхи',
    },
    {
        val: 'READING_BOOKS',
        en: 'reading books',
        ru: 'чтение книг',
        ua: 'книги',
    },
    {
        val: 'MOVIES',
        en: 'movies',
        ru: 'фильмы',
        ua: 'фiльми',
    },

];


const InputSelect = ({formikRef, input, formik}) => {
    let initValues;

    switch (formikRef) {
        case 'myGoals':
            initValues = goals;
            break;
        case 'myInterests':
            initValues = interests;
            break;
        default:
    }

    const [leftOptions, setLeftOptions] = useState(initValues);
    const [selected, setSelected] = useState([]);

    const select = (e) => {
        const value = e.target.value;
        console.log("e: ", value);
        const remaining = leftOptions.filter((item) => item.val !== value);
        const selectedOne = leftOptions.filter((item) => item.val === value);
        setLeftOptions(remaining);
        setSelected([...selected, selectedOne[0]]);
        formik.values[formikRef] = [...formik.values[formikRef], selectedOne[0].val];
    }
    const unselect = (e) => {
        const value = e.target.value;
        console.log("unselect clicked for: ", value);
        const returnToRemaining = selected.filter((item) => item.val === value);
        const selectedUpdated = selected.filter((item) => item.val !== value);
        setLeftOptions([...leftOptions, returnToRemaining[0]]);
        setSelected(selectedUpdated);
    }

    const options = leftOptions.map((opt, ind) => (
        <option key={ind} value={opt.val}>{opt.en} </option>
    ));

    const selectedElems = selected.map((value, ind) => (
        <Button sx={{m:'1px'}} size={'small'} variant={'outlined'} key={ind} value={value.val} onClick={unselect}>{`${value.en} (remove)`}</Button>
    ));


    return (
        <div key={formikRef}>
            <label> {input.label}:
                <select multiple={true} onChange={select}>
                    {options}
                </select>
            </label>

            <div>
                {selectedElems}
            </div>
        </div>
    );
};

export default InputSelect;