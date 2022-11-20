import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import sel from "../../store/selectors";
import {useRouter} from "next/router";
import urls from "../../../src/main/resources/urls.json";
import globalVariables from '../../globalVariables.json';


const DatingSubWrapper = ({children}) => {


    /*** блок авто-редиректа на заполнение UdpForm, если пользователь не зарегистрирован в dating ***/
    const datingServiceParticipation = useSelector(sel.datingServiceParticipation);
    const router = useRouter();
    const timer = useRef(null);
// т.к. используется router.push, который сработав единожды больше не отменяется при пере-рендере с изменившимся
// флагом datingServiceParticipation, приходится выставлять таймер ждущий все возможные пере-рендеры и отменяемый
// по clearTimeout(timer.current) в случае, если при пере-рендере datingServiceParticipation, а на предыдущем рендере
//уже был взведён таймер с инструкцией router.push
    useEffect(() => {
        if (datingServiceParticipation && timer.current) {
            clearTimeout(timer.current)
        } else {
            if (!timer.current) {
                timer.current = setTimeout(() => {
                    if (!datingServiceParticipation) {
                        router.push(`${urls.hostPrefix}${urls.dating}${urls.udpFormPage}?force=true`).then();
                    }
                }, globalVariables.reduxTimerUpdateMilliseconds);//TODO следить, достаточно ли этих ms для отработки стейта при записи datingServiceParticipation
            }
        }
    }, [datingServiceParticipation])
    /*** конец блока авто-редиректа на заполнение UdpForm, если пользователь не зарегистрирован в dating ***/


    return (<>{children}</>);
};

export default DatingSubWrapper;